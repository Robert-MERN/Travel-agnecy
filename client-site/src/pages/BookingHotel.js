import React from 'react';
import { Link } from 'react-router-dom';
import TopBarOne from '../components/TopBarOne';
import TopBarTwo from '../components/TopBarTwo';
import Footer from '../components/Footer';
import Carousel from "react-material-ui-carousel";


function BookingHotel() {
    const data = [
        { name: "muneeb", id: "1" },
        { name: "beenish", id: "2" },
        { name: "raheel", id: "3" },
        { name: "safeer", id: "4" },

    ]
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
                                <form action="javascript;">
                                    <h3>SHERATON HOTEL</h3>
                                    <span className="star-rating-left" style={{ display: "flex" }} >
                                        <img alt='' src="images/star1.png" />
                                        <img alt='' src="images/star1.png" />
                                        <img alt='' src="images/star1.png" />
                                        <img alt='' src="images/star1.png" />
                                        <img alt='' src="images/star1.png" />
                                    </span>
                                    <span className="location">
                                        Prague, Czech
                                    </span>
                                    <div className="clearfix"></div>
                                    <div style={{ marginTop: "10px" }}></div>

                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label>Check-In:</label>
                                            <div className="input1_inner">
                                                <input type="text" className="input" placeholder="16/07/2014" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label>Check-Out:</label>
                                            <div className="input1_inner">
                                                <input type="text" className="input" placeholder="26/07/2014" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <span className="nights">10-night stay</span>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Rooms:</label>
                                            <div className="input2_inner col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input type="text" className="input" placeholder="1" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input2_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Adults:</label>
                                            <div className="input2_inner col-md-6" style={{ paddingRight: "0", paddingLeft: "0;" }}>
                                                <input type="text" className="input" placeholder="2" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px" }}>Children:</label>
                                            <div className="input2_inner col-md-6" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <input type="text" className="input" placeholder="0" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px", fontWeight: "500", color: "#464646", fontSize: "13px" }}>Price:</label>
                                            <div className="col-md-6 price-left" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <span className="red">£150</span>/<span className="blue">night</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-sm-12 no-padding margin-top">
                                        <div className="input1_wrapper">
                                            <label className="col-md-6" style={{ paddingLeft: "0", paddingTop: "12px", fontWeight: ":500", color: "#464646", fontSize: "13px" }}>Total Booking:</label>
                                            <div className="col-md-6 price-total-left" style={{ paddingRight: "0", paddingLeft: "0" }}>
                                                <span className="red">£1500</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="no-padding margin-top text-center" style={{ marginTop: "30px" }}>
                                        <Link to="booking-hotel-page.html" className="btn btn-default btn-cf-submit3" style={{ width: "100%" }}>RESERVE NOW</Link>
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
                                            <Carousel navButtonsAlwaysInvisible="true" >

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
                                <div className="post post-full">
                                    <h3 className="hch">SHERATON Prague</h3>
                                    <span className="star-rating" style={{ display: "flex" }}>
                                        <img alt='' src="images/star1.png" />
                                        <img alt='' src="images/star1.png" />
                                        <img alt='' src="images/star1.png" />
                                        <img alt='' src="images/star1.png" />
                                        <img alt='' src="images/star1.png" />
                                    </span>
                                    <div className="clearfix"></div>
                                    <p className="address">Na Strzi 32, Prague, 14000, Czech Republic</p>
                                    <Carousel timeout={800} animation="slide" >
                                        <div className="sl1">
                                            <div className="sl1_inner">
                                                <img src="images/ht01.jpg" alt="" className="img-responsive" />
                                            </div>
                                        </div>
                                        <div className="sl1">
                                            <div className="sl1_inner">
                                                <img src="images/ht02.jpg" alt="" className="img-responsive" />
                                            </div>
                                        </div>
                                        <div className="sl1">
                                            <div className="sl1_inner">
                                                <img src="images/ht03.jpg" alt="" className="img-responsive" />
                                            </div>
                                        </div>
                                        <div className="sl1">
                                            <div className="sl1_inner">
                                                <img src="images/ht04.jpg" alt="" className="img-responsive" />
                                            </div>
                                        </div>
                                        <div className="sl1">
                                            <div className="sl1_inner">
                                                <img src="images/ht05.jpg" alt="" className="img-responsive" />
                                            </div>
                                        </div>

                                    </Carousel>
                                    {/* <div className="post-header">
                                        <div className="post-slide">
                                            <div id="sl1">
                                                <Link className="sl1_prev" to="#"></Link>
                                                <Link className="sl1_next" to="#"></Link>
                                                <div className="sl1_pagination"></div>
                                                <div className="carousel-box">
                                                    <div className="inner">
                                                        <div className="carousel main">
                                                            <ul>
                                                                <li>
                                                                    <div className="sl1">
                                                                        <div className="sl1_inner">
                                                                            <img src="images/ht01.jpg" alt="" className="img-responsive" />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="sl1">
                                                                        <div className="sl1_inner">
                                                                            <img src="images/ht02.jpg" alt="" className="img-responsive" />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="sl1">
                                                                        <div className="sl1_inner">
                                                                            <img src="images/ht03.jpg" alt="" className="img-responsive" />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="sl1">
                                                                        <div className="sl1_inner">
                                                                            <img src="images/ht04.jpg" alt="" className="img-responsive" />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="sl1">
                                                                        <div className="sl1_inner">
                                                                            <img src="images/ht05.jpg" alt="" className="img-responsive" />
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="post-story">
                                        <div className="post-story-info margin-top">
                                            <div className="date12">Most Popular Facilities:</div>
                                            <div className="by">
                                                <span className="option-booking">
                                                    <i className="free-wifi"></i> <span>Free WIFI</span>
                                                    <i className="breakfast"></i> <span>Breakfast included</span>
                                                    <i className="airport-shuttle"></i> <span>Airport shuttle</span>
                                                    <i className="parking"></i> <span>Parking</span>
                                                    <i className="no-smoking"></i> <span>No smoking room</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="post-story-body clearfix">

                                            <p>
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex
                                                ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
                                                blandit praesent.
                                            </p>
                                            <p>
                                                Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores
                                                legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit
                                                litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum. Nam liber tempor cum soluta nobis eleifend option congue
                                                nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius
                                                quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas
                                                humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex
                                                ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum.
                                            </p>
                                            <p>
                                                Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores
                                                legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit
                                                litterarum formas humanitatis per seacula quarta decima et quinta decima. Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum.
                                            </p>

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

                                <div className="num-comments">3 Comments</div>

                                <div className="comment-block clearfix">
                                    <figure>
                                        <img src="images/user1.jpg" alt="" className="img-responsive" />
                                    </figure>
                                    <div className="caption">
                                        <div className="top clearfix">
                                            <div className="txt1">By <Link to="#">George Smith</Link></div><span>|</span>
                                            <div className="txt2">Date: 06 March, 2016</div><span>|</span>
                                            <div className="txt3"><Link to="#">Reply</Link></div>
                                        </div>
                                        <div className="txt">
                                            Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.
                                        </div>
                                    </div>
                                </div>

                                <div className="comment-block left1 clearfix">
                                    <figure>
                                        <img src="images/user2.jpg" alt="" className="img-responsive" />
                                    </figure>
                                    <div className="caption">
                                        <div className="top clearfix">
                                            <div className="txt1">By <Link to="#">Admin</Link></div><span>|</span>
                                            <div className="txt2">Date: 06 March, 2016</div><span>|</span>
                                            <div className="txt3"><Link to="#">Reply</Link></div>
                                        </div>
                                        <div className="txt">
                                            Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.
                                        </div>
                                    </div>
                                </div>

                                <div className="comment-block clearfix">
                                    <figure>
                                        <img src="images/user3.jpg" alt="" className="img-responsive" />
                                    </figure>
                                    <div className="caption">
                                        <div className="top clearfix">
                                            <div className="txt1">By <Link to="#">George Smith</Link></div><span>|</span>
                                            <div className="txt2">Date: 06 March, 2016</div><span>|</span>
                                            <div className="txt3"><Link to="#">Reply</Link></div>
                                        </div>
                                        <div className="txt">
                                            Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.
                                        </div>
                                    </div>
                                </div>



                                <div className="live-comment">
                                    <div className="live-comment-title">Leave Link Comment</div>
                                    <div className="live-comment-form">

                                        <div id="note3"></div>
                                        <div id="fields3">
                                            <form id="ajax-contact-form3" className="form-horizontal" action="">
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label for="inputName">Your Name</label>
                                                            <input type="text" className="form-control" id="inputName" name="name" placeholder="Full Name" onBlur={"if(this.placeholder=='') this.placeholder='Full Name'"} onFocus={"if(this.value =='Full Name' ) this.placeholder=''"} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label for="inputEmail">Email</label>
                                                            <input type="text" className="form-control" id="inputEmail" name="email" placeholder="E-mail address" onBlur={"if(this.placeholder=='') this.placeholder='E-mail address'"} onFocus={"if(this.value =='E-mail address' ) this.placeholder=''"} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="form-group">
                                                            <label for="inputEmail">Website</label>
                                                            <input type="text" className="form-control" id="inputEmail" name="email" placeholder="Website" onBlur={"if(this.placeholder=='') this.placeholder='Website'"} onFocus={"if(this.value =='Website' ) this.placeholder=''"} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label for="inputMessage">Your Message</label>
                                                            <textarea className="form-control" rows="9" id="inputMessage" name="content" onBlur={"if(this.placeholder=='') this.placeholder='Message'"} onFocus={"if(this.value =='Message' ) this.placeholder=''"}>Message</textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button type="submit" className="btn-default btn-cf-submit3">Send Comment</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BookingHotel