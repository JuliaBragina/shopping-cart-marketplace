const selectAllCheckbox = document.getElementById('payStart0');
const checkboxes = document.querySelectorAll('.main__priceGoods');

const decresButtons = document.querySelectorAll('.main__counterButton_is_left');
const incresButtons = document.querySelectorAll('.main__counterButton_is_right');
const countInputs = document.querySelectorAll('.main__counterInput');

function counter() {
  countInputs.forEach(input => {
    if(parseFloat(input.value) === parseFloat(input.getAttribute('data-max-quantity'))) {
      input.parentNode.querySelector('.main__counterButton_is_right').disabled = true;
    }
    if(parseFloat(input.value) === 1) {
      input.parentNode.querySelector('.main__counterButton_is_left').disabled = true;
    }
  })

  decresButtons.forEach(button => {
    button.addEventListener('click', () => {
      const input = button.parentNode.querySelector('.main__counterInput');
      const currentValue = parseFloat(input.value);
      
      if (currentValue > 1) {
        input.value = currentValue - 1;
        button.parentNode.querySelector('.main__counterButton_is_right').removeAttribute('disabled');
      } else {
        button.setAttribute('disabled', true);
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
      } else {
        button.setAttribute('disabled', true);
      }
    });
  });
}

// Функция для обновления суммы на основе выбранных товаров и количества
function updateTotal() {
  let total = 0.00;

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const countValue = parseFloat(checkbox.parentNode.parentNode.parentNode.querySelector('.main__counterInput').value);
      const price = parseFloat(checkbox.getAttribute('data-price'));
      const itemTotal = isNaN(countValue) ? 0 : countValue * price;
      total += itemTotal;
    }
  });

  console.log(total.toFixed(2));

  updateSelectAllCheckbox();
}

// Функция для обновления состояния "Выбрать все" чекбокса
function updateSelectAllCheckbox() {
  selectAllCheckbox.checked = [...checkboxes].every(checkbox => checkbox.checked);
}

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
