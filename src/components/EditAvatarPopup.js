import '../index.css';
import {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const inputRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar(inputRef.current.value);
    inputRef.current.value = '';
  } 

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
        <input
            type="url"
            ref={inputRef}
            className="form-input popup__input popup__input_name_avatar-link"
            name="avatar-link"
            placeholder="https://somewebsite.com/someimage.jpg"
            required />
        <span className="popup__input-error popup__input-error_name_avatar-link"></span>
        <button type="submit" className="button popup__save-button">{isLoading ? 'Сохранить...' : 'Сохранить'}</button>       
    </PopupWithForm>
  );
}

export default EditAvatarPopup;