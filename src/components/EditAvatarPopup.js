import '../index.css';
import {useRef, useState} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const [link, setLink] = useState('');
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

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={handleClose}
      onSubmit={handleSubmit}>
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
    </PopupWithForm>
  );
}

export default EditAvatarPopup;