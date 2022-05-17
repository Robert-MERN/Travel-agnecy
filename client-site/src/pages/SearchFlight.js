import React, { useState, useRef, useEffect } from 'react'
import TopBarOne from '../components/TopBarOne'
import TopBarTwo from '../components/TopBarTwo'
import Footer from '../components/Footer'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import FilterListIcon from '@material-ui/icons/FilterList';
import { BiSortAlt2 } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Slider from '@mui/material/Slider';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';
import EachFlight from '../components/EachFlight';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Loading from '../components/Loading'
import toHoursAndMinutes from "../components/toHoursAndMinutes";

function valuetext(value) {
  return `${value}°C`;
}

function SearchFlight() {
  const navigate = useNavigate;
  const { state } = useLocation();
  console.log(state)
  const globalScope = state.flightOffers.defaultFilter
  // page
  const [pageStart, setPageStart] = useState(0);
  const [pageLast, setPageLast] = useState(9);
  const [doLoad, setDoLoad] = useState(false);
  const [totalLength, setTotalLength] = useState(globalScope?.totalLength);
  // fetching Stuff
  const [flights, setFlights] = useState(state.flightOffers.lastSearch);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // load more
  const loadMore = () => {
    setPageStart(pageStart + 9);
    setPageLast(pageLast + 9);
    setDoLoad(true);
  }
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?first=${pageStart}&last=${pageLast}`, state.details);
        if (flights.some((i, index) => i.id !== res.data.lastSearch[index].id)) {
          setFlights((prev) => [...prev, ...res.data.lastSearch]);
        }
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false)
      }
    };
    if (doLoad) {
      fetch();
    }
  }, [doLoad])
  useEffect(() => {
    setDoLoad(false);
  }, [flights])

  // sort implementation
  const [sortActive, setSortActive] = useState(false);
  const [sortActive2, setSortActive2] = useState(false);
  const [sortActive3, setSortActive3] = useState(false);
  const active = async () => {
    setSortActive(true);
    setSortActive2(false);
    setSortActive3(false);
    setIsLoading(true);
    try {
      const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?sort=price&first=${0}&last=${9}`);
      setTotalLength(res.data.defaultFilter.totalLength);
      setFlights(res.data.lastSearch);
      setIsLoading(false);
      setPageStart(0);
      setPageLast(9);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }
  const active2 = async () => {
    setSortActive2(true);
    setSortActive(false);
    setSortActive3(false);
    setIsLoading(true);
    try {
      const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?sort=name&first=${0}&last=${9}`);
      setTotalLength(res.data.defaultFilter.totalLength);
      setFlights(res.data.lastSearch);
      setIsLoading(false);
      setPageStart(0);
      setPageLast(9);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }
  const active3 = async () => {
    setSortActive3(true);
    setSortActive(false);
    setSortActive2(false);
    setIsLoading(true);
    try {
      const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?sort=duration&first=${0}&last=${9}`);
      setTotalLength(res.data.defaultFilter.totalLength);
      setFlights(res.data.lastSearch);
      setIsLoading(false);
      setPageStart(0);
      setPageLast(9);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }

  const ctn = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!ctn.current.contains(event.target)) {
        setSortActive(false);
        setSortActive3(false);
        setSortActive2(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  });


  // filter implementation
  const [value, setValue] = useState([globalScope?.price[0], globalScope?.price[1]]);
  const [value2, setValue2] = useState([globalScope?.outBoundDepart[0], globalScope?.outBoundDepart[1]]);
  const [value3, setValue3] = useState([globalScope?.outBoundArrival[0], globalScope?.outBoundArrival[1]]);
  const [value4, setValue4] = useState([globalScope?.inBoundDepart[0], globalScope?.inBoundDepart[1]]);
  const [value5, setValue5] = useState([globalScope?.inBoundArrival[0], globalScope?.inBoundArrival[1]]);
  const [value6, setValue6] = useState([globalScope?.journeyDuration[0], globalScope?.journeyDuration[1]]);
  console.log(value)
  const [filterOption, setfilterOption] = useState(true);
  const [filterOption3, setfilterOption3] = useState(false);
  const [filterOption4, setfilterOption4] = useState(false);
  const [filterOption5, setfilterOption5] = useState(false);
  const [filterOption6, setfilterOption6] = useState(false);
  const [filterOption7, setfilterOption7] = useState(false);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    setIsLoading(true);
    console.log(newValue)
    try {
      const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?filter=true&price=true&valueFrom=${newValue[0]}&valueTo=${newValue[1]}&first=${0}&last=${9}`);
      setFlights(res.data.lastSearch);
      setTotalLength(res.data.defaultFilter.totalLength);
      setIsLoading(false);
      setPageStart(0);
      setPageLast(9);
      console.log(res.data.lastSearch)
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }

  };
  const handleChange2 = async (event, newValue) => {
    setValue2(newValue);
    setIsLoading(true);
    try {
      const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?filter=true&outDepartureDuration=true&valueFrom=${newValue[0]}&valueTo=${newValue[1]}&first=${0}&last=${9}`);
      setFlights(res.data.lastSearch);
      setTotalLength(res.data.defaultFilter.totalLength);
      setIsLoading(false);
      setPageStart(0);
      setPageLast(9);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }

  };
  const handleChange3 = async (event, newValue) => {
    setValue3(newValue);
    setIsLoading(true);
    try {
      const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?filter=true&outArrivalDuration=true&valueFrom=${newValue[0]}&valueTo=${newValue[1]}&first=${0}&last=${9}`);
      setFlights(res.data.lastSearch);
      setTotalLength(res.data.defaultFilter.totalLength);
      setIsLoading(false);
      setPageStart(0);
      setPageLast(9);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }

  };
  const handleChange4 = async (event, newValue) => {
    setValue4(newValue);
    setIsLoading(true);
    try {
      const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?filter=true&inDepartureDuration=true&valueFrom=${newValue[0]}&valueTo=${newValue[1]}&first=${0}&last=${9}`);
      setFlights(res.data.lastSearch);
      setTotalLength(res.data.defaultFilter.totalLength);
      setIsLoading(false);
      setPageStart(0);
      setPageLast(9);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }

  };
  const handleChange5 = async (event, newValue) => {
    setValue5(newValue);
    setIsLoading(true);
    try {
      const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?filter=true&inArrivalDuration=true&valueFrom=${newValue[0]}&valueTo=${newValue[1]}&first=${0}&last=${9}`);
      setFlights(res.data.lastSearch);
      setTotalLength(res.data.defaultFilter.totalLength);
      setIsLoading(false);
      setPageStart(0);
      setPageLast(9);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }

  };
  const handleChange6 = async (event, newValue) => {
    setValue6(newValue);
    setIsLoading(true);
    try {
      const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?filter=true&totalDurationFilter=true&valueFrom=${newValue[0]}&valueTo=${newValue[1]}&first=${0}&last=${9}`);
      setFlights(res.data.lastSearch);
      setTotalLength(res.data.defaultFilter.totalLength);
      setIsLoading(false);
      setPageStart(0);
      setPageLast(9);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }

  };

  const stopFilter = async (e) => {
    if (e.target.checked) {
      setIsLoading(true);
      try {
        const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?filter=true&stopOne=true&first=${0}&last=${9}`);
        setFlights(res.data.lastSearch);
        setTotalLength(res.data.defaultFilter.totalLength);
        setIsLoading(false);
        setPageStart(0);
        setPageLast(9);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
  }
  const stopFilter2 = async (e) => {
    if (e.target.checked) {
      setIsLoading(true);
      try {
        const res = await axios.post(`https://axen-trave-test.herokuapp.com/api/flight/date?filter=true&stopTwo=true&first=${0}&last=${9}`);
        setFlights(res.data.lastSearch);
        setTotalLength(res.data.defaultFilter.totalLength);
        setIsLoading(false);
        setPageStart(0);
        setPageLast(9);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    }
  }

  const filter = useRef();
  const filter3 = useRef();
  const filter4 = useRef();
  const filter5 = useRef();
  const filter6 = useRef();
  const filter7 = useRef();

  // responsive functions
  const [showSort, setShowSort] = useState(false);
  const [showSearchSidebar, setShowSearchSidebar] = useState(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);

  const searchSidebarRef = useRef();





  // useEffect(() => {
  //   const handler = (event) => {
  //     if (!searchSidebarRef.current.contains(event.target)) {
  //       setShowSearchSidebar(false);
  //     }
  //   };
  //   document.addEventListener("click", handler);
  //   return () => {
  //     document.removeEventListener("click", handler);
  //   };
  // });


  return (
    <div className='overflow-x-hidden relative'>
      <TopBarOne />
      <TopBarTwo />
      <div className='container mb-12 mt-20' >
        <div className="row">
          <div className='col-sm-4 col-md-3 px-4 hidden-xs hidden-sm'>
            <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className="px-4 py-3 rounded-lg" >


              <div ref={filter} style={filterOption ? { height: "3.5rem" } : { height: filter.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-3 mb-5 overflow-hidden py-1">
                <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold border-bottom" onClick={() => setfilterOption(!filterOption)}>
                  Modify Search
                  {filterOption ?
                    <AddCircleOutlinedIcon className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} /> :

                    <RemoveCircleOutlinedIcon className='text-gray-300  transition-all' style={{ transform: "scale(1.8)" }} />

                  }
                </div>
                <div className='text-gray-500 py-3' >
                  <div className='mt-2' >
                    <p className='h4' >Where</p>
                    <div className='h6 mt-4 text-gray-300' >
                      <div>
                        LEAVING FROM
                        <input
                          type="text"
                          className="form-control block w-100 my-3 px-3 py-1.5 text-base font-normal text-gray-700 focus:bg-gray-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700  focus:border-teal-500 focus:outline-none"
                          id="exampleFormControlInput3"
                          placeholder="Default input"
                        />
                      </div>
                      <div>
                        GOING TO
                        <input
                          type="text"
                          className="form-control block w-100 my-3 px-3 py-1.5 text-base font-normal text-gray-700 focus:bg-gray-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:border-teal-500 focus:outline-none"
                          id="exampleFormControlInput3"
                          placeholder="Default input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-5' >
                    <p className='h4' >When</p>
                    <div className='h6 mt-4 text-gray-300' >
                      <div>
                        DEPARTING ON
                        <input
                          type="text"
                          className="form-control block w-100 my-3 px-3 py-1.5 text-base font-normal text-gray-700 focus:bg-gray-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700  focus:border-teal-500 focus:outline-none"
                          id="exampleFormControlInput3"
                          placeholder="Default input"
                        />
                      </div>
                      <div>
                        ARRIVAL
                        <input
                          type="text"
                          className="form-control block w-100 my-3 px-3 py-1.5 text-base font-normal text-gray-700 focus:bg-gray-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:border-teal-500 focus:outline-none"
                          id="exampleFormControlInput3"
                          placeholder="Default input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-5' >
                    <p className='h4' >Passenger</p>
                    <input
                      type="text"
                      className="form-control block w-100 my-3 px-3 py-1.5 text-base font-normal text-gray-700 focus:bg-gray-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700  focus:border-teal-500 focus:outline-none"
                      id="exampleFormControlInput3"
                      placeholder="Default input"
                    />

                  </div>
                  <div className='mt-5' >
                    <p className='h4' >Options</p>
                    <div className='h6 mt-4 text-gray-300'>
                      <div>
                        CLASS
                        <select class="custom-select my-3 h5 border border-solid border-gray-300 focus:bg-gray-200  focus:outline-none px-3 py-1.5 w-100 focus:border-teal-500 focus:text-gray-700 transition ease-in-out">
                          <option selected>Economy</option>
                          <option value="1">Premium Economy</option>
                          <option value="2">Business</option>
                          <option value="3">First</option>
                        </select>
                      </div>
                      <div>
                        AIRLINES
                        <select class="custom-select my-3 h5 border border-solid border-gray-300 focus:bg-gray-200  focus:outline-none px-3 py-1.5 w-100 focus:border-teal-500 focus:text-gray-700 transition ease-in-out">
                          <option selected>All Airlines</option>
                          <option value="1">Premium Economy</option>
                          <option value="2">Business</option>
                          <option value="3">First</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={filter3} style={filterOption3 ? { height: "3.5rem" } : { height: filter3.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-1 mb-5 overflow-hidden py-1">
                <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold border-bottom" onClick={() => setfilterOption3(!filterOption3)}>
                  Flight Stops
                  {filterOption3 ?
                    <AddCircleOutlinedIcon className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} /> :

                    <RemoveCircleOutlinedIcon className='text-gray-300  transition-all' style={{ transform: "scale(1.8)" }} />

                  }
                </div>
                <div className='text-gray-500 mt-4'>
                  <div className="flex items-center py-2 bg-gray-200 my-2">
                    <Checkbox onChange={stopFilter2} color="warning" className='scale-150' />
                    2 stops ({globalScope.stops_2})
                  </div>
                  <div className="flex items-center py-2 bg-gray-200 my-2">
                    <Checkbox onChange={stopFilter} color="warning" className='scale-150' />
                    1 stops ({globalScope.stops_1})
                  </div>
                </div>
              </div>


              <div ref={filter4} style={filterOption4 ? { height: "3.5rem" } : { height: filter4.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-1 mb-5 overflow-hidden py-1">
                <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold border-bottom" onClick={() => setfilterOption4(!filterOption4)}>
                  Price
                  {filterOption4 ?
                    <AddCircleOutlinedIcon className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} /> :

                    <RemoveCircleOutlinedIcon className='text-gray-300  transition-all' style={{ transform: "scale(1.8)" }} />

                  }
                </div>
                <div className='text-gray-500' >
                  <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    className="mt-4"
                    color="info"
                    max={globalScope?.price[1]}
                    min={globalScope?.price[0]}
                    skip={10}

                  />
                  <div className='flex justify-between w-100'>
                    <p className='h6'>${globalScope?.price[0]}</p>
                    <p className='h6'>${globalScope?.price[1]}</p>
                  </div>
                </div>
              </div>


              <div ref={filter5} style={filterOption5 ? { height: "3.5rem" } : { height: filter5.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-1 mb-5 overflow-hidden py-1">
                <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold border-bottom" onClick={() => setfilterOption5(!filterOption5)}>
                  Outbound Flight Times
                  {filterOption5 ?
                    <AddCircleOutlinedIcon className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} /> :

                    <RemoveCircleOutlinedIcon className='text-gray-300  transition-all' style={{ transform: "scale(1.8)" }} />

                  }
                </div>
                <div>
                  <div className='flex items-center flex-col text-gray-500 my-2'>
                    Departure
                    <Slider
                      value={value2}
                      onChange={handleChange2}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      color="error"
                      max={globalScope?.outBoundDepart[1]}
                      min={globalScope?.outBoundDepart[0]}
                      skip={10}
                    />
                    <div className='flex justify-between w-100'>
                      <p className='h6'>{toHoursAndMinutes(globalScope?.outBoundDepart[0])}</p>
                      <p className='h6'>{toHoursAndMinutes(globalScope?.outBoundDepart[1])}</p>
                    </div>
                  </div>
                  <div className='flex items-center flex-col text-gray-500'>
                    Arrival
                    <Slider
                      getAriaLabel={() => 'Temperature range'}
                      value={value3}
                      onChange={handleChange3}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      color="error"
                      max={globalScope?.outBoundArrival[1]}
                      min={globalScope?.outBoundArrival[0]}
                      skip={10}
                    />
                    <div className='flex justify-between w-100'>
                      <p className='h6'>{toHoursAndMinutes(globalScope?.outBoundArrival[0])}</p>
                      <p className='h6'>{toHoursAndMinutes(globalScope?.outBoundArrival[1])}</p>
                    </div>
                  </div>
                </div>
              </div>


              <div ref={filter6} style={filterOption6 ? { height: "3.5rem" } : { height: filter6.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-1 mb-5 overflow-hidden py-1">
                <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold border-bottom" onClick={() => setfilterOption6(!filterOption6)}>
                  Return Flight Times
                  {filterOption6 ?
                    <AddCircleOutlinedIcon className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} /> :

                    <RemoveCircleOutlinedIcon className='text-gray-300  transition-all' style={{ transform: "scale(1.8)" }} />

                  }
                </div>
                <div>
                  <div className='flex items-center flex-col text-gray-500 my-2'>
                    Departure
                    <Slider
                      getAriaLabel={() => 'Temperature range'}
                      value={value4}
                      onChange={handleChange4}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      color="warning"
                      max={globalScope?.inBoundDepart[1]}
                      min={globalScope?.inBoundDepart[0]}
                      skip={10}
                    />
                    <div className='flex justify-between w-100'>
                      <p className='h6'>{toHoursAndMinutes(globalScope?.inBoundDepart[0])}</p>
                      <p className='h6'>{toHoursAndMinutes(globalScope?.inBoundDepart[1])}</p>
                    </div>
                  </div>
                  <div className='flex items-center flex-col text-gray-500'>
                    Arrival
                    <Slider
                      getAriaLabel={() => 'Temperature range'}
                      value={value5}
                      onChange={handleChange5}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      color="warning"
                      max={globalScope?.inBoundArrival[1]}
                      min={globalScope?.inBoundArrival[0]}
                      skip={10}
                    />
                    <div className='flex justify-between w-100'>
                      <p className='h6'>{toHoursAndMinutes(globalScope?.inBoundArrival[0])}</p>
                      <p className='h6'>{toHoursAndMinutes(globalScope?.inBoundArrival[1])}</p>
                    </div>
                  </div>
                </div>
              </div>


              <div ref={filter7} style={filterOption7 ? { height: "3.5rem" } : { height: filter7.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-1 mb-1 overflow-hidden py-1">
                <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold" onClick={() => setfilterOption7(!filterOption7)} >
                  Journey Duration
                  {filterOption7 ?
                    <AddCircleOutlinedIcon className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} /> :

                    <RemoveCircleOutlinedIcon className='text-gray-300  transition-all' style={{ transform: "scale(1.8)" }} />

                  }
                </div>
                <div className='text-gray-500' >
                  <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value6}
                    onChange={handleChange6}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    className="mt-4"
                    color="success"
                    max={globalScope?.journeyDuration[1]}
                    min={globalScope?.journeyDuration[0]}
                    skip={10}
                  />
                  <div className='flex justify-between w-100'>
                    <p className='h6'>{toHoursAndMinutes(globalScope?.journeyDuration[0])}</p>
                    <p className='h6'>{toHoursAndMinutes(globalScope?.journeyDuration[1])}</p>
                  </div>
                </div>
              </div>


            </div>
          </div>
          <div className='col-sm-12 col-md-9 px-5'>

            <div className='row px-2 mb-3 hidden-lg hidden-md hidden-xl hidden-xxl' >
              <div onClick={() => setShowFilterSidebar(!showFilterSidebar)} className="col-xs-4 cursor-pointer bg-teal-500 h-20 flex justify-center items-center hover:bg-teal-400 transition-all text-white text-2xl">
                <FilterListIcon className='scale-100 mr-5' color='white' />
                Filters
              </div>
              <div onClick={() => setShowSort(!showSort)} className="col-xs-4 cursor-pointer border border-top-0 border-bottom-0 border-white bg-teal-500 h-20 flex justify-center items-center hover:bg-teal-400 transition-all text-white text-2xl">
                <BiSortAlt2 className='scale-100 mr-5' />
                Sort
              </div>
              <div onClick={() => setShowSearchSidebar(true)} className="col-xs-4 cursor-pointer bg-teal-500 h-20 flex justify-center items-center hover:bg-teal-400 transition-all text-white text-2xl">
                <MdSearch className='scale-100 mr-5' />
                Search

              </div>
            </div>
            <div style={showSort ? (window.innerWidth <= 986 ? { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", height: ctn.current.scrollHeight + "px" } : { height: "0" }) : { boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} ref={ctn} className="transition-all row rounded-md lg:px-2 lg:py-4 mb-3 bg-white sm:h-0 xs:h-0 lg:h-auto overflow-hidden xs:p-0">
              <div className="col-lg my-2">
                <p className='h4' > Sort results by:</p>
              </div>
              <div onClick={active} className="col-lg cursor-pointer my-2">
                <div className="flex w-100 justify-between border hover:bg-gray-200 transition-all">
                  <div className="flex items-end px-2 ">
                    <p className='text-secondary h6' >Price (Low to High)</p>
                  </div>
                  <div className={`flex flex-col justify-center py-1 px-3 text-white transition-all ${sortActive ? "bg-teal-500" : "bg-gray-400"}`}>
                    <ArrowDropUpIcon />
                    <ArrowDropDownIcon />
                  </div>
                </div>
              </div>
              <div onClick={active2} className="col-lg cursor-pointer my-2">
                <div className="flex w-100 justify-between border hover:bg-gray-200 transition-all">
                  <div className="flex items-end px-2">
                    <p className='text-secondary h6' >Airline Name (A to Z)</p>
                  </div>
                  <div className={`flex flex-col justify-center py-1 px-3 text-white transition-all ${sortActive2 ? "bg-teal-500" : "bg-gray-400"}`}>
                    <ArrowDropUpIcon />
                    <ArrowDropDownIcon />
                  </div>
                </div>
              </div>
              <div onClick={active3} className="col-lg cursor-pointer mt-2 mb-6">
                <div className="flex w-100 justify-between border hover:bg-gray-200 transition-all">
                  <div className="flex items-end px-2">
                    <p className='text-secondary h6' >Duration</p>
                  </div>
                  <div className={`flex flex-col justify-center py-1 px-3 text-white transition-all ${sortActive3 ? "bg-teal-500" : "bg-gray-400"}`}>
                    <ArrowDropUpIcon />
                    <ArrowDropDownIcon />
                  </div>
                </div>
              </div>
            </div>
            {flights &&
              flights.map((i) => (
                <EachFlight key={i.id} data={i} />
              ))
            }
            {totalLength !== flights?.length &&
              <div className="row">
                <div className="w-100 flex justify-center"><button className='w-72 px-3 py-2 bg-teal-500 text-white cursor-pointer hover:bg-teal-400 transition-all' onClick={loadMore} >Load More</button></div>
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
      <div style={{ background: "rgba(0,0,0,0.3)" }} className={`rounded-lg duration-500 transition-all fixed w-screen h-screen inset-0 ${showSearchSidebar ? "-translate-x-0" : "-translate-x-full"}`}>
        <div ref={searchSidebarRef} className={`w-9/12 bg-white border h-full px-6`}>
          <div className="row px-3 tex-gray-200 hover:text-teal-400 mt-3 mb-5 overflow-y-scroll py-1">
            <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold border-bottom">
              Modify Search
              <ClearIcon onClick={() => setShowSearchSidebar(false)} className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} />
            </div>
            <div className='text-gray-500 py-3' >
              <div className='mt-2' >
                <p className='h4' >Where</p>
                <div className='h6 mt-4 text-gray-300' >
                  <div>
                    LEAVING FROM
                    <input
                      type="text"
                      className="form-control block w-100 my-3 px-3 py-1.5 text-base font-normal text-gray-700 focus:bg-gray-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700  focus:border-teal-500 focus:outline-none"
                      id="exampleFormControlInput3"
                      placeholder="Default input"
                    />
                  </div>
                  <div>
                    GOING TO
                    <input
                      type="text"
                      className="form-control block w-100 my-3 px-3 py-1.5 text-base font-normal text-gray-700 focus:bg-gray-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:border-teal-500 focus:outline-none"
                      id="exampleFormControlInput3"
                      placeholder="Default input"
                    />
                  </div>
                </div>
              </div>
              <div className='mt-5' >
                <p className='h4' >When</p>
                <div className='h6 mt-4 text-gray-300' >
                  <div>
                    DEPARTING ON
                    <input
                      type="text"
                      className="form-control block w-100 my-3 px-3 py-1.5 text-base font-normal text-gray-700 focus:bg-gray-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700  focus:border-teal-500 focus:outline-none"
                      id="exampleFormControlInput3"
                      placeholder="Default input"
                    />
                  </div>
                  <div>
                    ARRIVAL
                    <input
                      type="text"
                      className="form-control block w-100 my-3 px-3 py-1.5 text-base font-normal text-gray-700 focus:bg-gray-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:border-teal-500 focus:outline-none"
                      id="exampleFormControlInput3"
                      placeholder="Default input"
                    />
                  </div>
                </div>
              </div>
              <div className='mt-5' >
                <p className='h4' >Passenger</p>
                <input
                  type="text"
                  className="form-control block w-100 my-3 px-3 py-1.5 text-base font-normal text-gray-700 focus:bg-gray-200 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700  focus:border-teal-500 focus:outline-none"
                  id="exampleFormControlInput3"
                  placeholder="Default input"
                />

              </div>
              <div className='mt-5' >
                <p className='h4' >Options</p>
                <div className='h6 mt-4 text-gray-300'>
                  <div>
                    CLASS
                    <select class="custom-select my-3 h5 border border-solid border-gray-300 focus:bg-gray-200  focus:outline-none px-3 py-1.5 w-100 focus:border-teal-500 focus:text-gray-700 transition ease-in-out">
                      <option selected>Economy</option>
                      <option value="1">Premium Economy</option>
                      <option value="2">Business</option>
                      <option value="3">First</option>
                    </select>
                  </div>
                  <div>
                    AIRLINES
                    <select class="custom-select my-3 h5 border border-solid border-gray-300 focus:bg-gray-200  focus:outline-none px-3 py-1.5 w-100 focus:border-teal-500 focus:text-gray-700 transition ease-in-out">
                      <option selected>All Airlines</option>
                      <option value="1">Premium Economy</option>
                      <option value="2">Business</option>
                      <option value="3">First</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: "rgba(0,0,0,0.3)" }} className={`rounded-lg duration-500 transition-all fixed w-screen h-screen inset-0 ${showFilterSidebar ? "-translate-x-0" : "-translate-x-full"}`}>
        <div ref={searchSidebarRef} className={`w-9/12 bg-white border h-full px-6 overflow-y-scroll`}>
        <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold border-bottom mt-4">
          Filters
          <ClearIcon onClick={() => setShowFilterSidebar(false)} className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} />
        </div>
          <div ref={filter} style={filterOption ? { height: "3.5rem" } : { height: filter.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-3 mb-5 overflow-hidden py-1">
          </div>

          <div ref={filter3} style={filterOption3 ? { height: "3.5rem" } : { height: filter3.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-1 mb-5 overflow-hidden py-1">
            <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold border-bottom" onClick={() => setfilterOption3(!filterOption3)}>
              Flight Stops
              {filterOption3 ?
                <AddCircleOutlinedIcon className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} /> :
                <RemoveCircleOutlinedIcon className='text-gray-300  transition-all' style={{ transform: "scale(1.8)" }} />
              }
            </div>
            <div className='text-gray-500 mt-4'>
              <div className="flex items-center py-2 bg-gray-200 my-2">
                <Checkbox onChange={stopFilter2} color="warning" className='scale-150' />
                2 stops ({globalScope.stops_2})
              </div>
              <div className="flex items-center py-2 bg-gray-200 my-2">
                <Checkbox onChange={stopFilter} color="warning" className='scale-150' />
                1 stops ({globalScope.stops_1})
              </div>
            </div>
          </div>


          <div ref={filter4} style={filterOption4 ? { height: "3.5rem" } : { height: filter4.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-1 mb-5 overflow-hidden py-1">
            <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold border-bottom" onClick={() => setfilterOption4(!filterOption4)}>
              Price
              {filterOption4 ?
                <AddCircleOutlinedIcon className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} /> :

                <RemoveCircleOutlinedIcon className='text-gray-300  transition-all' style={{ transform: "scale(1.8)" }} />

              }
            </div>
            <div className='text-gray-500' >
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                className="mt-4"
                color="info"
                max={globalScope?.price[1]}
                min={globalScope?.price[0]}
                skip={10}

              />
              <div className='flex justify-between w-100'>
                <p className='h6'>${globalScope?.price[0]}</p>
                <p className='h6'>${globalScope?.price[1]}</p>
              </div>
            </div>
          </div>


          <div ref={filter5} style={filterOption5 ? { height: "3.5rem" } : { height: filter5.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-1 mb-5 overflow-hidden py-1">
            <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold border-bottom" onClick={() => setfilterOption5(!filterOption5)}>
              Outbound Flight Times
              {filterOption5 ?
                <AddCircleOutlinedIcon className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} /> :

                <RemoveCircleOutlinedIcon className='text-gray-300  transition-all' style={{ transform: "scale(1.8)" }} />

              }
            </div>
            <div>
              <div className='flex items-center flex-col text-gray-500 my-2'>
                Departure
                <Slider
                  value={value2}
                  onChange={handleChange2}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  color="error"
                  max={globalScope?.outBoundDepart[1]}
                  min={globalScope?.outBoundDepart[0]}
                  skip={10}
                />
                <div className='flex justify-between w-100'>
                  <p className='h6'>{toHoursAndMinutes(globalScope?.outBoundDepart[0])}</p>
                  <p className='h6'>{toHoursAndMinutes(globalScope?.outBoundDepart[1])}</p>
                </div>
              </div>
              <div className='flex items-center flex-col text-gray-500'>
                Arrival
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={value3}
                  onChange={handleChange3}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  color="error"
                  max={globalScope?.outBoundArrival[1]}
                  min={globalScope?.outBoundArrival[0]}
                  skip={10}
                />
                <div className='flex justify-between w-100'>
                  <p className='h6'>{toHoursAndMinutes(globalScope?.outBoundArrival[0])}</p>
                  <p className='h6'>{toHoursAndMinutes(globalScope?.outBoundArrival[1])}</p>
                </div>
              </div>
            </div>
          </div>


          <div ref={filter6} style={filterOption6 ? { height: "3.5rem" } : { height: filter6.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-1 mb-5 overflow-hidden py-1">
            <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold border-bottom" onClick={() => setfilterOption6(!filterOption6)}>
              Return Flight Times
              {filterOption6 ?
                <AddCircleOutlinedIcon className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} /> :

                <RemoveCircleOutlinedIcon className='text-gray-300  transition-all' style={{ transform: "scale(1.8)" }} />

              }
            </div>
            <div>
              <div className='flex items-center flex-col text-gray-500 my-2'>
                Departure
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={value4}
                  onChange={handleChange4}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  color="warning"
                  max={globalScope?.inBoundDepart[1]}
                  min={globalScope?.inBoundDepart[0]}
                  skip={10}
                />
                <div className='flex justify-between w-100'>
                  <p className='h6'>{toHoursAndMinutes(globalScope?.inBoundDepart[0])}</p>
                  <p className='h6'>{toHoursAndMinutes(globalScope?.inBoundDepart[1])}</p>
                </div>
              </div>
              <div className='flex items-center flex-col text-gray-500'>
                Arrival
                <Slider
                  getAriaLabel={() => 'Temperature range'}
                  value={value5}
                  onChange={handleChange5}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  color="warning"
                  max={globalScope?.inBoundArrival[1]}
                  min={globalScope?.inBoundArrival[0]}
                  skip={10}
                />
                <div className='flex justify-between w-100'>
                  <p className='h6'>{toHoursAndMinutes(globalScope?.inBoundArrival[0])}</p>
                  <p className='h6'>{toHoursAndMinutes(globalScope?.inBoundArrival[1])}</p>
                </div>
              </div>
            </div>
          </div>


          <div ref={filter7} style={filterOption7 ? { height: "3.5rem" } : { height: filter7.current?.scrollHeight + "px" }} className="row px-3 tex-gray-200 hover:text-teal-400 transition-all mt-1 mb-1 overflow-hidden py-1">
            <div className="flex justify-between items-center cursor-pointer text-2xl font-semibold" onClick={() => setfilterOption7(!filterOption7)} >
              Journey Duration
              {filterOption7 ?
                <AddCircleOutlinedIcon className='text-teal-600 hover:text-teal-500 transition-all' style={{ transform: "scale(1.8)" }} /> :

                <RemoveCircleOutlinedIcon className='text-gray-300  transition-all' style={{ transform: "scale(1.8)" }} />

              }
            </div>
            <div className='text-gray-500' >
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value6}
                onChange={handleChange6}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                className="mt-4"
                color="success"
                max={globalScope?.journeyDuration[1]}
                min={globalScope?.journeyDuration[0]}
                skip={10}
              />
              <div className='flex justify-between w-100'>
                <p className='h6'>{toHoursAndMinutes(globalScope?.journeyDuration[0])}</p>
                <p className='h6'>{toHoursAndMinutes(globalScope?.journeyDuration[1])}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        isLoading &&
        <Loading />
      }
    </div>

  )
}

export default SearchFlight