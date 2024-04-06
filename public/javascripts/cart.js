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
    var thisIndex = document.getElementById("indexIdd");
    if (event.target.classList.contains('bin-button')) {
      var listItem = event.target.closest('.table-row');
      if (listItem) {
        var index = listItem.getAttribute('data-index');
        thisIndex.value =  index;
        console.log(thisIndex.value);
      }
    }
    /*event.preventDefault();
    var listItem = event.target.closest('.table-row');
    listItem.parentNode.removeChild(listItem)*/
});