import { useRef, useState } from 'react';
import '../index.css';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onCardAdd, isLoading}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [nameInputErrMessage, setNameInputErrMessage] = useState(null);
    const [urlInputErrMessage, setUrlInputErrMessage] = useState(null);
    const refName = useRef();
    const refUrl = useRef();

    const handleNameChange = (evt) => {
      setName(evt.target.value);
      if (!refName.current.validity.valid) {
        setNameInputErrMessage(refName.current.validationMessage);
      } else {
        setNameInputErrMessage(null);
      }
    };

    const handleLinkChange = (evt) => {
      setLink(evt.target.value);
      if (!refUrl.current.validity.valid) {
        setUrlInputErrMessage(refUrl.current.validationMessage);
      } else {
        setUrlInputErrMessage(null);
      }
    };
    const resetInputs = () => {
      setName('');
      setLink('');
      setNameInputErrMessage(null);
      setUrlInputErrMessage(null);
    }

    const handleSubmit = (evt) => {
      evt.preventDefault();
      onCardAdd({
        name,
        link
      });
      resetInputs();
    }

    const handleClose = () => {
      resetInputs();
      onClose();
    }

    const handleFormValidity = (isValid) => setIsFormValid(isValid);

    return (
      <PopupWithForm
          name="add-card"
          title="Новое место"
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={handleSubmit}
          isFormValid={handleFormValidity}>
          <input
              type="text"
              ref={refName}
              className="form-input popup__input popup__input_name_place-name"
              name="place-name"
              value={name}
              onChange={handleNameChange}
              placeholder="Название"
              minLength="2" maxLength="30"
              required />
          <span
            className={`popup__input-error popup__input-error_name_place-name ${nameInputErrMessage && 'popup__input-error_active'}`}>
            {nameInputErrMessage}
          </span>
          <input
              type="url"
              ref={refUrl}
              className="form-input popup__input popup__input_name_place-image-url"
              name="place-image-url"
              value={link}
              onChange={handleLinkChange}
              placeholder="Ссылка на картинку"
              required />
          <span
            className={`popup__input-error popup__input-error_name_place-image-url ${urlInputErrMessage && 'popup__input-error_active'}`}>
            {urlInputErrMessage}
          </span>
          <button type="submit"
                  className={`button popup__save-button ${!isFormValid && 'popup__save-button_disabled'}`}
                  disabled={!isFormValid}>{isLoading ? 'Создать...' : 'Создать'}</button>
      </PopupWithForm>
    );
}

export default AddPlacePopup;