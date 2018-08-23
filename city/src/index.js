// plugin
import axios from "axios";

// world map
import {createWorldMapSection} from "./worldmap";

// city section
import {createCountrySection} from "./country";

const ROOT = document.getElementById('cityContent');

/* ----- Get data ----- */
const getList = () => {
  return axios.get("./city/sample-data/list.json");
}

const getCity = () => {
  return axios.get("./city/sample-data/city.json");
}

axios.all([
    getList(),
    getCity()
]).then(
  axios.spread(function(list, city) {   

    const LIST = list.data;
    const CITY = city.data;    

    // create World map section
    createWorldMapSection(LIST,ROOT);

    // create country section
    createCountrySection(LIST,ROOT);

  })
);
