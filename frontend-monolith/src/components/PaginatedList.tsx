"use client";

import { Box, Pagination, PaginationItem, Stack } from "@mui/material";
import Link from "next/link";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  page: number;
  lastPage: number;
  baseUrl: string;
};

export const PaginatedList = ({ children, page, lastPage, baseUrl }: Props) => {
  return (
    <Stack
      spacing={3}
      sx={{ width: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <Stack spacing={3} sx={{ width: "35rem" }}>
        {children}
      </Stack>

      {lastPage > 1 && (
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            py: 1.5,
            display: "flex",
            justifyContent: "center",
            bgcolor: "background.default",
            borderTop: "1px solid",
            borderColor: "divider",
            width: "35rem",
          }}
        >
          <Pagination
            page={page}
            count={lastPage}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                href={`${baseUrl}?page=${item.page}`}
                {...item}
              />
            )}
          />
        </Box>
      )}
    </Stack>
  );
};
