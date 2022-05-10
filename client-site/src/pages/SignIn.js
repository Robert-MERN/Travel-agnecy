import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../database/firebase";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { userReceived, selectIsLoading, userLoading, userError } from "../redux/userSlice";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" to="/">
                AXEN HOLIDAYS
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
function Error(props) {
    return (
        <Typography variant="body2" color="error" align="center" {...props}>
           Wrong Email or Password
        </Typography>
    );
}

const theme = createTheme({
    fontSize: "18px"
});

export default function SignIn() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const { state } = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
        

    const handleSubmit = (e) => {
        setError(false);
        dispatch(userLoading());
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch(userReceived(userCredential.user));
            })
            .catch((error) => {
                dispatch(userError());
                setError(true);
            });
    };

    return (
        <>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 5, backgroundColor: "#fff", transform: "scale(3)", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}>
                        <img style={{ transform: "scale(0.8)", objectFit: "cover" }} src="https://axen-trave-test.herokuapp.com/images/main_logo.png" alt="" />
                    </Avatar>
                    <Typography component="h1" variant="h2">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            InputProps={{ style: { fontSize: "16px" } }}
                            InputLabelProps={{ style: { fontSize: "15px" } }}
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
                            InputProps={{ style: { fontSize: "16px" } }}
                            InputLabelProps={{ style: { fontSize: "15px" } }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            sx={{ transform: "scale(1.3) translateX(8px)" }}
                        />
                        {error&&
                            <Error sx={{fontSize: "14px" }}/>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, fontSize: "18px" }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs  >
                                <Link style={{ fontSize: "14px" }} to="#">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" style={{ fontSize: "14px" }} >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4, fontSize: "12px" }} />
            </Container>
        </ThemeProvider>
        {isLoading !== "idle"&&
            <Loading/>
        }
        </>
    );
}