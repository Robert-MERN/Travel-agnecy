import React, { useEffect, useState, useRef } from 'react'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import TopBarOne from '../components/TopBarOne'
import TopBarTwo from '../components/TopBarTwo'
import Footer from '../components/Footer'
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components'
import Carousel from 'react-material-ui-carousel'
import HotelSlider from '../carousel/HotelSlider'
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import Search from '../components/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios'
import Loading from '../components/Loading'
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Zoom from 'react-reveal/Zoom';
import { ImAirplane } from "react-icons/im";
import { FaHotel } from "react-icons/fa";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { setAlert, resetAlert } from "../redux/alertSlice";
import { useDispatch } from 'react-redux'
import PassengersFiled from "../components/PassengersField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';






function Home() {
    const dispatch = useDispatch();
    const [header, setHeader] = useState("flight");
    const flightClick = () => {
        setHeader("flight")
    }
    const hotelClick = () => {
        setHeader("hotel")
    }
    const carClick = () => {
        setHeader("car")
    }
    useEffect(() => {
        setValue("");
        setValue2("");
        setValueFromSearch("");
        setValueFromSearch2("");
        setDate([
            {
                startDate: new Date(),
                endDate: null,
                key: 'selection'
            }
        ])
    }, [header])
    // creating date functionality
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [showDatePicker, setShowDatePicker] = useState("false");
    const onBlur = () => {
        setShowDatePicker("false");
    }

    // making search functionality

    const [extra, setExtra] = useState(false)
    const [value, setValue] = useState("")
    const [valueFromSearch, setValueFromSearch] = useState("");

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const changeValueFun = (e) => {
        setValue("");
        setValueFromSearch(e);
    }
    const clearOnBackspace = (e) => {
        if (e.code === "Backspace" && valueFromSearch) {
            setValue("");
            setValueFromSearch("")
        }
    }
    const clearOnCancel = () => {
        setValue("");
        setValueFromSearch("")
    }
    // creating second search functionality
    const [value2, setValue2] = useState("")
    const [valueFromSearch2, setValueFromSearch2] = useState("");
    const handleChange2 = (e) => {
        setValue2(e.target.value)
    }
    const changeValueFun2 = (e) => {
        setValue2("");
        setValueFromSearch2(e);
    }
    const clearOnBackspace2 = (e) => {
        if (e.code === "Backspace" && valueFromSearch2) {
            setValue2("");
            setValueFromSearch2("")
        }
    }
    const clearOnCancel2 = () => {
        setValue2("");
        setValueFromSearch2("")
    }



    // passengers
    const [passenger, setPassenger] = useState({
        adults: 1,
        children: 0,
        infants: 0,
        reserve: 0,
    });
    const [passengerInput, setPassengerInput] = useState(false);
    const showPassengerInput = () => {
        setPassengerInput(!passengerInput)
    }
    const hidePassengerInput = () => {
        setPassengerInput(false)
    }
    const passengerCount = (one, two, three, four) => {
        setPassenger({
            ...passenger,
            adults: one,
            children: two,
            infants: three,
            reserve: four,
        })
    }
    const { reserve, ...rest } = passenger;
    const totalPassengers = Object.values(rest).reduce((a, b) => a + b);

    // cabin
    const [cabin, setCabin] = useState("");
    const [cabin2, setCabin2] = useState({});
    const settingCabin = (e) => {
        setCabin(e.target.value)
        setCabin2({ [e.target.name]: e.target.value });
    }

    // states for searches
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    let navigate = useNavigate();
    //  search for Flights
    const searchFlight = async (e) => {
        e.preventDefault();
        if (valueFromSearch && valueFromSearch2) {
            let finalData = {
                originLocationCode: valueFromSearch.split("-")[0],
                destinationLocationCode: valueFromSearch2.split("-")[0],
                departureDate: format(date[0].startDate, "yyyy/MM/dd").split("/").join("-"),
                returnDate: format(date[0].endDate, "yyyy/MM/dd").split("/").join("-"),
                ...rest,
                ...cabin2
            }
            setIsLoading(true)
            try {
                const res = await axios.post('https://axen-trave-test.herokuapp.com/api/flight/date?search=true&first=0&last=9', finalData)
                setIsLoading(false)
                navigate("/search-flights", { state: { flightOffers: res.data, details: finalData } });
            } catch (err) {
                setError(err);
                setIsLoading(false)
                dispatch(setAlert("searchFlight"));
                setTimeout(() => {
                    dispatch(resetAlert())
                }, 2500)
                clearTimeout();
                console.error(err);
            }
        } else {
            alert("input fields can not be empty.")
        }
    }

    // search for Hotels
    const searchHotels = async (e) => {
        e.preventDefault();
        if (valueFromSearch && valueFromSearch2) {
            let finalData = {
                originLocationDeparture: valueFromSearch.split("-")[0],
                destinationLocationCode: valueFromSearch2.split("-")[0],
                departureDate: format(date[0].startDate, "yyyy/MM/dd").split("/").join("-"),
                returnDate: format(date[0].endDate, "yyyy/MM/dd").split("/").join("-"),
            }
            setIsLoading(true)
            try {
                const res = await axios.post('https://axen-trave-test.herokuapp.com/api/flight/date', finalData)
                setIsLoading(false)

                navigate("/search-flights", { state: res.data });
            } catch (err) {
                setError(err);
                setIsLoading(false)
            }
        } else {
            alert("input fields can not be empty.")
        }
    }
    useEffect(() => {
        if (date[0].endDate) {
            setShowDatePicker("false");
        }
    }, [date[0].endDate]);


    // onBlur components method 
    const searchOneRef = useRef();
    const searchTwoRef = useRef();
    const dateRef = useRef();
    const dateRef2 = useRef();
    const passengerRef = useRef();


    useEffect(() => {
        const handler = (event) => {
            if (!searchOneRef.current.contains(event.target)) {
                setValue("");
            }
        };
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        };
    });
    useEffect(() => {
        const handler = (event) => {
            if (!searchTwoRef.current.contains(event.target)) {
                setValue2("");
            }
        };
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        };
    });
    useEffect(() => {
        const handler = (event) => {
            if (!passengerRef.current.contains(event.target)) {
                setPassengerInput("");
            }
        };
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        };
    });


    // preventing date Popup
    const [anchorEl, setAnchorEl] = useState(null);

    const dateHandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    return (
        <>
            <div>
                <div id="main">
                    <TopBarOne />
                    <TopBarTwo />
                    <div id="slider_wrapper">
                        <div className="container">
                            <div id="slider_inner">
                                <div className="">
                                    <div id="slider">
                                        <div className="">
                                            <div className="carousel-box">
                                                <div className="inner">
                                                    <Fade>
                                                        <Carousel IndicatorIcon="" navButtonsAlwaysInvisible="true" animation='slide' autoPlay="true" timeout={500} cycleNavigation="true" >
                                                            <div className="slider">
                                                                <div className="slider_inner">
                                                                    <div className="txt1"><span>Welcome To Our</span></div>
                                                                    <div className="txt2"><span>AXEN HOLIDAYS</span></div>
                                                                    <div className="txt3"><span>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod.</span></div>
                                                                </div>
                                                            </div>

                                                            <div className="slider">
                                                                <div className="slider_inner">
                                                                    <div className="txt1"><span>7 - Day Tour</span></div>
                                                                    <div className="txt2"><span>AMAZING CARIBBEAN</span></div>
                                                                    <div className="txt3"><span>Lorem ipsum dolor eleifend option congue nihil imperdiet doming id quod.</span></div>
                                                                </div>
                                                            </div>

                                                            <div className="slider">
                                                                <div className="slider_inner">
                                                                    <div className="txt1"><span>5 Days In</span></div>
                                                                    <div className="txt2"><span>PARIS (Capital Of World)</span></div>
                                                                    <div className="txt3"><span>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod.</span></div>
                                                                </div>
                                                            </div>
                                                        </Carousel>
                                                    </Fade>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="front_tabs">
                        <div className="container">
                            <div className="tabs_wrapper tabs1_wrapper">
                                <div className="tabs tabs1">
                                    <div className="tabs_tabs tabs1_tabs">
                                        <UL status={header} >
                                            <Fade delay={50} left>
                                                <li onClick={flightClick} className="active flights">
                                                    <ImAirplane style={{ marginRight: "8px" }} />
                                                    Flights
                                                </li>
                                            </Fade>
                                            <Fade delay={100} top>
                                                <li onClick={hotelClick} className="hotels">
                                                    <FaHotel style={{ marginRight: "5px" }} />
                                                    Hotels
                                                </li>
                                            </Fade>
                                            <Fade delay={150} right>
                                                <li onClick={carClick} className="cars">
                                                    <DirectionsCarIcon style={{ marginRight: "5px" }} />
                                                    Cars
                                                </li>

                                            </Fade>
                                        </UL>
                                    </div>
                                    <Fade delay={300} right>
                                        <div className="tabs_content tabs1_content">
                                            {header === "flight" ?
                                                <div id="tabs-1">
                                                    <form action="" onSubmit={searchFlight} className="form1">
                                                        <div className="row">
                                                            <div className="col-sm-4 col-md-2">
                                                                <div ref={searchOneRef} className="select1_wrapper">
                                                                    <label style={{ fontFamily: "sans-serif" }} >Flying from:</label>
                                                                    <div className="input1_inner" style={{ display: "flex", alignItems: "center", cursor: "text" }} >
                                                                        <input onKeyDown={clearOnBackspace} onChange={handleChange} placeholder="Search City or Airport" value={valueFromSearch || value} className="input datepicker" style={{ width: "100%", outline: "none", border: "none" }} />
                                                                        {(value || valueFromSearch) &&
                                                                            <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={clearOnCancel} />
                                                                        }
                                                                    </div>
                                                                    {value &&

                                                                        <Search check={valueFromSearch2} chracter={value} setValue={changeValueFun} />

                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4 col-md-2">
                                                                <div ref={searchTwoRef} className="select1_wrapper">
                                                                    <label style={{ fontFamily: "sans-serif" }} >To:</label>
                                                                    <div className="input1_inner" style={{ display: "flex", alignItems: "center", cursor: "text" }} >
                                                                        <input onKeyDown={clearOnBackspace2} onChange={handleChange2} placeholder="Search City or Airport" value={valueFromSearch2 || value2} className="input datepicker" style={{ width: "100%", outline: "none" }} />
                                                                        {(value2 || valueFromSearch2) &&
                                                                            <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={clearOnCancel2} />
                                                                        }
                                                                    </div>
                                                                    {value2 &&

                                                                        <Search chracter={value2} check={valueFromSearch} setValue={changeValueFun2} />

                                                                    }
                                                                </div>
                                                            </div>
                                                            <div ref={dateRef} className="col-sm-4 col-md-2">
                                                                <div className="input1_wrapper">
                                                                    <label style={{ fontFamily: "sans-serif" }} >Departing:</label>
                                                                    <div className="input1_inner" style={{ cursor: "pointer" }} onClick={() => showDatePicker === "depart" ? setShowDatePicker("false") : setShowDatePicker("depart")}>
                                                                        <input style={{ caretColor: "transparent", cursor: "pointer" }} type="text" value={`${format(date[0].startDate, "MM/dd/yyyy")}`} className="input datepicker" placeholder="mm/dd/yyyy" />
                                                                    </div>
                                                                    {showDatePicker !== "false" &&
                                                                        <DateRange
                                                                            editableDateInputs={true}
                                                                            onChange={item => setDate([item.selection])}
                                                                            moveRangeOnFirstSelection={false}
                                                                            ranges={date}
                                                                            className={showDatePicker}
                                                                        />
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div ref={dateRef2} className="col-sm-4 col-md-2">
                                                                <div className="input1_wrapper">
                                                                    <label style={{ fontFamily: "sans-serif" }} >Returning:</label>
                                                                    <div className="input1_inner" style={{ cursor: "pointer" }} onClick={() => showDatePicker === "return" ? setShowDatePicker("false") : setShowDatePicker("return")}>
                                                                        <input style={{ caretColor: "transparent", cursor: "pointer" }} type="text" value={date[0].endDate ? format(date[0].endDate, "MM/dd/yyyy") : ""} className="input datepicker" placeholder="mm/dd/yyyy" />
                                                                    </div>
                                                                </div>
                                                                {/* <Popover
                                                                    id={id}
                                                                    open={open}
                                                                    anchorEl={anchorEl}
                                                                    onClose={handleClose}
                                                                    anchorOrigin={{
                                                                        vertical: 'top',
                                                                        horizontal: 'left',
                                                                    }}
                                                                >
                                                                    <Typography sx={{ fontSize: "12px", p: 2 }}>To Select Return Date Click on Departure again</Typography>
                                                                </Popover> */}
                                                            </div>
                                                            <div ref={passengerRef} className="col-sm-4 col-md-1">
                                                                <div className="select1_wrapper">
                                                                    <label style={{ fontFamily: "sans-serif" }} >Passengers:</label>
                                                                    <div onClick={showPassengerInput} className="input1_inner" style={{ display: "flex", alignItems: "center", cursor: "text" }} >
                                                                        <input style={{ caretColor: "transparent", cursor: "pointer" }} disabled value={totalPassengers} className="input datepicker" />
                                                                    </div>
                                                                    {passengerInput &&
                                                                        <PassengersFiled total={passenger} count={passengerCount} hide={hidePassengerInput} />
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-4 col-md-1">
                                                                <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
                                                                    <InputLabel style={{ fontSize: "15px", fontFamily: "sans-serif" }} id="demo-simple-select-standard-label">Cabin</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-standard-label"
                                                                        id="demo-simple-select-standard"
                                                                        value={cabin}
                                                                        onChange={settingCabin}
                                                                        label="Cabin"
                                                                        name='travelClass'
                                                                        style={{ fontSize: "13px" }}
                                                                    >
                                                                        <MenuItem style={{ fontSize: "14px" }} value={"economy"}>Economy</MenuItem>
                                                                        <MenuItem style={{ fontSize: "14px" }} value={"business"}>Business Class</MenuItem>
                                                                        <MenuItem style={{ fontSize: "14px" }} value={"first"}>First Class</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </div>


                                                            <div className="col-sm-4 col-md-2">
                                                                <div className="button1_wrapper" style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }} >
                                                                    <button style={{ marginTop: "20px" }} type="submit" className="btn-default btn4">Search</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div> : header === "hotel" ?

                                                    <div id="tabs-2">
                                                        <form action="" className="form1">
                                                            <div className="row">
                                                                <div className="col-sm-4 col-md-4">
                                                                    <div className="select1_wrapper">
                                                                        <label>City or Hotel Name:</label>
                                                                        <div className="input1_inner" style={{ display: "flex", alignItems: "center", cursor: "text" }} >
                                                                            <input onKeyDown={clearOnBackspace} onChange={handleChange} placeholder="Search City or Airport" value={valueFromSearch || value} className="input datepicker" style={{ width: "100%", outline: "none" }} />
                                                                            {(value || valueFromSearch) &&
                                                                                <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={clearOnCancel} />

                                                                            }
                                                                        </div>
                                                                        {value &&
                                                                            <Search check={valueFromSearch2} chracter={value} setValue={changeValueFun} />
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-md-2">
                                                                    <div className="input1_wrapper">
                                                                        <label>Check-In:</label>
                                                                        <div className="input1_inner" style={{ cursor: "pointer" }} onClick={() => showDatePicker === "depart" ? setShowDatePicker("false") : setShowDatePicker("depart")}>
                                                                            <input style={{ caretColor: "transparent", cursor: "pointer" }} type="text" value={`${format(date[0].startDate, "MM/dd/yyyy")}`} className="input datepicker" placeholder="mm/dd/yyyy" />
                                                                        </div>
                                                                        {showDatePicker !== "false" &&
                                                                            <DateRange
                                                                                editableDateInputs={true}
                                                                                onChange={item => setDate([item.selection])}
                                                                                moveRangeOnFirstSelection={false}
                                                                                ranges={date}
                                                                                className={showDatePicker}

                                                                            />
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-md-2">
                                                                    <div className="input1_wrapper">
                                                                        <label>Check-Out:</label>
                                                                        <div className="input1_inner" style={{ cursor: "pointer" }} onClick={() => showDatePicker === "return" ? setShowDatePicker("false") : setShowDatePicker("return")}>
                                                                            <input style={{ caretColor: "transparent", cursor: "pointer" }} type="text" value={date[0].endDate ? format(date[0].endDate, "MM/dd/yyyy") : ""} className="input datepicker" placeholder="mm/dd/yyyy" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-md-2">
                                                                    <div className="select1_wrapper">
                                                                        <label>Adult:</label>
                                                                        <div className="input1_inner" style={{ display: "flex", alignItems: "center" }} >
                                                                            <select className="select2 select" style={{ width: "100%", outline: "none" }}>
                                                                                <option value="1">Room  for  1  adult</option>
                                                                                <option value="2">Room  for  2  adult</option>
                                                                                <option value="3">Room  for  3  adult</option>
                                                                                <option value="4">Room  for  4  adult</option>
                                                                                <option value="5">Room  for  5  adult</option>
                                                                                <option value="6">Room  for  6  adult</option>
                                                                                <option value="7">Room  for  7  adult</option>
                                                                                <option value="8">Room  for  8  adult</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-md-2">
                                                                    <div className="button1_wrapper" style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }} >
                                                                        <button style={{ marginTop: "20px" }} type="submit" className="btn-default btn4">Search</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div> :
                                                    <div id="tabs-3">
                                                        <form action="" className="form1">
                                                            <div className="row">
                                                                <div className="col-sm-4 col-md-2">
                                                                    <div className="select1_wrapper">
                                                                        <label>Country:</label>
                                                                        <div className="input1_inner" style={{ display: "flex", alignItems: "center" }} >
                                                                            <select className="select2 select" style={{ width: "100%", outline: "none" }}>
                                                                                <option value="1">Please Select</option>
                                                                                <option value="2">Alaska</option>
                                                                                <option value="3">Bahamas</option>
                                                                                <option value="4">Bermuda</option>
                                                                                <option value="5">Canada</option>
                                                                                <option value="6">Caribbean</option>
                                                                                <option value="7">Europe</option>
                                                                                <option value="8">Hawaii</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-md-2">
                                                                    <div className="select1_wrapper">
                                                                        <label>City:</label>
                                                                        <div className="input1_inner" style={{ display: "flex", alignItems: "center" }} >
                                                                            <select className="select2 select" style={{ width: "100%", outline: "none" }}>
                                                                                <option value="1">Please Select</option>
                                                                                <option value="2">Alaska</option>
                                                                                <option value="3">Bahamas</option>
                                                                                <option value="4">Bermuda</option>
                                                                                <option value="5">Canada</option>
                                                                                <option value="6">Caribbean</option>
                                                                                <option value="7">Europe</option>
                                                                                <option value="8">Hawaii</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-md-2">
                                                                    <div className="select1_wrapper">
                                                                        <label>Location:</label>
                                                                        <div className="input1_inner" style={{ display: "flex", alignItems: "center" }} >
                                                                            <select className="select2 select" style={{ width: "100%", outline: "none" }}>
                                                                                <option value="1">Please Select</option>
                                                                                <option value="2">Alaska</option>
                                                                                <option value="3">Bahamas</option>
                                                                                <option value="4">Bermuda</option>
                                                                                <option value="5">Canada</option>
                                                                                <option value="6">Caribbean</option>
                                                                                <option value="7">Europe</option>
                                                                                <option value="8">Hawaii</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-md-2">
                                                                    <div className="input1_wrapper">
                                                                        <label>Pick up Date:</label>
                                                                        <div className="input1_inner" style={{ cursor: "pointer" }} onClick={() => showDatePicker === "depart" ? setShowDatePicker("false") : setShowDatePicker("depart")}>
                                                                            <input style={{ caretColor: "transparent", cursor: "pointer" }} type="text" value={`${format(date[0].startDate, "MM/dd/yyyy")}`} className="input datepicker" placeholder="mm/dd/yyyy" />
                                                                        </div>
                                                                        {showDatePicker !== "false" &&
                                                                            <DateRange
                                                                                editableDateInputs={true}
                                                                                onChange={item => setDate([item.selection])}
                                                                                moveRangeOnFirstSelection={false}
                                                                                ranges={date}
                                                                                className={showDatePicker}
                                                                                onBlur={onBlur}
                                                                            />
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-md-2">
                                                                    <div className="input1_wrapper">
                                                                        <label>Drop off Date:</label>
                                                                        <div className="input1_inner" style={{ cursor: "pointer" }} onClick={() => showDatePicker === "return" ? setShowDatePicker("false") : setShowDatePicker("return")}>
                                                                            <input style={{ caretColor: "transparent", cursor: "pointer" }} type="text" value={date[0].endDate ? format(date[0].endDate, "MM/dd/yyyy") : ""} className="input datepicker" placeholder="mm/dd/yyyy" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-md-2">
                                                                    <div className="button1_wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }} >
                                                                        <button style={{ marginTop: "20px" }} type="submit" className="btn-default btn4">Search</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                            }
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="why1">
                        <div className="container">
                            <Fade delay={100} top>
                                <h2>WHY WE ARE THE BEST</h2>
                            </Fade>
                            <Fade left>
                                <div className="title1 ">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod <br />tincidunt ut laoreet dolore magna aliquam erat volutpat.</div>
                            </Fade>
                            <br />
                            <div className="row">
                                <Fade delay={150} left>
                                    <div className="col-sm-3">
                                        <div className="thumb2" >
                                            <div className="thumbnail clearfix">
                                                <Link to="/search-flights">
                                                    <figure className="">
                                                        <img src="https://axen-trave-test.herokuapp.com/images/why1.png" alt="" className="img1 img-responsive" />
                                                        <img src="https://axen-trave-test.herokuapp.com/images/why1_hover.png" alt="" className="img2 img-responsive" />
                                                    </figure>
                                                    <div className="caption">
                                                        <div className="txt1">Amazing Travel</div>
                                                        <div className="txt2">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim.</div>
                                                        <div className="txt3">Read More</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                                <Fade bottom >
                                    <div className="col-sm-3">
                                        <div className="thumb2" >
                                            <div className="thumbnail clearfix">
                                                <Link to="/search-flights">
                                                    <figure className="">
                                                        <img src="https://axen-trave-test.herokuapp.com/images/why2.png" alt="" className="img1 img-responsive" />
                                                        <img src="https://axen-trave-test.herokuapp.com/images/why2_hover.png" alt="" className="img2 img-responsive" />
                                                    </figure>
                                                    <div className="caption">
                                                        <div className="txt1">Discover</div>
                                                        <div className="txt2">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim.</div>
                                                        <div className="txt3">Read More</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                                <Fade top>
                                    <div className="col-sm-3">
                                        <div className="thumb2 ">
                                            <div className="thumbnail clearfix">
                                                <Link to="search-flights">
                                                    <figure className="">
                                                        <img src="https://axen-trave-test.herokuapp.com/images/why3.png" alt="" className="img1 img-responsive" />
                                                        <img src="https://axen-trave-test.herokuapp.com/images/why3_hover.png" alt="" className="img2 img-responsive" />
                                                    </figure>
                                                    <div className="caption">
                                                        <div className="txt1">Book Your Trip</div>
                                                        <div className="txt2">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim.</div>
                                                        <div className="txt3">Read More</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                                <Fade delay={150} right >
                                    <div className="col-sm-3">
                                        <div className="thumb2" >
                                            <div className="thumbnail clearfix">
                                                <Link to="/search-flights">
                                                    <figure className="">
                                                        <img src="https://axen-trave-test.herokuapp.com/images/why4.png" alt="" className="img1 img-responsive" />
                                                        <img src="https://axen-trave-test.herokuapp.com/images/why4_hover.png" alt="" className="img2 img-responsive" />
                                                    </figure>
                                                    <div className="caption">
                                                        <div className="txt1">Nice Support</div>
                                                        <div className="txt2">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim.</div>
                                                        <div className="txt3">Read More</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            </div>
                        </div>
                    </div>

                    <div id="parallax1" className="parallax">
                        <div className="bg1 parallax-bg"></div>
                        <div className="overlay"></div>
                        <div className="parallax-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-10 ">
                                        <Fade duration={500} top>
                                            <div className="txt1">Caucasus Vacation Packages</div>

                                        </Fade>
                                        <Fade delay={300} left>
                                            <div className="txt2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper.</div>

                                        </Fade>
                                        <Fade delay={200} duration={2000} bottom >
                                            <div className="txt3">From: Khazbegi (Goergia) <strong>£159.00</strong><span>person</span></div>
                                        </Fade>
                                    </div>
                                    <Fade right>
                                        <div className="col-sm-2">
                                            <Link to="/search-flights" className="btn-default btn0">Details</Link>
                                        </div>
                                    </Fade>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div id="popular_cruises1">
                        <div className="container">
                            <Fade delay={400} right >
                                <h2>POPULAR LOCATIONS</h2>

                            </Fade>
                            <Fade left >
                                <div className="title1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod <br />tincidunt ut laoreet dolore magna aliquam erat volutpat.</div>
                            </Fade>
                            <br /><br />
                            <Zoom>
                                <div id="popular_wrapper" className="">
                                    <div id="popular_inner">
                                        <div className="">
                                            <div id="popular">
                                                <div className="">
                                                    <div className="carousel-box">
                                                        <div className="inner">
                                                            {/* <Carousel navButtonsAlwaysVisible="true" animation='slide' autoPlay="false" > */}
                                                            <div className="check" style={{ display: "flex" }} >
                                                                <HotelSlider />
                                                                <HotelSlider />
                                                                <HotelSlider />
                                                                <HotelSlider />
                                                                <HotelSlider />
                                                                <HotelSlider />
                                                                <HotelSlider />
                                                                <HotelSlider />
                                                            </div>

                                                            {/* </Carousel> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </div>
                    </div>
                    <div id="happy1">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 col-md-6 col-md-push-6">
                                    <div className="content">
                                        <Fade delay={400} top>
                                            <div className="txt1">HAPPY CUSTOMERS</div>
                                        </Fade>
                                        <Fade delay={300} right>
                                            <div className="txt2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, set amet. </div>

                                        </Fade>
                                        <Fade right cascade>
                                            <div className="txt3" >
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh oui- sod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit dolore magna aliquam erat voutpat.
                                                    Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit..
                                                </p>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euisod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit.
                                                </p>
                                            </div>
                                        </Fade>
                                        <Fade delay={50} bottom >

                                            <div className="distance1">
                                                <div className="txt">Flights</div>
                                                <div className="bg">
                                                    <div className="animated-distance"><span></span></div>
                                                </div>
                                            </div>
                                        </Fade>
                                        <Fade delay={300} bottom>

                                            <div className="distance1 ">
                                                <div className="txt">Hotels</div>
                                                <div className="bg">
                                                    <div className="animated-distance"><span></span></div>
                                                </div>
                                            </div>
                                        </Fade>
                                        <Fade duration={2000} delay={500} bottom >
                                            <div className="distance1">
                                                <div className="txt">Cars</div>
                                                <div className="bg">
                                                    <div className="animated-distance"><span></span></div>
                                                </div>
                                            </div>
                                        </Fade>
                                    </div>
                                </div>
                                <Fade left big duration={2500} >
                                    <div className="col-sm-12 col-md-6 col-md-pull-6">
                                        <img src="https://axen-trave-test.herokuapp.com/images/people.png" alt="" className="img1 img-responsive" />
                                    </div>
                                </Fade>
                            </div>
                        </div>
                    </div>
                    <div id="partners">
                        <div className="container">
                            <div className="row">
                                <Flip>
                                    <div className="col-sm-4 col-md-2 col-xs-6">
                                        <div className="thumb1">
                                            <div className="thumbnail clearfix">
                                                <Link to="#">
                                                    <figure>
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner1.jpg" alt="" className="img1 img-responsive" />
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner1_hover.jpg" alt="" className="img2 img-responsive" />
                                                    </figure>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Flip>
                                <Flip delay={50} >
                                    <div className="col-sm-4 col-md-2 col-xs-6">
                                        <div className="thumb1">
                                            <div className="thumbnail clearfix">
                                                <Link to="#">
                                                    <figure>
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner2.jpg" alt="" className="img1 img-responsive" />
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner2_hover.jpg" alt="" className="img2 img-responsive" />
                                                    </figure>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Flip>
                                <Flip delay={150} >
                                    <div className="col-sm-4 col-md-2 col-xs-6">
                                        <div className="thumb1">
                                            <div className="thumbnail clearfix">
                                                <Link to="#">
                                                    <figure>
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner3.jpg" alt="" className="img1 img-responsive" />
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner3_hover.jpg" alt="" className="img2 img-responsive" />
                                                    </figure>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Flip>
                                <Flip delay={250} >
                                    <div className="col-sm-4 col-md-2 col-xs-6">
                                        <div className="thumb1">
                                            <div className="thumbnail clearfix">
                                                <Link to="#">
                                                    <figure>
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner4.jpg" alt="" className="img1 img-responsive" />
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner4_hover.jpg" alt="" className="img2 img-responsive" />
                                                    </figure>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Flip>
                                <Flip delay={350} >
                                    <div className="col-sm-4 col-md-2 col-xs-6">
                                        <div className="thumb1">
                                            <div className="thumbnail clearfix">
                                                <Link to="#">
                                                    <figure>
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner5.jpg" alt="" className="img1 img-responsive" />
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner5_hover.jpg" alt="" className="img2 img-responsive" />
                                                    </figure>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Flip>
                                <Flip delay={450} >
                                    <div className="col-sm-4 col-md-2 col-xs-6">
                                        <div className="thumb1">
                                            <div className="thumbnail clearfix">
                                                <Link to="#">
                                                    <figure>
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner6.jpg" alt="" className="img1 img-responsive" />
                                                        <img src="https://axen-trave-test.herokuapp.com/images/partner6_hover.jpg" alt="" className="img2 img-responsive" />
                                                    </figure>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Flip>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            {
                isLoading &&
                <Loading />
            }
        </>
    )
}

const UL = styled.ul`
    display: flex;
    margin: 0;
    padding: 0;
    li{
        padding: 12px 25px;
        cursor: pointer;
        display: flex;
        align-items: center;
       
    }
    .flights{
        color: ${(props) => props.status === "flight" ? "#00a99d" : "#fff"};
        background-color: ${(props) => props.status === "flight" ? "#fff" : "#00a99d"};
    }
    .cars{
        color: ${(props) => props.status === "car" ? "#00a99d" : "#fff"};
        background-color: ${(props) => props.status === "car" ? "#fff" : "#00a99d"};
        
    }
    .hotels{
        color: ${(props) => props.status === "hotel" ? "#00a99d" : "#fff"};
        background-color: ${(props) => props.status === "hotel" ? "#fff" : "#00a99d"};
    }
    .link{
        text-decoration: none;
        color: #00a99d;
    }
`

export default Home