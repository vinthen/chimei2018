/* --------------- create all country section --------------- */
export const createCountrySection = (listData,root) => {

    // 各大洲 (Array)
    const continent = Object.keys(listData.country);

    continent.forEach((key) => {

        // key: 各洲的英文名

        // 各大洲裡的國家 (Array)
        const country = listData.country[key];

        country.forEach((item) => {

            // item 個國家的名稱

            const wrapper = document.createElement('section');
            // 去掉字串中間的空白 (United States --> UnitedStates)
            wrapper.classList.add(
                'countrySection',
                item[0].replace(/\s+|　+/g, "")
            );

            wrapper.innerHTML = `<h2>${item[1]}</h2>`;

            root.appendChild(wrapper);

        });
        

    });





} // createCountrySection