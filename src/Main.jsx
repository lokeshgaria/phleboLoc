import React, { useState, useEffect } from "react";
import { compose, withProps } from "recompose";
import { useDispatch, useSelector } from "react-redux";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";

import Select from "react-select";

const ApiData = [
  {
    id: 1,
    booking: {
      customer_areapincode: 30,
      customer_latitude: 26.8467,
      customer_longitude: 80.9462,
      id: 2047,
    },
    created_at: "2021-09-21T14:58:37.067737+05:30",
    current_status: "punched",
    current_time: "2021-09-21T14:58:37.067776+05:30",
    phlebo_latitude: 27.8974,
    phlebo_longitude: 78.088,
    updated_at: "2021-09-21T14:58:37.068483+05:30",
    phlebo: {
      id: 8,
      name: "PhleboUser",
      phonenumber: "8508611110",
    },
  },
  {
    id: 2,
    booking: {
      customer_areapincode: 30,
      customer_latitude: 28.7041,
      customer_longitude: 77.1025,
      id: 2017,
    },
    created_at: "2021-09-21T14:58:37.067737+05:30",
    current_status: "punched",
    current_time: "2021-09-21T14:58:37.067776+05:30",
    phlebo_latitude: 25.4358,
    phlebo_longitude: 81.8463,
    updated_at: "2021-09-21T14:58:37.068483+05:30",
    phlebo: {
      id: 9,
      name: "user 3",
      phonenumber: "8502211110",
    },
  },
];
const source = [
  { value: [26.8467, 80.9462], label: "Lucknow" },
  { value: [28.7041, 77.1025], label: "Delhi" },
  { value: [25.3176, 82.9739], label: "Varanasi" },
];

const dest = [
  { value: [27.8974, 78.088], label: "Aligarh" },
  { value: [25.4358, 81.8463], label: "Prayagraj" },
  { value: [27.1767, 78.0081], label: "Agra" },
];

console.log("apiData", ApiData);
const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCjvdxLcV0nMOPwZqybUPkDL_HdbYlIrsY&v=3.exp&libraries=geometry,drawing,places", //  props for "withScriptjs" HOC.
    loadingElement: <div style={{ height: `50%` }} />, // props for "withScriptjs" HOC.
    containerElement: <div style={{ height: `600px` }} />, // props for "withGoogleMap"
    mapElement: <div style={{ height: `70%` }} />, // props for "withGoogleMap"
  }),
  withScriptjs, // to correctly load Google Maps JavaScript API v3
  withGoogleMap // initialize the MapWithADirectionsRenderer with DOM instances
)(() => {
  const [direction, setDirection] = useState();
  const [selectedSourceLocation, setSelectedSourceLocation] = useState({
    value: [26.8467, 80.9462],
    label: "Lucknow",
  });
  const [selectedDestLocation, setSelectedDestLocation] = useState({
    value: [25.4358, 81.8463],
    label: "Prayagraj",
  });

  //states
  const [phelbo, setPhlebo] = useState();
  const handleSelectedSourceLocation = (location) => {
    console.log(location);
    setSelectedSourceLocation(location);
  };

  const handleSelectedDestLocation = (location) => {
    setSelectedDestLocation(location);
  };

  //SELECTING DATA FROM STORE
  const phleboData = useSelector((state) => state.phleboList);

  const { loading, packages } = phleboData;

  //setting directions

  // var mapOrigin1 = new window.google.maps.LatLng(26.8467, 80.9462);

  // var mapDestination1 = new window.google.maps.LatLng(27.8974, 78.088);

  // var mapOrigin2 = new window.google.maps.LatLng(28.7041, 77.1025);

  // var mapDestination2 = new window.google.maps.LatLng(25.4358, 81.8463);

  // function calculateRoute(mapOrigin, mapDestination) {
  //   var request = {
  //     origin: mapOrigin,
  //     destination: mapDestination,
  //     travelMode: "DRIVING",

  //   };

  //   const DirectionsService = new window.google.maps.DirectionsService();

  //   DirectionsService.route(request, function (result, status) {
  //     if (status == "OK") {
  //       setDirection(result);
  //       console.log("directions", result);
  //     }
  //   });
  // }

  //  calculateRoute(mapOrigin1, mapDestination1);
  //  calculateRoute(mapOrigin2, mapDestination2);

  useEffect(() => {
    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(
          selectedSourceLocation.value[0],
          selectedSourceLocation.value[1]
        ),
        destination: new window.google.maps.LatLng(
          selectedDestLocation.value[0],
          selectedDestLocation.value[1]
        ),
        travelMode: window.google.maps.TravelMode.DRIVING, //[ DRIVING, WALKING, BICYCLING, TRANSIT]
      }, // google.maps.DirectionsService [ API call returning DirectionsResult, DirectionsStatus]
      (result, status) => {
        console.log(result);
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirection(result);
          console.log(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [selectedSourceLocation, selectedDestLocation]);

  const handelChangeSelect = (e) => {
    console.log(JSON.parse(e.target.value));
    const PickUp = JSON.parse(e.target.value);
    setSelectedSourceLocation({
      label: "PickUp",
      value: [
        PickUp.booking.customer_latitude,
        PickUp.booking.customer_longitude,
      ],
    });
    setSelectedDestLocation({
      label: "phlebo 's location",
      value: [PickUp.phlebo_latitude, PickUp.phlebo_longitude],
    });
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 20,
          width: 200,
          background: "#fff",
          padding: 10,
          borderRadius: 5,
          boxShadow: " 0 0 10px 0 lightgrey",
        }}
      >
        <div style={{ position: "relative" }}>
          {phleboData == "" ? (
            "loading "
          ) : phleboData.loading ? (
            "loading "
          ) : (
            <div>
              <span style={{ position: "relative" }}>Booking Id :</span>
              <select
              onChange={handelChangeSelect}
              >
                {ApiData.map((values, index) => (
                  <option key={values.id} value={JSON.stringify(values)}>
                    {values.booking.id}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div style={{ position: "relative" }}>
          <span style={{ position: "relative" }}>Source </span>
          <Select
            options={source}
            onChange={handleSelectedSourceLocation}
            value={selectedSourceLocation}
          />
        </div>
        <div style={{ position: "relative", marginTop: 10 }}>
          <span style={{ position: "relative" }}>Destination </span>
          <Select
            options={dest}
            onChange={handleSelectedDestLocation}
            value={selectedDestLocation}
          />
        </div>
      </div>

      <GoogleMap
        defaultZoom={7}
        defaultCenter={new window.google.maps.LatLng(27.8974, 78.088)}
      >
        {direction && <DirectionsRenderer directions={direction} />}
      </GoogleMap>
    </>
  );
});

export default MapWithADirectionsRenderer;
