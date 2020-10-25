const showInputError = (parameters,formElement, element, errorMessage) => {
    const errorElement = document.querySelector(`#${element.id}-error`);
    element.classList.add(parameters.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(parameters.errorClass);
  };
  

  const hideInputError = (parameters,formElement, element) => {
    const errorElement = document.querySelector(`#${element.id}-error`);
    element.classList.remove(parameters.inputErrorClass);
    errorElement.classList.remove(parameters.errorClass);
    errorElement.textContent = '';
  };
  

  const isValid = (parameters,formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(parameters,formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(parameters,formElement, inputElement);
    }
  };


  formElementUser.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

const toggleButtonState = (parameters, inputList, buttonElement) => {

    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(parameters.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(parameters.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  const setEventListeners = (parameters, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(parameters.inputSelector));   
    const buttonElement = formElement.querySelector(parameters.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(parameters,formElement, inputElement);
      toggleButtonState(parameters, inputList, buttonElement);
      });
    });
  }; 


  const enableValidation = (parameters) => {
    const formList = Array.from(document.querySelectorAll(parameters.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(parameters, formElement);
    });
  };
  
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });
