import '../index.css';
import Header from './Header';
import {useState, useEffect} from 'react';
import { onRequestError } from '../utils/utils';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConfirmPopup from './DeleteConfirmPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isDoingWork, setIsDoingWork] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
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

  const doCardDelete = () => {
    setIsDoingWork(true);
    api.deleteCard(cardToDelete._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
            closeAllPopups();
        })
        .catch(err => onRequestError(err, 'Failed to remove card.'))
        .finally(() => {
          setIsDoingWork(false);
          setCardToDelete(null);
        });
  } 

  const handleCardDelete = (card) => {
    setCardToDelete(card);
    setIsConfirmPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsConfirmPopupOpen(false);
    setCardToDelete(null);
  }

  const handleUpdateUser = ({name, about}) => {
    setIsDoingWork(true);
    api
      .setProfile(name, about)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => onRequestError(err, 'Failed to edit profile.'))
      .finally(() => {
        setIsDoingWork(false);
      });
  }

  const handleUpdateAvatar = (link) => {
    setIsDoingWork(true);
    api
      .updateAvatar(link)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(err => onRequestError(err, 'Failed to update avatar.'))
      .finally(() => {
        setIsDoingWork(false);
      });
  }

  const handleCardAdd = ({name, link}) => {
    setIsDoingWork(true);
    api
      .addCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch(err => onRequestError(err, 'Failed to add new card.'))
      .finally(() => {
        setIsDoingWork(false);
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

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isDoingWork}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onCardAdd={handleCardAdd} isLoading={isDoingWork} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isDoingWork}/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <DeleteConfirmPopup isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onDeleteConfirm={doCardDelete} isLoading={isDoingWork}/>

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
