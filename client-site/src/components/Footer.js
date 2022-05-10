import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <>
            <div className="bot1_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="logo2_wrapper">
                                <Link to="index.html" className="logo2">
                                    {/* <img src="images/logo2.png" alt="" className="img-responsive"> */}
                                    AXEN Holidays
                                </Link>
                            </div>
                            <p>
                                Nam liber tempor cum soluta nobis option congue nihil imperdiet doming id quod mazim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.
                            </p>
                            <p>
                                <Link to="#" style={{ background: "transparent" }}  className="btn-default btn2">Read More</Link>
                            </p>
                        </div>
                        <div className="col-sm-3">
                            <div className="bot1_title">Travel Specialists</div>
                            <ul className="ul1">
                                <li><Link to="#">First Class Flights</Link></li>
                                <li><Link to="#">Accessible Travel</Link></li>
                                <li><Link to="#">Amazing Cruises</Link></li>
                            </ul>

                            <div className="social2_wrapper">
                                <ul className="social2 clearfix">
                                    <li className="nav1"><Link to="#"></Link></li>
                                    <li className="nav2"><Link to="#"></Link></li>
                                    <li className="nav3"><Link to="#"></Link></li>
                                    <li className="nav4"><Link to="#"></Link></li>
                                    <li className="nav5"><Link to="#"></Link></li>
                                    <li className="nav6"><Link to="#"></Link></li>
                                </ul>
                            </div>

                        </div>
                        <div className="col-sm-3">
                            <div className="bot1_title">Our Twitter</div>
                            <div className="twits1">
                                <div className="twit1">
                                    <Link to="#"> @demo</Link> Lorem ipsum dolor sit amet, consectetuer adipiscing elit
                                    <div className="date">5 minutes ago</div>
                                </div>
                                <div className="twit1">
                                    <Link to="#">@demo</Link> Nam liber tempor cum soluta nobis option congue nihil imperdiet doming id quod mazim.
                                    <div className="date">2 days ago</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="bot1_title">Newsletter</div>
                            <div className="newsletter_block">
                                <div className="txt1">Inspiration, ideas, news and your feedback.</div>
                                <div className="newsletter-wrapper clearfix">
                                    <form className="newsletter" action="">
                                        <input type="text" name="s" value='Email Address' onBlur={"if(this.value=='') this.value='Email Address'"} onFocus={"if(this.value =='Email Address' ) this.value=''"} />
                                        <Link to="#" className="btn-default btn3">SUBMIT</Link>
                                    </form>
                                </div>
                            </div>
                            <div className="phone2">1-917-338-6831</div>
                            <div className="support1"><Link to="#">support@AXENholidays.com</Link></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bot2_wrapper">
                <div className="container">
                    <div className="left_side">
                        Copyright © 2022 <Link to="#"><strong>AXEN HOLIDAYS</strong></Link> <span>|</span> <Link to="/privacy-policy">Privacy Policy</Link> <span>|</span> <Link to="#">About Us</Link> <span>|</span> <Link to="faq.php">FAQ</Link> <span>|</span> <Link to="#">Contact Support</Link>
                    </div>
                    <div className="right_side">Designed by <Link to="#"><strong>AXEN HOLIDAYS</strong></Link></div>
                </div>
            </div>
        </>

    )
}

export default Footer