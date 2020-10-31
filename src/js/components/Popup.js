export default class Popup {
  constructor(popupElement, closeButton) {
    this.popupElement = popupElement;
    this.closeButton = closeButton;
    this.close = this.close.bind(this);
    this.setListeners();
  }

  open() {
    this.popupElement.classList.add('popup_is-opened');
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
  }

  setListeners() {
    this
      .closeButton
      .addEventListener('click', this.close);
  }
}
