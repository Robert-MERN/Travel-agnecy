import React from 'react'
import MailIcon from '@mui/icons-material/Mail';
import { Link } from "react-router-dom";
import PhoneIcon from '@mui/icons-material/Phone';
import Fade from 'react-reveal/Fade';



function TopBarOne() {
    return (
        <div className="top1_wrapper">
            <div className="container">
                <div className="top1 clearfix">
                    <Fade delay={500} left>
                        <div className="email1" style={{ display: "flex", alignItems: "center", color: "#ACACAC" }} >
                            <Link to="#">
                                <MailIcon style={{ transform: "scale(1.5)", marginRight: "8px" }} />
                                support@AXENholidays.com
                            </Link>
                        </div>
                    </Fade>
                    <Fade delay={500} right>
                        <div className="email1" style={{ display: "flex", alignItems: "center", color: "#ACACAC" }}  >
                            <PhoneIcon style={{ transform: "scale(1.1)", marginRight: "8px" }} />
                            +92 333 1234567
                        </div>
                    </Fade>
                    <div className="social_wrapper">
                        <ul className="social clearfix">
                            <li><Link to="#"><i className="fa fa-facebook"></i></Link></li>
                            <li><Link to="#"><i className="fa fa-twitter"></i></Link></li>
                            <li><Link to="#"><i className="fa fa-google-plus"></i></Link></li>
                            <li><Link to="#"><i className="fa fa-instagram"></i></Link></li>
                            <li><Link to="#"><i className="fa fa-vimeo-square"></i></Link></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TopBarOne