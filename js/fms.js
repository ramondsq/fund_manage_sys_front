//cookie校验，登陆检测
if(!Cookies.get('user_token')){
    window.location.href = 'index.html';
}

var user_name = Cookies.get('user_name');
var user_id = Cookies.get('user_id');
//退出登录功能按钮
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
            Cookies.remove('user_token');
            window.location.href = "index.html";
        }
    }
})


