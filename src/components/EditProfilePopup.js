import '../index.css';
import {useContext, useEffect, useRef, useState} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const user = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const refName = useRef();
  const refDescription = useRef();
  const [nameInputErrMessage, setNameInputErrMessage] = useState(null);
  const [descriptionInputErrMessage, setDescriptionInputErrMessage] = useState(null);

  useEffect(() => {
    setName(user?.name ?? '');
    setDescription(user?.about ?? '');
  }, [user]); 

  const handleNameChange = (evt) => {
    setName(evt.target.value);
    if (!refName.current.validity.valid) {
      setNameInputErrMessage(refName.current.validationMessage);
    } else {
      setNameInputErrMessage(null);
    }
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
    if (!refDescription.current.validity.valid) {
      setDescriptionInputErrMessage(refDescription.current.validationMessage);
    } else {
      setDescriptionInputErrMessage(null);
    }
  };

  const resetInputs = () => {
    setName(user?.name ?? '');
    setDescription(user?.about ?? '');
    setNameInputErrMessage(null);
    setDescriptionInputErrMessage(null);
  }

  const handleClose = () => {
    resetInputs();
    onClose();
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
  
    onUpdateUser({
      name,
      about: description,
    });
  } 

  const handleFormValidity = (isValid) => setIsFormValid(isValid);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isFormValid={handleFormValidity}>
        <input
          type="text"
          ref={refName}
          className="form-input popup__input popup__input_name_name"
          name="profile-name"
          value={name}
          onChange={handleNameChange}
          placeholder="Имя профиля"
          minLength="2" maxLength="40"
          required /> 
        <span
          className={`popup__input-error popup__input-error_name_profile-name ${nameInputErrMessage && 'popup__input-error_active'}`}>
          {nameInputErrMessage}
        </span>
        <input
          type="text"
          ref={refDescription}
          className="form-input popup__input popup__input_name_activity"
          name="profile-activity"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Деятельность"
          minLength="2" maxLength="200"
          required />
        <span
          className={`popup__input-error popup__input-error_name_profile-activity ${descriptionInputErrMessage && 'popup__input-error_active'}`}>
          {descriptionInputErrMessage}
        </span>
        <button type="submit"
                className={`button popup__save-button ${!isFormValid && 'popup__save-button_disabled'}`}
                disabled={!isFormValid}>{isLoading ? 'Сохранить...' : 'Сохранить'}</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;