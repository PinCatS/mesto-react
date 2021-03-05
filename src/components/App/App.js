import './App.css';

function App() {
  return (
    <div className="App">
        <header className="header page__header">
          <img src="<%=require('./images/logo.svg')%>" alt="Лого Mesto" className="header__logo" />
        </header>

        <main className="content page__content">
          <section className="profile">
            <div className="profile__info">
              <div className="profile__avatar-button">
                <img className="profile__avatar" src="<%=require('./images/avatar.jpg')%>" alt="Аватар профиля" />
              </div>
              <div className="profile__info-text">
                <h1 className="profile__name">Имя профиля</h1>
                <p className="profile__activity"></p>
                <button type="button" aria-label="Редактировать профиль" name="profile-edit-button" className="button profile__edit-button"></button>
              </div>
            </div>
            <button type="button" aria-label="Добавить карточку" name="profile-add-button" className="button profile__add-button"></button>
          </section>

          <section className="places page__places" aria-label="Карточки мест">
            <ul className="cards"></ul>
          </section>
        </main>

        <footer className="footer page__footer">
          <p className="footer__copyright">&copy;2020 Mesto Russia</p>
        </footer>


        <div className="popup popup_name_edit-profile">
          <form className="popup__container popup__form" name="profile-edit-form" noValidate>
            <button type="button" aria-label="Закрыть форму" className="button popup__close-button"></button>
            <h2 className="popup__heading">Редактировать профиль</h2>
            <fieldset className="popup__info">
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
            </fieldset>
          </form>
        </div>

        <div className="popup popup_name_add-card">
          <form className="popup__container popup__container_size_small popup__form" name="add-card-form" noValidate>
            <button type="button" aria-label="Закрыть форму" className="button popup__close-button popup__close-button_location_topright"></button>
            <h2 className="popup__heading">Новое место</h2>
            <fieldset className="popup__info popup__info_size_small">
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
            </fieldset>
          </form>
        </div>

        <div className="popup popup_name_update-avatar">
          <form className="popup__container popup__form" name="profile-update-avatar-form" noValidate>
            <button type="button" aria-label="Закрыть форму" className="button popup__close-button"></button>
            <h2 className="popup__heading">Обновить аватар</h2>
            <fieldset className="popup__info">
              <input
                type="url"
                className="form-input popup__input popup__input_name_avatar-link"
                name="avatar-link"
                placeholder="https://somewebsite.com/someimage.jpg"
                required />
              <span className="popup__input-error popup__input-error_name_avatar-link"></span>
              <button type="submit" className="button popup__save-button">Сохранить</button>
            </fieldset>
          </form>
        </div>

        <div className="popup image-popup">
          <figure className="popup__container popup__container_size_small image-popup__container">
            <button type="button" aria-label="Закрыть картинку" className="button popup__close-button popup__close-button_location_topright"></button>
            <img className="image-popup__image" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg" alt="Камчатка" />
            <figcaption className="image-popup__caption">Камчатка</figcaption>
          </figure>
        </div>

        <div className="popup popup_name_remove-card">
          <form className="popup__container popup__form" name="remove-card-form" noValidate>
            <button type="button" aria-label="Закрыть форму" className="button popup__close-button popup__close-button_location_topright"></button>
            <h2 className="popup__heading">Вы уверены?</h2>
            <fieldset className="popup__info popup__info_size_small popup__info_margin-top_small">
              <button type="submit" className="button popup__save-button">Да</button>
            </fieldset>
          </form>
        </div>


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
