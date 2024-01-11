// import { Modal } from "../classes/Modal";

// const modals = document.querySelectorAll('.modal');
// if(modals) {
//   modals.forEach(modal => {
//     new Modal(modal);
//   });
// }

document.addEventListener('DOMContentLoaded', () => {
  const promotion = document.querySelector('.modal-promotion');
  const promotion__content = document.querySelector('.modal-promotion__content');
  const btn_close = document.querySelector('.closer');
  const btn_promotion = document.querySelector('.promotion-btn');

  promotion.classList.add('active');

  btn_close.addEventListener('click', () => {
    promotion.classList.remove('active');
  })

  btn_promotion.addEventListener('click', () => {
    promotion.classList.remove('active');
  })

  document.addEventListener('click', (evt) => {
    if (!promotion__content.contains(evt.target) && evt.target !== btn_close) {
      promotion.classList.remove('active');
    }
  });
})
