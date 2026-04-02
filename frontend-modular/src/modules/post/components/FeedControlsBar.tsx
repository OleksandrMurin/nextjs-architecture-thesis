"use client";

import { Category } from "@/modules/post/types";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  categories: Category[];
  selectedCategory: string;
};

export default function FeedControlsBar({
  categories,
  selectedCategory,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("category");
    else params.set("category", value);

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 3,
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={selectedCategory}
            onChange={(e) => handleChange(e.target.value)}
          >
            <MenuItem value="all">All categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.slug}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </Container>
  );
}
