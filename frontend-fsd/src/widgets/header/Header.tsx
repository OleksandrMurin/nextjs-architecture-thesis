"use client";
import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logout } from "../../store/slices/userSlice";

//TODO create Mui theme do avoid huge blocks of sx

export const Header = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isAuthenticated = useAppSelector(
    (state) => state.users.isAuthenticated,
  );
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {isAuthenticated && (
          <Stack direction="row" spacing={2}>
            <Button
              component={NextLink}
              href="/"
              color="inherit"
              className={pathname === "/" ? "active" : ""}
              sx={{
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: 0,
                  width: "50%",
                  height: 2,
                  borderRadius: 999,
                  backgroundColor: "currentColor",
                  opacity: 0,
                  transition: "opacity 150ms",
                },
                "&.active::after": {
                  opacity: 1,
                },
              }}
            >
              All posts
            </Button>
            <Button
              component={NextLink}
              href="/my-posts"
              color="inherit"
              className={pathname.startsWith("/my-posts") ? "active" : ""}
              sx={{
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: 0,
                  width: "50%",
                  height: 2,
                  borderRadius: 999,
                  backgroundColor: "currentColor",
                  opacity: 0,
                  transition: "opacity 150ms",
                },
                "&.active::after": {
                  opacity: 1,
                },
              }}
            >
              My posts
            </Button>
            <Button
              component={NextLink}
              href="/new-post"
              color="inherit"
              variant="outlined"
              sx={{
                color: "primary.contrastText",
                borderColor: "primary.contrastText",
                transition:
                  "background-color 150ms, color 150ms, border-color 150ms",
                "&:hover": {
                  backgroundColor: "primary.contrastText",
                  color: "primary.main",
                  borderColor: "primary.contrastText",
                },
              }}
            >
              + Add post
            </Button>
          </Stack>
        )}

        <Box sx={{ ml: "auto" }}>
          {!isAuthenticated && (
            <Stack direction="row" spacing={2}>
              <Button component={NextLink} href="/login" color="inherit">
                Login
              </Button>
              <Button
                component={NextLink}
                href="/register"
                color="inherit"
                variant="outlined"
              >
                Register
              </Button>
            </Stack>
          )}

          {isAuthenticated && (
            <Button
              color="inherit"
              onClick={handleLogout}
              variant="outlined"
              sx={{
                color: "primary.contrastText",
                borderColor: "primary.contrastText",
                borderRadius: 15,
                transition:
                  "background-color 150ms, color 150ms, border-color 150ms",
                "&:hover": {
                  backgroundColor: "primary.contrastText",
                  color: "primary.main",
                  borderColor: "primary.contrastText",
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
