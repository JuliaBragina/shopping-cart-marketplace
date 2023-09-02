const mainCheckbox = document.getElementById('checkboxMain');
const checkboxes = document.querySelectorAll('.main__priceGoods');

const countInputs = document.querySelectorAll('.main__counterInput');
const decreaseButtons = document.querySelectorAll('.main__counterButton_is_left');
const increaseButtons = document.querySelectorAll('.main__counterButton_is_right');

const prices = document.querySelectorAll('.main__goodsPriceDiscount');
const pricesWithDiscount = document.querySelectorAll('.main__goodsPriceNoDiscount');

const totalPrice = document.querySelector('.order-details__totalPrice');
const totalProceDiscount = document.querySelector('.order-details__titlePrice');
const accordeonPrice = document.querySelector('.accordeon__price');
const discount = document.querySelector('.order-details__sell');

const countGoods = document.querySelector('.accordeon__countNum');

const checkBoxPay = document.querySelector('.order-details__paymentInput');
const payButton = document.querySelector('.order-details__orderButton');
const infoPay = document.querySelector('.order-details__infoPay');

const countGoodsExist = document.querySelector('.countGoods__headerCount');
const countGoodsDontExist = main.querySelector('.accordeon__countDontExist');

//Стоимость товаров
let total = 0;
//Стоимость товаров с учетом скидки
let totalDiscount = 0;
//Скидка
let totalCount = 0;

//функция работы со счетчиком товаров в корзине
function counter() {
  //задиблим кнопки, если количество товара === 1 или максимальному количеству товара 
  countInputs.forEach(input => {
    if(parseFloat(input.value) === parseFloat(input.getAttribute('data-max-quantity'))) {
      input.parentNode.querySelector('.main__counterButton_is_right').disabled = true;
    }
    if(parseFloat(input.value) === 1) {
      input.parentNode.querySelector('.main__counterButton_is_left').disabled = true;
    }
  })

  //обрабочик для кнопки -1
  decreaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.parentNode.querySelector('.main__counterInput');
      const currentValue = parseFloat(input.value);
      
      if (currentValue > 1) {
        input.value = currentValue - 1;
        button.parentNode.querySelector('.main__counterButton_is_right').removeAttribute('disabled');
        updateTotal();
      } else {
        button.setAttribute('disabled', true);
        updateTotal();
      }
    });
  });
    
  //обрабочик для кнопки +1
  increaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.parentNode.querySelector('.main__counterInput');
      const currentValue = parseFloat(input.value);
      const maxQuantity = parseFloat(input.getAttribute('data-max-quantity'));

      if (currentValue < maxQuantity) {
        input.value = currentValue + 1;
        button.parentNode.querySelector('.main__counterButton_is_left').removeAttribute('disabled');
        updateTotal();
      } else {
        button.setAttribute('disabled', true);
        updateTotal();
      }
    });
  });
}

// Функция для обновления суммы на основе выбранных товаров и количества
function updateTotal() {
  total = 0;
  totalDiscount = 0;
  totalCount = 0;

  // массив для хранения цен на каждый товар
  let massPrice = [];
  let massPriceDiscount = [];

  //рассчет стоимости товаров в корзине
  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const price = parseFloat(checkbox.getAttribute('data-price'));
      const countValue = parseFloat(checkbox.parentNode.parentNode.parentNode.querySelector('.main__counterInput').value);
      const itemTotal = isNaN(countValue) ? 0 : countValue * price;
      massPrice[index] = itemTotal;
      massPriceDiscount[index] = itemTotal * 0.5; //рассчет скидки
      total += itemTotal;
      totalDiscount += itemTotal * 0.5; //рассчет скидки
      totalCount += countValue;
    }
  });

  // обнолвение текстовых элементов на странице
  totalPrice.textContent = total.toFixed(0) + ' сом';
  totalProceDiscount.textContent = totalDiscount.toFixed(0) + ' сом';
  accordeonPrice.textContent = totalDiscount.toFixed(0) + ' сом';
  discount.textContent = totalDiscount.toFixed(0) - total.toFixed(0) + ' сом';
  countGoods.textContent = totalCount + '';

  for (let i = 0; i < pricesWithDiscount.length; i += 2) {
    const itemIndex = Math.floor(i / 2);
    if(massPrice[itemIndex]) {
      pricesWithDiscount[i].textContent = massPrice[itemIndex].toFixed(0) + ' сом';
      pricesWithDiscount[i + 1].textContent = massPrice[itemIndex].toFixed(0) + ' сом';
    }
  }

  for (let i = 0; i < prices.length; i += 2) {
    const itemIndex = Math.floor(i / 2);
    if(massPrice[itemIndex]) {
      prices[i].textContent = massPrice[itemIndex].toFixed(0) * 0.5 + ' сом';
      prices[i + 1].textContent = massPrice[itemIndex].toFixed(0)  * 0.5 + ' сом';
    }
  }

  updatemainCheckbox();
}

// Функция для обновления состояния "Выбрать все" чекбокса
function updatemainCheckbox() {
  mainCheckbox.checked = [...checkboxes].every(checkbox => checkbox.checked);
}

// обновляем текст на кнопке
checkBoxPay.addEventListener('change', () => {
  payButton.textContent = checkBoxPay.checked ? `Оплатить ${totalDiscount.toFixed(0)} сом` : 'Заказать';
  infoPay.classList.toggle('order-details__infoPay_is_hidden');
});

// Обработчик события для чекбокса "Выбрать все"
mainCheckbox.addEventListener('change', () => {
  checkboxes.forEach(checkbox => {
    checkbox.checked = mainCheckbox.checked;
  });
  updateTotal();
});

// Добавляем обработчики событий на чекбоксы и поля ввода количества
countInputs.forEach(input => input.addEventListener('input', updateTotal))
checkboxes.forEach(checkbox => checkbox.addEventListener('change', updateTotal));

countGoodsExist.textContent = main.querySelector('.main__cards_exict').children.length + '';
countGoodsDontExist.textContent = main.querySelector('.main__cards_dontExict').children.length + ' товара';

counter();
updateTotal();
