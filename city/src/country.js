import PerfectScrollbar from 'perfect-scrollbar';

/* --------------- create all country section --------------- */
export const createCountrySection = (listData,cityData,root,pscroll) => {

    // 各大洲 (Array)
    const continent = Object.keys(listData.country);

    continent.forEach((key) => {

        // key: 各洲的英文名

        // 各大洲裡的國家 (Array)
        const country = listData.country[key];

        country.forEach((item) => {

            // item 各國家的名稱

            const wrapper = document.createElement('section');

            
            // 去掉字串中間的空白 (United States --> UnitedStates)
            const countryCode = item[0].replace(/\s+|　+/g, "");

            // 要顯示的國家清單 (Array)
            const countryList = listData.country[key];

            // 要顯示的城市清單
            const cityList = listData.city[countryCode];

            const defaultCity = listData.city[countryCode][0][0].replace(/\s+|　+/g, "");

            let defaultCityName = '';
            let defaultCityDescription = ''

            if(cityData[defaultCity]){
                defaultCityName = cityData[defaultCity].name;
                defaultCityDescription = cityData[defaultCity].description;
            } else {
                defaultCityName = '無資料 (城市名)';
                defaultCityDescription = '無資料 (描述)';
            }      
                        
            wrapper.classList.add(
                'countrySection',key,countryCode
            );

            // wrapper.dataset.country = countryCode;

            wrapper.innerHTML = 
            `<div class="country-container">            
                <div class="listwpr">
                    <div class="country--title"><img src="./city/asset/country-name/${countryCode}.png" /></div>
                    <div class="cityList">
                        ${_createCityList(cityList,countryCode)}
                    </div>
                </div>                
                <div class="country--mapwpr">
                    <img class="country--map" src="./city/asset/country-map/${countryCode}.jpg" />
                    <ul class="countryList">                        
                        ${_createCountryList(countryList)}
                    </ul>
                    <div class="countryMap--cityList">
                        ${_createCityList(cityList,countryCode)}
                    </div>
                </div>
            </div><!-- country-container -->

            <div class="city-container" data-default-city="${defaultCity}">
                <h4>${defaultCityName[1]} (${defaultCityName[0]})</h4>
                <div>${defaultCityDescription}</div>
            </div>`;

            root.appendChild(wrapper);

            // 在 country--list 中標示目前所在的國家
            wrapper.querySelector(`.country--list.${countryCode}`).classList.add('current');
          

            /* ----- init PerfectScrollbar (city list) ----- */
            const scrollContainer = wrapper.querySelector('.cityList');
            // 存入到 PS 中
            pscroll[countryCode] = new PerfectScrollbar(scrollContainer, {
                suppressScrollX: true
            });

        });        

    });

    // console.log(pscroll);

} // createCountrySection



/* ---------- 產生國家清單 ---------- */
const _createCountryList = (data) => {

    // data: 要顯示的國家清單 (Array)

    let fragment = '<li class="country--list" data-country="worldmap">世界地圖</li>';

    data.forEach((item) => {

        // 去掉字串中間的空白 (United States --> UnitedStates)
        const countryCode = item[0].replace(/\s+|　+/g, "");

        const el = 
        `<li class="country--list ${countryCode}" data-country="${countryCode}">${item[1]}</li>`;

        fragment += el;

    });

    return fragment;
}

/* ---------- 產生城市清單 ---------- */
const _createCityList = (data,country) => {

    let fragment_regular = ''; // 有資料的城市

    let fragment_noData = ''; // 尚無資料的城市

    data.forEach((item,index) => {

        // 去掉字串中間的空白 (Offenbach am Main --> UnOffenbachamMainitedStates)
        const cityCode = item[0].replace(/\s+|　+/g, "");

        // 第一個城市標示為 active
        let active = '';
        if(index == 0){
            active = ' active';
        }

        const el = 
            `<li class="city--list ${cityCode}${active}" 
                data-city="${cityCode}" 
                data-country="${country}"               
            >
                    ${item[1]} (${item[0]})
            </li>`;

        if(item.length > 2 && item[2] == false){ 
            fragment_noData += el;
        } else {      
            fragment_regular += el;
        }
    });

    const fullList = 
    `<ul class="regular">${fragment_regular}</ul>
    <ul class="noData">${fragment_noData}</ul>`

    return fullList;   

}