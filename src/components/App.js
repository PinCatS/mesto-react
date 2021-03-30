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
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);
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
    setIsSavingProfile(true);
    api
      .setProfile(name, about)
      .then((newUser) => setCurrentUser(newUser))
      .catch(err => onRequestError(err, 'Failed to edit profile.'))
      .finally(() => {
        setIsSavingProfile(false);
        closeAllPopups();
      });
  }

  const handleUpdateAvatar = (link) => {
    setIsSavingAvatar(true);
    api
      .updateAvatar(link)
      .then((newUser) => setCurrentUser(newUser))
      .catch(err => onRequestError(err, 'Failed to update avatar.'))
      .finally(() => {
        setIsSavingAvatar(false);
        closeAllPopups();
      });
  }

  const handleCardAdd = ({name, link}) => {
    setIsAddingCard(true);
    api
      .addCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]); 
      })
      .catch(err => onRequestError(err, 'Failed to add new card.'))
      .finally(() => {
        setIsAddingCard(false);
        closeAllPopups();
      });
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

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isSavingProfile}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCardAdd={handleCardAdd} isLoading={isAddingCard}></AddPlacePopup>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isSavingAvatar}/>

        <PopupWithForm name="remove-card" title="Вы уверены?">
          <button type="submit" className="button popup__save-button">Да</button>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
