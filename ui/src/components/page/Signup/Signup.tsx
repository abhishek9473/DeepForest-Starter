import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  CircularProgress,
  InputBase,
  InputLabel,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import { NewUsertype, registerUser } from "../../../services/endPoints";
import {
  setEmailInCookie,
  setIdInCookie,
  setJwtInCookie,
  setNameInCookie,
} from "../../../services/cookie-handler";
import { ApiResponse } from "../../../types";
import { getAuth, getUid } from "../../../services/identity";

// Define the validation schema using yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
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

interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // Function to handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUsertype>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<NewUsertype> = async (data) => {
    setLoading(true);
    try {
      const res: ApiResponse<any> = await registerUser(data);
      if (res.status) {
        setJwtInCookie(res.entity["x_Access"]);
        setNameInCookie(res.entity.user_name);
        setEmailInCookie(res.entity.user_email);
        setIdInCookie(res.entity.user_id);
        setMessage("Registration successful");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        // Add a delay before navigation
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setMessage("Registration failed: " + res.message);
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      console.error("Registration error", error);
      setMessage(
        "An error occurred during registration: " +
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
    <Stack className={styles.signup}>
      <Stack className={styles.signup__container}>
        <Stack className={styles.signup__header}>
          <Typography
            sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
            className={styles.signup__title}
          >
            SIGNUP
          </Typography>
          <Stack className={styles.signup__underline} />
        </Stack>

        <Stack
          component="form"
          className={styles.signup__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack>
            <Stack className={styles.signup__formField}>
              <InputLabel htmlFor="name-input">
                Name {errors.name && <span style={{ color: "red" }}> * </span>}
              </InputLabel>
              <InputBase id="name-input" {...register("name")} />
              <Stack className={styles.signup__inputUnderline} />
            </Stack>

            <Stack className={styles.signup__formField}>
              <InputLabel htmlFor="email-input">
                Email{" "}
                {errors.email && <span style={{ color: "red" }}> * </span>}
              </InputLabel>
              <InputBase id="email-input" {...register("email")} />
              <Stack className={styles.signup__inputUnderline} />
            </Stack>

            <Stack className={styles.signup__formField}>
              <InputLabel htmlFor="password-input">
                Password{" "}
                {errors.password && <span style={{ color: "red" }}> * </span>}
              </InputLabel>
              <InputBase
                type="password"
                id="password-input"
                {...register("password")}
              />
              <Stack className={styles.signup__inputUnderline} />
            </Stack>
          </Stack>

          <Stack sx={{ alignItems: "center" }}>
            <button
              type="submit"
              style={{ width: "150px", height: "35px" }}
              className={styles["signup__button"]}
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "Signup"
              )}
            </button>

            <Typography sx={{ fontSize: "12px" }}>
              Already have an account? <Link to={"/login"}>Sign in</Link>
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

export default Signup;
