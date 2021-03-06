import '../index.css';
import Header from './Header';
import {useState} from 'react';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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


  return (
    <div className="App page">
        <Header />
        <Main
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onEditAvatar={onEditAvatar}
            onCardClick={handleCardClick} />
        <Footer />

        <PopupWithForm
          name="edit-profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
            <input
               type="text"
               className="form-input popup__input popup__input_name_name"
               name="profile-name"
               placeholder="Имя профиля"
               minLength="2" maxLength="40"
               required /> 
            <span className="popup__input-error popup__input-error_name_profile-name"></span>
            <input
               type="text"
               className="form-input popup__input popup__input_name_activity"
               name="profile-activity"
               placeholder="Деятельность"
               minLength="2" maxLength="200"
               required />
            <span className="popup__input-error popup__input-error_name_profile-activity"></span>
            <button type="submit" className="button popup__save-button">Сохранить</button>
        </PopupWithForm>

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
    </div>
  );
}

export default App;
