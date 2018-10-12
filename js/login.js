$(function () {
$('#loginForm').on('submit', (e) => {
    e.preventDefault();
    console.log("hello");
    let user = $('#username').val();
    let pass = $('#password').val();
    window.location.replace('admin.html');
})
});