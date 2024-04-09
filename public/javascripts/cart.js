function backtoorderEN(){
    window.location.href = "/en/order";
}
function backtoorderTH(){
    window.location.href = "/th/order";
}
function linktoendEN(){
    window.location.href = "/en/order/cart/end";
}
function linktoendTH(){
    window.location.href = "/th/order/cart/end";
}

const showPopup = document.querySelector('.submit-button');
const popupContainer = document.querySelector('.popup-container');
const finishBtn = document.querySelector('.finish-popup-button');
showPopup.onclick = () => {
    popupContainer.classList.add('active');
}
finishBtn.onclick = () => {
popupContainer.classList.remove('active');
}

function del() {
    var index = document.getElementById('index');
    var indexI = document.getElementById('indexIdd');
    index.value = indexI.value;
}