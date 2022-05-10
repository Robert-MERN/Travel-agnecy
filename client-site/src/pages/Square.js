import React, { useState } from 'react'
import {
  SquarePaymentForm,
  CreditCardSubmitButton,
  SimpleCard,
} from 'react-square-payment-form'
import 'react-square-payment-form/lib/default.css'
import styled from "styled-components"
import { mobile } from "../Responsive";

function Square() {
  const [error, setError] = useState({
    errorMessages: []
  });
  const cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
    if (errors) {
      setError({ errorMessages: errors.map(err => err.message) })
      return
    }

    setError({ errorMessages: [] })
    alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)
  }
  const createVerificationDetails = () => {
    return {
      amount: '100.00',
      currencyCode: "USD",
      intent: "CHARGE",
      billingContact: {
        familyName: "Smith",
        givenName: "John",
        email: "jsmith@example.com",
        country: "GB",
        city: "London",
        addressLines: ["1235 Emperor's Gate"],
        postalCode: "SW7 4JA",
        phone: "020 7946 0532"
      }
    }
  }
  return (
    <PaypalBG>
      <div className='square-wrapper' >
        <div className="image-wrapper">
          <img src="https://axen-trave-test.herokuapp.com/images/square.jpg" alt="" />
          <h2 style={{ color: "#515152" }} >Square Checkout</h2>
        </div>
        <SquarePaymentForm
          sandbox={true}
          applicationId={"sandbox-sq0idb-z1oiQEJwqDtXjnbno16mNw"}
          locationId={"L0AD5S11J7BZY"}
          cardNonceResponseReceived={cardNonceResponseReceived}
          createVerificationDetails={createVerificationDetails}
        >
          <SimpleCard />
          <CreditCardSubmitButton>
            Pay $1.00
          </CreditCardSubmitButton>
        </SquarePaymentForm>
        <div className="sq-error-message">
          {error.errorMessages.map(errorMessage =>
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          )}
        </div>
      </div>
    </PaypalBG>
  )
}

const PaypalBG = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: gray;
  display: grid;
  place-items: center;
  overflow-x: hidden;
  .square-wrapper{
    padding: 100px;
    border-radius: 12px;
    background-color: white;
    ${mobile({padding: "120px 10px"})}

  }
  .image-wrapper{
    display: flex;
    align-items: center;
  }
  img{
    width: 80px;
    object-fit: cover;
  }
`

export default Square