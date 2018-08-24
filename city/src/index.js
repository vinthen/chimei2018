// plugin
import axios from "axios";

// world map
import {createWorldMapSection} from "./worldmap";

// city section
import {createCountrySection} from "./country";

// event listener
import {clickEvent} from "./event";

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

    // perfect scroll bar
    const PS = {};

    // create World map section
    createWorldMapSection(LIST,ROOT);

    // create country section
    createCountrySection(LIST,CITY,ROOT,PS);

    // click event listener
    clickEvent(CITY,PS);

  })
);
