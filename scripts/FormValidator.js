export class FormValidator {
    constructor(obg, formElement) {
        this._formSelector = obg.formSelector;
        this._inputSelector = obg.inputSelector;
        this._submitButtonSelector = obg.submitButtonSelector;
        this._inactiveButtonClass = obg.inactiveButtonClass;
        this._inputErrorClass = obg.inputErrorClass;
        this._errorClass = obg.errorClass;
        this._formElement = formElement;
    }

     _showInputError(element, errorMessage) {
        const errorElement = document.querySelector(`#${element.id}-error`);
        element.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
      };
      
      
     _hideInputError(element) {
        const errorElement = document.querySelector(`#${element.id}-error`);
        element.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
      };
      
      
     _isValid(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
      };
      
      
     _hasInvalidInput(inputList){
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        })
      };
      
      _startButton(button){
        
        button.classList.add('popup__save_inactive');
        button.disabled = true;
      }
      
      _toggleButtonState(inputList, buttonElement) {
      
        if (this._hasInvalidInput(inputList)) {
          this._startButton(buttonElement);
          
        } else {
          buttonElement.classList.remove(this._inactiveButtonClass);
          buttonElement.disabled = false;
        }
        
      };
      
      _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._isValid(inputElement);
            this._toggleButtonState(inputList, buttonElement);
          });
        });
      };
      
      
      enableValidation () {
        const formList = document.querySelector(this._formElement);
        formList.addEventListener('submit', (evt) => {
            evt.preventDefault();
          });
        this._setEventListeners(formList);
      };

}