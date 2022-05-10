import React from 'react'
import { Link } from 'react-router-dom'
import TopBarOne from '../components/TopBarOne'
import TopBarTwo from '../components/TopBarTwo'
import Footer from '../components/Footer'


function BookingHotelPage() {
    
    return (
        <div id="main">
            <TopBarOne />
            <TopBarTwo />
            <div className="breadcrumbs1_wrapper">
                <div className="container">
                    <div className="breadcrumbs1"><Link to="index.html">Home</Link><span>/</span>Pages<span>/</span>Booking</div>
                </div>
            </div>
            <div id="content">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3 className="text-center hch2">SHERATON Prague</h3>
                            <div className="clearfix"></div>
                            <p className="address text-center">Na Strzi 32, Prague, 14000, Czech Republic</p>
                            <div className="text-center" style={{ display: "flex" }} >
                                <img alt='' src="images/star1.png" />
                                <img alt='' src="images/star1.png" />
                                <img alt='' src="images/star1.png" />
                                <img alt='' src="images/star1.png" />
                                <img alt='' src="images/star1.png" />
                            </div>
                            <div className="clearfix"></div>
                            <div className="col-md-4 booking-row">
                                <h3 className="line">TRAVELLER INFORMATION</h3>
                                <div className="input2_wrapper">
                                    <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>First Name</label>
                                    <div className="col-md-7" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <input type="text" className="form-control" placeholder="Michael" spellcheck="false" />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Last Name</label>
                                    <div className="col-md-7" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <input type="text" className="form-control" placeholder="Berkovich" spellcheck="false" />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Your Email</label>
                                    <div className="col-md-7" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <input type="email" className="form-control" placeholder="your@email.com" spellcheck="false" />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="margin-top"></div>
                                <h3>CREDIT CARD INFORMATION</h3>
                                <div className="input2_wrapper">
                                    <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Name on Card</label>
                                    <div className="col-md-7" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <input type="text" className="form-control" placeholder="Michael Berkovich" spellcheck="false" />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Card Number</label>
                                    <div className="col-md-7" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <input type="text" className="form-control" placeholder="0123 4567 8901 2345" spellcheck="false" />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="select1_wrapper">
                                    <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "15px" }}>Expiration Date</label>
                                    <div className="select1_inner col-md-3" style={{ marginTop: "12px", paddingRight: "0", paddingLeft: "0", width: "20%", display: "inline-block" }}>
                                        <select className="select2 select select3" style={{ width: "100%" }}>
                                            <option value="01">01</option>
                                            <option value="02">02</option>
                                            <option value="03">03</option>
                                            <option value="04">04</option>
                                            <option value="05">05</option>
                                            <option value="06">06</option>
                                            <option value="07">07</option>
                                            <option value="08">08</option>
                                            <option value="09">09</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </div>
                                    <div className="select1_inner col-md-3" style={{ marginTop: "12px", marginLeft: "10px", paddingRight: "0", paddingLeft: "0", width: "20%", display: "inline-block" }}>
                                        <select className="select2 select select3" style={{ width: "100%" }}>
                                            <option value="2017">2017</option>
                                            <option value="2018">2018</option>
                                            <option value="2019">2019</option>
                                            <option value="2020">2020</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Security Code</label>
                                    <div className="col-md-3" style={{ paddingRight: "0", paddingLeft: "0", width: "20%" }}>
                                        <input type="text" className="form-control" placeholder="" spellcheck="false" />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="margin-top"></div>
                                <h3>BILLING ADDRESS</h3>
                                <div className="input2_wrapper">
                                    <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Country</label>
                                    <div className="col-md-7" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <input type="text" className="form-control" placeholder="" spellcheck="false" />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>City</label>
                                    <div className="col-md-7" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <input type="text" className="form-control" placeholder="" spellcheck="false" />
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-5" style={{ paddingLeft: "0", paddingTop: "12px" }}>Address</label>
                                    <div className="col-md-7" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <input type="text" className="form-control" placeholder="" spellcheck="false" />
                                    </div>
                                </div>
                                <div className="clearfix"></div>

                            </div>
                            <div className="col-md-4"></div>
                            <div className="col-md-4 booking-row">
                                <h3 className="line">HOTEL SUMMARY</h3>
                                <div className="input2_wrapper">
                                    <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Room</label>
                                    <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <span className="red">Single Room</span>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Price per night</label>
                                    <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <span className="red">£360</span>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Check in</label>
                                    <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <span className="red">20 - Feb - 2017</span>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Check out</label>
                                    <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <span className="red">22 - Feb - 2017</span>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="margin-top"></div>
                                <h3>CHARGES</h3>
                                <div className="input2_wrapper">
                                    <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>10 Nights</label>
                                    <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <span className="red">Single Room</span>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Fees</label>
                                    <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <span className="red">Included</span>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>TOTAL</label>
                                    <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <span className="red">£680</span>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="margin-top" style={{ marginTop: "40px" }}></div>
                                <div className="border-3px"></div>
                                <div className="clearfix"></div>
                                <div className="margin-top"></div>
                                <h3>ACCEPT AND CONFIRM</h3>
                                <input type="checkbox" /> <b style={{ color: "#464646", paddingLeft: "10px" }}>I agree to the booking conditions</b>
                                <div className="margin-top"></div>
                                <div className="clearfix"></div>
                                <div className="input2_wrapper">
                                    <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "18px", fontSize: "16px" }}>GRAND TOTAL:</label>
                                    <div className="col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                        <span className="red" style={{ fontSize: "30px" }}>£680.00</span>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                                <div className="margin-top"></div>
                                <Link to="booking-success.html" className="btn btn-default btn-cf-submit3">RESERVE NOW</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BookingHotelPage