if(!Cookies.get('user_name')){
    window.location.href = 'index.html';
}

var user_name = Cookies.get('user_name');
var user_id = Cookies.get('user_id');

new Vue({
    el: "#app1",
    data: {
        uname: user_name,
        uid: user_id
    },
    methods: {
        signout: function () {
            Cookies.remove('user_name');
            Cookies.remove('user_id');
            window.location.href = "index.html";
        }
    }
})