import { useState, useEffect } from 'react';
import '../index.css';
import api from './utils/api';
import { onRequestError } from './utils/utils';

function Main({onEditProfile, onAddPlace, onEditAvatar}) {
    const [userName, setUserName] = useState('Имя пользователя');
    const [userDescription, setUserDescription] = useState('Описание деятельности');
    const [userAvatar, setUserAvatar] = useState(null);

    useEffect(() => {
        api
          .getUserInfo()
          .then(({name, about, avatar}) => {
                setUserName(name);
                setUserDescription(about);
                setUserAvatar(avatar);
          })
          .catch(err => onRequestError(err, 'Failed to get user info.'));
    }, []);

    return (
        <main className="content page__content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar-button" onClick={onEditAvatar}>
                        <img className="profile__avatar" src={userAvatar} alt="Аватар профиля" />
                    </div>
                    <div className="profile__info-text">
                        <h1 className="profile__name">{userName}</h1>
                        <p className="profile__activity">{userDescription}</p>
                        <button
                            type="button"
                            aria-label="Редактировать профиль"
                            name="profile-edit-button"
                            className="button profile__edit-button"
                            onClick={onEditProfile}></button>
                    </div>
                </div>
                <button 
                    type="button"
                    aria-label="Добавить карточку"
                    name="profile-add-button"
                    className="button profile__add-button"
                    onClick={onAddPlace}></button>
            </section>

            <section className="places page__places" aria-label="Карточки мест">
                <ul className="cards"></ul>
            </section>
        </main>
    )
}

export default Main;