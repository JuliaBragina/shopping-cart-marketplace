const selectAllCheckbox = document.getElementById('payStart0');
const checkboxes = document.querySelectorAll('.main__priceGoods');

const decresButtons = document.querySelectorAll('.main__counterButton_is_left');
const incresButtons = document.querySelectorAll('.main__counterButton_is_right');
const countInputs = document.querySelectorAll('.main__counterInput');

const countForItemSell = document.querySelectorAll('.main__goodsPriceSell');
const countForItem = Array.from(document.querySelectorAll('.main__goodsPriceNoSell'));

const orderDetailPrice = document.querySelector('.order-details__totalPrice');
const orderDetailPriceSell = document.querySelector('.order-details__titlePrice');
const accordeonPrice = document.querySelector('.accordeon__price');
const orderDetailSell = document.querySelector('.order-details__sell');

const countGoods = document.querySelector('.accordeon__countNum');

const checkBoxPay = document.querySelector('.order-details__paymentInput');
const payButton = document.querySelector('.order-details__orderButton');
const infoPay = document.querySelector('.order-details__infoPay');

let total = 0.00;
let totalSell = 0;
let countTotal = 0;

function counter() {
  countInputs.forEach(input => {
    if(parseFloat(input.value) === parseFloat(input.getAttribute('data-max-quantity'))) {
      input.parentNode.querySelector('.main__counterButton_is_right').disabled = true;
    }
    if(parseFloat(input.value) === 1) {
      input.parentNode.querySelector('.main__counterButton_is_left').disabled = true;
    }
  })

  countInputs.forEach(input => {
    input.addEventListener('input', updateTotal);
  })

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updateTotal(); // Вызываем функцию обновления цены при изменении состояния чекбокса
    });
  });

  decresButtons.forEach(button => {
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
    
  incresButtons.forEach(button => {
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
  // Создаем массив для хранения цен на каждый товар
  let itemPrices = [];
  let itemPricesSell = [];

  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const price = parseFloat(checkbox.getAttribute('data-price'));
      const countValue = parseFloat(checkbox.parentNode.parentNode.parentNode.querySelector('.main__counterInput').value);
      const itemTotal = isNaN(countValue) ? 0 : countValue * price;
      itemPrices[index] = itemTotal;
      itemPricesSell[index] = itemTotal * 0.5;
      total += itemTotal;
      totalSell += itemTotal * 0.5;
      countTotal += countValue;
    }
  });

  orderDetailPrice.textContent = total.toFixed(0) + ' сом';
  orderDetailPriceSell.textContent = totalSell.toFixed(0) + ' сом';
  accordeonPrice.textContent = totalSell.toFixed(0) + ' сом';
  orderDetailSell.textContent = totalSell.toFixed(0) - total.toFixed(0) + ' сом';
  countGoods.textContent = countTotal + '';

  for (let i = 0; i < countForItem.length; i += 2) {
    const itemIndex = Math.floor(i / 2);
    if(itemPrices[itemIndex]) {
      countForItem[i].textContent = itemPrices[itemIndex].toFixed(0) + ' сом';
      countForItem[i + 1].textContent = itemPrices[itemIndex].toFixed(0) + ' сом';
    }
  }

  for (let i = 0; i < countForItemSell.length; i += 2) {
    const itemIndex = Math.floor(i / 2);
    if(itemPrices[itemIndex]) {
      countForItemSell[i].textContent = itemPrices[itemIndex].toFixed(0) * 0.5 + ' сом';
      countForItemSell[i + 1].textContent = itemPrices[itemIndex].toFixed(0)  * 0.5 + ' сом';
    }
  }

  updateSelectAllCheckbox();
}

// Функция для обновления состояния "Выбрать все" чекбокса
function updateSelectAllCheckbox() {
  selectAllCheckbox.checked = [...checkboxes].every(checkbox => checkbox.checked);
}

checkBoxPay.addEventListener('change', () => {
  payButton.textContent = checkBoxPay.checked ? `Оплатить ${totalSell.toFixed(0)} сом` : 'Заказать';
  infoPay.classList.toggle('order-details__infoPay_is_hidden');
});

// Обработчик события для чекбокса "Выбрать все"
selectAllCheckbox.addEventListener('change', () => {
  checkboxes.forEach(checkbox => {
    checkbox.checked = selectAllCheckbox.checked;
  });

  updateTotal();
});

// Добавляем обработчики событий на остальные чекбоксы и поля ввода количества
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', updateTotal);
});

counter();
// Изначально обновляем сумму и состояние "Выбрать все" чекбокса
updateTotal();
