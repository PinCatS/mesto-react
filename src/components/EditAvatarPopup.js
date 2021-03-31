import '../index.css';
import {useRef, useState} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const [link, setLink] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const refLink = useRef();
  const [linkInputErrMessage, setLinkInputErrMessage] = useState(null);

  const resetInputs = () => {
    setLink('');
    setLinkInputErrMessage(null);
  }

  const handleClose = () => {
    resetInputs();
    onClose();
  }

  const handleChange = (evt) => {
    setLink(evt.target.value);
    if (!refLink.current.validity.valid) {
      setLinkInputErrMessage(refLink.current.validationMessage);
    } else {
      setLinkInputErrMessage(null);
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(link);
    resetInputs();
  }
  
  const handleFormValidity = (isValid) => {
    setIsFormValid(isValid);
  };

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isFormValid={handleFormValidity}>
        <input
            type="url"
            ref={refLink}
            className="form-input popup__input popup__input_name_avatar-link"
            name="avatar-link"
            value={link}
            onChange={handleChange}
            placeholder="https://somewebsite.com/someimage.jpg"
            required />
        <span
            className={`popup__input-error popup__input-error_name_avatar-link ${linkInputErrMessage && 'popup__input-error_active'}`}>
            {linkInputErrMessage}
        </span>
        <button type="submit"
                className={`button popup__save-button ${!isFormValid && 'popup__save-button_disabled'}`}
                disabled={!isFormValid}>{isLoading ? 'Сохранить...' : 'Сохранить'}</button>       
    </PopupWithForm>
  );
}

export default EditAvatarPopup;