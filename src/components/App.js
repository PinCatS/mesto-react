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
import EditAvatarPopup from './EditAvatarPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api
      .getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch(err => onRequestError(err, 'Failed to get user info.'));
    
    api
      .getCards()
      .then(cards => setCards(cards))
      .catch(err => onRequestError(err, 'Failed to get cards.'));
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

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => onRequestError(err, 'Failed to change like status.'));
  }

  const handleCardDelete = (card) => {
      api.deleteCard(card._id)
          .then(() => {
              setCards((state) => state.filter((c) => c._id !== card._id));
          })
          .catch(err => onRequestError(err, 'Failed to remove card.'));
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

  const handleUpdateAvatar= (link) => {
    api
      .updateAvatar(link)
      .then((newUser) => setCurrentUser(newUser))
      .catch(err => onRequestError(err, 'Failed to update avatar.'))
      .finally(() => closeAllPopups());
  }

  return (
    <div className="App page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
            cards={cards}
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onEditAvatar={onEditAvatar}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />
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

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <PopupWithForm name="remove-card" title="Вы уверены?">
          <button type="submit" className="button popup__save-button">Да</button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
