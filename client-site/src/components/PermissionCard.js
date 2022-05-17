import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Backdrop from '@mui/material/Backdrop';
import { useDispatch } from "react-redux";
import { setAlert, resetAlert } from "../redux/alertSlice";
import { userLogout } from "../redux/userSlice";

export default function PermissionCard({ cancel, open }) {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(userLogout());
        dispatch(setAlert("logout"));
        setTimeout(() => {
            dispatch(resetAlert())
        }, 2500)
        clearTimeout();
    }
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={cancel}
        >
            <Card sx={{ width: "350px" }}>
                <CardContent>
                    <Typography
                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "20px" }}
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        Logout
                        <IconButton sx={{ fontSize: "20px" }}  onClick={cancel} variant="filled">x</IconButton>
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }} variant="body2" color="text.secondary">
                        Do you Want to Logout this Account
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Button sx={{ fontSize: "14px" }} onClick={logout} size="large">Yes</Button>
                    <Button sx={{ fontSize: "14px" }} onClick={cancel} variant="filled" size="large">No</Button>
                </CardActions>
            </Card>
        </Backdrop>
    );
}
