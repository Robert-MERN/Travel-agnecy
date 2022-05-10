import React, { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
// This values are the props in the UI
const amount = "2";
const currency = "USD";
const style = { "layout": "vertical", width: "38rem" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);


  return (<>
    {(showSpinner && isPending) && <div className="spinner" />}
    <PayPalButtons
      disabled={false}
      forceReRender={[amount, currency, style]}
      fundingSource={undefined}
      createOrder={(data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          })
          .then((orderId) => {
            // Your code here after create the order
            return orderId;
          });
      }}
      onApprove={(data, actions)=> {
        return actions.order.capture().then(()=> {
          // Your code here after capture the order
        });
      }}
    />
  </>
  );
}

function Paypal() {
  return (
    <div style={{ width: "100vw", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#a1f7ef" }}>
      <PayPalScriptProvider
        options={{
          "client-id": "AZkECafp_A50WerCRYwENxt6uOKOyE4lzKV2mtpXOiDOCP2MwrclNUqqogZCFnu82TsdVx8nxaK2vl_l",
          components: "buttons",
          currency: "USD"
        }}
      >
        <ButtonWrapper
          currency={currency}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  )
}


export default Paypal