/* ---------- 隱藏所有國家的章節內容 ---------- */
const _hideAllCountrySection = () => {

    document.querySelectorAll('.countrySection').forEach((section) => {
        section.classList.remove('show');
    });

}

/* --------------- Click --------------- */
export const clickEvent = (cityData,pscroll) => {

    const worldmapSection = document.querySelector('section.worldmap');

    // 世界地圖： 國家清單
    _worldmap(
        worldmapSection,
        pscroll,
        '#countryList .list--item'
    );

    // 世界地圖： 地圖
    _worldmap(
        worldmapSection,
        pscroll,
        '.map--piece'
    );

    // 國家與城市 section 中，選擇國家
    _country(worldmapSection);

    // 國家與城市 section 中，選擇城市
    _city(cityData);


} // clickEvent


/* ----- 在世界地圖 section 中的操作 ----- */
const _worldmap = (worldmap,_pscroll,selector) => {

    // worldmap: world map section
    // _pscroll: PS (object)
    // selector: querySelectorAll(selector)


    // 清單
    worldmap.querySelectorAll(`${selector}`).forEach((listItem) => {

        listItem.addEventListener('click', (event) => {

            const targetCountry = event.target.dataset.country;

            _hideAllCountrySection();

            document.querySelector(`.countrySection.${targetCountry}`).classList.add('show');

            worldmap.classList.add('hide');

            // update perfect scroll
            _pscroll[targetCountry].update();

        });

    });

} // _worldmap


/* ----- 國家與城市 section：選擇國家 ----- */
const _country = (worldmap) => {


    document.querySelectorAll('.country--list').forEach((listItem) => {

        listItem.addEventListener('click', (event) => {

            const targetCountry = event.target.dataset.country;

            if(targetCountry != 'worldmap'){

                _hideAllCountrySection();

                document.querySelector(`.countrySection.${targetCountry}`).classList.add('show');

            } else {
                // console.log('顯示世界地圖');
                _hideAllCountrySection();
                worldmap.classList.remove('hide');
            }

        });

    });

} // _country


/* ----- 國家與城市 section 中，選擇城市 ----- */
const _city = (cityData) => {

    document.querySelectorAll('.city--list').forEach((listItem) => {

        listItem.addEventListener('click', (event) => {

            const _this = event.target;

            // const currentIndex = _this.dataset.index;            
            const targetCity = _this.dataset.city;
            const currentCountry = _this.dataset.country           

            const parent = document.querySelector(`.countrySection.${currentCountry}`);

            // 切換內容
            parent.querySelector('.city-container').innerHTML = 
            `<h4>${cityData[targetCity].name[1]} (${cityData[targetCity].name[0]})</h4>
            <div>${cityData[targetCity].description}</div>`;   

            // 切換 active 狀態
            _city_deselectAll(parent);

            parent.querySelectorAll(`.city--list.${targetCity}`).forEach((list) => {
                list.classList.add('active');
            });

        })

    });

} // _city

/* ----- 清除所有已選的城市 ----- */
const _city_deselectAll = (parent) => {

    parent.querySelectorAll('.city--list').forEach((list) => {
        list.classList.remove('active');
    });

}



