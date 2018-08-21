import PerfectScrollbar from 'perfect-scrollbar';

/* --------------- init World map section --------------- */
export const initWorldMapSection = (cityData,container) => {

    // 世界地圖 section
    const wrapper = document.createElement('section');
    wrapper.classList.add('worldmap');

    wrapper.innerHTML = 
    `<div id="mapScrollContainer">
        <div class="map-content"></div>
        <div class="list-content"></div>
    </div>`;

    container.appendChild(wrapper);

    // console.log(listData.continent[0]);
    // console.log(cityData.Europe.country.Czech.city.Prague.description);

    const countryList = document.createElement('section');
    countryList.classList.add('country-list');

    // countryList.innerHTML = `${_genCountryList(listData,cityData)}`;
    
    wrapper.appendChild(countryList);

    _genCountryList(cityData,countryList);

    



    /* ----- init PerfectScrollbar ----- */
    // 世界地圖
    const mapContainer = wrapper.querySelector('#mapScrollContainer');

    const PS = new PerfectScrollbar(mapContainer, {
        useBothWheelAxes: true,
        suppressScrollY: true
    });   

}


/* ----- generate country list ----- */
const _genCountryList = (city,container) => {

    for (const continent in city) {       
        
        // 各洲的洲名
        const continentName_en = city[continent].name[0];
        const continentName_tw = city[continent].name[1];

        // 各洲的內容
        const entryWpr = document.createElement('div');
        entryWpr.classList.add('list--continent');

        // entryWpr.innerHTML = 
        // `<h4><strong>${continentName_tw}</strong> (${continentName_en})</h4>`

        // container.appendChild(entryWpr);

        let content = ''

        for (const country in city[continent].country) {

            // 國家名
            const countryName_en = city[continent].country[country].name[0];
            const countryName_tw = city[continent].country[country].name[1];

            const item = 
            `<div class="item" data-country="${countryName_en}">
                ${countryName_tw} (${countryName_en})
            </div>`

            content += item;
            
            // console.log(countryName_tw);

        }

        entryWpr.innerHTML = 
        `<h4><strong>${continentName_tw}</strong> (${continentName_en})</h4>
        ${content}`

        container.appendChild(entryWpr);

      }
}




