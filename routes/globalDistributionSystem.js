const express = require("express");
const router = express.Router();
const Amadeus = require("amadeus");

const amadeus = new Amadeus({
  clientId: "2ADK89fUdkhFaisFSHTU4yiaDkb3g2wK",
  clientSecret: "jqS8skW2bYZ7joIe",
});

router.get(`/citySearch`, async (req, res) => {
  console.log(req.query);
  var keywords = req.query.keyword;
  const response = await amadeus.referenceData.locations
    .get({
      keyword: "BKK",
      subType: "CITY,AIRPORT",
    })
    .catch((x) => console.log(x));
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

// flight Search
router.post('/date', async function (req, res) {
  const response = await amadeus.shopping.flightOffersSearch.get(req.body).catch(err => console.log(err))
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});
// flight pricing
router.post('/flightprice', async function (req, res) {
  const responsePricing = await amadeus.shopping.flightOffers.pricing.post(
    JSON.stringify({
      'data': {
        'type': 'flight-offers-pricing',
        'flightOffers': [req.body]
      }
    })).catch(err => console.log(err))
  try {
    await res.status(200).json(JSON.parse(responsePricing.body));
  } catch (err) {
    await res.status(401).json(err);
  }
})


// book flight
router.post('/flightCreateOrder', async (req, res) => {
  console.log(req.body)
  let inputFlightCreateOrder = req.body.flight;
  var info = req.body.traveler;
  const returnBooking = await amadeus.booking.flightOrders.post(
    JSON.stringify({
      "data": {
        "type": "flight-order",
        "flightOffers": [inputFlightCreateOrder],
        "travelers": [
          {
            "id": "1",
            "dateOfBirth": info.dateOfBirth,
            "name": {
              "firstName": info.firstName,
              "lastName": info.lastName,
            },
            "gender": info.gender,
            "contact": {
              "emailAddress": info.email,
              "phones": [
                {
                  "deviceType": "MOBILE",
                  "countryCallingCode": info.countryCallingCode,
                  "number": info.number
                }
              ]
            },
            "documents": [
              {
                "documentType": "PASSPORT",
                "birthPlace": info.birthPlace,
                "issuanceLocation": info.issuanceLocation,
                "issuanceDate": info.issuanceDate,
                "number": info.passportNumber,
                "expiryDate": info.expiryDate,
                "issuanceCountry": info.issuanceCountry,
                "validityCountry": info.validityCountry,
                "nationality": info.nationality,
                "holder": info.holder,
              }
            ]
          }
        ]
      }
    })
  ).catch((responseError) => {
    console.log(responseError);
  });

  try {
    await res.json(JSON.parse(returnBooking.body));
  } catch (err) {
    await res.json(err);
  }
})




// // book flight
// router.post('/flightCreateOrder', async (req, res) => {
//   console.log(req.body)
//   let flight = req.body.flight;
//   // var info = req.body.traveler; 
//   amadeus.booking.flightOrders.post(
//     JSON.stringify({
//       'data': {
//         'type': 'flight-order',
//         'flightOffers': [flight],
//         'travelers': [{
//           "id": "1",
//           "dateOfBirth": "1982-01-16",
//           "name": {
//             "firstName": "MUNEEB",
//             "lastName": "SAFEER",
//           },
//           "gender": "MALE",
//           "contact": {
//             "emailAddress": "jorge.gonzales833@telefonica.es",
//             "phones": [{
//               "deviceType": "MOBILE",
//               "countryCallingCode": "92",
//               "number": "480080076"
//             }]
//           },
//           "documents": [{
//             "documentType": "PASSPORT",
//             "birthPlace": "Karachi",
//             "issuanceLocation": "Karachi",
//             "issuanceDate": "2015-04-14",
//             "number": "00000000",
//             "expiryDate": "2025-04-14",
//             "issuanceCountry": "ES",
//             "validityCountry": "ES",
//             "nationality": "ES",
//             "holder": true
//           }]
//         }]
//       }
//     })
//   ).then(function (response) {
//     res.send(response.result);
//   }).catch(function (response) {
//     res.send(response);
//   });

// });




module.exports = router