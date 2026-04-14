"use client";

import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  postId: number;
};

export default function EditPostButton({ postId }: Props) {
  const router = useRouter();

  return (
    <IconButton
      onClick={() => router.push(`/my-posts/${postId}/edit`)}
      sx={{
        position: "absolute",
        top: 8,
        right: 8,

        bgcolor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",

        color: "white",

        border: "1px solid rgba(255,255,255,0.3)",

        "&:hover": {
          bgcolor: "rgba(0, 0, 0, 0.8)",
          transform: "scale(1.05)",
        },

        transition: "all 0.2s ease",
      }}
    >
      <EditIcon />
    </IconButton>
  );
}
