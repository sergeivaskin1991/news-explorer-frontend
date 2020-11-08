import Popup from './Popup';

export default class PopupSuccess extends Popup {

  open = () => {
    super.open();
    this.popupElement.previousElementSibling.classList.remove('popup_is-opened');
  }
}

