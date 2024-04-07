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

function activePopup(){
    const showPopup = document.querySelector('.submit-button');
    const popupContainer = document.querySelector('.popup-container');
    showPopup.onclick = () => {
        popupContainer.classList.add('active');
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
});