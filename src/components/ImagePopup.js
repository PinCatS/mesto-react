import '../index.css';

function ImagePopup({title, name, children, ...props}) {
    return (
        <div className="popup image-popup">
          <figure className="popup__container popup__container_size_small image-popup__container">
            <button type="button" aria-label="Закрыть картинку" className="button popup__close-button popup__close-button_location_topright"></button>
            <img className="image-popup__image" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg" alt="Камчатка" />
            <figcaption className="image-popup__caption">Камчатка</figcaption>
          </figure>
        </div>
    );
}

export default ImagePopup;