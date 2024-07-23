import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Alert,
  CircularProgress,
  InputBase,
  InputLabel,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { loginUser, loginUserType } from "../../../services/endPoints";
import { ApiResponse } from "../../../types";
import { getAuth, getUid } from "../../../services/identity";

import {
  setEmailInCookie,
  setIdInCookie,
  setJwtInCookie,
  setNameInCookie,
} from "../../../services/cookie-handler";

// Define the validation schema using yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Invalid email format"
    ),
  password: yup.string().required("Password is required"),
});

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserType>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<loginUserType> = async (data) => {
    setLoading(true);
    try {
      const res: ApiResponse<any> = await loginUser(data);
      if (res.status) {
        setJwtInCookie(res.entity["x_Access"]);
        setNameInCookie(res.entity.user_name);
        setEmailInCookie(res.entity.user_email);
        setIdInCookie(res.entity.user_id);
        setTimeout(() => {
          navigate("/home");
        }, 200);
      } else {
        setMessage("Login feild: " + res.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      console.error("Login error", error);
      setMessage(
        "An error occurred during Login: " +
          (error.response?.data?.message || error.message)
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = "darkslategray";
    return () => {
      document.body.style.backgroundColor = "inherit";
    };
  }, []);

  useEffect(() => {
    const isAuthenticated = getAuth() && getUid();
    if (isAuthenticated) {
      navigate("/home"); // Use navigate function for redirection
    }
  }, [navigate]); // Add navigate to dependencies

  return (
    <Stack className={styles.login}>
      <Stack className={styles.login__container}>
        <Stack className={styles.login__header}>
          <Typography
            sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            className={styles.login__title}
          >
            LOGIN
          </Typography>
          <Stack className={styles.login__underline} />
        </Stack>

        <Stack
          component="form"
          className={styles.login__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack>
            <Stack className={styles.login__formField}>
              <InputLabel htmlFor="email-input">
                Email{" "}
                {errors.email && <span style={{ color: "red" }}> * </span>}
              </InputLabel>
              <InputBase id="email-input" {...register("email")} />
              <Stack className={styles.login__inputUnderline} />
            </Stack>

            <Stack className={styles.login__formField}>
              <InputLabel htmlFor="password-input">
                Password{" "}
                {errors.password && <span style={{ color: "red" }}> * </span>}
              </InputLabel>
              <InputBase
                type="password"
                id="password-input"
                {...register("password")}
              />
              <Stack className={styles.login__inputUnderline} />
            </Stack>
          </Stack>

          <Stack sx={{ alignItems: "center" }}>
            <button
              style={{ width: "150px", height: "35px" }}
              type="submit"
              className={styles["login__button"]}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Login"
              )}
            </button>

            <Typography sx={{ fontSize: "12px" }}>
              Don't have an account? <Link to={"/signup"}>Sign up</Link>
            </Typography>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity={snackbarSeverity}
                sx={{ width: "100%" }}
              >
                {message}
              </Alert>
            </Snackbar>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
