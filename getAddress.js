import NodeGeocoder from "node-geocoder";
import { accessToken } from "../mapsAccess.js";
// import pkg from '../mapsAccess.js';

const options = {
  provider: "google",
  apiKey: accessToken,
};

const geocoder = NodeGeocoder(options);


const getAddress = async (address) => {
  return geocoder.geocode(address);
};

export { getAddress };
