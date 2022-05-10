import React,{ useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BsPaypal } from "react-icons/bs"
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import StripeCheckOut from "react-stripe-checkout";


const SquareButton = styled(Button)(({ theme }) => ({

    color: grey[50],
    backgroundColor: grey[900],
    '&:hover': {
        backgroundColor: grey[800],
    },
}));
const StripeButton = styled(Button)(({ theme }) => ({
    color: grey[50],
    backgroundColor: "#7c9ff7",
    '&:hover': {
        backgroundColor: "#99b5ff",
    },
}));

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

const theme = createTheme();

export default function ChoosePayment() {
    const data = useLocation();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
    };
    const publishableKey = process.env.REACT_APP_STRIPE_KEY;
    const [token, setToken] = useState(null);
    const onToken = (T) => {
        setToken(T);
    }
    const amount = 80000

    return (
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
                    <Typography component="h1" variant="h3">
                        Choose a payment Method
                    </Typography>
                    <Box onSubmit={handleSubmit} noValidate sx={{ mt: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Link style={{ color: "inherit", textDecoration: "none" }} to="/paypal" >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, fontSize: "18px", width: "38rem" }}
                        >
                            <BsPaypal style={{ marginRight: "15px" }} />
                            Paypal
                        </Button>
                        </Link>
                        <Link style={{ color: "inherit", textDecoration: "none" }} to="/square" >
                            <SquareButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, fontSize: "18px", width: "38rem" }}
                            >
                                Square
                            </SquareButton>
                        </Link>
                        <StripeCheckOut
                            label='Pay Now'
                            name='AXEN HOLIDAYS'
                            billingAddress
                            shippingAddress
                            image={`https://axen-trave-test.herokuapp.com/images/main_logo.png`}
                            description={`Your total is $ ${amount.toLocaleString("en-US")}`}
                            amount={amount * 100}
                            panelLabel='Pay Now'
                            token={onToken}
                            stripeKey={publishableKey}
                        >
                            <StripeButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, fontSize: "18px", width: "38rem" }}
                            >
                                Stripe
                            </StripeButton>
                        </StripeCheckOut>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4, fontSize: "12px" }} />
            </Container>
        </ThemeProvider>
    );
}