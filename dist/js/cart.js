"use strict";

window.addEventListener("DOMContentLoaded", () => {
    const cartCounterHeader = document.querySelector('.header__cart .header__counter'),
          productGroup = document.querySelector('.cart__product-group'),
          totalPrice = document.querySelectorAll('.cart__total-price span')[1];

    class CartCard {
        constructor (img, title, price, quantity, parent) {
            this.img = img;
            this.title = title;
            this.price = price;
            this.quantity = quantity;
            this.parent = parent;
        }

        createCard() {
            [this.price, this.finalPrice] = priceConversion(this.price, this.quantity);

            this.parent.innerHTML += `
                <div class="cart__product-card">
                    <img class="cart__image" src=${this.img} alt=${this.title}>
                    <div class="cart__wrapper-counter">
                        <button class="cart__counter cart__counter_reduce"></button>
                        <span>${this.quantity}</span>
                        <button class="cart__counter cart__counter_add"></button>
                    </div>
                    <div class="cart__name">${this.title}</div>
                    <div class="cart__unit-price">${this.price}</div>
                    <img class="cart__delete" src="icons/delete.svg" alt="delete">
                    <div class="cart__product-final-price">${this.finalPrice}</div>
                </div>
            `;
        }
    }
    
    function startCreateCard() {
        if (+sessionStorage["counter"] > 0) {
            cartCounterHeader.classList.remove('header__counter_disabled');
            cartCounterHeader.textContent = sessionStorage["counter"];
    
            for (let key of Object.keys(sessionStorage)) {
                if (key === "counter"){
                    continue;
                }
                new CartCard(...key.split(", "), sessionStorage[key], productGroup).createCard();
            };
            calcTotalPrice();
        }
    }

    function priceConversion(price, quantity) {
        price = parseInt(price.replace(/\s/g, ""));
        let finalPrice = (price * quantity).toLocaleString() + " ₽";
        price = price.toLocaleString()  + " ₽";

        return [price, finalPrice];
    }

    function parseElement(parent) {
        const imgBuyItem = parent.querySelector('.cart__image').getAttribute('src'),
              titleBuyItem = parent.querySelector('.cart__name').textContent,
              priceBuyItem = parent.querySelector('.cart__unit-price').textContent.replace(/\D/g, "") + " ₽";
        return `${imgBuyItem}, ${titleBuyItem}, ${priceBuyItem}`;
    }

    function updateProductPrice(quantity, parent) {
        let productPrice = parent.querySelector('.cart__unit-price').textContent;
        let [price, finalPrice] = priceConversion(productPrice, +quantity);
        productPrice = price;
        parent.querySelector('.cart__product-final-price').textContent = finalPrice;
        calcTotalPrice();
    }

    function removeItem(itemStorage, element) {
        cartCounterHeader.textContent = +cartCounterHeader.textContent - (+sessionStorage[itemStorage]);
        sessionStorage["counter"] = cartCounterHeader.textContent;
        sessionStorage.removeItem(itemStorage);
        element.remove();
        if (+cartCounterHeader.textContent <= 0) {
            cartCounterHeader.classList.add('header__counter_disabled');
        }
        calcTotalPrice();
    }

    function calcTotalPrice() {
        let price = 0;
        document.querySelectorAll('.cart__product-final-price').forEach((item) => {
            price += +item.textContent.replace(/\D/g, "");
        });
        totalPrice.textContent = "₽ " + price.toLocaleString();
    }

    productGroup.addEventListener('click', (event) => {
        let mainParent = event.target.parentElement.parentElement;

        if (event.target && event.target.matches('button.cart__counter_add')) {
            const counterProduct = event.target.previousElementSibling;
            const itemAddStorage = parseElement(mainParent);

            cartCounterHeader.textContent = +cartCounterHeader.textContent + 1;
            counterProduct.textContent = +counterProduct.textContent + 1;
            sessionStorage["counter"] = cartCounterHeader.textContent;
            sessionStorage[itemAddStorage] = +sessionStorage[itemAddStorage] + 1;

            updateProductPrice(counterProduct.textContent, mainParent);

        } else if (event.target && event.target.matches('button.cart__counter_reduce')) {
            const counterProduct = event.target.nextElementSibling,
                  itemRemoveStorage = parseElement(mainParent);

            
            if (sessionStorage[itemRemoveStorage] === "1") {
                removeItem(itemRemoveStorage, mainParent);
            } else {
                cartCounterHeader.textContent = +cartCounterHeader.textContent - 1;
                counterProduct.textContent = +counterProduct.textContent - 1;
                sessionStorage["counter"] = cartCounterHeader.textContent;
                sessionStorage[itemRemoveStorage] = +sessionStorage[itemRemoveStorage] - 1;
                updateProductPrice(counterProduct.textContent, mainParent);
            }           
            
        } else if (event.target && event.target.matches('img.cart__delete')) {
            removeItem(parseElement(event.target.parentElement), event.target.parentElement);
        }
    });

    startCreateCard();
});