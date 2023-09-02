const main = document.querySelector('.main');
const mainCardsExist = document.querySelector('.main__cards_exict');
const mainCardsDontExist = document.querySelector('.main__cards_dontExict');

const mainCards = document.querySelector('.main__cards');
const mainSellerImg = document.querySelectorAll('.main__sellerImg');
const orderDetails = document.querySelectorAll('.order-details__infoPrice');
const priceSell = document.querySelectorAll('.main__goodsPriceNoDiscount');

const checkBoxAll = document.querySelector('.main__checkboxContainer_mainCheckbox');
const accordeonBoxAll = document.querySelector('.accordeon__info_goods');
const accordeonBoxAll2 = document.querySelector('.accordeon__info_dontExist');

const popupSeller = document.querySelector('.popupSeller');
const popupSale = document.querySelector('.popupSale');
const popupOrder = document.querySelector('.popupOrder');

const accordeonSection = document.querySelector('.accordeon__icon_existGoods');
const accordeonSectionDontExictGoods = document.querySelector('.accordeon__icon_dontExistGoods');

const editPayMetod = document.querySelector('.payMethod__editButton');
const editPayMetod2 = document.querySelector('.order-details__payMethod');

const popupPayMethod = document.querySelector('.popupPayMethod');
const popupPayMethodClose = popupPayMethod.querySelector('.popupPayMethod__closeButton');

const editChooseDelivery = document.querySelector('.chooseDelivery__editButton');
const editChooseDelivery2 = document.querySelector('.order-details__choodeDelivery');

const popupChooseDelivery = document.querySelector('.popupChooseDelivery');
const popupChooseDeliveryClose = popupChooseDelivery.querySelector('.popupChooseDelivery__closeButton');

const courierOption = document.getElementById('courierOption');
const pickupOption = document.getElementById('pickupOption');
const courierAddress = document.querySelector('.popup__addressesCont_by_courier');
const pickupAddress = document.querySelector('.popup__addressesCont_by_pickPoint');

// Обработчики событий для раскрывающихся секций (аккордеонов)
accordeonSection.addEventListener('click', () => {
  mainCardsExist.classList.toggle('main__cards_is_hidden');
  accordeonSection.classList.toggle('accordeon__icon_is_closed');
  checkBoxAll.classList.toggle('main__payStartWrapper_is_hidden');
  accordeonBoxAll.classList.toggle('accordeon__info_is_hidden');
});

accordeonSectionDontExictGoods.addEventListener('click', () => {
  mainCardsDontExist.classList.toggle('main__cards_is_hidden');
  accordeonSectionDontExictGoods.classList.toggle('accordeon__icon_is_closed');
});

// Обработчики событий для отображения попапов при клике на изображения
document.addEventListener('DOMContentLoaded', () => {
  mainSellerImg.forEach(function (element) {
    element.addEventListener('click', () => {
      element.nextSibling.nextSibling.classList.toggle('popupSeller_is_hidden');
    })
  });
});

document.addEventListener('DOMContentLoaded', () => {
  priceSell.forEach(function (element) {
    element.addEventListener('click', () => {
      element.nextSibling.nextSibling.classList.toggle('popupSale_is_hidden');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  orderDetails.forEach(function (element) {
    element.addEventListener('click', () => {
      element.parentNode.nextSibling.nextSibling.classList.toggle('popupOrder_is_hidden');
    });
  });
});

// Обработчики событий для отображения попапов при клике на кнопки редактирования
editPayMetod.addEventListener('click', ()=> {
  popupPayMethod.classList.toggle('popup_is_hidden');
});

editPayMetod2.addEventListener('click', ()=> {
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

// Обработчики событий на изменение выбора
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