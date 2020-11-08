export default class Popup {
  constructor(popupElement, openButton, closeButton) {
    this.popupElement = popupElement;
    this.openButton = openButton;
    this.closeButton = closeButton;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  open(event) {
    event.preventDefault();
    this.popupElement.classList.add('popup_is-opened');
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
  }

  setListeners() {
    this
      .openButton
      .addEventListener('click', this.open);
    this
      .closeButton
      .addEventListener('click', this.close);
  }
}
