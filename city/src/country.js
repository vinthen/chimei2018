import PerfectScrollbar from 'perfect-scrollbar';

/* --------------- create all country section --------------- */
export const createCountrySection = (listData,root) => {

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
                        
            wrapper.classList.add(
                'countrySection',key,countryCode
            );

            wrapper.innerHTML = 
            `<div class="country-container">            
                <div class="listwpr">
                    <div class="country--title"><img src="./city/asset/country-name/${countryCode}.png" /></div>
                    <div class="cityList">
                        ${_createCityList(cityList)}
                    </div>
                </div>                
                <div class="country--mapwpr">
                    <img class="country--map" src="./city/asset/country-map/${countryCode}.jpg" />
                    <ul class="countryList">                        
                        ${_createCountryList(countryList)}
                    </ul>
                </div>
            </div><!-- country-container -->

            <div class="city-container">                
            </div>`;

            root.appendChild(wrapper);

            /* ----- init PerfectScrollbar (city list) ----- */
            const scrollContainer = wrapper.querySelector('.cityList');
            let cityPS = new PerfectScrollbar(scrollContainer, {
                suppressScrollX: true
            });

        });        

    });

} // createCountrySection



/* ---------- 產生國家清單 ---------- */
const _createCountryList = (data) => {

    // data: 要顯示的國家清單 (Array)

    let fragment = '<li class="country--list" data-country="worldmap">世界地圖</li>';

    data.forEach((item) => {

        // 去掉字串中間的空白 (United States --> UnitedStates)
        const countryCode = item[0].replace(/\s+|　+/g, "");

        const el = 
        `<li class="country--list" data-country="${countryCode}">${item[1]}</li>`;

        fragment += el;

    });

    return fragment;
}

/* ---------- 產生城市清單 ---------- */
const _createCityList = (data) => {

    let fragment_regular = ''; // 有資料的城市

    let fragment_noData = ''; // 尚無資料的城市

    data.forEach((item) => {

        // 去掉字串中間的空白 (Offenbach am Main --> UnOffenbachamMainitedStates)
        const cityCode = item[0].replace(/\s+|　+/g, "");

        const el = 
            `<li class="city--list" data-country="${cityCode}">
                ${item[1]} (${item[0]})
            </li>`;

        if(item.length > 2 && item[2] == false){ 
            fragment_noData += el;
        } else {      
            fragment_regular += el;
        }
    });

    const fullList = 
    `<ul>${fragment_regular}</ul>
    <ul>${fragment_noData}</ul>`

    return fullList;   

}