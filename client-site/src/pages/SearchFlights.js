import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TopBarOne from '../components/TopBarOne'
import TopBarTwo from '../components/TopBarTwo'
import Footer from '../components/Footer'
import Carousel from 'react-material-ui-carousel'
import ReactPaginate from "react-paginate";
import { DateRange } from 'react-date-range';
import { format } from "date-fns";
import Search from '../components/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios'
import Loading from '../components/Loading'
import { setAlert, resetAlert } from "../redux/alertSlice";
import { useDispatch } from 'react-redux';




function SearchFlights() {
    const dispatch = useDispatch();
    const navigatedData = useLocation().state; // data received from the home page and navigated to this page
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(9);
    const [flights, setFlights] = useState(navigatedData?.flightOffers || null);
    const handlePageClick = (e) => {
        setStart(0 + (9 * e.selected));
        setEnd(9 + (9 * e.selected));
    }
    // creating date functionality
    let navigate = useNavigate();
    const [date, setDate] = useState([
        {
            startDate: navigatedData?.details ? new Date(navigatedData?.details.departureDate) : new Date(),
            endDate: navigatedData?.details ? new Date(navigatedData?.details.returnDate) : null,
            key: 'selection'
        }
    ]);
    const [showDatePicker, setShowDatePicker] = useState("false");
    const onBlur = () => {
        setShowDatePicker("false");
    }
    useEffect(()=>{
        if(date[0].endDate){
            setShowDatePicker("false");
        }
    }, [date[0].endDate])
    // creating search functionality
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


    // other data 
    const [otherInfo, setOtherInfo] = useState({});

    const otherChange = (e) => {
        setOtherInfo({ ...otherInfo, [e.target.name]: parseFloat(e.target.value) })
    }

    // states for searches
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    //  search for Flights
    const searchFlight = async (e) => {
        e.preventDefault();
        if (valueFromSearch && valueFromSearch2) {
            let finalData = {
                originLocationCode: valueFromSearch.split("-")[0],
                destinationLocationCode: valueFromSearch2.split("-")[0],
                departureDate: format(date[0].startDate, "yyyy/MM/dd").split("/").join("-"),
                returnDate: format(date[0].endDate, "yyyy/MM/dd").split("/").join("-"),
                adults: 1,
                ...otherInfo
            }
            setIsLoading(true)
            try {
                const res = await axios.post('https://axen-trave-test.herokuapp.com/api/flight/date', finalData)
                setFlights(res.data)
                setIsLoading(false)
            } catch (err) {
                setError(err);
                setIsLoading(false)
                dispatch(setAlert("serachFlight"));
                setTimeout(() => {
                    dispatch(resetAlert())
                }, 2500)
                clearTimeout();
            }
        } else {
            alert("input fields can not be empty.")
        }
    }

    // flight pricing
    const flightPricing = async (flight) => {
        let finalData = {
            originLocationCode: valueFromSearch.split("-")[0],
            destinationLocationCode: valueFromSearch2.split("-")[0],
            departureDate: format(date[0].startDate, "yyyy/MM/dd").split("/").join("-"),
            returnDate: format(date[0].endDate, "yyyy/MM/dd").split("/").join("-"),
            adults: 1,
            ...otherInfo
        }
        setIsLoading(true);
        let duration = flight.itineraries[0].duration
        let duration2 = flight.itineraries[1].duration
        try {
            const res = await axios.post("https://axen-trave-test.herokuapp.com/api/flight/flightprice", flight);
            setIsLoading(false);
            const concatData = { legitFlight: res.data, dictionaries2: flights.dictionaries, leftData: finalData, tgd: duration, trd: duration2 }
            navigate("/book-flight-page", { state: concatData });
        } catch (err) {
            setError(err)
            setIsLoading(false);
            dispatch(setAlert("flightPrice"));
            setTimeout(() => {
                dispatch(resetAlert())
            }, 2500)
            clearTimeout();
        }
    }
    return (
        <>
            <div id="main">
                <TopBarOne />
                <TopBarTwo />
                <div id="parallax2" className="parallax">
                    <div className="bg2 parallax-bg bg-fixed" style={{ backgroundPosition: "100% 60px" }}></div>
                    <div className="overlay"></div>
                    <div className="parallax-content">
                        <div className="container"></div>
                    </div>

                </div>
                <div id="content">
                    <div className="container">

                        <div className="row">
                            <div className="col-sm-3">
                                <div className="sidebar-block">
                                    <form action="">
                                        <div className="col-sm-12 no-padding">
                                            <div tabIndex="1" className="input1_wrapper">
                                                <label>Flying from:</label>
                                                <div className="input2_inner">
                                                    <input onKeyDown={clearOnBackspace} onChange={handleChange} placeholder={navigatedData?.details?.locationDeparture || "Search City or Airport"} value={valueFromSearch || value} className="input datepicker" style={{ width: "100%", outline: "none" }} />
                                                    {(value || valueFromSearch) &&
                                                        <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={clearOnCancel} />

                                                    }
                                                </div>
                                                {value &&
                                                    <Search check={valueFromSearch2} chracter={value} setValue={changeValueFun} />
                                                }
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="col-sm-12 no-padding margin-top">
                                            <div tabIndex="1" className="input1_wrapper">
                                                <label>To:</label>
                                                <div className="input2_inner">
                                                    <input onKeyDown={clearOnBackspace2} onChange={handleChange2} placeholder={navigatedData?.details?.locationArrival || "Search City or Airport"} value={valueFromSearch2 || value2} className="input datepicker" style={{ width: "100%", outline: "none" }} />
                                                    {(value2 || valueFromSearch2) &&
                                                        <CancelIcon style={{ color: "#3BA0A9", cursor: "pointer", marginRight: "2px" }} onClick={clearOnCancel2} />

                                                    }
                                                </div>
                                                {value2 &&
                                                    <Search chracter={value2} check={valueFromSearch} setValue={changeValueFun2} />
                                                }
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="col-sm-12 no-padding margin-top">
                                            <div className="input1_wrapper">
                                                <label>Departing:</label>
                                                <div className="input1_inner" style={{ cursor: "pointer" }} onClick={() => showDatePicker === "departing" ? setShowDatePicker("false") : setShowDatePicker("departing")}>
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
                                        <div className="clearfix"></div>
                                        <div className="col-sm-12 no-padding margin-top">
                                            <div className="input1_wrapper">
                                                <label>Returning:</label>
                                                <div className="input1_inner" style={{ cursor: "pointer" }} onClick={() => showDatePicker === "returning" ? setShowDatePicker("false") : setShowDatePicker("returning")}>
                                                    <input style={{ caretColor: "transparent", cursor: "pointer" }} type="text" value={date[0].endDate?format(date[0].endDate, "MM/dd/yyyy"): ""} className="input datepicker" placeholder="mm/dd/yyyy" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="col-sm-12 no-padding margin-top">
                                            <div className="input2_wrapper">
                                                <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Adults:</label>
                                                <div className="input2_inner col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                    <select onChange={otherChange} name="adults" className="select2 select select3" style={{ width: "100%", outline: "none" }}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="col-sm-12 no-padding margin-top">
                                            <div className="input1_wrapper">
                                                <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Children:</label>
                                                <div className="input2_inner col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                    <select onChange={otherChange} name="children" className="select2 select select3" style={{ width: "100%", outline: "none" }}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                        <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}></label>
                                        <div className="no-padding margin-top col-md-6 text-right" style={{ marginTop: "30px", width: "100%" }}>
                                            <button onClick={searchFlight} className="btn btn-default btn-cf-submit" style={{ width: "100%" }}>SEARCH</button>
                                        </div>
                                        <div className="clearfix"></div>
                                    </form>
                                </div>
                                <div className="clearfix"></div>
                                <div className="margin-top"></div>

                                {/* <div className="star_rating_wrapper">
                                <div className="title">Top Filters</div>
                                <div className="content">
                                    <div className="star_rating">
                                        <form>
                                            <div style={{ display: "flex", alignItems: "center" }} >
                                                <input id="checkbox-1" name="checkbox-1" type="checkbox" checked />
                                                <label for="checkbox-1" className="checkbox1-custom-label"><span>nonstop</span></label>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center" }} >
                                                <input id="checkbox-2" name="checkbox-2" type="checkbox" />
                                                <label for="checkbox-2" className="checkbox1-custom-label"><span>1 Stop</span></label>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center" }} >
                                                <input id="checkbox-3" name="checkbox-3" type="checkbox" />
                                                <label for="checkbox-3" className="checkbox1-custom-label"><span>2+ Stops</span></label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div> */}
                                <div className="clearfix"></div>
                                <div className="margin-top"></div>
                                <div className="sm_slider sm_slider1">
                                    <Link className="sm_slider_prev" to="#"></Link>
                                    <Link className="sm_slider_next" to="#"></Link>
                                    <div className="">
                                        <div className="carousel-box">
                                            <div className="inner">
                                                <Carousel indicators="false" navButtonsAlwaysInvisible="true" >
                                                    <div className="sm_slider_inner">
                                                        <div className="txt1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</div>
                                                        <div className="txt2">George Smith</div>
                                                    </div>

                                                    <div className="sm_slider_inner">
                                                        <div className="txt1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</div>
                                                        <div className="txt2">Adam Parker</div>
                                                    </div>

                                                </Carousel>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-9">
                                <form action="" className="form3 clearfix">
                                    <div className="select1_wrapper txt">
                                        <label>Sort by:</label>
                                    </div>
                                    <div className="select1_wrapper sel2" >
                                        <div className="select1_inner" style={{ display: "flex" }}>
                                            <select className="select2 select" style={{ width: "100%", outline: "none" }}>
                                                <option value="1">Name</option>
                                                <option value="2">Name2</option>
                                                <option value="2">Name3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="select1_wrapper sel2">
                                        <div className="select1_inner" style={{ display: "flex" }}>
                                            <select className="select2 select" style={{ width: "100%", outline: "none" }}>
                                                <option value="1">Price (low)</option>
                                                <option value="1">Price (high)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="select1_wrapper sel2">
                                        <div className="select1_inner" style={{ display: "flex" }}>
                                            <select className="select2 select" style={{ width: "100%", outline: "none" }}>
                                                <option value="1">Top Seller</option>

                                                <option value="2">Down</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                                {flights ?
                                    flights?.data?.slice(start, end).map(i => (
                                        <div style={{ marginBottom: "80px" }} key={i.id} className="col-sm-4">
                                            <div className="thumb4">
                                                <div className="thumbnail clearfix">
                                                    <figure>
                                                        <img src={`https://content.airhex.com/content/logos/airlines_${i.itineraries[0].segments[0].carrierCode}_260_80_r.png?md5apikey=VDjfGgv8mxiTvvLLwGicD6V2eq`} alt="" className="img-responsive" />
                                                    </figure>
                                                    <div className="caption">
                                                        <div className="txt1">{i.itineraries[0].segments[0].departure.iataCode} - {i.itineraries[1].segments[0].departure.iataCode}</div>
                                                        <div className="txt3 clearfix">
                                                            <div className="left_side">
                                                                <div className="price">£{i.price.grandTotal}</div>
                                                                <div className="nums">avg/person</div>
                                                            </div>
                                                            <div className="right_side"><div style={{ cursor: "pointer" }} onClick={() => flightPricing(i)} className="btn-default btn1">Details</div></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )) :
                                    <>
                                        <h1>Search For the Best Flight Offers</h1>
                                        <div className='d-flex justify-content-center' >
                                            <h3 style={{ textAlign: "center", lineHeight: "40px", color: "#1cBBB4" }} >Choose for the best places to take your holidays to the next level</h3>
                                        </div>
                                    </>
                                }
                            </div>
                            {
                                flights &&
                                flights.meta?.count > 9 &&
                                <div className="d-flex justify-content-center">
                                    <ReactPaginate
                                        previousLabel={"previous"}
                                        nextLabel={"next"}
                                        breakLabel={".."}
                                        pageCount={Math.ceil((flights?.meta?.count) / 9)}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={3}
                                        onPageChange={handlePageClick}
                                        containerClassName={"pagination justify-content-center page-select"}
                                        pageClassName={"page-item page-select"}
                                        pageLinkClassName={"page-link page-select"}
                                        previousClassName={"page-item page-select"}
                                        previousLinkClassName={"page-link page-select"}
                                        nextClassName={"page-item"}
                                        nextLinkClassName={"page-link page-select"}
                                        breakClassName={"page-item page-select"}
                                        breakLinkClassName={"page-link page-select"}
                                        activeClassName={"active page-select"}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            {isLoading &&
                <Loading />
            }
        </>
    )
}

export default SearchFlights