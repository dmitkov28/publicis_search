import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { ReactComponent as LoginImage } from "../img/login_image.svg";
import Slide from "@mui/material/Slide";
import { useAuthStatus } from "../hooks/useAuthStatus";
import SearchIcon from "@mui/icons-material/Search";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [error, setError] = useState(false);

  if (checkingStatus) {
    return;
  }

  if (loggedIn) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const email = formData.email.trim();
    const password = formData.password.trim();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials.user) {
        navigate("/");
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <Grid
        container
        sx={{ height: "100vh", alignItems: "flex-start" }}
        rowSpacing={0}
      >
        <Grid item xs={12} sx={{ mt: 10, p: 0 }}>
          <Typography
            align="center"
            variant="h2"
            fontFamily="Montserrat"
            sx={{
              p: 1,
              width: "60%",
              maxWidth: "800px",
              m: "auto",
              color: "#102A54",
              border: "2px solid #dfe1e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              borderRadius: 24,
              fontSize: "clamp(12px, 3.4vw, 45px)",
            }}
          >
            <SearchIcon
              fontSize="large"
              sx={{ color: "#dfe1e5", mr: 2, fontSize: { md: 75, sm: 55 } }}
            />
            <TypeAnimation
              sequence={[
                "Publicis",
                500,
                "Publicis Search",
                1000,
                "Publicis Search Intelligence",
                750,
              ]}
              repeat={0} // Repeat this Animation Sequence infinitely
            />
          </Typography>
          {/* </Slide> */}
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}
        >
          <Slide
            direction="right"
            in={true}
            timeout={1200}
            mountOnEnter
            unmountOnExit
          >
            <LoginImage component="img" title="Welcome Page Logo" />
          </Slide>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}
        >
          <Slide
            direction="left"
            in={true}
            timeout={1200}
            mountOnEnter
            unmountOnExit
          >
            <Container component="main" maxWidth="xs">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
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
                    autoComplete="off"
                    error={error}
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
                    error={error}
                    helperText={error && "Invalid credentials"}
                  />
                  {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <RouterLink
                        to="/reset-password"
                        style={{ textDecoration: "none" }}
                      >
                        <Typography color="primary">Reset Password</Typography>
                      </RouterLink>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </Slide>
        </Grid>
      </Grid>
    </>
  );
}
