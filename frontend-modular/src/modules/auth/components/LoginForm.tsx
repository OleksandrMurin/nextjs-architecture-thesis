"use client";
import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import NextLink from "next/link";

import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { loginThunk } from "../../../store/slices/userSlice";

//TODO create one component for login and register forms to avoid duplication

const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: "100%", maxWidth: 420, p: 4, borderRadius: 3 }}
      >
        <Stack spacing={2}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                position: "relative",

                py: 2,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: 10,
                  width: "50%",
                  height: 2,
                  borderRadius: 999,
                  backgroundColor: "currentColor",
                },
              }}
            >
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your credentials to continue
            </Typography>
          </Box>

          <Formik
            initialValues={{ userName: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values, helpers) => {
              helpers.setStatus(undefined);
              const action = await dispatch(loginThunk(values));
              if (loginThunk.fulfilled.match(action)) {
                router.push("/my-posts");
              } else {
                const msg = action.payload ?? "Login failed";
                helpers.setStatus(String(msg));
              }
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
              isSubmitting,
              status,
            }) => (
              <Form>
                <Stack spacing={2}>
                  {status ? <Alert severity="error">{status}</Alert> : null}

                  <TextField
                    name="userName"
                    label="Username"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="userName"
                    fullWidth
                    error={Boolean(touched.userName && errors.userName)}
                    helperText={
                      touched.userName && errors.userName
                        ? errors.userName
                        : " "
                    }
                  />

                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="current-password"
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    helperText={
                      touched.password && errors.password
                        ? errors.password
                        : " "
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    Sign in
                  </Button>

                  <Typography variant="body2" textAlign="center">
                    No account?{" "}
                    <Link
                      component={NextLink}
                      href="/register"
                      underline="hover"
                    >
                      Register
                    </Link>
                  </Typography>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginForm;
