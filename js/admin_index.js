new Vue({
    el: "#div1",
    data: {
        admin_name: "",
        admin_pwd: ""
    },
    methods: {
        checkForm: function (e) {
            var cuname = this.admin_name;
            e.preventDefault()
            if (this.admin_name == "") {
                alert("用户名不能为空")
                return false
            }
            if (this.admin_pwd == "") {
                alert("密码不能为空")
                return false
            }
            var url = "http://localhost:8080/fms/adminLogin"
            $.ajax({
                url: url,
                type: "post",
                data: {
                    admin_name: this.admin_name,
                    admin_pwd: this.admin_pwd
                },
                success: function (data) {
                    if (data.code == 1) {
                        Cookies.set('admin_name', cuname)
                        alert("登录成功")

                        window.location.href = "admin_home.html"
                    } else {
                        alert("用户名或密码错误")
                    }
                }
            })
        }
    }
})