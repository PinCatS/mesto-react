import { useEffect, useRef } from 'react';
import '../index.css';

function PopupWithForm({title, name, isOpen, onClose, onSubmit, isFormValid, children, ...props}) {
  const formRef = useRef();

  useEffect(() => {
    isFormValid && isFormValid(formRef.current.checkValidity());
  });

  return (
    <div className={`popup popup_name_${name} ${isOpen && 'popup_opened'}`}  >
      <form ref={formRef}
            className="popup__container popup__form"
            name={`${name}-form`}
            onSubmit={onSubmit}
            noValidate>
        <button
          type="button"
          aria-label="Закрыть форму"
          className="button popup__close-button"
          onClick={onClose}></button>
        <h2 className="popup__heading">{title}</h2>
        <fieldset className="popup__info">
          {children}
        </fieldset>
      </form>
    </div>
  );
}

export default PopupWithForm;