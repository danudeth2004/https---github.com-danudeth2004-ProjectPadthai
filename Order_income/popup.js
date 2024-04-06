const showPopup = document.querySelector('.submit-button');
const popupContainer = document.querySelector('.popup-container');
const finishBtn = document.querySelector('.finish-popup-button');

showPopup.onclick = () => {
    popupContainer.classList.add('active');

}

finishBtn.onclick = () => {
    popupContainer.classList.remove('active');
    
}