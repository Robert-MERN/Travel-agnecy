import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import { mobile } from "../Responsive"
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button } from '@mui/material';
import Zoom from "react-reveal/Zoom";


function PassengersField({count, hide, total}) {
    // passengers logic
    const [numberOfPassengers, setNumberOfPassengers] = useState(total.reserve);
    const [adult, setAdult] = useState(total.adults);
    const [child, setChild] = useState(total.children);
    const [infant, setInfant] = useState(total.infants);
    useEffect(()=>{
        count(adult, child, infant, numberOfPassengers);
    },[adult, child, infant])
    const addPassenger = (type) => {
        if (numberOfPassengers < 8) {
            if(type==="adult"){
                setAdult(adult+1)
                setNumberOfPassengers(numberOfPassengers + 1);
            } else if(type==="child"){
                setChild(child + 1)
                setNumberOfPassengers(numberOfPassengers + 1);
            }else if(type==="infant" && infant < 1){
                setInfant(infant+1)
                setNumberOfPassengers(numberOfPassengers + 1);
            }
        }
    }
    const minusPassenger = (type) => {
        if (numberOfPassengers > 0) {
            if(type==="adult" && adult > 1){
                setAdult(adult-1)
                setNumberOfPassengers(numberOfPassengers - 1);
            } else if(type==="child" && child > 0){
                setChild(child - 1)
                setNumberOfPassengers(numberOfPassengers - 1);
            }else if(type==="infant" && infant > 0){
                setInfant(infant-1)
                setNumberOfPassengers(numberOfPassengers - 1);
            }
        }
    }
    return (
        <>
        <PassengersFieldWrapper>
            <Box sx={{ width: "100%" }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} disablePadding>
                            <Typography sx={{ fontSize: "15px" }} variant="body2" color="text.secondary">Adults</Typography>
                            <Box  sx={{ display: "flex", alignItems: "center" }} >
                                <IconButton onClick={()=> minusPassenger("adult")} sx={{ fontSize: "29px", color: "teal" }}>-</IconButton>
                                <Typography sx={{ padding: "0 6px", fontSize: "13px" }} variant="body2" color="text.secondary">{adult}</Typography>
                                <IconButton onClick={()=> addPassenger("adult")} sx={{ fontSize: "26px", color: "teal" }}>+</IconButton>
                            </Box>
                        </ListItem>
                        <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} disablePadding>
                            <Typography sx={{ fontSize: "15px"}} variant="body2" color="text.secondary">Childrens <p style={{ fontSize: "11px", color: "rgba(99, 152, 152, 0.8)" }} >2-11</p> </Typography>
                            <Box  sx={{ display: "flex", alignItems: "center" }} >
                                <IconButton onClick={()=> minusPassenger("child")} sx={{ fontSize: "29px", color: "teal" }}>-</IconButton>
                                <Typography sx={{ padding: "0 6px", fontSize: "13px" }} variant="body2" color="text.secondary">{child}</Typography>
                                <IconButton onClick={()=> addPassenger("child")} sx={{ fontSize: "26px", color: "teal" }}>+</IconButton>
                            </Box>
                        </ListItem>
                        <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} disablePadding>
                            <Typography sx={{ fontSize: "15px" }} variant="body2" color="text.secondary">Infants<p style={{ fontSize: "11px", color: "rgba(99, 152, 152, 0.8)" }} >{"< 2yrs"}</p></Typography>
                            <Box  sx={{ display: "flex", alignItems: "center" }} >
                                <IconButton onClick={()=> minusPassenger("infant")} sx={{ fontSize: "29px", color: "teal" }}>-</IconButton>
                                <Typography sx={{ padding: "0 6px", fontSize: "13px" }} variant="body2" color="text.secondary">{infant}</Typography>
                                <IconButton onClick={()=> addPassenger("infant")} sx={{ fontSize: "26px", color: "teal" }}>+</IconButton>
                            </Box>
                        </ListItem>
                        <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }} disablePadding>
                            <Button onClick={hide} sx={{ fontSize: "11px" }}  variant="contained" color="inherit" >Done</Button>
                        </ListItem>
                    </List>
                </nav>
            </Box>
        </PassengersFieldWrapper>
        </>
    )
}
const PassengersFieldWrapper = styled.div`
    position: absolute;
    width: 220px;
    max-width: 28rem;
    background-color: #fff;
    font-family: sans-serif;
    border-radius: 10px;
    padding: 0 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    z-index: 300000;
    ${mobile({ width: "100%", zIndex: "300000" })}

`

export default PassengersField