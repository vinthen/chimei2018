// plugin
import axios from "axios";

// world map
import {initWorldMapSection} from "./worldmap";

const ROOT = document.getElementById('cityContent');

/* ----- Get data ----- */
const getListData = () => {
  return axios.get("./city/sample-data/list.json");
}

const getCityData = () => {
  return axios.get("./city/sample-data/city.json");
}

axios.all([
    getListData(),
    getCityData()
]).then(
  axios.spread(function(list, city) {

    const LIST = list.data;
    const CITY = city.data;    
    
    // console.log(LIST.continent[0]);
    // console.log(CITY.Europe.country.Czech.city.Prague.description);

    initWorldMapSection(CITY,ROOT);

  })
);
