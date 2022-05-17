import React from 'react'
import Alert from "@material-ui/lab/Alert";
import styled from "styled-components";
import { mobile } from "../Responsive";
import Slide from "react-reveal/Slide";
import { selectAlert } from "../redux/alertSlice";
import { useSelector } from "react-redux";


function SimpleAlert() {
    const whatToShow = useSelector(selectAlert);
    return (
        <AlertWrapper>
            <Slide bottom big>
                <AlertChild>
                    {whatToShow === "loginErr"?
                        <Alert style={{ fontSize: "16px" }} variant="filled" severity="error">
                            Wrong Credentials! try to login again.
                        </Alert>: whatToShow === "searchFlight"?
                        <Alert style={{ fontSize: "15px" }} variant="filled" severity="error">
                            Input fields were empty or network issue! try again.
                        </Alert>: whatToShow === "flightPrice"?
                        <Alert style={{ fontSize: "15px" }} variant="filled" severity="error">
                            The flight has not been priced might be network issue or internal problem.
                        </Alert>: whatToShow === "signupErr"?
                        <Alert style={{ fontSize: "16px" }} variant="filled" severity="error">
                            Your Account is not created! try again.
                        </Alert>: whatToShow === "loginSuc"?
                        <Alert style={{ fontSize: "16px" }} variant="filled" severity="success">
                            You have successfuly logged in!
                        </Alert>: whatToShow === "signupSuc"?
                        <Alert style={{ fontSize: "16px" }} variant="filled" severity="success">
                            Your account has successfuly been created!
                        </Alert>: whatToShow === "BookFlight"?
                        <Alert style={{ fontSize: "16px" }} variant="filled" severity="success">
                            You have Booked a flight!
                        </Alert>:whatToShow === "logout"?
                        <Alert style={{ fontSize: "16px" }} variant="filled" severity="error">
                            You have Logged out!
                        </Alert>:
                        <div>
                        </div>
                    }
                </AlertChild>
            </Slide>
        </AlertWrapper>
    )
}

const AlertWrapper = styled.div`
    margin: auto;
    width: 100vw;
    position: fixed;
    z-index: 50000000;
    display: flex;
    justify-content: center;
    bottom: 90px;
    ${mobile({ bottom: "40px" })}
`
const AlertChild = styled.div`
    width: 40rem;
    ${mobile({ width: "33rem" })}
`

export default SimpleAlert