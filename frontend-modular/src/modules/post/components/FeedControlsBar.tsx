"use client";

import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Category } from "../types";

type Props = {
  categories: Category[];
};

export default function FeedControlsBar({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(
    searchParams.get("category") ?? "all",
  );
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") ?? "createdAt",
  );
  const [order, setOrder] = useState(searchParams.get("order") ?? "DESC");
  const handleChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all" || !category) params.delete("category");
    else {
      params.set("category", category);
    }

    if (!search?.trim()) params.delete("search");
    else {
      params.set("search", search);
    }

    if (!sortBy) params.delete("sortBy");
    else {
      params.set("sortBy", sortBy);
    }

    if (order === "ASC") {
      params.set("order", order);
    } else {
      params.delete("order");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category");
    params.delete("search");
    params.delete("sortBy");
    params.delete("order");

    setCategory("all");
    setSearch("");
    setSortBy("");
    setOrder("DESC");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };
  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        <TextField
          label="Search"
          placeholder="Search by description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ minWidth: 260 }}
        />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="createdAt">Created at</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="order-label">Order</InputLabel>
          <Select
            labelId="order-label"
            value={order}
            label="Order"
            onChange={(e) => setOrder(e.target.value)}
          >
            <MenuItem value="DESC">Newest first</MenuItem>
            <MenuItem value="ASC">Oldest first</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="all">All categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.slug}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleChange}>
          Apply
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          {" "}
          Reset
        </Button>
      </Stack>
    </Container>
  );
}
