var changePwdUname;
var oldPwd;

//信息表格
var app2 = new Vue({
    el: "#app2",
    data: {
        data: users
    },
    methods: {
        changePwd: function () {
            changePwdUname = $(event.target).parent().siblings("#cuname").text()
            oldPwd = $(event.target).parent().siblings("#oldpwd").text()
        },
        deleteUser: function () {
            var user_name = $(event.target).parent().siblings("#cuname").text()
            $.ajax({
                url: 'http://localhost:8080/fms/deleteUser',
                type: "post",
                data: {
                    user_name: user_name
                },
                success: function (data) {
                    if (data.code == 1) {
                        alert("删除成功");
                        window.location.reload();
                    } else {
                        alert("删除失败");
                    }
                }
            })
        },
    }
}
)

//添加用户modal
var app3 = new Vue({
    el: "#app3",
    data: {
        user_name: "",
        user_pwd: ""
    },
    methods: {
        addUser: function (e) {
            e.preventDefault()
            $.ajax({
                url: 'http://localhost:8080/fms/addUser',
                type: "post",
                data: {
                    user_name: this.user_name,
                    user_pwd: this.user_pwd
                },
                success: function (data) {
                    if (data.code == 1) {
                        alert("添加成功");
                        window.location.reload();
                    } else {
                        alert("添加失败");
                    }
                }
            })
        }
    }
})

//修改密码modal
var myModal2 = new Vue({
    el: "#myModal2",
    data: {
        new_pwd: ""
    },
    methods: {
        changeUserPwd: function (e) {
            e.preventDefault();
            var url = "http://localhost:8080/fms/changeUserPwd"
            $.post(url, {
                user_name: changePwdUname,
                old_pwd: oldPwd,
                new_pwd: this.new_pwd
            }, function (data) {
                if (data.code == 1) {
                    alert("修改成功")
                    window.location.reload()
                } else {
                    alert("修改失败")
                }
            })
        }
    }
})
