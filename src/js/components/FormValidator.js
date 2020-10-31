export default class FormValidator {
  constructor(someForm, errorMessages) {
    this._someForm = someForm;
    this._errorMessages = errorMessages;
    this._setListeners();
  }

  _isValidate = inputElement => { // Проверка полей на ошибки
    inputElement.setCustomValidity('');
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(this._errorMessages.valueMissing);
      return false;
    } if (inputElement.validity.tooShort && inputElement.type === 'password') {
      inputElement.setCustomValidity(this._errorMessages.tooShortPass);
      return false;
    } if (inputElement.validity.typeMismatch && inputElement.type === 'email') {
      inputElement.setCustomValidity(this._errorMessages.typeMismatch);
      return false;
    } if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      inputElement.setCustomValidity(this._errorMessages.tooShort);
      return false;
    }
    return inputElement.checkValidity();
  }

  _inputErrorAdd = inputElement => { // Присваиваем ошибку
    this.errorMessage = this._someForm.querySelector(`#${inputElement.id}-error`);
    this.errorMessage.textContent = inputElement.validationMessage;
  }

  _isFieldValid = inputElement => { // Записывает и возвращает ошибку
    const valid = this._isValidate(inputElement);
    this._inputErrorAdd(inputElement);
    return valid;
  }

  setSubmitButtonState = stateElement => { // Включает/выключает кнопку
    if (stateElement) {
      this.button.removeAttribute('disabled');
      this.button.classList.add('popup__button_valid');
    } else {
      this.button.setAttribute('disabled', 'true');
      this.button.classList.remove('popup__button_valid');
    }
  }

  handlerInputForm = event => { // Cлушатель на инпут
    this._isFieldValid(event.target);
    if (this._someForm.checkValidity()) {
      this.setSubmitButtonState(true);
    } else {
      this.setSubmitButtonState(false);
    }
  }

  resetErrorsPopup = () => {
    this.errors.forEach((errorElement) => errorElement.textContent = '');
  }

  _setListeners = () => {
    this.errors = this._someForm.querySelectorAll('.error');
    this.button = this._someForm.querySelector('.button');
    this._someForm.addEventListener('input', this.handlerInputForm);
  }
}
