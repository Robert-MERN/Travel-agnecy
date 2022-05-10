import React from 'react'
import { Link } from 'react-router-dom';



function HotelSlider() {
  return (
    <div className="popular">
      <div className="popular_inner">
        <figure>
          <img src="https://axen-trave-test.herokuapp.com/images/popular01.jpg" alt="" className="img-responsive" />
          <div className="over">
            <div className="v1">Bahamas <span>Our biggest sale</span></div>
            <div className="v2">Lorem ipsum dolor sit amet, concateus.</div>
          </div>
        </figure>
        <div className="caption">
          <div className="txt1"><span>Bahamas</span> 7 Night Tour</div>
          <div className="txt2">Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming.</div>
          <div className="txt3 clearfix">
            <div className="left_side">
              <div className="stars1" style={{ display: "flex" }} >
                <img src="https://axen-trave-test.herokuapp.com/images/star1.png" alt="" />
                <img src="https://axen-trave-test.herokuapp.com/images/star1.png" alt="" />
                <img src="https://axen-trave-test.herokuapp.com/images/star1.png" alt="" />
                <img src="https://axen-trave-test.herokuapp.com/images/star1.png" alt="" />
                <img src="https://axen-trave-test.herokuapp.com/images/star2.png" alt="" />
              </div>
              <div className="nums">- 18 Reviews</div>
            </div>
            <div className="right_side"><Link to="/search-hotels" className="btn-default btn1">See All</Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelSlider