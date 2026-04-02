"use client";

import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { createPost } from "@/api/postActions";

import { getAllCategories } from "@/api/categoriesActions";
import { Category } from "@/types/apiTypes";
import { useRouter } from "next/navigation";

const MAX_IMAGE_MB = 4;

export default function NewPost() {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [selectValue, setSelectValue] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
        console.log(data);
        if (data.length > 0) {
          setSelectValue(data[0].id);
        }
      } catch (error) {
        console.error("Failed to load categories", error);
        setStatus("Failed to load categories.");
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handlePickFile = (file: File | undefined) => {
    setStatus(null);
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus("Please select an image file (png/jpg).");
      return;
    }

    const mb = file.size / (1024 * 1024);
    if (mb > MAX_IMAGE_MB) {
      setStatus(`Image is too large. Max size is ${MAX_IMAGE_MB} MB.`);
      return;
    }

    setImage(file);
  };

  const handleSubmit = async () => {
    setStatus(null);

    if (!image) {
      setStatus("Please choose an image.");
      return;
    }

    const text = description.trim();

    try {
      setLoading(true);
      await createPost(image, text, selectValue);
      router.push("/my-posts");
    } catch (e) {
      setStatus("Failed to create post. Try again.");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", px: 2, pt: 10, pb: 4 }}>
      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        <Paper elevation={3} sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 3 }}>
          <Stack spacing={2.5}>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Create new post
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload an image and add a description.
              </Typography>
            </Box>

            {status ? <Alert severity="error">{status}</Alert> : null}

            <Stack spacing={1.5}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems="flex-start"
              >
                <Button variant="outlined" component="label" disabled={loading}>
                  Choose image
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePickFile(e.target.files?.[0])}
                  />
                </Button>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ alignSelf: "center" }}
                >
                  {image ? image.name : "No file selected"}
                </Typography>

                {image ? (
                  <Button
                    variant="text"
                    color="error"
                    disabled={loading}
                    onClick={() => setImage(null)}
                  >
                    Remove
                  </Button>
                ) : null}
              </Stack>

              {previewUrl ? (
                <Box
                  component="img"
                  src={previewUrl}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    maxHeight: 360,
                    objectFit: "cover",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: 220,
                    borderRadius: 2,
                    border: "1px dashed",
                    borderColor: "divider",
                    display: "grid",
                    placeItems: "center",
                    color: "text.secondary",
                  }}
                >
                  <Typography variant="body2">
                    Here you will see preview
                  </Typography>
                </Box>
              )}
              <FormControl>
                <InputLabel>Select category</InputLabel>
                <Select
                  label="Select category"
                  value={selectValue}
                  onChange={(e) => {
                    setSelectValue(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2">Description</Typography>
              <TextField
                multiline
                minRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write something about your post..."
                fullWidth
                disabled={loading}
              />
            </Stack>

            <Stack direction="row" spacing={1.5} justifyContent="flex-end">
              <Button
                variant="text"
                disabled={loading}
                onClick={() => router.back()}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading || !image}
              >
                Create
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
