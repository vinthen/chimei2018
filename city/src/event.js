/* --------------- Click --------------- */
export const clickEvent = () => {

    // 在世界地圖 section 中的清單選擇國家
    document.querySelectorAll('#countryList .list--item').forEach((listItem) => {

        listItem.addEventListener('click', (event) => {

            const targetCountry = event.target.dataset.country;

            _hideAllCountrySection();

            document.querySelector(`.countrySection.${targetCountry}`).classList.add('show');

            document.querySelector('section.worldmap').classList.add('hide');

        });

    });

    // 國家與城市 section 中，選擇國家
    document.querySelectorAll('.country--list').forEach((listItem) => {

        listItem.addEventListener('click', (event) => {

            const targetCountry = event.target.dataset.country;

            if(targetCountry != 'worldmap'){

                _hideAllCountrySection();
                document.querySelector(`.countrySection.${targetCountry}`).classList.add('show');

            } else {
                // console.log('顯示世界地圖');
                _hideAllCountrySection();
                document.querySelector('section.worldmap').classList.remove('hide');
            }        

        });

    });



}

/* ---------- 隱藏所有國家的章節內容 ---------- */
const _hideAllCountrySection = () => {

    document.querySelectorAll('.countrySection').forEach((section) => {
        section.classList.remove('show');
    });

}