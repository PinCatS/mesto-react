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

  const onEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  }

  const onAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  }

  const onEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const closeAllPopups = (popupName) => {
    switch (popupName) {
      case 'edit-profile':
          setIsEditProfilePopupOpen(false);
          break;
      case 'add-card':
          setIsAddPlacePopupOpen(false);
          break;
      case 'update-avatar':
          setIsEditAvatarPopupOpen(false);
          break;
      default:
          console.error('closeAllPopups: Unexpected popup name. Check the logic.');
    }
  }


  return (
    <div className="App page">
        <Header />
        <Main onEditProfile={onEditProfile} onAddPlace={onAddPlace} onEditAvatar={onEditAvatar} />
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

        <ImagePopup />


        <template id="card">
          <li className="card">
            <button type="button" aria-label="Удалить карточку" className="button card__remove-button card__remove-button_visible"></button>
            <img className="card__image" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg" alt="Камчатка" />
            <div className="card__info">
              <h2 className="card__title">Наименование карточки</h2>
              <div className="card__like">
                <button type="button" aria-label="Нравится" className="button card__like-button"></button>
                <p className="card__like-counter">0</p>
              </div>
            </div>
          </li>
        </template>
    </div>
  );
}

export default App;
