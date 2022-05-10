import React, { useState } from 'react'
import TopBarOne from '../components/TopBarOne'
import TopBarTwo from '../components/TopBarTwo'
import Footer from '../components/Footer'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import Data from "../importantData/cityAndAirportInfo.json";
import Loading from "../components/Loading";


function BookingFlights() {
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(false);
    let information = [];
    const data = Data.map((a) => {
        return Object.entries(a)
    });
    data.map((i) => {
        return i.map(i => information.push(i[1]))
    });
    let allData = useLocation().state
    let flight = allData?.legitFlight?.data;
    let leftData = allData?.leftData
    // ----------------------------------------------------------------section1
    let section1 = flight?.flightOffers[0].itineraries[0];
    let segments1 = section1?.segments
    let newTime1 = segments1? [...segments1]: undefined
    let timeDepart1 = newTime1?.shift()?.departure?.at
    let timeArrive1 = newTime1?.pop()?.arrival?.at
    
    // let time2 = section1?.segments?.shift()?.departure?.at
    // departing
    let departure = section1?.segments[0]?.departure
    let departureCity = information.find(i => i.iata === departure?.iataCode)?.city
    let departureAirCraft = allData?.dictionaries2?.aircraft[section1?.segments[0]?.aircraft?.code]
    let departCarrier = allData?.dictionaries2?.carriers[section1?.segments[0]?.carrierCode]
    // final destination
    let arrival = section1?.segments[1]?.arrival
    let arrivalCity = information.find(i => i.iata === arrival?.iataCode)?.city
    let arrivalCarrier = allData?.dictionaries2?.carriers[section1?.segments[1]?.carrierCode]
    // stop
    let stop = section1?.segments[0]?.arrival
    let stopCity = information.find(i => i.iata === stop?.iataCode)?.city
    let stopAirCraft = allData?.dictionaries2?.aircraft[section1?.segments[1]?.aircraft?.code]
    // segment duration
    let stopSegmentDuration = section1?.segments[1]?.duration;
    let segmentDuration = section1?.segments[0]?.duration;

    // ----------------------------------------------------------------section2
    let section2 = flight?.flightOffers[0]?.itineraries[1];
    let segments2 = section1?.segments
    let newTime2 = segments2?[...segments2]: undefined
    let timeDepart2 = newTime2?.shift()?.departure?.at
    let timeArrive2 = newTime2?.pop()?.arrival?.at

    // let time11 = section2?.segments?.pop()?.arrival?.at
    // let time22 = section2?.segments?.shift()?.departure?.at
    // departing
    let departure2 = section2?.segments[0]?.departure
    let departureCity2 = information.find(i => i.iata === departure2?.iataCode)?.city
    let departureAirCraft2 = allData?.dictionaries2?.aircraft[section2?.segments[0]?.aircraft?.code]
    let departCarrier2 = allData?.dictionaries2?.carriers[section2?.segments[0]?.carrierCode]
    // final destination
    let arrival2 = section2?.segments[1]?.arrival
    let arrivalCity2 = information.find(i => i.iata === arrival2?.iataCode)?.city
    let arrivalCarrier2 = allData?.dictionaries2?.carriers[section2?.segments[1]?.carrierCode]
    // stop
    let stop2 = section2?.segments[0]?.arrival
    let stopCity2 = information.find(i => i.iata === stop2?.iataCode)?.city
    let stopAirCraft2 = allData?.dictionaries2?.aircraft[section2?.segments[1]?.aircraft?.code]
    // segment duration
    let stopSegmentDuration2 = section2?.segments[1]?.duration;
    let segmentDuration2 = section2?.segments[0]?.duration;

    // -------------------------------------------rest Data
    // all prices
    let prices = flight?.flightOffers[0].price;
    // craftClass
    let craftClass = flight?.flightOffers[0]?.travelerPricings[0]?.fareDetailsBySegment[0]?.class;
    // cabin
    let cabin = flight?.flightOffers[0]?.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin;
    // bags
    let bags = flight?.flightOffers[0]?.travelerPricings[0]?.fareDetailsBySegment[0]?.includedCheckedBags?.quantity
    // date headings
    let headDepartDate = allData?.leftData?.departureDate;
    let headReturnDate = allData?.leftData?.returnDate;
    // total duration for going
    let duration = allData?.tgd
    // total duration for returning
    let duration2 = allData?.trd
    const book = () => {
        setIsLoading(true);
        try{
            setIsLoading(false);
            const data = {
                order: flight?.flightOffers,
                "departingDate": headDepartDate,
                "returningDate": headReturnDate,
                "cabin": cabin,
                "city": departureCity,
                "city2": departureCity2,
            }
            navigate("/flight-checkout", { state: data });
        } catch(err){
            setIsLoading(false);
        }
    }
    return (
        <>
        <div id="main">
            <TopBarOne />
            <TopBarTwo />
            <div id="parallax2" className="parallax">
                <div className="bg2 parallax-bg bg-fixed" style={{ backgroundPosition: "50% 81px" }}></div>
                <div className="overlay"></div>
                <div className="parallax-content">
                    <div className="container"></div>
                </div>
            </div>
            <div className="breadcrumbs1_wrapper">
                <div className="container">
                    <div className="breadcrumbs1"></div>
                </div>
            </div>
            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="sidebar-block">
                                <form action="">
                                    <h3>{departureCity} To {departureCity2}</h3>
                                    <span className="similar">Round-trip</span>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label>Flying from:</label>
                                            <div className="input2_inner">
                                                <input disabled type="text" className="input" defaultValue={departureCity} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label>To:</label>
                                            <div className="input2_inner">
                                                <input disabled type="text" className="input" placeholder={departureCity2} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label>Departing:</label>
                                            <div className="input1_inner">
                                                <input disabled type="text" className="input datepicker" placeholder={leftData?.departureDate} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label>Returning:</label>
                                            <div className="input1_inner">
                                                <input disabled type="text" className="input datepicker" placeholder={leftData?.returnDate} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Adults:</label>
                                            <div className="input2_inner col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input style={{ cursor: "text" }} disabled type="text" className="form-control" placeholder={leftData?.adults || "1"} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Children:</label>
                                            <div className="input2_inner col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input disabled type="text" className="input" placeholder={leftData?.children || "0"} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Cabin:</label>
                                            <div className="input2_inner col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input style={{ cursor: "text" }} disabled type="text" className="form-control" defaultValue={cabin || ""} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px", fontWeight: "500", color: "#464646", fontSize: "13px" }}>Total Booking:</label>
                                            <div className="col-md-6 price-total-left" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <span className="red">£{prices?.grandTotal}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="no-padding margin-top text-center" style={{ marginTop: "30px" }}>
                                        <div onClick={book} className="btn btn-default btn-cf-submit3" style={{ width: "100%" }}>BOOKING NOW</div>
                                    </div>
                                    <div className="clearfix"></div>
                                </form>
                            </div>
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
                            <div className="blog_content">
                                {allData &&
                                    <div className="post post-full">
                                        <h3 className="hch">{departureCity} To {departureCity2} (Round-trip)</h3>
                                        <div className="clearfix"></div>
                                        <p className="address">{departureCity} ({departure?.iataCode}) / {departureCity2} ({departure2?.iataCode})</p>
                                        <div className="post-story">
                                            <hr />
                                            <div className="post-story-body clearfix">
                                                <h3>{headDepartDate}</h3>
                                                <ul>
                                                    <li>From: {departureCity} ({departure?.iataCode})</li>
                                                    <li>To: {departureCity2} ({departure2?.iataCode})</li>
                                                </ul>
                                                <h5>{timeDepart1} ({departure?.iataCode}) {"->"} {arrival ? `${timeArrive1} (${arrival?.iataCode})` : `${timeArrive1} (${departure2?.iataCode})`}</h5>
                                                <h5>Duration: {duration}</h5>
                                                <hr />
                                                <h4>Details:</h4>
                                                <h5>{departure?.at} {"->"} {stop ? `${stop.at}` : `${arrival?.at}`} / {segmentDuration}</h5>
                                                <ul>
                                                    <li>From: {departureCity} ({departure?.iataCode})</li>
                                                    <li>To: {stop ? `${stopCity} (${stop?.iataCode})` : `${departureCity2} (${departure2?.iataCode})`}</li>
                                                    <li>Aircraft: {departureAirCraft} | Snack</li>
                                                    <li>{cabin} / {departCarrier} ({craftClass})</li>
                                                    {section1?.segments.length >= 2 &&
                                                        <li><b>1h 20m stop / in {stopCity} ({stop?.iataCode})</b></li>
                                                    }
                                                </ul>
                                                {section1?.segments.length >= 2 &&
                                                    <>
                                                        <h5>{stop?.at} {"->"} {arrival?.at} / {stopSegmentDuration}</h5>
                                                        <ul>
                                                            <li>From: {stopCity} ({stop.iataCode})</li>
                                                            <li>To: {arrival ? `${arrivalCity} (${arrival.iataCode})` : `${departureCity2} (${departure2.iataCode})`}</li>
                                                            <li>Aircraft: {stopAirCraft} | Meal</li>
                                                            <li>{cabin} / {arrivalCarrier} ({craftClass})</li>
                                                        </ul>
                                                    </>
                                                }
                                                <p>
                                                    BAG FEES: Baggage fees when purchased at the airport (Prices may be cheaper if purchased online with KLM) </p>
                                                <ul>
                                                    <li>Carry on: No fee</li>
                                                    <li>checked bag: {bags} (No fee up to 23 kg)</li>
                                                </ul>
                                                <hr />
                                                <h3>{headReturnDate}</h3>
                                                <ul>
                                                    <li>From: {departureCity2} ({departure2?.iataCode})</li>
                                                    <li>To: {departureCity} ({departure?.iataCode})</li>
                                                </ul>
                                                <h5>{departure2?.at} ({departure2?.iataCode}) {"->"} {arrival ? `${arrival2?.at} (${arrival2?.iataCode})` : `${departure?.at} (${departure?.iataCode})`}</h5>
                                                <h5>Duration: {duration2}</h5>
                                                <hr />
                                                <h4>Details:</h4>
                                                <h5>{departure2?.at} {"->"} {stop2 ? `${stop2?.at}` : `${arrival2?.at}`} / {segmentDuration2}</h5>
                                                <ul>
                                                    <li>From: {departureCity2} ({departure2?.iataCode})</li>
                                                    <li>To: {stop2 ? `${stopCity2} (${stop2?.iataCode})` : `${arrivalCity2} (${arrival2?.iataCode})`}</li>
                                                    <li>Aircraft: {departureAirCraft2} | Snack</li>
                                                    <li>{cabin} / {departCarrier2} ({craftClass})</li>
                                                    {section1?.segments.length >= 2 &&
                                                        <li><b>1h 20m stop / in {stopCity2} ({stop2?.iataCode})</b></li>
                                                    }
                                                </ul>
                                                {section2?.segments.length >= 2 &&
                                                    <>
                                                        <h5>{stop2.at} {"->"} {arrival2?.at} / {stopSegmentDuration2}</h5>
                                                        <ul>
                                                            <li>From: {stopCity2} ({stop2.iataCode})</li>
                                                            <li>To: {arrivalCity2} ({arrival2?.iataCode})</li>
                                                            <li>Aircraft: {stopAirCraft2} | Meal</li>
                                                            <li>{cabin} / {arrivalCarrier2} ({craftClass})</li>
                                                        </ul>
                                                    </>
                                                }
                                                <p>
                                                    BAG FEES: Baggage fees when purchased at the airport (Prices may be cheaper if purchased online with KLM) </p>
                                                <ul>
                                                    <li>Carry on: No fee</li>
                                                    <li>checked bag: {bags} (No fee up to 23 kg)</li>
                                                </ul>

                                            </div>
                                            <div className="post-story-tags clearfix">
                                                <div className="tags_wrapper"><b>Tags</b>: <Link to="#">Travel</Link>, <Link to="#">Flights</Link>, <Link to="#">Early Booking</Link>, <Link to="#">Cruises</Link> </div>

                                                <div className="share_post clearfix">
                                                    <div className="txt1">Share Post:</div>
                                                    <div className="social4_wrapper">
                                                        <ul className="social4 clearfix">
                                                            <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                                                            <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                                                            <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
        {isLoading&&
            <Loading/>
            
        }
        </>
    )
}

export default BookingFlights