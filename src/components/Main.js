import '../index.css';

function Main(props) {
    return (
        <main className="content page__content">
            <section className="profile">
            <div className="profile__info">
                <div className="profile__avatar-button">
                <img className="profile__avatar" src="" alt="Аватар профиля" />
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
    )
}

export default Main;