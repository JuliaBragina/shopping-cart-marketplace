const main = document.querySelector('.main');
const mainCards = main.querySelector('.main__cards');
const mainCards1 = main.querySelector('.main__cards_exict');
const mainCards2 = main.querySelector('.main__cards_dontExict');
const mainSellerImg = mainCards.querySelectorAll('.main__sellerImg');
const orderDetails = main.querySelectorAll('.order-details__infoPrice');
const priceSell = main.querySelectorAll('.main__goodsPriceNoSell');

const checkBoxAll = document.querySelector('.main__checkboxContainer_mainCheckbox');
const accordeonBoxAll = document.querySelector('.accordeon__info_goods');
const accordeonBoxAll2 = document.querySelector('.accordeon__info_dontExist');

const popupSeller = document.querySelector('.popupSeller');
const popupSale = document.querySelector('.popupSale');
const popupOrder = document.querySelector('.popupOrder');

const accordeonSection = main.querySelector('.accordeon__icon_existGoods');
const accordeonSection2 = main.querySelector('.accordeon__icon_dontExistGoods');

accordeonSection.addEventListener('click', () => {
  mainCards1.classList.toggle('main__cards_is_hidden');
  accordeonSection.classList.toggle('accordeon__icon_is_closed');
  checkBoxAll.classList.toggle('main__payStartWrapper_is_hidden');
  accordeonBoxAll.classList.toggle('accordeon__info_is_hidden');
});

accordeonSection2.addEventListener('click', () => {
  mainCards2.classList.toggle('main__cards_is_hidden');
  accordeonSection2.classList.toggle('accordeon__icon_is_closed');
});


const editPayMetgod = document.querySelector('.payMethod__editButton');
const editPayMetgod2 = document.querySelector('.order-details__payMethod');

const popupPayMethod = document.querySelector('.popupPayMethod');
const popupPayMethodClose = popupPayMethod.querySelector('.popupPayMethod__closeButton');

const editChooseDelivery = document.querySelector('.chooseDelivery__editButton');
const editChooseDelivery2 = document.querySelector('.order-details__choodeDelivery');

const popupChooseDelivery = document.querySelector('.popupChooseDelivery');
const popupChooseDeliveryClose = popupChooseDelivery.querySelector('.popupChooseDelivery__closeButton');

// Получаем ссылки на элементы
const courierOption = document.getElementById('courierOption');
const pickupOption = document.getElementById('pickupOption');
const courierAddress = document.querySelector('.popup__addressesCont_by_courier');
const pickupAddress = document.querySelector('.popup__addressesCont_by_pickPoint');

document.addEventListener('DOMContentLoaded', () => {
  mainSellerImg.forEach(function (element) {
    element.addEventListener('mouseover', () => {
      if (popupSeller.style.display === 'none' || popupSeller.style.display === '') {
        const buttonRect = element.getBoundingClientRect();
        popupSeller.style.display = 'block';
        popupSeller.style.top = buttonRect.bottom + 'px';
        popupSeller.style.left = buttonRect.left + 'px';

        console.log(buttonRect.top, buttonRect.left);
      } else {
        // Скрыть попап
        popupSeller.style.display = 'none';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  orderDetails.forEach(function (element) {
    element.addEventListener('mouseover', () => {
      popupSale.classList.remove('popupSale_is_hidden');
    });
     
    element.addEventListener('mouseout', () => {
      popupSale.classList.add('popupSale_is_hidden');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    priceSell.forEach(function (element) {
    element.addEventListener('mouseover', () => {
      popupOrder.classList.remove('popupOrder_is_hidden');
    });
       
    element.addEventListener('mouseout', () => {
      popupOrder.classList.add('popupOrder_is_hidden');
    });
  });
});

editPayMetgod.addEventListener('click', ()=> {
  popupPayMethod.classList.toggle('popup_is_hidden');
});

editPayMetgod2.addEventListener('click', ()=> {
  popupPayMethod.classList.toggle('popup_is_hidden');
});

popupPayMethodClose.addEventListener('click', ()=> {
  popupPayMethod.classList.toggle('popup_is_hidden');
});

editChooseDelivery.addEventListener('click', ()=> {
  popupChooseDelivery.classList.toggle('popup_is_hidden');
});

editChooseDelivery2.addEventListener('click', ()=> {
  popupChooseDelivery.classList.toggle('popup_is_hidden');
});

popupChooseDeliveryClose.addEventListener('click', ()=> {
  popupChooseDelivery.classList.toggle('popup_is_hidden');
});

// Добавляем обработчики событий на изменение выбора
courierOption.addEventListener('change', ()=> {
  if (courierOption.checked) {
    pickupAddress.classList.remove('popup__addressesCont_is_hidden');
    courierAddress.classList.add('popup__addressesCont_is_hidden');
  }
});

pickupOption.addEventListener('change', ()=> {
  if (pickupOption.checked) {
    courierAddress.classList.remove('popup__addressesCont_is_hidden');
    pickupAddress.classList.add('popup__addressesCont_is_hidden');
  }
});


