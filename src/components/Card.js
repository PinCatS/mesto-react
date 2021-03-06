import '../index.css';

function Card({card, onCardClick}) {

    const handleCardClick = () => onCardClick(card);

    return (
        <li className="card">
            <button type="button" aria-label="Удалить карточку" className="button card__remove-button card__remove-button_visible"></button>
            <img
                className="card__image"
                src={card.link}
                alt="Камчатка"
                onClick={handleCardClick} />
            <div className="card__info">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like">
                    <button type="button" aria-label="Нравится" className="button card__like-button"></button>
                    <p className="card__like-counter">{card?.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;