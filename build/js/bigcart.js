"use strict";

/*
 * Сборка фалов JS сторонних
 * //= ../../bower_components/jquery/dist/jquery.js
 */

"use strict";

function localShopStorage(name) {

    // localStorage.clear();
    localStorage[name] = '';

    if (localStorage.getItem(name) !== null) {
        // console.log(`хранилище ${name} существует`);
        return 1;
    } else {
        console.log("\u0447\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A, \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 " + name + " \u043D\u0435\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442");
        return 0;
    }
}
/**
 * Функция чтения JSON файлов
 * @param jsonFile
 * @param callback Функция в которую возвращаем результат PARSE и название
 * класса обертки товара
 */

function getJson(jsonFile, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/' + jsonFile, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // console.log('статус готово');
            // callback(JSON.parse(xhr.responseText), wrapperClass);
            callback(xhr.responseText);
        } else {
            // console.log('статус готовности ' + xhr.readyState);
            // console.log('статус ' + xhr.status);
        }
    };
    xhr.send();
}

function getJsonFetch(jsonFile, callback) {

    fetch('json/' + jsonFile).then(function (response) {
        return response.text();
    }).then(function (text) {
        console.log(text);
    }).catch(function (error) {
        console.log(error);
    });
}

getJsonFetch('../json/' + 'getBasket.json');
getJson('../json/' + 'getBasket.json', consoleL);

function consoleL(err) {
    console.log(err);
}
var wrapperClass = 'dropdownCart';
var localCartStorageName = 'miniCart';

var miniCart = {

    // init(data, localCartStorageName) {
    //     localStorage[localCartStorageName] = data;
    //     this.render();
    // },

    empyCart: {
        amoun: 0,
        countGoods: 0,
        contents: []
    },

    init: function init() {
        var _this = this;

        if (localStorage.getItem(localCartStorageName) === null) {

            localStorage.setItem(localCartStorageName, JSON.stringify(miniCart.empyCart));
            document.getElementsByClassName(wrapperClass)[0].addEventListener('click', function (click) {
                return _this.clickHandler(event);
            });
            miniCart.render();
        } else {

            document.getElementsByClassName(wrapperClass)[0].addEventListener('click', function (click) {
                return _this.clickHandler(event);
            });
            miniCart.render();
        }
    },
    clickHandler: function clickHandler(event) {

        console.log(event);

        // if (event.target.dataset.button_name === 'clear') {
        //     localStorage.setItem(localCartStorageName, JSON.stringify(miniCart.empyCart));
        //     miniCart.render();
        // }

        switch (event.target.dataset.button_name) {

            case 'clear':

                localStorage.setItem(localCartStorageName, JSON.stringify(miniCart.empyCart));
                break;

            case 'delete':

                this.delete(event);
                break;

        }

        miniCart.render();
    },
    delete: function _delete(event) {

        var id = event.target.dataset.id_product;
        var arr = JSON.parse(localStorage.getItem(localCartStorageName));
        for (var index = 0; index < arr.contents.length; index++) {
            if (parseInt(arr.contents[index].id_product) === parseInt(id)) {

                if (parseInt(arr.contents[index].quantity) > 1) {
                    arr.contents[index].quantity = arr.contents[index].quantity - 1;
                } else {

                    arr.contents.splice(index, 1);
                }
            }
        }

        localStorage.setItem(localCartStorageName, JSON.stringify(arr));
    },
    render: function render() {

        var ammount = 0;
        var price = 0;
        var templateItemContainer = '';

        var arr = JSON.parse(localStorage.getItem("miniCart")).contents;

        var tempDropDownCart = document.getElementsByClassName('dropdownCart')[0];
        tempDropDownCart.innerHTML = '';

        if (arr.length !== 0) {

            var tempDropDownCartItemWraper = document.createElement('div');
            tempDropDownCartItemWraper.className = 'dropdownCart__itemWraper';

            var dropdownCart__buttonWrapper = document.createElement('div');
            dropdownCart__buttonWrapper.className = 'dropdownCart__buttonWrapper';

            tempDropDownCart.appendChild(tempDropDownCartItemWraper);
            tempDropDownCart.appendChild(dropdownCart__buttonWrapper);

            for (var i = 0; i < arr.length; i++) {

                var tempDropDownCartItem = document.createElement('div');
                tempDropDownCartItem.className = 'dropdownCart__item';
                tempDropDownCartItem.innerHTML = "<img class=\"dropdownCart__img\" src=\"img/" + arr[i].img + "\" alt=\"\">";

                var tempDropDownInfoWraper = document.createElement('div');
                tempDropDownInfoWraper.className = 'dropdownCart__infoWrapper';
                var pPrice = document.createElement('p');
                pPrice.className = 'dropdownCart__price';
                pPrice.innerHTML = arr[i].quantity + " x " + arr[i].price + " \u0440\u0443\u0431.";
                tempDropDownInfoWraper.appendChild(pPrice);
                var pDescr = document.createElement('p');
                pDescr.className = 'dropdownCart__description';
                pDescr.innerHTML = "" + arr[i].product_name;
                tempDropDownInfoWraper.appendChild(pDescr);

                tempDropDownCartItem.appendChild(tempDropDownInfoWraper);
                tempDropDownCartItemWraper.appendChild(tempDropDownCartItem);

                var tempButton = document.createElement('div');
                tempButton.innerHTML = "<button class=\"button dropdownCart__buttonDel\" data-button_name=\"delete\" data-id_product=\"" + arr[i].id_product + "\">x</button>";
                tempDropDownCartItem.appendChild(tempButton);

                price = price + arr[i].quantity * arr[i].price;
                ammount = ammount + arr[i].quantity;
            }

            var button = "\n                    <button class=\"button dropdownCart__button dropdownCart__button_mod\" data-button_name=\"check\">\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C</button>\n                    <button class=\"button dropdownCart__button dropdownCart__button_mod\" data-button_name=\"cart\"><a href=\"../bigcart.php\">\u041A\u043E\u0440\u0437\u0438\u043D\u0430</a></button>\n                    <button class=\"button dropdownCart__button dropdownCart__button_mod\" data-button_name=\"clear\">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C</button>\n                    ";

            dropdownCart__buttonWrapper.innerHTML = button;
        } else {

            // console.log('miniCart.render выводит пустую форму без товаров');
            var templateItem = "\n                  <div class=\"dropdownCart__empty\">\n                      <p class=\"dropdownCart__imgCart\"><i class=\"fa fa-shopping-cart\"></i></p>\n                      <p>\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442</p>\n                   </div>\n            ";

            tempDropDownCart.innerHTML = templateItem;
        }

        var buttonCart = document.getElementsByClassName("headerMiddle__myCart_mod")[0];
        var buttonCartTemplate = "<span class=\"textPink\">" + ammount + "&nbsp\n                </span>\u0442\u043E\u0432\u0430\u0440\u043E\u0432/&nbsp<span class=\"textPink\">" + price + "&nbsp</span>\u0440\u0443\u0431";
        buttonCart.innerHTML = buttonCartTemplate;
    }
};
var loadCatalogData = {

    settings: {
        data: '',
        localCatalogStorageName: 'catalogData',
        localCartStorageName: 'getBasket'
    },

    init: function init(settings) {
        var _this2 = this;

        this.settings = Object.assign((this.settings, settings));
        localStorage.setItem(this.settings.localCatalogStorageName, this.settings.data);
        var dataParse = JSON.parse(localStorage[this.settings.localCatalogStorageName]);
        this.render(this.settings.localCatalogStorageName);
        document.getElementsByClassName('gallery__itemWrapper')[0].addEventListener('click', function (event) {
            return _this2.clickHandler(event);
        });
    },


    /**
     * Обработка клика по кнопке
     * @param event
     */
    clickHandler: function clickHandler(event) {

        if (event.target.tagName !== 'BUTTON') {
            console.log('not a button');
            return;
        }
        return this.addCart(event.target.dataset.id_product);
    },
    addCart: function addCart(id_product) {

        var checkContain = false;
        var dataCart = JSON.parse(localStorage.getItem(this.settings.localCartStorageName));
        if (dataCart.contents.length !== null) {
            for (var index = 0; index < dataCart.contents.length; index++) {
                if (parseInt(id_product) == parseInt(dataCart.contents[index].id_product)) {
                    dataCart.contents[index].quantity = dataCart.contents[index].quantity + 1;
                    localStorage.setItem(this.settings.localCartStorageName, JSON.stringify(dataCart));
                    miniCart.render();
                    checkContain = true;
                }
            }
        } else {
            checkContain = true;
        }

        if (!checkContain) {

            var dataItemFromCatalog = JSON.parse(localStorage.getItem(this.settings.localCatalogStorageName))[parseInt(id_product - 1)];
            var arrLegth = dataCart.contents.length;
            var arrItem = {};
            arrItem.id_product = parseInt(id_product);
            arrItem.img = dataItemFromCatalog.img;
            arrItem.product_name = dataItemFromCatalog.product_name;
            arrItem.price = dataItemFromCatalog.price;
            arrItem.quantity = parseInt(1);
            dataCart.contents.push(arrItem);
            localStorage.setItem(this.settings.localCartStorageName, JSON.stringify(dataCart));
            miniCart.render();
        }
    },
    render: function render(localCatalogStorageName) {
        var dataParse = JSON.parse(localStorage[localCatalogStorageName]);
        var gallaryWrapper = document.getElementsByClassName('gallery__itemWrapper')[0];
        var gallaryItemContainer = '';
        for (var index = dataParse.length - 1; index > dataParse.length - 6; index--) {

            var galleryTemplate = "\n            <div class=\"gallery__item\">\n             <div class=\"gallery__containerItemImg\"><img class=\"gallery__itemImg\" src=\"img/" + dataParse[index].img + "\"alt=\"\"></div>\n                    <div><p class=\"gallery__itemTitle\">" + dataParse[index].product_name + "</p></div>\n                    <div><p class=\"gallery__atings\">*****</p></div>\n                    <div><p class=\"gallery__price\">" + dataParse[index].price + " " + dataParse[index].currency + "</p></div>\n                    <div>\n                        <button class=\"button gallery__itemButton\" data-id_product=\"" + dataParse[index].id_product + "\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n                    </div>\n            </div>";
            gallaryItemContainer = gallaryItemContainer + galleryTemplate;
        }
        gallaryWrapper.innerHTML = gallaryItemContainer;
    }
};

window.onload = function () {

    miniCart.init();
};

/*
 * Подлючение своих файлов JS для сборки
 * //= parts/app.js
 * //= parts/header.js
 * //= parts/footer.js
 */
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpZ2NhcnQuanMiXSwibmFtZXMiOlsibG9jYWxTaG9wU3RvcmFnZSIsIm5hbWUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29uc29sZSIsImxvZyIsImdldEpzb24iLCJqc29uRmlsZSIsImNhbGxiYWNrIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsInNlbmQiLCJnZXRKc29uRmV0Y2giLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsInRleHQiLCJjYXRjaCIsImVycm9yIiwiY29uc29sZUwiLCJlcnIiLCJ3cmFwcGVyQ2xhc3MiLCJsb2NhbENhcnRTdG9yYWdlTmFtZSIsIm1pbmlDYXJ0IiwiZW1weUNhcnQiLCJhbW91biIsImNvdW50R29vZHMiLCJjb250ZW50cyIsImluaXQiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGlja0hhbmRsZXIiLCJldmVudCIsInJlbmRlciIsInRhcmdldCIsImRhdGFzZXQiLCJidXR0b25fbmFtZSIsImRlbGV0ZSIsImlkIiwiaWRfcHJvZHVjdCIsImFyciIsInBhcnNlIiwiaW5kZXgiLCJsZW5ndGgiLCJwYXJzZUludCIsInF1YW50aXR5Iiwic3BsaWNlIiwiYW1tb3VudCIsInByaWNlIiwidGVtcGxhdGVJdGVtQ29udGFpbmVyIiwidGVtcERyb3BEb3duQ2FydCIsImlubmVySFRNTCIsInRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImRyb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlciIsImFwcGVuZENoaWxkIiwiaSIsInRlbXBEcm9wRG93bkNhcnRJdGVtIiwiaW1nIiwidGVtcERyb3BEb3duSW5mb1dyYXBlciIsInBQcmljZSIsInBEZXNjciIsInByb2R1Y3RfbmFtZSIsInRlbXBCdXR0b24iLCJidXR0b24iLCJ0ZW1wbGF0ZUl0ZW0iLCJidXR0b25DYXJ0IiwiYnV0dG9uQ2FydFRlbXBsYXRlIiwibG9hZENhdGFsb2dEYXRhIiwic2V0dGluZ3MiLCJkYXRhIiwibG9jYWxDYXRhbG9nU3RvcmFnZU5hbWUiLCJPYmplY3QiLCJhc3NpZ24iLCJkYXRhUGFyc2UiLCJ0YWdOYW1lIiwiYWRkQ2FydCIsImNoZWNrQ29udGFpbiIsImRhdGFDYXJ0IiwiZGF0YUl0ZW1Gcm9tQ2F0YWxvZyIsImFyckxlZ3RoIiwiYXJySXRlbSIsInB1c2giLCJnYWxsYXJ5V3JhcHBlciIsImdhbGxhcnlJdGVtQ29udGFpbmVyIiwiZ2FsbGVyeVRlbXBsYXRlIiwiY3VycmVuY3kiLCJ3aW5kb3ciLCJvbmxvYWQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7OztBQUtBOztBQUVBLFNBQVNBLGdCQUFULENBQTBCQyxJQUExQixFQUFnQzs7QUFFNUI7QUFDQUMsaUJBQWFELElBQWIsSUFBcUIsRUFBckI7O0FBRUEsUUFBSUMsYUFBYUMsT0FBYixDQUFxQkYsSUFBckIsTUFBK0IsSUFBbkMsRUFBeUM7QUFDckM7QUFDQSxlQUFPLENBQVA7QUFDSCxLQUhELE1BR087QUFDSEcsZ0JBQVFDLEdBQVIsNkpBQThDSixJQUE5QztBQUNBLGVBQU8sQ0FBUDtBQUNIO0FBRUo7QUFDRDs7Ozs7OztBQU9BLFNBQVNLLE9BQVQsQ0FBaUJDLFFBQWpCLEVBQTJCQyxRQUEzQixFQUFxQzs7QUFFakMsUUFBSUMsTUFBTSxJQUFJQyxjQUFKLEVBQVY7QUFDQUQsUUFBSUUsSUFBSixDQUFTLEtBQVQsRUFBZ0IsVUFBVUosUUFBMUIsRUFBb0MsSUFBcEM7QUFDQUUsUUFBSUcsa0JBQUosR0FBeUIsWUFBWTtBQUNqQyxZQUFJSCxJQUFJSSxVQUFKLEtBQW1CLENBQW5CLElBQXdCSixJQUFJSyxNQUFKLEtBQWUsR0FBM0MsRUFBZ0Q7QUFDNUM7QUFDQTtBQUNBTixxQkFBVUMsSUFBSU0sWUFBZDtBQUNILFNBSkQsTUFJTztBQUNIO0FBQ0E7QUFDSDtBQUNKLEtBVEQ7QUFVQU4sUUFBSU8sSUFBSjtBQUNIOztBQUVELFNBQVNDLFlBQVQsQ0FBc0JWLFFBQXRCLEVBQWdDQyxRQUFoQyxFQUEwQzs7QUFFdkNVLFVBQU0sVUFBVVgsUUFBaEIsRUFDS1ksSUFETCxDQUNVO0FBQUEsZUFBWUMsU0FBU0MsSUFBVCxFQUFaO0FBQUEsS0FEVixFQUVLRixJQUZMLENBRVUsZ0JBQVE7QUFDVmYsZ0JBQVFDLEdBQVIsQ0FBWWdCLElBQVo7QUFDSCxLQUpMLEVBSU9DLEtBSlAsQ0FJYSxpQkFBUztBQUNkbEIsZ0JBQVFDLEdBQVIsQ0FBWWtCLEtBQVo7QUFDUCxLQU5EO0FBT0Y7O0FBRUROLGFBQWEsYUFBYSxnQkFBMUI7QUFDQVgsUUFBUSxhQUFhLGdCQUFyQixFQUF1Q2tCLFFBQXZDOztBQUVBLFNBQVNBLFFBQVQsQ0FBa0JDLEdBQWxCLEVBQXVCO0FBQ25CckIsWUFBUUMsR0FBUixDQUFZb0IsR0FBWjtBQUNIO0FBQ0QsSUFBSUMsZUFBZSxjQUFuQjtBQUNBLElBQUlDLHVCQUF1QixVQUEzQjs7QUFFQSxJQUFJQyxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBOztBQUVBQyxjQUFVO0FBQ05DLGVBQU8sQ0FERDtBQUVOQyxvQkFBWSxDQUZOO0FBR05DLGtCQUFVO0FBSEosS0FQQzs7QUFhWEMsUUFiVyxrQkFhSjtBQUFBOztBQUVILFlBQUkvQixhQUFhQyxPQUFiLENBQXFCd0Isb0JBQXJCLE1BQStDLElBQW5ELEVBQXlEOztBQUVyRHpCLHlCQUFhZ0MsT0FBYixDQUFxQlAsb0JBQXJCLEVBQTJDUSxLQUFLQyxTQUFMLENBQWVSLFNBQVNDLFFBQXhCLENBQTNDO0FBQ0FRLHFCQUFTQyxzQkFBVCxDQUFnQ1osWUFBaEMsRUFBOEMsQ0FBOUMsRUFBaURhLGdCQUFqRCxDQUFrRSxPQUFsRSxFQUEyRTtBQUFBLHVCQUFTLE1BQUtDLFlBQUwsQ0FBa0JDLEtBQWxCLENBQVQ7QUFBQSxhQUEzRTtBQUNBYixxQkFBU2MsTUFBVDtBQUVILFNBTkQsTUFNTzs7QUFFSEwscUJBQVNDLHNCQUFULENBQWdDWixZQUFoQyxFQUE4QyxDQUE5QyxFQUFpRGEsZ0JBQWpELENBQWtFLE9BQWxFLEVBQTJFO0FBQUEsdUJBQVMsTUFBS0MsWUFBTCxDQUFrQkMsS0FBbEIsQ0FBVDtBQUFBLGFBQTNFO0FBQ0FiLHFCQUFTYyxNQUFUO0FBQ0g7QUFFSixLQTNCVTtBQThCWEYsZ0JBOUJXLHdCQThCRUMsS0E5QkYsRUE4QlM7O0FBRWhCckMsZ0JBQVFDLEdBQVIsQ0FBWW9DLEtBQVo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQVFBLE1BQU1FLE1BQU4sQ0FBYUMsT0FBYixDQUFxQkMsV0FBN0I7O0FBRUksaUJBQUssT0FBTDs7QUFFSTNDLDZCQUFhZ0MsT0FBYixDQUFxQlAsb0JBQXJCLEVBQTJDUSxLQUFLQyxTQUFMLENBQWVSLFNBQVNDLFFBQXhCLENBQTNDO0FBQ0E7O0FBRUosaUJBQUssUUFBTDs7QUFFSSxxQkFBS2lCLE1BQUwsQ0FBWUwsS0FBWjtBQUNBOztBQVZSOztBQWNBYixpQkFBU2MsTUFBVDtBQUVILEtBdkRVO0FBMERYSSxVQTFEVyxtQkEwREpMLEtBMURJLEVBMERHOztBQUVWLFlBQUlNLEtBQUtOLE1BQU1FLE1BQU4sQ0FBYUMsT0FBYixDQUFxQkksVUFBOUI7QUFDQSxZQUFJQyxNQUFNZCxLQUFLZSxLQUFMLENBQVdoRCxhQUFhQyxPQUFiLENBQXFCd0Isb0JBQXJCLENBQVgsQ0FBVjtBQUNBLGFBQUssSUFBSXdCLFFBQU0sQ0FBZixFQUFrQkEsUUFBUUYsSUFBSWpCLFFBQUosQ0FBYW9CLE1BQXZDLEVBQThDRCxPQUE5QyxFQUFzRDtBQUNsRCxnQkFBSUUsU0FBU0osSUFBSWpCLFFBQUosQ0FBYW1CLEtBQWIsRUFBb0JILFVBQTdCLE1BQTZDSyxTQUFTTixFQUFULENBQWpELEVBQStEOztBQUUzRCxvQkFBSU0sU0FBU0osSUFBSWpCLFFBQUosQ0FBYW1CLEtBQWIsRUFBb0JHLFFBQTdCLElBQXVDLENBQTNDLEVBQTZDO0FBQ3pDTCx3QkFBSWpCLFFBQUosQ0FBYW1CLEtBQWIsRUFBb0JHLFFBQXBCLEdBQStCTCxJQUFJakIsUUFBSixDQUFhbUIsS0FBYixFQUFvQkcsUUFBcEIsR0FBK0IsQ0FBOUQ7QUFDSCxpQkFGRCxNQUVPOztBQUVITCx3QkFBSWpCLFFBQUosQ0FBYXVCLE1BQWIsQ0FBb0JKLEtBQXBCLEVBQTBCLENBQTFCO0FBQ0g7QUFDSjtBQUNKOztBQUVEakQscUJBQWFnQyxPQUFiLENBQXFCUCxvQkFBckIsRUFBMkNRLEtBQUtDLFNBQUwsQ0FBZWEsR0FBZixDQUEzQztBQUVILEtBNUVVO0FBOEVYUCxVQTlFVyxvQkE4RUY7O0FBRUwsWUFBSWMsVUFBVSxDQUFkO0FBQ0EsWUFBSUMsUUFBUSxDQUFaO0FBQ0EsWUFBSUMsd0JBQXdCLEVBQTVCOztBQUVBLFlBQUlULE1BQU1kLEtBQUtlLEtBQUwsQ0FBV2hELGFBQWFDLE9BQWIsQ0FBcUIsVUFBckIsQ0FBWCxFQUE2QzZCLFFBQXZEOztBQUVBLFlBQUkyQixtQkFBbUJ0QixTQUFTQyxzQkFBVCxDQUFnQyxjQUFoQyxFQUFnRCxDQUFoRCxDQUF2QjtBQUNBcUIseUJBQWlCQyxTQUFqQixHQUE2QixFQUE3Qjs7QUFJQSxZQUFJWCxJQUFJRyxNQUFKLEtBQWUsQ0FBbkIsRUFBc0I7O0FBRWxCLGdCQUFJUyw2QkFBNkJ4QixTQUFTeUIsYUFBVCxDQUF1QixLQUF2QixDQUFqQztBQUNBRCx1Q0FBMkJFLFNBQTNCLEdBQXVDLDBCQUF2Qzs7QUFFQSxnQkFBSUMsOEJBQThCM0IsU0FBU3lCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEM7QUFDQUUsd0NBQTRCRCxTQUE1QixHQUF3Qyw2QkFBeEM7O0FBRUFKLDZCQUFpQk0sV0FBakIsQ0FBNkJKLDBCQUE3QjtBQUNBRiw2QkFBaUJNLFdBQWpCLENBQTZCRCwyQkFBN0I7O0FBRUEsaUJBQUssSUFBSUUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJakIsSUFBSUcsTUFBeEIsRUFBZ0NjLEdBQWhDLEVBQXFDOztBQUVqQyxvQkFBSUMsdUJBQXVCOUIsU0FBU3lCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBM0I7QUFDQUsscUNBQXFCSixTQUFyQixHQUFnQyxvQkFBaEM7QUFDQUkscUNBQXFCUCxTQUFyQixtREFBNEVYLElBQUlpQixDQUFKLEVBQU9FLEdBQW5GOztBQUVBLG9CQUFJQyx5QkFBeUJoQyxTQUFTeUIsYUFBVCxDQUF1QixLQUF2QixDQUE3QjtBQUNBTyx1Q0FBdUJOLFNBQXZCLEdBQWtDLDJCQUFsQztBQUNBLG9CQUFJTyxTQUFTakMsU0FBU3lCLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBYjtBQUNBUSx1QkFBT1AsU0FBUCxHQUFtQixxQkFBbkI7QUFDQU8sdUJBQU9WLFNBQVAsR0FBc0JYLElBQUlpQixDQUFKLEVBQU9aLFFBQTdCLFdBQTJDTCxJQUFJaUIsQ0FBSixFQUFPVCxLQUFsRDtBQUNBWSx1Q0FBdUJKLFdBQXZCLENBQW1DSyxNQUFuQztBQUNBLG9CQUFJQyxTQUFTbEMsU0FBU3lCLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBYjtBQUNBUyx1QkFBT1IsU0FBUCxHQUFtQiwyQkFBbkI7QUFDQVEsdUJBQU9YLFNBQVAsUUFBc0JYLElBQUlpQixDQUFKLEVBQU9NLFlBQTdCO0FBQ0FILHVDQUF1QkosV0FBdkIsQ0FBbUNNLE1BQW5DOztBQUVBSixxQ0FBcUJGLFdBQXJCLENBQWlDSSxzQkFBakM7QUFDQVIsMkNBQTJCSSxXQUEzQixDQUF1Q0Usb0JBQXZDOztBQUVBLG9CQUFJTSxhQUFhcEMsU0FBU3lCLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBakI7QUFDQVcsMkJBQVdiLFNBQVgsdUdBQW9IWCxJQUFJaUIsQ0FBSixFQUFPbEIsVUFBM0g7QUFDQW1CLHFDQUFxQkYsV0FBckIsQ0FBaUNRLFVBQWpDOztBQUVBaEIsd0JBQVFBLFFBQVFSLElBQUlpQixDQUFKLEVBQU9aLFFBQVAsR0FBa0JMLElBQUlpQixDQUFKLEVBQU9ULEtBQXpDO0FBQ0FELDBCQUFVQSxVQUFVUCxJQUFJaUIsQ0FBSixFQUFPWixRQUEzQjtBQUVIOztBQUVELGdCQUFJb0IsNGtCQUFKOztBQU1BVix3Q0FBNEJKLFNBQTVCLEdBQXdDYyxNQUF4QztBQUVILFNBaERELE1BZ0RPOztBQUVIO0FBQ0EsZ0JBQUlDLDZWQUFKOztBQU9BaEIsNkJBQWlCQyxTQUFqQixHQUEyQmUsWUFBM0I7QUFDSDs7QUFFRCxZQUFJQyxhQUFhdkMsU0FBU0Msc0JBQVQsNkJBQTRELENBQTVELENBQWpCO0FBQ0EsWUFBSXVDLG1EQUErQ3JCLE9BQS9DLCtHQUNpREMsS0FEakQsbUNBQUo7QUFFQW1CLG1CQUFXaEIsU0FBWCxHQUF1QmlCLGtCQUF2QjtBQUVIO0FBN0pVLENBQWY7QUErSkEsSUFBSUMsa0JBQWtCOztBQUVsQkMsY0FBVTtBQUNOQyxjQUFNLEVBREE7QUFFTkMsaUNBQXlCLGFBRm5CO0FBR050RCw4QkFBc0I7QUFIaEIsS0FGUTs7QUFRbEJNLFFBUmtCLGdCQVFiOEMsUUFSYSxFQVFIO0FBQUE7O0FBQ1gsYUFBS0EsUUFBTCxHQUFnQkcsT0FBT0MsTUFBUCxFQUFlLEtBQUtKLFFBQUwsRUFBZUEsUUFBOUIsRUFBaEI7QUFDQTdFLHFCQUFhZ0MsT0FBYixDQUFxQixLQUFLNkMsUUFBTCxDQUFjRSx1QkFBbkMsRUFBNEQsS0FBS0YsUUFBTCxDQUFjQyxJQUExRTtBQUNBLFlBQUlJLFlBQVlqRCxLQUFLZSxLQUFMLENBQVdoRCxhQUFhLEtBQUs2RSxRQUFMLENBQWNFLHVCQUEzQixDQUFYLENBQWhCO0FBQ0EsYUFBS3ZDLE1BQUwsQ0FBWSxLQUFLcUMsUUFBTCxDQUFjRSx1QkFBMUI7QUFDQTVDLGlCQUFTQyxzQkFBVCxDQUFnQyxzQkFBaEMsRUFBd0QsQ0FBeEQsRUFBMkRDLGdCQUEzRCxDQUE0RSxPQUE1RSxFQUFxRjtBQUFBLG1CQUFTLE9BQUtDLFlBQUwsQ0FBa0JDLEtBQWxCLENBQVQ7QUFBQSxTQUFyRjtBQUNILEtBZGlCOzs7QUFnQmxCOzs7O0FBSUFELGdCQXBCa0Isd0JBb0JMQyxLQXBCSyxFQW9CRTs7QUFFaEIsWUFBSUEsTUFBTUUsTUFBTixDQUFhMEMsT0FBYixLQUF5QixRQUE3QixFQUF1QztBQUNuQ2pGLG9CQUFRQyxHQUFSLENBQVksY0FBWjtBQUNBO0FBQ0g7QUFDRCxlQUFPLEtBQUtpRixPQUFMLENBQWE3QyxNQUFNRSxNQUFOLENBQWFDLE9BQWIsQ0FBcUJJLFVBQWxDLENBQVA7QUFDSCxLQTNCaUI7QUE2QmxCc0MsV0E3QmtCLG1CQTZCVnRDLFVBN0JVLEVBNkJFOztBQUVoQixZQUFJdUMsZUFBZSxLQUFuQjtBQUNBLFlBQUlDLFdBQVdyRCxLQUFLZSxLQUFMLENBQVdoRCxhQUFhQyxPQUFiLENBQXFCLEtBQUs0RSxRQUFMLENBQWNwRCxvQkFBbkMsQ0FBWCxDQUFmO0FBQ0EsWUFBSTZELFNBQVN4RCxRQUFULENBQWtCb0IsTUFBbEIsS0FBNkIsSUFBakMsRUFBdUM7QUFDbkMsaUJBQUssSUFBSUQsUUFBUSxDQUFqQixFQUFvQkEsUUFBUXFDLFNBQVN4RCxRQUFULENBQWtCb0IsTUFBOUMsRUFBc0RELE9BQXRELEVBQStEO0FBQzNELG9CQUFJRSxTQUFTTCxVQUFULEtBQXdCSyxTQUFTbUMsU0FBU3hELFFBQVQsQ0FBa0JtQixLQUFsQixFQUF5QkgsVUFBbEMsQ0FBNUIsRUFBMkU7QUFDdkV3Qyw2QkFBU3hELFFBQVQsQ0FBa0JtQixLQUFsQixFQUF5QkcsUUFBekIsR0FBb0NrQyxTQUFTeEQsUUFBVCxDQUFrQm1CLEtBQWxCLEVBQXlCRyxRQUF6QixHQUFvQyxDQUF4RTtBQUNBcEQsaUNBQWFnQyxPQUFiLENBQXFCLEtBQUs2QyxRQUFMLENBQWNwRCxvQkFBbkMsRUFBeURRLEtBQUtDLFNBQUwsQ0FBZW9ELFFBQWYsQ0FBekQ7QUFDQTVELDZCQUFTYyxNQUFUO0FBQ0E2QyxtQ0FBZSxJQUFmO0FBQ0g7QUFDSjtBQUVKLFNBVkQsTUFVTztBQUNIQSwyQkFBZSxJQUFmO0FBQ0g7O0FBR0QsWUFBSSxDQUFDQSxZQUFMLEVBQW1COztBQUVmLGdCQUFJRSxzQkFBc0J0RCxLQUFLZSxLQUFMLENBQVdoRCxhQUFhQyxPQUFiLENBQXFCLEtBQUs0RSxRQUFMLENBQWNFLHVCQUFuQyxDQUFYLEVBQXdFNUIsU0FBU0wsYUFBYSxDQUF0QixDQUF4RSxDQUExQjtBQUNBLGdCQUFJMEMsV0FBV0YsU0FBU3hELFFBQVQsQ0FBa0JvQixNQUFqQztBQUNBLGdCQUFJdUMsVUFBVSxFQUFkO0FBQ0FBLG9CQUFRM0MsVUFBUixHQUFxQkssU0FBU0wsVUFBVCxDQUFyQjtBQUNBMkMsb0JBQVF2QixHQUFSLEdBQWNxQixvQkFBb0JyQixHQUFsQztBQUNBdUIsb0JBQVFuQixZQUFSLEdBQXVCaUIsb0JBQW9CakIsWUFBM0M7QUFDQW1CLG9CQUFRbEMsS0FBUixHQUFnQmdDLG9CQUFvQmhDLEtBQXBDO0FBQ0FrQyxvQkFBUXJDLFFBQVIsR0FBbUJELFNBQVMsQ0FBVCxDQUFuQjtBQUNBbUMscUJBQVN4RCxRQUFULENBQWtCNEQsSUFBbEIsQ0FBdUJELE9BQXZCO0FBQ0F6Rix5QkFBYWdDLE9BQWIsQ0FBcUIsS0FBSzZDLFFBQUwsQ0FBY3BELG9CQUFuQyxFQUF5RFEsS0FBS0MsU0FBTCxDQUFlb0QsUUFBZixDQUF6RDtBQUNBNUQscUJBQVNjLE1BQVQ7QUFDSDtBQUNKLEtBOURpQjtBQWdFbEJBLFVBaEVrQixrQkFnRVh1Qyx1QkFoRVcsRUFnRWM7QUFDNUIsWUFBSUcsWUFBWWpELEtBQUtlLEtBQUwsQ0FBV2hELGFBQWErRSx1QkFBYixDQUFYLENBQWhCO0FBQ0EsWUFBSVksaUJBQWlCeEQsU0FBU0Msc0JBQVQsQ0FBZ0Msc0JBQWhDLEVBQXdELENBQXhELENBQXJCO0FBQ0EsWUFBSXdELHVCQUF1QixFQUEzQjtBQUNBLGFBQUssSUFBSTNDLFFBQVFpQyxVQUFVaEMsTUFBVixHQUFtQixDQUFwQyxFQUF1Q0QsUUFBUWlDLFVBQVVoQyxNQUFWLEdBQW1CLENBQWxFLEVBQXFFRCxPQUFyRSxFQUE4RTs7QUFFMUUsZ0JBQUk0QyxvS0FFNkVYLFVBQVVqQyxLQUFWLEVBQWlCaUIsR0FGOUYsb0ZBR3lDZ0IsVUFBVWpDLEtBQVYsRUFBaUJxQixZQUgxRCxnSkFLcUNZLFVBQVVqQyxLQUFWLEVBQWlCTSxLQUx0RCxTQUsrRDJCLFVBQVVqQyxLQUFWLEVBQWlCNkMsUUFMaEYsc0lBT3NFWixVQUFVakMsS0FBVixFQUFpQkgsVUFQdkYsaUhBQUo7QUFVQThDLG1DQUF1QkEsdUJBQXVCQyxlQUE5QztBQUNIO0FBQ0RGLHVCQUFlakMsU0FBZixHQUEyQmtDLG9CQUEzQjtBQUNIO0FBbkZpQixDQUF0Qjs7QUF3RkFHLE9BQU9DLE1BQVAsR0FBZ0IsWUFBWTs7QUFFeEJ0RSxhQUFTSyxJQUFUO0FBSUgsQ0FORDs7QUFTQSIsImZpbGUiOiJiaWdjYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKlxyXG4gKiDQodCx0L7RgNC60LAg0YTQsNC70L7QsiBKUyDRgdGC0L7RgNC+0L3QvdC40YVcclxuICogLy89IC4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvanF1ZXJ5L2Rpc3QvanF1ZXJ5LmpzXHJcbiAqL1xyXG5cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5mdW5jdGlvbiBsb2NhbFNob3BTdG9yYWdlKG5hbWUpIHtcclxuXHJcbiAgICAvLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIGxvY2FsU3RvcmFnZVtuYW1lXSA9ICcnO1xyXG5cclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lKSAhPT0gbnVsbCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGDRhdGA0LDQvdC40LvQuNGJ0LUgJHtuYW1lfSDRgdGD0YnQtdGB0YLQstGD0LXRgmApO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhg0YfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQuiwg0YXRgNCw0L3QuNC70LjRidC1ICR7bmFtZX0g0L3QtdGB0YPRidC10YHRgtCy0YPQtdGCYCk7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG59XHJcbi8qKlxyXG4gKiDQpNGD0L3QutGG0LjRjyDRh9GC0LXQvdC40Y8gSlNPTiDRhNCw0LnQu9C+0LJcclxuICogQHBhcmFtIGpzb25GaWxlXHJcbiAqIEBwYXJhbSBjYWxsYmFjayDQpNGD0L3QutGG0LjRjyDQsiDQutC+0YLQvtGA0YPRjiDQstC+0LfQstGA0LDRidCw0LXQvCDRgNC10LfRg9C70YzRgtCw0YIgUEFSU0Ug0Lgg0L3QsNC30LLQsNC90LjQtVxyXG4gKiDQutC70LDRgdGB0LAg0L7QsdC10YDRgtC60Lgg0YLQvtCy0LDRgNCwXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZ2V0SnNvbihqc29uRmlsZSwgY2FsbGJhY2spIHtcclxuXHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignR0VUJywgJ2pzb24vJyArIGpzb25GaWxlLCB0cnVlKTtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn0YHRgtCw0YLRg9GBINCz0L7RgtC+0LLQvicpO1xyXG4gICAgICAgICAgICAvLyBjYWxsYmFjayhKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpLCB3cmFwcGVyQ2xhc3MpO1xyXG4gICAgICAgICAgICBjYWxsYmFjaygoeGhyLnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfRgdGC0LDRgtGD0YEg0LPQvtGC0L7QstC90L7RgdGC0LggJyArIHhoci5yZWFkeVN0YXRlKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ9GB0YLQsNGC0YPRgSAnICsgeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEpzb25GZXRjaChqc29uRmlsZSwgY2FsbGJhY2spIHtcclxuXHJcbiAgIGZldGNoKCdqc29uLycgKyBqc29uRmlsZSlcclxuICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcclxuICAgICAgIC50aGVuKHRleHQgPT4ge1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKHRleHQpXHJcbiAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgIH0pXHJcbn1cclxuXHJcbmdldEpzb25GZXRjaCgnLi4vanNvbi8nICsgJ2dldEJhc2tldC5qc29uJyk7XHJcbmdldEpzb24oJy4uL2pzb24vJyArICdnZXRCYXNrZXQuanNvbicsIGNvbnNvbGVMKTtcclxuXHJcbmZ1bmN0aW9uIGNvbnNvbGVMKGVycikge1xyXG4gICAgY29uc29sZS5sb2coZXJyKVxyXG59XHJcbmxldCB3cmFwcGVyQ2xhc3MgPSAnZHJvcGRvd25DYXJ0JztcclxubGV0IGxvY2FsQ2FydFN0b3JhZ2VOYW1lID0gJ21pbmlDYXJ0JztcclxuXHJcbmxldCBtaW5pQ2FydCA9IHtcclxuXHJcbiAgICAvLyBpbml0KGRhdGEsIGxvY2FsQ2FydFN0b3JhZ2VOYW1lKSB7XHJcbiAgICAvLyAgICAgbG9jYWxTdG9yYWdlW2xvY2FsQ2FydFN0b3JhZ2VOYW1lXSA9IGRhdGE7XHJcbiAgICAvLyAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgZW1weUNhcnQ6IHtcclxuICAgICAgICBhbW91bjogMCxcclxuICAgICAgICBjb3VudEdvb2RzOiAwLFxyXG4gICAgICAgIGNvbnRlbnRzOiBbXVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0KCkge1xyXG5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxDYXJ0U3RvcmFnZU5hbWUpID09PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbENhcnRTdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkobWluaUNhcnQuZW1weUNhcnQpKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh3cmFwcGVyQ2xhc3MpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2sgPT4gdGhpcy5jbGlja0hhbmRsZXIoZXZlbnQpKTtcclxuICAgICAgICAgICAgbWluaUNhcnQucmVuZGVyKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHdyYXBwZXJDbGFzcylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGljayA9PiB0aGlzLmNsaWNrSGFuZGxlcihldmVudCkpO1xyXG4gICAgICAgICAgICBtaW5pQ2FydC5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgY2xpY2tIYW5kbGVyKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gaWYgKGV2ZW50LnRhcmdldC5kYXRhc2V0LmJ1dHRvbl9uYW1lID09PSAnY2xlYXInKSB7XHJcbiAgICAgICAgLy8gICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsQ2FydFN0b3JhZ2VOYW1lLCBKU09OLnN0cmluZ2lmeShtaW5pQ2FydC5lbXB5Q2FydCkpO1xyXG4gICAgICAgIC8vICAgICBtaW5pQ2FydC5yZW5kZXIoKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudGFyZ2V0LmRhdGFzZXQuYnV0dG9uX25hbWUpIHtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2NsZWFyJzpcclxuXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbENhcnRTdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkobWluaUNhcnQuZW1weUNhcnQpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtaW5pQ2FydC5yZW5kZXIoKTtcclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBkZWxldGUoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgbGV0IGlkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuaWRfcHJvZHVjdDtcclxuICAgICAgICBsZXQgYXJyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbENhcnRTdG9yYWdlTmFtZSkpO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4PTA7IGluZGV4IDwgYXJyLmNvbnRlbnRzLmxlbmd0aDtpbmRleCsrKXtcclxuICAgICAgICAgICAgaWYgKHBhcnNlSW50KGFyci5jb250ZW50c1tpbmRleF0uaWRfcHJvZHVjdCkgPT09IHBhcnNlSW50KGlkKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChhcnIuY29udGVudHNbaW5kZXhdLnF1YW50aXR5KT4xKXtcclxuICAgICAgICAgICAgICAgICAgICBhcnIuY29udGVudHNbaW5kZXhdLnF1YW50aXR5ID0gYXJyLmNvbnRlbnRzW2luZGV4XS5xdWFudGl0eSAtIDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnIuY29udGVudHMuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbENhcnRTdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkoYXJyKSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIGxldCBhbW1vdW50ID0gMDtcclxuICAgICAgICBsZXQgcHJpY2UgPSAwO1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZUl0ZW1Db250YWluZXIgPSAnJztcclxuXHJcbiAgICAgICAgbGV0IGFyciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJtaW5pQ2FydFwiKSkuY29udGVudHM7XHJcblxyXG4gICAgICAgIGxldCB0ZW1wRHJvcERvd25DYXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZHJvcGRvd25DYXJ0JylbMF07XHJcbiAgICAgICAgdGVtcERyb3BEb3duQ2FydC5pbm5lckhUTUwgPSAnJztcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCAhPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyLmNsYXNzTmFtZSA9ICdkcm9wZG93bkNhcnRfX2l0ZW1XcmFwZXInO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRyb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkcm9wZG93bkNhcnRfX2J1dHRvbldyYXBwZXIuY2xhc3NOYW1lID0gJ2Ryb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlcic7XHJcblxyXG4gICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0LmFwcGVuZENoaWxkKHRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyKTtcclxuICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydC5hcHBlbmRDaGlsZChkcm9wZG93bkNhcnRfX2J1dHRvbldyYXBwZXIpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcERyb3BEb3duQ2FydEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnRJdGVtLmNsYXNzTmFtZSA9J2Ryb3Bkb3duQ2FydF9faXRlbSc7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0SXRlbS5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImRyb3Bkb3duQ2FydF9faW1nXCIgc3JjPVwiaW1nLyR7YXJyW2ldLmltZ31cIiBhbHQ9XCJcIj5gO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRHJvcERvd25JbmZvV3JhcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRHJvcERvd25JbmZvV3JhcGVyLmNsYXNzTmFtZSA9J2Ryb3Bkb3duQ2FydF9faW5mb1dyYXBwZXInO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBQcmljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAgICAgICAgIHBQcmljZS5jbGFzc05hbWUgPSAnZHJvcGRvd25DYXJ0X19wcmljZSc7XHJcbiAgICAgICAgICAgICAgICBwUHJpY2UuaW5uZXJIVE1MID0gYCR7YXJyW2ldLnF1YW50aXR5fSB4ICR7YXJyW2ldLnByaWNlfSDRgNGD0LEuYDtcclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkluZm9XcmFwZXIuYXBwZW5kQ2hpbGQocFByaWNlKTtcclxuICAgICAgICAgICAgICAgIGxldCBwRGVzY3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgICAgICBwRGVzY3IuY2xhc3NOYW1lID0gJ2Ryb3Bkb3duQ2FydF9fZGVzY3JpcHRpb24nO1xyXG4gICAgICAgICAgICAgICAgcERlc2NyLmlubmVySFRNTCA9IGAke2FycltpXS5wcm9kdWN0X25hbWV9YDtcclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkluZm9XcmFwZXIuYXBwZW5kQ2hpbGQocERlc2NyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0SXRlbS5hcHBlbmRDaGlsZCh0ZW1wRHJvcERvd25JbmZvV3JhcGVyKTtcclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyLmFwcGVuZENoaWxkKHRlbXBEcm9wRG93bkNhcnRJdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgdGVtcEJ1dHRvbi5pbm5lckhUTUwgPSBgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkcm9wZG93bkNhcnRfX2J1dHRvbkRlbFwiIGRhdGEtYnV0dG9uX25hbWU9XCJkZWxldGVcIiBkYXRhLWlkX3Byb2R1Y3Q9XCIke2FycltpXS5pZF9wcm9kdWN0fVwiPng8L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydEl0ZW0uYXBwZW5kQ2hpbGQodGVtcEJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpY2UgPSBwcmljZSArIGFycltpXS5xdWFudGl0eSAqIGFycltpXS5wcmljZTtcclxuICAgICAgICAgICAgICAgIGFtbW91bnQgPSBhbW1vdW50ICsgYXJyW2ldLnF1YW50aXR5O1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRyb3Bkb3duQ2FydF9fYnV0dG9uIGRyb3Bkb3duQ2FydF9fYnV0dG9uX21vZFwiIGRhdGEtYnV0dG9uX25hbWU9XCJjaGVja1wiPtCe0YTQvtGA0LzQuNGC0Yw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRyb3Bkb3duQ2FydF9fYnV0dG9uIGRyb3Bkb3duQ2FydF9fYnV0dG9uX21vZFwiIGRhdGEtYnV0dG9uX25hbWU9XCJjYXJ0XCI+PGEgaHJlZj1cIi4uL2JpZ2NhcnQucGhwXCI+0JrQvtGA0LfQuNC90LA8L2E+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkcm9wZG93bkNhcnRfX2J1dHRvbiBkcm9wZG93bkNhcnRfX2J1dHRvbl9tb2RcIiBkYXRhLWJ1dHRvbl9uYW1lPVwiY2xlYXJcIj7QntGH0LjRgdGC0LjRgtGMPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIGRyb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlci5pbm5lckhUTUwgPSBidXR0b247XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbWluaUNhcnQucmVuZGVyINCy0YvQstC+0LTQuNGCINC/0YPRgdGC0YPRjiDRhNC+0YDQvNGDINCx0LXQtyDRgtC+0LLQsNGA0L7QsicpO1xyXG4gICAgICAgICAgICBsZXQgdGVtcGxhdGVJdGVtID0gYFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd25DYXJ0X19lbXB0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJkcm9wZG93bkNhcnRfX2ltZ0NhcnRcIj48aSBjbGFzcz1cImZhIGZhLXNob3BwaW5nLWNhcnRcIj48L2k+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHA+0JIg0LrQvtGA0LfQuNC90LUg0L3QuNGH0LXQs9C+INC90LXRgjwvcD5cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydC5pbm5lckhUTUw9dGVtcGxhdGVJdGVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ1dHRvbkNhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBoZWFkZXJNaWRkbGVfX215Q2FydF9tb2RgKVswXTtcclxuICAgICAgICBsZXQgYnV0dG9uQ2FydFRlbXBsYXRlID0gYDxzcGFuIGNsYXNzPVwidGV4dFBpbmtcIj4ke2FtbW91bnR9Jm5ic3BcclxuICAgICAgICAgICAgICAgIDwvc3Bhbj7RgtC+0LLQsNGA0L7Qsi8mbmJzcDxzcGFuIGNsYXNzPVwidGV4dFBpbmtcIj4ke3ByaWNlfSZuYnNwPC9zcGFuPtGA0YPQsWA7XHJcbiAgICAgICAgYnV0dG9uQ2FydC5pbm5lckhUTUwgPSBidXR0b25DYXJ0VGVtcGxhdGU7XHJcblxyXG4gICAgfVxyXG59O1xyXG5sZXQgbG9hZENhdGFsb2dEYXRhID0ge1xyXG5cclxuICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgZGF0YTogJycsXHJcbiAgICAgICAgbG9jYWxDYXRhbG9nU3RvcmFnZU5hbWU6ICdjYXRhbG9nRGF0YScsXHJcbiAgICAgICAgbG9jYWxDYXJ0U3RvcmFnZU5hbWU6ICdnZXRCYXNrZXQnLFxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0KHNldHRpbmdzKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oKHRoaXMuc2V0dGluZ3MsIHNldHRpbmdzKSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5zZXR0aW5ncy5sb2NhbENhdGFsb2dTdG9yYWdlTmFtZSwgdGhpcy5zZXR0aW5ncy5kYXRhKTtcclxuICAgICAgICBsZXQgZGF0YVBhcnNlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbdGhpcy5zZXR0aW5ncy5sb2NhbENhdGFsb2dTdG9yYWdlTmFtZV0pO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc2V0dGluZ3MubG9jYWxDYXRhbG9nU3RvcmFnZU5hbWUpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbGxlcnlfX2l0ZW1XcmFwcGVyJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0aGlzLmNsaWNrSGFuZGxlcihldmVudCkpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J7QsdGA0LDQsdC+0YLQutCwINC60LvQuNC60LAg0L/QviDQutC90L7Qv9C60LVcclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICovXHJcbiAgICBjbGlja0hhbmRsZXIoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IGEgYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkQ2FydChldmVudC50YXJnZXQuZGF0YXNldC5pZF9wcm9kdWN0KTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkQ2FydChpZF9wcm9kdWN0KSB7XHJcblxyXG4gICAgICAgIGxldCBjaGVja0NvbnRhaW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgZGF0YUNhcnQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuc2V0dGluZ3MubG9jYWxDYXJ0U3RvcmFnZU5hbWUpKTtcclxuICAgICAgICBpZiAoZGF0YUNhcnQuY29udGVudHMubGVuZ3RoICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkYXRhQ2FydC5jb250ZW50cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChpZF9wcm9kdWN0KSA9PSBwYXJzZUludChkYXRhQ2FydC5jb250ZW50c1tpbmRleF0uaWRfcHJvZHVjdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhQ2FydC5jb250ZW50c1tpbmRleF0ucXVhbnRpdHkgPSBkYXRhQ2FydC5jb250ZW50c1tpbmRleF0ucXVhbnRpdHkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc2V0dGluZ3MubG9jYWxDYXJ0U3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KGRhdGFDYXJ0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluaUNhcnQucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb250YWluID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGVja0NvbnRhaW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICghY2hlY2tDb250YWluKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YUl0ZW1Gcm9tQ2F0YWxvZyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zZXR0aW5ncy5sb2NhbENhdGFsb2dTdG9yYWdlTmFtZSkpW3BhcnNlSW50KGlkX3Byb2R1Y3QgLSAxKV07XHJcbiAgICAgICAgICAgIGxldCBhcnJMZWd0aCA9IGRhdGFDYXJ0LmNvbnRlbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgbGV0IGFyckl0ZW0gPSB7fTtcclxuICAgICAgICAgICAgYXJySXRlbS5pZF9wcm9kdWN0ID0gcGFyc2VJbnQoaWRfcHJvZHVjdCk7XHJcbiAgICAgICAgICAgIGFyckl0ZW0uaW1nID0gZGF0YUl0ZW1Gcm9tQ2F0YWxvZy5pbWc7XHJcbiAgICAgICAgICAgIGFyckl0ZW0ucHJvZHVjdF9uYW1lID0gZGF0YUl0ZW1Gcm9tQ2F0YWxvZy5wcm9kdWN0X25hbWU7XHJcbiAgICAgICAgICAgIGFyckl0ZW0ucHJpY2UgPSBkYXRhSXRlbUZyb21DYXRhbG9nLnByaWNlO1xyXG4gICAgICAgICAgICBhcnJJdGVtLnF1YW50aXR5ID0gcGFyc2VJbnQoMSk7XHJcbiAgICAgICAgICAgIGRhdGFDYXJ0LmNvbnRlbnRzLnB1c2goYXJySXRlbSk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc2V0dGluZ3MubG9jYWxDYXJ0U3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KGRhdGFDYXJ0KSk7XHJcbiAgICAgICAgICAgIG1pbmlDYXJ0LnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyKGxvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lKSB7XHJcbiAgICAgICAgbGV0IGRhdGFQYXJzZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2xvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lXSk7XHJcbiAgICAgICAgbGV0IGdhbGxhcnlXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FsbGVyeV9faXRlbVdyYXBwZXInKVswXTtcclxuICAgICAgICBsZXQgZ2FsbGFyeUl0ZW1Db250YWluZXIgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IGRhdGFQYXJzZS5sZW5ndGggLSAxOyBpbmRleCA+IGRhdGFQYXJzZS5sZW5ndGggLSA2OyBpbmRleC0tKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ2FsbGVyeVRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeV9faXRlbVwiPlxyXG4gICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnlfX2NvbnRhaW5lckl0ZW1JbWdcIj48aW1nIGNsYXNzPVwiZ2FsbGVyeV9faXRlbUltZ1wiIHNyYz1cImltZy8ke2RhdGFQYXJzZVtpbmRleF0uaW1nfVwiYWx0PVwiXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj48cCBjbGFzcz1cImdhbGxlcnlfX2l0ZW1UaXRsZVwiPiR7ZGF0YVBhcnNlW2luZGV4XS5wcm9kdWN0X25hbWV9PC9wPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PHAgY2xhc3M9XCJnYWxsZXJ5X19hdGluZ3NcIj4qKioqKjwvcD48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxwIGNsYXNzPVwiZ2FsbGVyeV9fcHJpY2VcIj4ke2RhdGFQYXJzZVtpbmRleF0ucHJpY2V9ICR7ZGF0YVBhcnNlW2luZGV4XS5jdXJyZW5jeX08L3A+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBnYWxsZXJ5X19pdGVtQnV0dG9uXCIgZGF0YS1pZF9wcm9kdWN0PVwiJHtkYXRhUGFyc2VbaW5kZXhdLmlkX3Byb2R1Y3R9XCI+0JTQvtCx0LDQstC40YLRjDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICBnYWxsYXJ5SXRlbUNvbnRhaW5lciA9IGdhbGxhcnlJdGVtQ29udGFpbmVyICsgZ2FsbGVyeVRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnYWxsYXJ5V3JhcHBlci5pbm5lckhUTUwgPSBnYWxsYXJ5SXRlbUNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBtaW5pQ2FydC5pbml0KCk7XHJcblxyXG5cclxuXHJcbn07XHJcblxyXG5cclxuLypcclxuICog0J/QvtC00LvRjtGH0LXQvdC40LUg0YHQstC+0LjRhSDRhNCw0LnQu9C+0LIgSlMg0LTQu9GPINGB0LHQvtGA0LrQuFxyXG4gKiAvLz0gcGFydHMvYXBwLmpzXHJcbiAqIC8vPSBwYXJ0cy9oZWFkZXIuanNcclxuICogLy89IHBhcnRzL2Zvb3Rlci5qc1xyXG4gKi8iXX0=
