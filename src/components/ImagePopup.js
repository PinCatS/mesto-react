import '../index.css';

function ImagePopup({card, onClose}) {

    const handlePopupClose = () => onClose('image-popup');

    return (
      card && (
        <div className="popup image-popup popup_opened">
          <figure className="popup__container popup__container_size_small image-popup__container">
            <button
                type="button"
                aria-label="Закрыть картинку"
                className="button popup__close-button popup__close-button_location_topright"
                onClick={handlePopupClose}></button>
            <img className="image-popup__image" src={card.link} alt={card.name} />
            <figcaption className="image-popup__caption">{card.name}</figcaption>
          </figure>
        </div>
      )
    );
}

export default ImagePopup;