import React from 'react'
import { setRefreshs, selectRefresh } from "../redux/refreshSlice";
import { useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { setAlert, resetAlert } from "../redux/alertSlice";

function RefreshPage({content, beingLoaded, loadCompleted}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshState = useSelector(selectRefresh);
  const fetch = async () => {
      dispatch(setRefreshs("false"));
      beingLoaded();
      try {
        const res = await axios.post('https://axen-trave-test.herokuapp.com/api/flight/date?search=true&first=0&last=9', content)
        loadCompleted();
        navigate("/search-flights", { state: { flightOffers: res.data, details: content } });
        window.location.reload();
      } catch (err) {
        loadCompleted();
        dispatch(setAlert("searchFlight"));
        setTimeout(() => {
          dispatch(resetAlert())
        }, 2500)
        clearTimeout();
        dispatch(setRefreshs("false"));
      }
  };
  return (
    <div style={{ background: "rgba(0, 0, 0, 0.4)", zIndex: "5000000000000000" }} className='w-screen h-screen flex justify-center fixed' >
      <div style={{height: "30rem" }} className='p-5 xs:w-300 md:w-400 lg:w-500 border text-center bg-white rounded-lg mt-12 drop-shadow-2xl flex flex-col justify-center items-center'>
        <h1 className='mb-6 font-normal text-teal-600' >Refresh your results</h1>
        <p  className='my-4 h5 font-semibold text-gray-600 font-normal'>Please note, prices and availability change frequently due to demand. We want to make sure you always see the best prices.</p>
        <button className='px-8 py-3 mt-2 mb-12 bg-teal-500 hover:bg-teal-400 transition-all text-white cursor-pointer outline-none border-none' onClick={fetch} >REFRESH SEARCH</button>
      </div>
    </div>
  )
}

export default RefreshPage