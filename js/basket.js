const mainCheckbox = document.getElementById('checkboxMain');
const checkboxes = document.querySelectorAll('.main__priceGoods');

const countInputs = document.querySelectorAll('.card__counterInput');
const decreaseButtons = document.querySelectorAll('.card__counterButton_is_left');
const increaseButtons = document.querySelectorAll('.card__counterButton_is_right');

const prices = document.querySelectorAll('.card__priceDiscount');
const pricesWithDiscount = document.querySelectorAll('.card__priceNoDiscount');

const totalPrice = document.querySelector('.order-details__totalPrice');
const totalProceDiscount = document.querySelector('.order-details__titlePrice');
const accordeonPrice = document.querySelector('.accordeon__price');
const discount = document.querySelector('.order-details__sell');

const countGoods = document.querySelector('.accordeon__countNum');

const checkBoxPay = document.querySelector('.order-details__paymentInput');
const payButton = document.querySelector('.order-details__orderButton');
const infoPay = document.querySelector('.order-details__infoPay');

const countGoodsExist = document.querySelector('.countGoods__headerCount');
const countGoodsDontExist = document.querySelector('.accordeon__countDontExistGoods');

//Стоимость товаров
let total = 0;
//Стоимость товаров с учетом скидки
let totalDiscount = 0;
//Скидка
let totalCount = 0;

//функция работы со счетчиком товаров в корзине
function counter() {
  countInputs.forEach(input => {
    const currentValue = parseFloat(input.value);
    const maxQuantity = parseFloat(input.getAttribute('data-max-quantity'));

    input.parentNode.querySelector('.card__counterButton_is_left').disabled = currentValue === 1;
    input.parentNode.querySelector('.card__counterButton_is_right').disabled = currentValue === maxQuantity;
  });

  // Обработчик для кнопок -1
  decreaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      handleCounterButtonClick(button, false);
    });
  });
    
  // Обработчик для кнопок +1
  increaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      handleCounterButtonClick(button, true);
    });
  });
}

// Обработчик для кнопок +1 и -1
function handleCounterButtonClick(button, increment) {
  const input = button.parentNode.querySelector('.card__counterInput');
  let currentValue = parseFloat(input.value);
  const maxQuantity = parseFloat(input.getAttribute('data-max-quantity'));

  if (increment) {
    if (currentValue < maxQuantity) {
      currentValue += 1;
    }
  } else {
    if (currentValue > 1) {
      currentValue -= 1;
    }
  }

  input.value = currentValue;
  input.parentNode.querySelector('.card__counterButton_is_left').disabled = currentValue === 1;
  input.parentNode.querySelector('.card__counterButton_is_right').disabled = currentValue === maxQuantity;

  updateTotal();
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
      const countValue = parseFloat(checkbox.parentNode.parentNode.parentNode.querySelector('.card__counterInput').value);
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

countGoodsExist.textContent = main.querySelector('.main__cards_existGoods').children.length + '';
countGoodsDontExist.textContent = main.querySelector('.main__cards_dontExistGoods').children.length + ' товара';

counter();
updateTotal();
