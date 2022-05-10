import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

function Item() {
  const key = useLocation().state
  console.log(key);
  return (
      <AfterBooking>
        <h1>Your Flight has been Booked</h1>
        <h3>this is your Id: <span>'{key?.data.id}'</span> </h3>
        <h1>Other Data:</h1>
        <p>{JSON.stringify(key)}</p>
      </AfterBooking>
  )
}

const AfterBooking = styled.div`
  width: 100vw;
  height: 100vh;
  h1{
    margin: auto;
  }
  h3{
    color: "green";
    margin: auto;
    span{
      font-size: 16px;
    }
  }

`

export default Item