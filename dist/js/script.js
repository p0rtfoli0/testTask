"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const parentHeadphones = document.querySelector('.catalog__headphones .catalog__product-group'),
          parentWireless = document.querySelector('.catalog__wireless .catalog__product-group'),
          catalog = document.querySelector('.catalog'),
          cartCounterHeader = document.querySelector('.header__cart .header__counter');

    const counter = sessionStorage["counter"];
    const headphones = [
        {
            img: "img/byz.png",
            title: "Apple BYZ S852I",
            price: 2927,
            discount: 3527,
            rate: 4.7

        },
        {
            img: "img/earpods.png",
            title: "Apple EarPods",
            price: 2327,
            discount: "",
            rate: 4.5
        },
        {
            img: "img/earpods_box.png",
            title: "Apple EarPods",
            price: 2327,
            discount: "",
            rate: 4.5
        },
        {
            img: "img/byz.png",
            title: "Apple BYZ S852I",
            price: 2927,
            discount: "",
            rate: 4.7

        },
        {
            img: "img/earpods.png",
            title: "Apple EarPods",
            price: 2327,
            discount: "",
            rate: 4.5
        },
        {
            img: "img/earpods_box.png",
            title: "Apple EarPods",
            price: 2327,
            discount: "",
            rate: 4.5
        }
    ];
    const wireless = [
        {
            img: "img/airpods.png",
            title: "Apple AirPods",
            price: 9527,
            discount: "",
            rate: 4.7
        },
        {
            img: "img/gerlax.png",
            title: "GERLAX GH-04",
            price: 6527,
            discount: "",
            rate: 4.7
        },
        {
            img: "img/borofone.png",
            title: "BOROFONE BO4",
            price: 7527,
            discount: "",
            rate: 4.7
        }
    ];

    class CatalogCard {
        constructor (img, title, price, discount, rate, parent) {
            this.img = img,
            this.title = title,
            this.price = price,
            this.discount = discount,
            this.rate = rate,
            this.parent = parent;
        }

        createCard() {
            this.parent.innerHTML += `
                <div class="catalog__product">
                    <div class="catalog__wrapper-image">
                        <img class="catalog__image" src=${this.img} alt=${this.title}>
                    </div>
                    <div class="catalog__description">
                        <div class="catalog__name">${this.title}</div>
                        <div class="catalog__price">
                            <div class="catalog__final-price">${this.price} ₽</div>
                            <div class="catalog__discount">${this.discount !== "" ? this.discount + ' ₽' : this.discount}</div>
                        </div>
                        <div class="catalog__rate">
                            <img src="icons/star.svg" alt="rate" class="catalog__icon-star">
                            <span>${this.rate}</span>
                        </div>
                        <button class="catalog__button">Купить</button>
                    </div>
                </div>
            `;
        }
    }

    function checkCounter() {
        if (counter > 0) {
            cartCounterHeader.classList.remove('header__counter_disabled');
            cartCounterHeader.textContent = counter;
        }
    }

    function startCreateCard() {        
        headphones.forEach(item => {
            new CatalogCard(...Object.values(item), parentHeadphones).createCard();
        });
    
        wireless.forEach(item => {
            new CatalogCard(...Object.values(item), parentWireless).createCard();
        });
    }
    checkCounter();
    startCreateCard();

    catalog.addEventListener('click', (event) => {
        if (event.target && event.target.matches("button.catalog__button")) {
            const parent = event.target.parentElement,
                  imgBuyItem = parent.parentElement.querySelector('img').getAttribute('src'),
                  titleBuyItem = parent.querySelector('.catalog__name').textContent,
                  priceBuyItem = parent.querySelector('.catalog__final-price').textContent;
            const buyItem = `${imgBuyItem}, ${titleBuyItem}, ${priceBuyItem}`;

            cartCounterHeader.classList.remove('header__counter_disabled');
            cartCounterHeader.textContent = +cartCounterHeader.textContent + 1;

            sessionStorage["counter"] = cartCounterHeader.textContent;
            
            if (sessionStorage[buyItem]) {
                sessionStorage[buyItem] = +sessionStorage[buyItem] + 1;
            } else {
                sessionStorage[buyItem] = 1;
            }            
        }
    });




});