import { useState, useEffect, useContext } from 'react';
import '../index.css';
import Card from './Card';
import api from '../utils/api';
import { onRequestError } from '../utils/utils';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const user = useContext(CurrentUserContext);
    const [cards, setCards] = useState([]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(like => like._id === user._id);
        
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => onRequestError(err, 'Failed to change like status.'));
    }
    
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch(err => onRequestError(err, 'Failed to remove card.'));
    }

    useEffect(() => {
        api
          .getCards()
          .then(cards => setCards(cards))
          .catch(err => onRequestError(err, 'Failed to get cards.'));
    }, []);

    return (
        <main className="content page__content">
            <section className="profile">
                {user && (<div className="profile__info">
                    <div className="profile__avatar-button" onClick={onEditAvatar}>
                        <img className="profile__avatar" src={user.avatar} alt="Аватар профиля" />
                    </div>
                    <div className="profile__info-text">
                        <h1 className="profile__name">{user.name}</h1>
                        <p className="profile__activity">{user.about}</p>
                        <button
                            type="button"
                            aria-label="Редактировать профиль"
                            name="profile-edit-button"
                            className="button profile__edit-button"
                            onClick={onEditProfile}></button>
                    </div>
                </div>)}
                <button 
                    type="button"
                    aria-label="Добавить карточку"
                    name="profile-add-button"
                    className="button profile__add-button"
                    onClick={onAddPlace}></button>
            </section>

            <section className="places page__places" aria-label="Карточки мест">
                <ul className="cards">
                    { cards.map(card => (
                        <Card key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}/>))
                    }
                </ul>
            </section>
        </main>
    )
}

export default Main;