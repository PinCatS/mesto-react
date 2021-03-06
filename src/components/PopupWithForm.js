import '../index.css';

function PopupWithForm({title, name, isOpen, onClose, children, ...props}) {
    return (
        <div className={`popup popup_name_${name} ${isOpen && 'popup_opened'}`}  >
            <form className="popup__container popup__form" name={`${name}-form`} noValidate>
                <button
                    type="button"
                    aria-label="Закрыть форму"
                    className="button popup__close-button"
                    onClick={() => onClose(name)}></button>
                <h2 className="popup__heading">{title}</h2>
                <fieldset className="popup__info">
                    {children}
                </fieldset>
            </form>
        </div>
    );
}

export default PopupWithForm;