function linktocartEN() {
    window.location.href = "/en/order/cart";
}
function linktocartTH() {
    window.location.href = "/th/order/cart";
}
function changeTH() {
    window.location.href = "/th/order";
}
function changeEN() {
    window.location.href = "/en/order";
}

function showImgNoodles(){
    img = document.getElementById("noodles").value;
    if(img == "none"){
        document.getElementById("image1").style.display='inline-block'
    }
    else {
        document.getElementById("image1").style.display='none'
    }
    if(img == "Rice Stick Noodles" || img == "เส้นเล็ก"){
        document.getElementById("image1").style.display='inline-block'
    }
    else {
        document.getElementById("image1").style.display='none'
    }
    if(img == "Wide Rice Noodles" || img == "เส้นใหญ่"){
        document.getElementById("image2").style.display='inline-block'
    }
    else {
        document.getElementById("image2").style.display='none'
    }
    if(img == "Glass Noodles" || img == "วุ้นเส้น"){
        document.getElementById("image3").style.display='inline-block'
    }
    else {
        document.getElementById("image3").style.display='none'
    }
    if(img == "Narrow rice Noodles" || img == "เส้นจันท์"){
        document.getElementById("image4").style.display='inline-block'
    }
    else {
        document.getElementById("image4").style.display='none'
    }
    if(img == "Instant Noodles" || img == "บะหมี่กึ่งสำเร็จรูป"){
        document.getElementById("image5").style.display='inline-block'
    }
    else {
        document.getElementById("image5").style.display='none'
    }
}
function showImgMeat(){
    img = document.getElementById("meat").value;
    if(img == "none"){
        document.getElementById("image6").style.display='inline-block'
    }
    else {
        document.getElementById("image6").style.display='none'
    }
    if(img == "Pork" || img == "หมู"){
        document.getElementById("image6").style.display='inline-block'
    }
    else {
        document.getElementById("image6").style.display='none'
    }
    if(img == "Prawn" || img == "กุ้ง"){
        document.getElementById("image7").style.display='inline-block'
    }
    else {
        document.getElementById("image7").style.display='none'
    }
}
function checkDropdown(){
    var selected = document.getElementById("noodles");
    var selected2 = document.getElementById("meat");

    var nn = document.getElementById("n1");
    var nn2 = document.getElementById("n2");

    nn.value = selected.value;
    nn2.value = selected2.value;

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var date = document.getElementById("date")
    date.value = year + "-" + month + "-" + day;

    var currentTime = new Date();
    var time = document.getElementById("time");
    var hours = formatNumber(currentTime.getHours());
    var minutes = formatNumber(currentTime.getMinutes());
    var seconds = formatNumber(currentTime.getSeconds());
    time.value = hours + ":" + minutes + ":" + seconds;

    var prices = document.getElementById("price");
    var top_price = document.getElementById("top2");

    if(nn2.value == "Pork" || nn2.value == "หมู"){
        prices.value = 40;
        if(top_price.value == "Crackling" || top_price.value == "กากหมู"){
            prices.value = 45;
        }
    }
    else {
        prices.value = 50;
        if(top_price.value == "Crackling" || top_price.value == "กากหมู"){
            prices.value = 55;
        }
    }
}
function formatNumber(number) {
    return number < 10 ? '0' + number : number;
}