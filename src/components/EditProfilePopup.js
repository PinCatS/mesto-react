import '../index.css';
import {useContext, useEffect, useState} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const user = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(user?.name ?? '');
    setDescription(user?.about ?? '');
  }, [user]); 

  const handleNameChange = (evt) => setName(evt.target.value);
  const handleDescriptionChange = (evt) => setDescription(evt.target.value);

  const handleSubmit = (evt) => {
    evt.preventDefault();
  
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input popup__input popup__input_name_name"
          name="profile-name"
          value={name}
          onChange={handleNameChange}
          placeholder="Имя профиля"
          minLength="2" maxLength="40"
          required /> 
        <span className="popup__input-error popup__input-error_name_profile-name"></span>
        <input
          type="text"
          className="form-input popup__input popup__input_name_activity"
          name="profile-activity"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Деятельность"
          minLength="2" maxLength="200"
          required />
        <span className="popup__input-error popup__input-error_name_profile-activity"></span>
        <button type="submit" className="button popup__save-button">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;