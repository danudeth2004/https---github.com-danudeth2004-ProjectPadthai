function backtoorderEN(){
    window.location.href = "/en/order";
}
function backtoorderTH(){
    window.location.href = "/th/order";
}

function activePopup(){
    const showPopup = document.querySelector('.submit-button');
    const popupContainer = document.querySelector('.popup-container');
    const finishBtn = document.querySelector('.finish-popup-button');
    showPopup.onclick = () => {
        popupContainer.classList.add('active');
    }
    finishBtn.onclick = () => {
        popupContainer.classList.remove('active');      
    }
}

function deleteItem(){
    req.session.item = req.session.item.filter((item, index) => index !== 0);
}