import '../index.css';
import PopupWithForm from './PopupWithForm';

function DeleteConfirmPopup({isOpen, onClose, onDeleteConfirm, isLoading}) {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onDeleteConfirm();
    onClose();
  }

  return (
    <PopupWithForm
      name="remove-card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <button type="submit" className="button popup__save-button">{isLoading ? 'Удаление...' : 'Да'}</button>
    </PopupWithForm>
  );
}

export default DeleteConfirmPopup;

