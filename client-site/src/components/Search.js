import React from 'react'
import Data from "../importantData/cityAndAirportInfo.json";
import styled from "styled-components";
import FlightIcon from '@mui/icons-material/Flight';
import { mobile } from '../Responsive';
import Data2 from "../importantData/countries.json";



function Search({ chracter, setValue, check, placingOrder, name, searchChange, countryBool }) {
    let information = [];
    const data = Data.map((a) => {
        return Object.entries(a)
    });
    data.map((i) => {
        return i.map(i => information.push(i[1]))
    });
    
    const Default = () => (
        <>
            <p className='search-key' >Matching with {`"${chracter}"`}</p>
            {information.filter((i) => i.city.toLowerCase().includes(chracter.toLowerCase()) || i.iata.toLowerCase().includes(chracter.toLowerCase())).slice(0, 21).map(d => (
                <div key={d.name} className="search-name" onClick={() => check ? (check.includes(`${d.iata}- ${d.name}, ${d.city}, ${d.country}`) ? setValue("") : setValue(`${d.iata}- ${d.name}, ${d.city}, ${d.country}`)) : setValue(`${d.iata}- ${d.name}, ${d.city}, ${d.country}`)} >
                    <FlightIcon style={{ marginRight: "12px", color: "lightskyblue", transform: "scale(1.2) rotate(90deg)" }} className='icon' />
                    <p>{`${d.iata}- ${d.name}, ${d.city}, ${d.country}`} </p>
                </div>
            ))}
        </>
    )
    const Country = () =>
    (<>
        <p className='search-key' >Matching with {`"${chracter}"`}</p>
        {Data2.filter((i) => i.name.toLowerCase().includes(chracter.toLowerCase()) || i.code.toLowerCase().includes(chracter.toLowerCase()) || i.dial_code.includes(chracter)).slice(0, 21).map(d => (
            <div key={d.code} className="search-name" onClick={() =>countryBool === "name"?searchChange(name, d.name):countryBool === "calling_code"? searchChange(name, d.dial_code):searchChange(name, d.code) } >
                <FlightIcon style={{ marginRight: "12px", color: "lightskyblue", transform: "scale(1.2) rotate(90deg)" }} className='icon' />
                <p>{d.name} </p>
            </div>
        ))}
    </>
    )
    const City = () =>
    (<>
        <p className='search-key' >Matching with {`"${chracter}"`}</p>
        {information.filter((i) => i.city.toLowerCase().includes(chracter.toLowerCase())).slice(0, 21).map(d => (
            <div key={d.city} className="search-name" onClick={() => searchChange(name, d.city)} >
                <FlightIcon style={{ marginRight: "12px", color: "lightskyblue", transform: "scale(1.2) rotate(90deg)" }} className='icon' />
                <p>{d.city}</p>
            </div>
        ))}
    </>
    )
    return (
        <SearchWrapper edit={placingOrder} >
            {placingOrder==="country" ?
                <Country />
                :placingOrder==="city"?
                <City />
                :
                <Default />
            }
        </SearchWrapper>
    )


}

const SearchWrapper = styled.div`
    position: absolute;
    width: 100rem;
    padding: 2px 5px;
    max-width: 28rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #fff;
    font-family: sans-serif;
    z-index: 300000;
    
    ${mobile({ width: "100%", zIndex: "300000"  })}

    .search-key{
        padding: 6px 0;
        border-bottom: 1px solid #d9d9d9;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: auto;
        overflow: hidden;
    }
    .search-name{
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 100ms ease-out;
        padding: 0 8px;
        p{
            white-space: nowrap;
            text-overflow: ellipsis;
            width: auto;
            overflow: hidden;
            color: #737373;
            font-family: sans-serif;
            font-size: 12px;
            padding-top: 10px;
            -webkit-tap-highlight-color: transparent;
            cursor: pointer;

        }
        &:hover{
            background-color: #DBFCFF;
        }
    }
    @keyframes open {
        from{
            transform: scaleY(0.8);
        } to {
            transform: scaleY(1);
        }
    }

`

export default Search