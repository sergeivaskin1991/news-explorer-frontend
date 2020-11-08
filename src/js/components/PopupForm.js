import Popup from './Popup';

export default class PopupForm extends Popup {
  constructor(popupElement, openButton, closeButton, clearPopup) {
    super(popupElement, closeButton);
    this.openButton = openButton;
    this.clearPopup = clearPopup;
    this.setListeners();
  }

  open = event => {
    event.preventDefault();
    this.clearPopup();
    this.popupElement.previousElementSibling.classList.remove('popup_is-opened');
    this.popupElement.nextElementSibling.classList.remove('popup_is-opened');
    super.open();
  }

  close = () => {
    super.close();
  }

  setListeners = () => {
    this
      .openButton
      .addEventListener('click', this.open);
  }
}
