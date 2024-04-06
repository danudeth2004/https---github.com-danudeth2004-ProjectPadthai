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

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('bin-button')) {
        var thisindex = document.getElementById('indexId')
        var buttonId = event.target.id;
        var index = parseInt(buttonId.split('_')[1]);
        thisindex.value = index;
      }
});