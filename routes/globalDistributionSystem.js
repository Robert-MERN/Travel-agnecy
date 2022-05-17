const express = require("express");
const router = express.Router();
const Amadeus = require("amadeus");
const td = require("tinyduration");

const amadeus = new Amadeus({
  clientId: "v502LHPcUTmn0Td95l6nXy5J2997GPMh",
  clientSecret: "bNS7Wh7tT3AxUxdU",
});

const multiply = (arr) => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      total += arr[i] * 60
    } else {
      total += arr[i];
    };
  }
  return total;
};


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
var FlightSearchedData = [];
let defaultFilter = {
  inBoundDepart: [],
  inBoundArrival: [],
  outBoundDepart: [],
  outBoundArrival: [],
  journeyDuration: [],
  price: [],
  stops_1: Number,
  stops_2: Number
}
router.post('/date', async function (req, res) {
  let limitSearch = []
  const firstIndex = req.query.first;
  const lastIndex = req.query.last
  if (FlightSearchedData.length < 1 || req.query.search) {
    var response = await amadeus.shopping.flightOffersSearch.get(req.body).catch(err => console.log(err))
    if (response) {
      var parsed = JSON.parse(response.body).data
      FlightSearchedData = parsed;
      // inBoundDepart
      const inBoundDepartFull = parsed.sort((a, b) => {
        return (multiply(Object.values(td.parse(a.itineraries[0].segments[0].duration)))) - (multiply(Object.values(td.parse(b.itineraries[0].segments[0].duration))));
      });
      const startInDepart = multiply(Object.values(td.parse(inBoundDepartFull[0].itineraries[0].segments[0].duration)));
      const lastInDepart = multiply(Object.values(td.parse(inBoundDepartFull[inBoundDepartFull.length - 1].itineraries[0].segments[0].duration)));
      defaultFilter.inBoundDepart = [startInDepart, lastInDepart];

      // inBoundArrival
      const inBoundArrivalFull = parsed.sort((a, b) => {
        return (multiply(Object.values(td.parse(a.itineraries[0].segments[a.itineraries[0].segments.length - 1]?.duration)))) - (multiply(Object.values(td.parse(b.itineraries[0].segments[(b.itineraries[0].segments.length) - 1]?.duration))));
      });
      const startInArrive = multiply(Object.values(td.parse(inBoundArrivalFull[0].itineraries[0].segments[0].duration)));
      const lastInArrive = multiply(Object.values(td.parse(inBoundArrivalFull[inBoundArrivalFull.length - 1].itineraries[0].segments[0].duration)));
      defaultFilter.inBoundArrival = [startInArrive, lastInArrive];

      // outBoundDepart
      const outBoundDepartFull = parsed.sort((a, b) => {
        return (multiply(Object.values(td.parse(a.itineraries[1].segments[0].duration)))) - (multiply(Object.values(td.parse(b.itineraries[1].segments[0].duration))));
      });
      const startOutDepart = multiply(Object.values(td.parse(outBoundDepartFull[0].itineraries[0].segments[0].duration)));
      const lastOutDepart = multiply(Object.values(td.parse(outBoundDepartFull[outBoundDepartFull.length - 1].itineraries[0].segments[0].duration)));
      defaultFilter.outBoundDepart = [startOutDepart, lastOutDepart];

      // outBoundArrival
      const outBoundArrivalFull = parsed.sort((a, b) => {
        return (multiply(Object.values(td.parse(a.itineraries[1].segments[(a.itineraries[1].segments.length) - 1].duration)))) - (multiply(Object.values(td.parse(b.itineraries[1].segments[(a.itineraries[1].segments.length) - 1].duration))));
      });
      const startOutArrive = multiply(Object.values(td.parse(outBoundArrivalFull[0].itineraries[0].segments[0].duration)));
      const lastOutArrive = multiply(Object.values(td.parse(outBoundArrivalFull[outBoundArrivalFull.length - 1].itineraries[0].segments[0].duration)));
      defaultFilter.outBoundArrival = [startOutArrive, lastOutArrive];

      // journeyDuration
      const journeyDurationFull = parsed.sort((a, b) => {
        return ((multiply(Object.values(td.parse(a.itineraries[0].duration)))) + (multiply(Object.values(td.parse(a.itineraries[1].duration))))) - ((multiply(Object.values(td.parse(b.itineraries[0].duration)))) + (multiply(Object.values(td.parse(b.itineraries[1].duration)))))
      });
      const startJourney = ((multiply(Object.values(td.parse(journeyDurationFull[0].itineraries[0].duration)))) + (multiply(Object.values(td.parse(journeyDurationFull[0].itineraries[1].duration)))));
      const lastJourney = ((multiply(Object.values(td.parse(journeyDurationFull[journeyDurationFull.length - 1].itineraries[0].duration)))) + (multiply(Object.values(td.parse(journeyDurationFull[journeyDurationFull.length - 1].itineraries[1].duration)))));
      defaultFilter.journeyDuration = [startJourney, lastJourney];

      // price
      const priceFull = parsed.sort((a, b) => {
        return parseInt(a.price.grandTotal.replace(/,/g, '') - parseInt(b.price.grandTotal.replace(/,/g, '')));
      });
      const startPrice = Math.ceil(priceFull[0].price.grandTotal);
      const lastPrice = Math.ceil(priceFull[priceFull.length - 1].price.grandTotal);
      defaultFilter.price = [startPrice, lastPrice];


      // stop_1
      const fullStop_1 = parsed.filter((a) => {
        return a.itineraries[0].segments.length <= 3
      });
      defaultFilter.stops_1 = fullStop_1.length;
      // stop_2
      const fullStop_2 = parsed.filter((a) => {
        return a.itineraries[0].segments.length >= 4
      });
      defaultFilter.stops_2 = fullStop_2.length;
    } else {
      FlightSearchedData = []
    }

  };
  // filters logics
  if (req.query.filter) {
    let filteredData = FlightSearchedData;

    // outbound Departure Duration Filter
    if (req.query.outDepartureDuration) {
      let valueFrom = req.query.valueFrom
      let valueTo = req.query.valueTo
      filteredData = filteredData.filter((a) => {
        return (multiply(Object.values(td.parse(a.itineraries[0].segments[0].duration))) >= Number(valueFrom)) && (multiply(Object.values(td.parse(a.itineraries[0].segments[0].duration)))) <= Number(valueTo);
      });
      limitSearch = filteredData;
    }


    // outbound Arrival Duration Filter
    if (req.query.outArrivalDuration) {
      let valueFrom = req.query.valueFrom
      let valueTo = req.query.valueTo
      filteredData = filteredData.filter((a) => {
        return (multiply(Object.values(td.parse(a.itineraries[0].segments[(a.itineraries[0].segments.length) - 1].duration)))) >= Number(valueFrom) && (multiply(Object.values(td.parse(a.itineraries[0].segments[(a.itineraries[0].segments.length) - 1].duration)))) <= Number(valueTo);
      });
      limitSearch = filteredData;
    }


    // inbound Departure Duration Filter
    if (req.query.inDepartureDuration) {
      let valueFrom = req.query.valueFrom
      let valueTo = req.query.valueTo
      filteredData = filteredData.filter((a) => {
        return (multiply(Object.values(td.parse(a.itineraries[1].segments[0].duration)))) >= Number(valueFrom) && (multiply(Object.values(td.parse(a.itineraries[1].segments[0].duration)))) <= Number(valueTo);
      });
      limitSearch = filteredData;
    }


    // inbound Arrival Duration Filter
    if (req.query.inArrivalDuration) {
      let valueFrom = req.query.valueFrom
      let valueTo = req.query.valueTo
      filteredData = filteredData.filter((a) => {
        return (multiply(Object.values(td.parse(a.itineraries[1].segments[(a.itineraries[1].segments.length) - 1].duration)))) >= Number(valueFrom) && (multiply(Object.values(td.parse(a.itineraries[1].segments[(a.itineraries[1].segments.length) - 1].duration)))) <= Number(valueTo);
      });
      limitSearch = filteredData;
    }


    // Total Duration Filter
    if (req.query.totalDurationFilter) {
      let valueFrom = req.query.valueFrom
      let valueTo = req.query.valueTo
      filteredData = filteredData.filter((a) => {
        return ((multiply(Object.values(td.parse(a.itineraries[0].duration)))) + (multiply(Object.values(td.parse(a.itineraries[1].duration))))) >= Number(valueFrom) && ((multiply(Object.values(td.parse(a.itineraries[0].duration)))) + (multiply(Object.values(td.parse(a.itineraries[1].duration))))) <= Number(valueTo)
      });
      limitSearch = filteredData;
      console.log((multiply(Object.values(td.parse(FlightSearchedData[0].itineraries[0].duration)))) + (multiply(Object.values(td.parse(FlightSearchedData[0].itineraries[1].duration)))))
    }
    // stop 1 filter
    if (req.query.stopOne) {
      filteredData = FlightSearchedData.filter((a) => {
        return a.itineraries[0].segments.length === 3
      });
      limitSearch = filteredData;
    };

    // stop 2 filter
    if (req.query.stopTwo) {
      filteredData = FlightSearchedData.filter((a) => {
        return a.itineraries[0].segments.length === 4
      });
      limitSearch = filteredData;
    }

    // price filter
    if (req.query.price) {
      let valueFrom = req.query.valueFrom
      let valueTo = req.query.valueTo
      filteredData = FlightSearchedData.filter((i) => {
        return (parseInt(i.price.grandTotal.replace(/,/g, ''))) >= valueFrom && (parseInt(i.price.grandTotal.replace(/,/g, ''))) <= valueTo;
      })
    }


  } else if (req.query.sort) {
    // price sort
    if (req.query.sort === "price") {
      FlightSearchedData.sort((a, b) => {
        return parseInt(a.price.grandTotal.replace(/,/g, '') - parseInt(b.price.grandTotal.replace(/,/g, '')));
      });
      limitSearch = FlightSearchedData
    }

    // airline names sort
    else if (req.query.sort === "name") {
      FlightSearchedData.sort((a, b) => a.validatingAirlineCodes[0] - b.validatingAirlineCodes[0]);
      limitSearch = FlightSearchedData
    }

    // Duration Sort
    else if (req.query.sort === "duration") {
      FlightSearchedData.sort((a, b) => {
        return ((multiply(Object.values(td.parse(a.itineraries[0].duration)))) + (multiply(Object.values(td.parse(a.itineraries[1].duration))))) - ((multiply(Object.values(td.parse(b.itineraries[0].duration)))) + (multiply(Object.values(td.parse(b.itineraries[1].duration)))))
      })
      limitSearch = FlightSearchedData
    }

  };
  let lastSearch = [];
  if (limitSearch.length > 0) {
    lastSearch = limitSearch.slice(firstIndex, lastIndex);
    defaultFilter.totalLength = limitSearch.length;
  } else {
    lastSearch = FlightSearchedData.slice(firstIndex, lastIndex)
    defaultFilter.totalLength = FlightSearchedData.length;
  }
  try {
    await res.status(200).json({ lastSearch, defaultFilter });
  } catch (err) {
    await res.status(501).json(err);
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