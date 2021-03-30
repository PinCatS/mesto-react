import { useState } from 'react';
import '../index.css';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onCardAdd}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleNameChange = (evt) => setName(evt.target.value);
    const handleLinkChange = (evt) => setLink(evt.target.value);

    const handleSubmit = (evt) => {
      evt.preventDefault();
      onCardAdd({
        name,
        link
      });
      setName('');
      setLink('');
    }

    return (
      <PopupWithForm
          name="add-card"
          title="Новое место"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}>
          <input
              type="text"
              className="form-input popup__input popup__input_name_place-name"
              name="place-name"
              value={name}
              onChange={handleNameChange}
              placeholder="Название"
              minLength="2" maxLength="30"
              required />
          <span className="popup__input-error popup__input-error_name_place-name"></span>
          <input
              type="url"
              className="form-input popup__input popup__input_name_place-image-url"
              name="place-image-url"
              value={link}
              onChange={handleLinkChange}
              placeholder="Ссылка на картинку"
              required />
          <span className="popup__input-error popup__input-error_name_place-image-url"></span>
          <button type="submit" className="button popup__save-button">Создать</button>
      </PopupWithForm>
    );
}

export default AddPlacePopup;