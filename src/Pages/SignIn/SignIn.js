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
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/Auth/Auth";
import { CircularProgress } from "@mui/material";
import { getUserData, storeUserData } from "../../services/storage/Storage.";
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
        Raj Medicine
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
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
  });

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleError = () => {
    let errors = initialStateErrors;
    let hasError = false;

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
      signInWithEmailAndPassword(auth, inputs.email, inputs.password)
        .then((res) => {
          console.log(res.user.uid);
          storeUserData(res.user.uid);
          dispatch(login());
        })
        .catch((err) => {
          if (err.code === "auth/user-not-found") {
            setErrors({
              ...errors,
              custom_error: "Account Not exist",
              custom_error_status: true,
            });
          }
          if (err.code === "auth/wrong-password") {
            setErrors({
              ...errors,
              custom_error: "Wrong Password",
              custom_error_status: true,
            });
          }
          console.log(err.code);
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
          {/* <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <img
            src="https://res.cloudinary.com/druttjvrf/image/upload/v1685438308/cropedMedicineLogo_axkiyh.png"
            className="logo-icon"
            id="logo-header-raj-medicine"
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              error={errors.email.required}
              helperText={errors.email.required ? "Enter the valid Email" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              error={errors.password.required}
              helperText={
                errors.password.required ? "Enter Min 6 character" : ""
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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
              disabled={loading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  style={{
                    color: "black",
                    opacity: "0.5",
                    cursor: "not-allowed",
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to={"/signup"} style={{ color: "black", opacity: "0.5" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <div className="signin-page-text1">
          (If you don't have an account signup with email and password in signup
          page or use this details. Username:<span>test@rajmedicine.in</span>{" "}
          and Password: <span>123456</span>)
        </div>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
