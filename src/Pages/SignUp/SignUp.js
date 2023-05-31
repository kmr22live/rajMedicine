import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/Auth/Auth";
import { getUserData, storeUserData } from "../../services/storage/Storage.";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/AuthSlice";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        style={{ color: "black", textDecoration: "none", fontWeight: "600" }}
      >
        Raj Medicines
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const authlogin = useSelector((state) => state.auth.authToken);

  const nav = useNavigate();
  useEffect(() => {
    if (authlogin) {
      nav("/home");
    }
  }, [authlogin]);

  const dispatch = useDispatch();
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null,
    custom_error_status: false,
  };
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  const handleError = () => {
    let errors = initialStateErrors;
    let hasError = false;
    if (inputs.name === "") {
      errors.name.required = true;
      hasError = true;
    }
    if (
      inputs.email === "" ||
      !Object.values(inputs.email).includes("@") ||
      !Object.values(inputs.email).includes(".")
    ) {
      errors.email.required = true;
      hasError = true;
    }

    if (inputs.password === "" || inputs.password.length < 6) {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      //   sending register api request
      createUserWithEmailAndPassword(auth, inputs.email, inputs.password)
        .then((res) => {
          console.log(res.user.uid);
          storeUserData(res.user.uid);
          dispatch(login());
        })
        .catch((err) => {
          //    if(err.response.data.error.message=="EMAIL_EXISTS"){
          //         setErrors({...errors,custom_error:"Already this email has been registered!"})
          //    }else if(String(err.response.data.error.message).includes('WEAK_PASSWORD')){
          //         setErrors({...errors,custom_error:"Password should be at least 6 characters!"})
          //    }
          if (err.code === "auth/email-already-in-use") {
            setErrors({
              ...errors,
              custom_error: "Account Already Exist",
              custom_error_status: true,
            });
          }
          if (err.code === "auth/invalid-email") {
            setErrors({
              ...errors,
              custom_error: "Invalid Email Address",
              custom_error_status: true,
            });
          }
          //   setErrors({ ...errors, custom_error: true });
        })
        .finally(() => {
          setLoading(false);
        });
    }
    console.log(initialStateErrors, errors);
    setErrors(errors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleError();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://res.cloudinary.com/druttjvrf/image/upload/v1685438308/cropedMedicineLogo_axkiyh.png"
            className="logo-icon"
            id="logo-header-raj-medicine"
          />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={handleChange}
                  error={errors.name.required}
                  helperText={errors.name.required ? "Enter the Name" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  error={errors.email.required}
                  helperText={
                    errors.email.required ? "Enter the valid Email" : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  error={errors.password.required}
                  helperText={
                    errors.password.required
                      ? "Password should be at least 6 characters!"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive updates via email."
                />
              </Grid>
            </Grid>
            <div className="loading-spinner-login">
              {loading ? <CircularProgress color="inherit" /> : null}
            </div>
            <div className="invalid-custom-error-wrapper">
              {errors.custom_error_status ? (
                <p className="invalid-custom-error">{errors.custom_error}</p>
              ) : null}
            </div>

            <Button
              style={{ backgroundColor: "black" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={"/signin"} style={{ color: "black", opacity: "0.5" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
