function startagain(){
    window.location.href = "/";
}

function appendToInput(value) {
    var input = document.getElementById('phoneInput');
    input.value += value;
    var result_tel = document.getElementById('tel');
    result_tel.value = input.value;
}

function clearInput() {
    document.getElementById('phoneInput').value = '';
    var result_tel = document.getElementById('tel');
    result_tel.value = 'None';
}

function backspaceInput() {
    var input = document.getElementById('phoneInput');
    input.value = input.value.slice(0, -1);
    var result_tel = document.getElementById('tel');
    result_tel.value = input.value;
}