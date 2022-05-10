import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import TopBarOne from '../components/TopBarOne'
import TopBarTwo from '../components/TopBarTwo'
import Footer from '../components/Footer'
import ReactPaginate from 'react-paginate'
import Carousel from 'react-material-ui-carousel'



function SearchHotels() {
    const data = useLocation();
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(9);
    const handlePageClick = (e) => {
        setStart(0 + (9 * e.selected));
        setEnd(9 + (9 * e.selected));
    }
    return (
        <div id="main">
            <TopBarOne />
            <TopBarTwo />
            <div id="parallax2" className="parallax">
                <div className="bg2 parallax-bg bg-fixed" style={{ backgroundPosition: "50% 81px" }}></div>
                <div className="overlay"></div>
                <div className="parallax-content">
                    <div className="container">
                    </div>
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
                                    <div className="col-sm-12 no-padding">
                                        <div className="input1_wrapper">
                                            <label>City:</label>
                                            <div className="input2_inner">
                                                <input type="text" className="input" placeholder="Prague" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label>Check-In:</label>
                                            <div className="input1_inner">
                                                <input type="text" className="input datepicker" placeholder="16/07/2014" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label>Check-Out:</label>
                                            <div className="input1_inner">
                                                <input type="text" className="input datepicker" placeholder="26/07/2014" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Rooms:</label>
                                            <div className="input2_inner col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input type="text" className="input" placeholder="1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Adults:</label>
                                            <div className="input2_inner col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input type="text" className="form-control" placeholder="2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Children:</label>
                                            <div className="input2_inner col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input type="text" className="input" placeholder="0" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}></label>
                                    <div className="no-padding margin-top col-md-6 text-right" style={{ marginTop: "30px", width: "100%" }}>
                                        <button className="btn btn-default btn-cf-submit" style={{ width: "100%" }}>SEARCH</button>
                                    </div>
                                    <div className="clearfix"></div>
                                </form>
                            </div>
                            <div className="clearfix"></div>
                            <div className="margin-top"></div>

                            <div className="star_rating_wrapper">
                                <div className="title">Star Rating</div>
                                <div className="content">
                                    <div className="star_rating">
                                        <form>
                                            <div>
                                                <input id="checkbox-1" className="checkbox1-custom" name="checkbox-1" type="checkbox" checked />
                                                <label for="checkbox-1" className="checkbox1-custom-label"><img src="images/star1.png" alt="" /><img src="images/star1.png" alt="" /><img src="images/star1.png" alt="" /><img src="images/star1.png" alt="" /><img src="images/star1.png" alt="" /><span>5 Stars</span></label>
                                            </div>
                                            <div>
                                                <input id="checkbox-2" className="checkbox1-custom" name="checkbox-2" type="checkbox" />
                                                <label for="checkbox-2" className="checkbox1-custom-label"><img src="images/star1.png" alt="" /><img src="images/star1.png" alt="" /><img src="images/star1.png" alt="" /><img src="images/star1.png" alt="" /><img src="images/star2.png" alt="" /><span>4 Stars</span></label>
                                            </div>
                                            <div>
                                                <input id="checkbox-3" className="checkbox1-custom" name="checkbox-3" type="checkbox" checked />
                                                <label for="checkbox-3" className="checkbox1-custom-label">
                                                    <img src="images/star1.png" alt="" />
                                                    <img src="images/star1.png" alt="" />
                                                    <img src="images/star1.png" alt="" />
                                                    <img src="images/star2.png" alt="" />
                                                    <img src="images/star2.png" alt="" />
                                                    <span>3 Stars</span>
                                                </label>
                                            </div>
                                            <div>
                                                <input id="checkbox-4" className="checkbox1-custom" name="checkbox-4" type="checkbox" />
                                                <label for="checkbox-4" className="checkbox1-custom-label">
                                                    <img src="images/star1.png" alt="" />
                                                    <img src="images/star1.png" alt="" />
                                                    <img src="images/star2.png" alt="" />
                                                    <img src="images/star2.png" alt="" />
                                                    <img src="images/star2.png" alt="" />
                                                    <span>2 Stars</span>
                                                </label>
                                            </div>
                                            <div>
                                                <input id="checkbox-5" className="checkbox1-custom" name="checkbox-5" type="checkbox" />
                                                <label for="checkbox-5" className="checkbox1-custom-label">
                                                    <img src="images/star1.png" alt="" />
                                                    <img src="images/star2.png" alt="" />
                                                    <img src="images/star2.png" alt="" />
                                                    <img src="images/star2.png" alt="" />
                                                    <img src="images/star2.png" alt="" />
                                                    <span>1 Stars</span>
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
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

                            <form action="" className="form3 clearfix">
                                <div className="select1_wrapper txt">
                                    <label>Sort by:</label>
                                </div>
                                <div className="select1_wrapper sel2">
                                    <div className="select1_inner">
                                        <select className="select2 select" style={{ width: "100%" }}>
                                            <option value="1">Name</option>
                                            <option value="2">Name2</option>
                                            <option value="2">Name3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="select1_wrapper sel2">
                                    <div className="select1_inner">
                                        <select className="select2 select" style={{ width: "100%" }}>
                                            <option value="1">Price (low)</option>
                                            <option value="2">Price2</option>
                                            <option value="2">Price3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="select1_wrapper sel2">
                                    <div className="select1_inner">
                                        <select className="select2 select" style={{ width: "100%" }}>
                                            <option value="1">Stars</option>
                                            <option value="2">Raiting2</option>
                                            <option value="2">Raiting3</option>
                                        </select>
                                    </div>
                                </div>
                            </form>


                            <div className="col-sm-4">
                                <div className="thumb5">
                                    <div className="thumbnail clearfix">
                                        <figure>
                                            <img src="images/hotels01.jpg" alt="" className="img-responsive" />
                                            <div className="over">
                                                <div className="v1">Normandy Hotel <span>6.9 Review score</span></div>
                                                <div className="v2">Twin / Double Room</div>
                                            </div>
                                        </figure>
                                        <div className="caption">
                                            <div className="txt1">Normandy Hotel</div>
                                            <div className="txt2">Twin / Double Room</div>
                                            <div className="txt3 clearfix">
                                                <div className="left_side">
                                                    <div className="price">£250.00</div>
                                                    <div className="stars2">
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="right_side"><Link to="book-hotel-page" className="btn-default btn1">Details</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="thumb5">
                                    <div className="thumbnail clearfix">
                                        <figure>
                                            <img src="images/hotels02.jpg" alt="" className="img-responsive" />
                                            <div className="over">
                                                <div className="v1">Hotel West-End <span>6.9 Review score</span></div>
                                                <div className="v2">Twin / Double Room</div>
                                            </div>
                                        </figure>
                                        <div className="caption">
                                            <div className="txt1">Hotel West-End</div>
                                            <div className="txt2">Twin / Double Room</div>
                                            <div className="txt3 clearfix">
                                                <div className="left_side">
                                                    <div className="price">£349.00</div>
                                                    <div className="stars2">
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />

                                                    </div>
                                                </div>
                                                <div className="right_side"><Link to="book-hotel-page" className="btn-default btn1">Details</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="thumb5">
                                    <div className="thumbnail clearfix">
                                        <figure>
                                            <img src="images/hotels03.jpg" alt="" className="img-responsive" />
                                            <div className="over">
                                                <div className="v1">Chambiges Elysees <span>6.9 Review score</span></div>
                                                <div className="v2">Twin / Double Room</div>
                                            </div>
                                        </figure>
                                        <div className="caption">
                                            <div className="txt1">Chambiges Elysees</div>
                                            <div className="txt2">Twin / Double Room</div>
                                            <div className="txt3 clearfix">
                                                <div className="left_side">
                                                    <div className="price">£360.00</div>
                                                    <div className="stars2">
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />

                                                    </div>
                                                </div>
                                                <div className="right_side"><Link to="book-hotel-page" className="btn-default btn1">Details</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>





                            <div className="col-sm-4">
                                <div className="thumb5">
                                    <div className="thumbnail clearfix">
                                        <figure>
                                            <img src="images/hotels04.jpg" alt="" className="img-responsive" />
                                            <div className="over">
                                                <div className="v1">Hamilton Hotel <span>6.9 Review score</span></div>
                                                <div className="v2">Twin / Double Room</div>
                                            </div>
                                        </figure>
                                        <div className="caption">
                                            <div className="txt1">Hamilton Hotel</div>
                                            <div className="txt2">Twin / Double Room</div>
                                            <div className="txt3 clearfix">
                                                <div className="left_side">
                                                    <div className="price">£75.00</div>
                                                    <div className="stars2">
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="right_side"><Link to="book-hotel-page" className="btn-default btn1">Details</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="thumb5">
                                    <div className="thumbnail clearfix">
                                        <figure>
                                            <img src="images/hotels05.jpg" alt="" className="img-responsive" />
                                            <div className="over">
                                                <div className="v1">Central Grand Hotel <span>6.9 Review score</span></div>
                                                <div className="v2">Twin / Double Room</div>
                                            </div>
                                        </figure>
                                        <div className="caption">
                                            <div className="txt1">Central Grand Hotel</div>
                                            <div className="txt2">Twin / Double Room</div>
                                            <div className="txt3 clearfix">
                                                <div className="left_side">
                                                    <div className="price">£65.00</div>
                                                    <div className="stars2">
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />

                                                    </div>
                                                </div>
                                                <div className="right_side"><Link to="book-hotel-page" className="btn-default btn1">Details</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="thumb5">
                                    <div className="thumbnail clearfix">
                                        <figure>
                                            <img src="images/hotels06.jpg" alt="" className="img-responsive" />
                                            <div className="over">
                                                <div className="v1">Ambasador Premium <span>6.9 Review score</span></div>
                                                <div className="v2">Twin / Double Room</div>
                                            </div>
                                        </figure>
                                        <div className="caption">
                                            <div className="txt1">Ambasador Premium</div>
                                            <div className="txt2">Twin / Double Room</div>
                                            <div className="txt3 clearfix">
                                                <div className="left_side">
                                                    <div className="price">£35.00</div>
                                                    <div className="stars2">
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />

                                                    </div>
                                                </div>
                                                <div className="right_side"><Link to="book-hotel-page" className="btn-default btn1">Details</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="hl1"></div>


                            <div className="col-sm-4">
                                <div className="thumb5">
                                    <div className="thumbnail clearfix">
                                        <figure>
                                            <img src="images/hotels07.jpg" alt="" className="img-responsive" />
                                            <div className="over">
                                                <div className="v1">Grand Plaza <span>6.9 Review score</span></div>
                                                <div className="v2">Twin / Double Room</div>
                                            </div>
                                        </figure>
                                        <div className="caption">
                                            <div className="txt1">Grand Plaza</div>
                                            <div className="txt2">Twin / Double Room</div>
                                            <div className="txt3 clearfix">
                                                <div className="left_side">
                                                    <div className="price">£450.00</div>
                                                    <div className="stars2">
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />

                                                    </div>
                                                </div>
                                                <div className="right_side"><Link to="book-hotel-page" className="btn-default btn1">Details</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="thumb5">
                                    <div className="thumbnail clearfix">
                                        <figure>
                                            <img src="images/hotels08.jpg" alt="" className="img-responsive" />
                                            <div className="over">
                                                <div className="v1">Grand Iberia <span>6.9 Review score</span></div>
                                                <div className="v2">Twin / Double Room</div>
                                            </div>
                                        </figure>
                                        <div className="caption">
                                            <div className="txt1">Grand Iberia</div>
                                            <div className="txt2">Twin / Double Room</div>
                                            <div className="txt3 clearfix">
                                                <div className="left_side">
                                                    <div className="price">£255.00</div>
                                                    <div className="stars2">
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />

                                                    </div>
                                                </div>
                                                <div className="right_side"><Link to="book-hotel-page" className="btn-default btn1">Details</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="thumb5">
                                    <div className="thumbnail clearfix">
                                        <figure>
                                            <img src="images/hotels09.jpg" alt="" className="img-responsive" />
                                            <div className="over">
                                                <div className="v1">Westminster Hotel <span>6.9 Review score</span></div>
                                                <div className="v2">Twin / Double Room</div>
                                            </div>
                                        </figure>
                                        <div className="caption">
                                            <div className="txt1">Westminster Hotel</div>
                                            <div className="txt2">Twin / Double Room</div>
                                            <div className="txt3 clearfix">
                                                <div className="left_side">
                                                    <div className="price">£275.00</div>
                                                    <div className="stars2">
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                        <img src="images/star1.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="right_side"><Link to="book-hotel-page" className="btn-default btn1">Details</Link></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={".."}
                                pageCount={5}
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

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SearchHotels