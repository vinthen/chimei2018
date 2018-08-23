import PerfectScrollbar from 'perfect-scrollbar';

/* --------------- create World map section --------------- */
export const createWorldMapSection = (listData,root) => {

    /* ----- create world map ----- */
    const section = document.createElement('section');
    section.classList.add('worldmap');

    section.innerHTML = 
    `<div id="mapScrollContainer">
        <div class="map-content">${_createMapPiece(listData)}</div>
    </div>
    
    <div id="countryList">${_createContinentList(listData)}</div>
    `;

    root.appendChild(section);



    



    /* ----- init PerfectScrollbar (world map) ----- */
    const mapContainer = section.querySelector('#mapScrollContainer');

    const PS = new PerfectScrollbar(mapContainer, {
        useBothWheelAxes: true,
        suppressScrollY: true
    });   

} // createWorldMapSection


/* ---------- 建立地圖上各洲的區塊 ---------- */
const _createMapPiece = (_listData) => {

    let fragment = '';

    _listData.continent.forEach((item) => {

        const el = 
        `<div class="map--piece ${item[0]}" data-continent="${item[0]}"></div>`;

        fragment += el;

    });

    // 南美洲例外，手動添加
    fragment += '<div class="map--piece SouthAmerica" data-continent="southAmerica"></div>';

    return fragment;
}


/* ---------- 建立各洲的清單 ---------- */
const _createContinentList = (_listData) => {
    
    let fragment = '';

    _listData.continent.forEach((item) => {

        const el = 
        `<div class="list--continent ${item[0]}">
            <h4><strong>${item[1]}</strong> (${item[0]})</h4>
            <ul>${_createCountryList(_listData.country,item[0])}</ul>
        </div>`;

        fragment += el;

    });

    return fragment;

} // _createCountryList

/* ---------- 建立各國家的清單 ---------- */
const _createCountryList = (countryData,continent) => {

    let fragment = '';

    countryData[continent].forEach((item) => {

        const el = 
        `<li class="list--item" data-country="${item[0].replace(/\s+|　+/g, "")}">
            ${item[1]} (${item[0]})
        </li>`

        fragment += el;

    });

    return fragment; 

}









