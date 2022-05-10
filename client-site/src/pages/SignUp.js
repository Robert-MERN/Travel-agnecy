import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Loading from "../components/Loading";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../database/firebase";

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

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsloading(true);
        setError(false);
        const data = new FormData(e.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const firstName = data.get('firstName');
        const lastName = data.get('lastName');
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(doc(db, "users", res.user.uid), {
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                timeStamp: serverTimestamp(),
            });
            setIsloading(false);
            navigate("/login")
        } catch (err) {
            setError(true)
            setIsloading(false);
        }

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
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        InputProps={{ style: { fontSize: "16px" } }}
                                        InputLabelProps={{ style: { fontSize: "15px" } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        InputProps={{ style: { fontSize: "16px" } }}
                                        InputLabelProps={{ style: { fontSize: "15px" } }}
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
                                        InputProps={{ style: { fontSize: "16px" } }}
                                        InputLabelProps={{ style: { fontSize: "15px" } }}
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
                                        InputProps={{ style: { fontSize: "16px" } }}
                                        InputLabelProps={{ style: { fontSize: "15px" } }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, fontSize: "18px" }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link style={{ fontSize: "14px" }} to="/login" >
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4, fontSize: "12px" }} />
                </Container>
            </ThemeProvider>
            {isLoading &&
                <Loading />
            }
        </>
    );
}