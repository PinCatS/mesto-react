import '../index.css';
import Header from './Header';
import {useState, useEffect} from 'react';
import { onRequestError } from '../utils/utils';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch(err => onRequestError(err, 'Failed to get user info.'));
  }, []);

  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  }

  const onAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  }

  const onEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  const handleUpdateUser = ({name, about}) => {
    api
      .setProfile(name, about)
      .then((newUser) => setCurrentUser(newUser))
      .catch(err => onRequestError(err, 'Failed to edit profile.'))
      .finally(() => closeAllPopups());
  }

  return (
    <div className="App page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onEditAvatar={onEditAvatar}
            onCardClick={handleCardClick} />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <PopupWithForm
          name="add-card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
            <input
                type="text"
                className="form-input popup__input popup__input_name_place-name"
                name="place-name"
                placeholder="Название"
                minLength="2" maxLength="30"
                required />
            <span className="popup__input-error popup__input-error_name_place-name"></span>
            <input
              type="url"
              className="form-input popup__input popup__input_name_place-image-url"
              name="place-image-url"
              placeholder="Ссылка на картинку"
              required />
            <span className="popup__input-error popup__input-error_name_place-image-url"></span>
            <button type="submit" className="button popup__save-button">Создать</button>
        </PopupWithForm>

        <PopupWithForm
          name="update-avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
            <input
                type="url"
                className="form-input popup__input popup__input_name_avatar-link"
                name="avatar-link"
                placeholder="https://somewebsite.com/someimage.jpg"
                required />
            <span className="popup__input-error popup__input-error_name_avatar-link"></span>
            <button type="submit" className="button popup__save-button">Сохранить</button>       
        </PopupWithForm>

        <PopupWithForm name="remove-card" title="Вы уверены?">
          <button type="submit" className="button popup__save-button">Да</button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
