import React from 'react'
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { GiAirplaneDeparture } from "react-icons/gi";
import { GiAirplaneArrival } from "react-icons/gi";
import Radio from '@mui/material/Radio';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import WorkIcon from '@material-ui/icons/Work';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { parse } from 'tinyduration'
import toHoursAndMinutes from './toHoursAndMinutes';
import { toMinutes } from "./toMinutes";
import Data from "../importantData/cityAndAirportInfo.json";

function EachFlight({data}) {
    // heding of destination

    let information = [];
    const DataChild = Data.map((a) => {
        return Object.entries(a)
    });
    DataChild.map((i) => {
        return i.map(i => information.push(i[1]))
    });
    const departureCity = information.find(i => i.iata === data.itineraries[0].segments[0].departure.iataCode)?.city
    const arrivalCity = information.find(i => i.iata === data.itineraries[0].segments[data.itineraries[0].segments.length - 1].arrival.iataCode)?.city

    // outbound
    const out_totalDuration = toHoursAndMinutes(toMinutes(Object.values(parse(data.itineraries[0].duration))), true);

    const stops1 = data.itineraries[0].segments.length - 2
    // // // deaprture
    const dep_day1 = new Date(data.itineraries[0].segments[0].departure.at).toLocaleString("en-us", {day: "numeric"});
    const dep_weekday1 = new Date(data.itineraries[0].segments[0].departure.at).toLocaleString("en-us", {weekday: "short"});
    const dep_month1 = new Date(data.itineraries[0].segments[0].departure.at).toLocaleString("en-us", {month: "short"});
    const dep_iata1 = data.itineraries[0].segments[0].departure.iata;
    const dep_time1 = toHoursAndMinutes(toMinutes(Object.values(parse(data.itineraries[0].segments[0].duration))));
    // // // arrival
    const arr_day1 = new Date(data.itineraries[0].segments[data.itineraries[0].segments.length -1].departure.at).toLocaleString("en-us", {day: "numeric"});
    const arr_weekday1 = new Date(data.itineraries[0].segments[data.itineraries[0].segments.length -1].departure.at).toLocaleString("en-us", {weekday: "short"});
    const arr_month1 = new Date(data.itineraries[0].segments[data.itineraries[0].segments.length -1].departure.at).toLocaleString("en-us", {month: "short"}); 
    const arr_iata1 = data.itineraries[0].segments[data.itineraries[0].segments.length - 1].arrival.iata;
    const arr_time1 = toHoursAndMinutes(toMinutes(Object.values(parse(data.itineraries[0].segments[data.itineraries[0].segments.length - 1].duration))));
    // inbound
    const in_totalDuration = toHoursAndMinutes(toMinutes(Object.values(parse(data.itineraries[1].duration))), true);
    const stops2 = data.itineraries[1].segments.length - 2
    // // // deaprture
    const dep_day2 = new Date(data.itineraries[1].segments[0].departure.at).toLocaleString("en-us", {day: "numeric"});
    const dep_weekday2 = new Date(data.itineraries[1].segments[0].departure.at).toLocaleString("en-us", {weekday: "short"});
    const dep_month2 = new Date(data.itineraries[1].segments[0].departure.at).toLocaleString("en-us", {month: "short"});
    const dep_iata2= data.itineraries[1].segments[0].departure.iata;
    const dep_time2 = toHoursAndMinutes(toMinutes(Object.values(parse(data.itineraries[1].segments[0].duration))));
    // // // arrival
    const arr_day2 = new Date(data.itineraries[1].segments[data.itineraries[1].segments.length -1].departure.at).toLocaleString("en-us", {day: "numeric"});
    const arr_weekday2 = new Date(data.itineraries[1].segments[data.itineraries[1].segments.length -1].departure.at).toLocaleString("en-us", {weekday: "short"});
    const arr_month2 = new Date(data.itineraries[1].segments[data.itineraries[1].segments.length -1].departure.at).toLocaleString("en-us", {month: "short"});
    const arr_iata2 = data.itineraries[1].segments[data.itineraries[1].segments.length - 1].arrival.iata; 
    const arr_time2 = toHoursAndMinutes(toMinutes(Object.values(parse(data.itineraries[1].segments[data.itineraries[1].segments.length - 1].duration))));
    return (
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }} className='row rounded-md px-2 py-4 bg-white my-4' >
            <div className="flex items-center justify-between border-bottom">
                <div className='h4 text-gray-500' >{departureCity} <span className='h3 text-warning mx-2' >→</span> {arrivalCity}</div>
                <div className='text-gray-400 font-semibold'>
                    <AirplanemodeActiveIcon className='scale-150 text-amber-300 mr-4' />
                    Return Flight
                </div>
            </div>
            <div className="row-sm flex-xs flex-col-xs justify-center-xs item-center-xs">
                <div className="col-md-10 p-0">
                    <div>
                        <div className='w-100 px-4 py-3 bg-teal-100 flex items-center text-gray-500 border-top border-blue'>
                            <GiAirplaneDeparture className='scale-150 mr-5 text-teal-700' />
                            OUTBOUND
                        </div>
                        <div className='px-4 py-3 flex items-center justify-between' >
                            <Radio defaultChecked />
                            <img className='border h-28 w-48 object-contain xs:hidden md:block' src={`https://content.airhex.com/content/logos/airlines_${data.itineraries[0].segments[0].carrierCode}_300_100_r.png?md5apikey=VDjfGgv8mxiTvvLLwGicD6V2eq`} alt="" />
                            <div className='flex' >
                                <div className='px-3 text-center' >
                                    <p className='font-semibold text-teal-700' >{dep_time1}</p>
                                    <p className='text-gray-400' >{dep_weekday1 + " " + dep_day1 + " " + dep_month1}</p>
                                    <p className='font-semibold text-teal-700'>{dep_iata1}</p>
                                </div>
                                <div className='flex justify-center flex-col items-center px-2' >
                                    <ArrowRightAltIcon style={{ transform: "scaleX(5.5) scaleY(1.5)" }} className="text-amber-400" />
                                    <p style={{ fontSize: "10px" }} className='py-2 sm:px-4 bg-teal-400 text-white h6 md:w-24 text-center xs:text-xs xs:w-20' >{stops1} STOP</p>
                                </div>
                                <div className='px-3 text-center'>
                                    <p className='font-semibold text-teal-700'>{arr_time2}</p>
                                    <p className='text-gray-400'>{arr_weekday1 + " " + arr_day1 + " " + arr_month1}</p>
                                    <p className='font-semibold text-teal-700'>{arr_iata1}</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center' >
                                <div className='flex items-center my-1' >
                                    <div className='w-10 h-10 flex justify-center items-center bg-gray-300 rounded-full mx-1 cursor-pointer' >
                                        <WorkIcon className='text-amber-600 xs:scale-75' />
                                    </div>
                                    <div className='w-10 h-10 flex justify-center items-center bg-gray-300 rounded-full mx-1 cursor-pointer' >
                                        <AirlineSeatReclineExtraIcon className='text-blue-800 scale-125  xs:scale-75' />
                                    </div>
                                </div>
                                <div className='xs:hidden items-center justify-between my-1 cursor-pointer lg:flex' >
                                    <div className='w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full mx-1' >
                                        <QueryBuilderIcon className='text-amber-400 scale-125' />
                                    </div>
                                    <div style={{ fontSize: "11px" }} className='mx-1 text-gray-400 font-semibold' >{out_totalDuration}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='w-100 px-4 py-3 bg-teal-100 flex items-center text-gray-500 border-top border-blue'>
                            <GiAirplaneArrival className='scale-150 mr-5 text-teal-700' />
                            INBOUND
                        </div>
                        <div className='px-4 py-3 flex items-center justify-between' >
                            <Radio defaultChecked />
                            <img className='border h-28 w-48 object-contain xs:hidden md:block' src={`https://content.airhex.com/content/logos/airlines_${data.itineraries[1].segments[0].carrierCode}_300_100_r.png?md5apikey=VDjfGgv8mxiTvvLLwGicD6V2eq`} alt="" />
                            <div className='flex' >
                                <div className='px-3 text-center' >
                                    <p className='font-semibold text-teal-700' >{dep_time2}</p>
                                    <p className='text-gray-400' >{dep_weekday2 + " " + dep_day2 + " " + dep_month2}</p>
                                    <p className='font-semibold text-teal-700'>{dep_iata2}</p>
                                </div>
                                <div className='flex justify-center flex-col items-center px-2' >
                                    <ArrowRightAltIcon style={{ transform: "scaleX(5.5) scaleY(1.5)" }} className="text-amber-400" />
                                    <p style={{ fontSize: "10px" }} className='py-2 sm:px-4 bg-teal-400 text-white h6 md:w-24 xs:w-20 text-center xs:text-xs' >{stops2} STOP</p>
                                </div>
                                <div className='px-3 text-center'>
                                    <p className='font-semibold text-teal-700'>{arr_time2}</p>
                                    <p className='text-gray-400'>{arr_weekday2 + " " + arr_day2 + " " + arr_month2}</p>
                                    <p className='font-semibold text-teal-700'>{arr_iata2}</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center' >
                                <div className='flex items-center my-1' >
                                    <div className='w-10 h-10 flex justify-center items-center bg-gray-300 rounded-full mx-1 cursor-pointer' >
                                        <WorkIcon className='text-amber-600' />
                                    </div>
                                    <div className='w-10 h-10 flex justify-center items-center bg-gray-300 rounded-full mx-1 cursor-pointer' >
                                        <AirlineSeatReclineExtraIcon className='text-blue-800 scale-125  xs:scale-75' />
                                    </div>
                                </div>
                                <div className='xs:hidden items-center justify-between my-1 cursor-pointer lg:flex' >
                                    <div className='w-10 h-10 flex justify-center items-center bg-gray-200 rounded-full mx-1' >
                                        <QueryBuilderIcon className='text-amber-400 scale-125  xs:scale-75' />
                                    </div>
                                    <div style={{ fontSize: "11px" }} className='mx-1 text-gray-400 font-semibold' >{in_totalDuration}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 p-0 md:h-96 xs:h-auto xs:border-t">
                    <div className="flex md:flex-col xs-flex-row xs:justify-around  md:justify-center xs:items-center  w-100 h-100">
                        <div className='text-center text-gray-500 my-3 xs:m-0'>
                            Total Price
                            <div style={{ fontSize: "20px" }} className='font-semibold text-teal-700' >${data.price.grandTotal}</div>
                        </div>
                        <div style={{ fontSize: "16px" }} className='py-2 px-5 bg-teal-500 cursor-pointer text-white hover:bg-teal-400 transition-all' >Select</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EachFlight