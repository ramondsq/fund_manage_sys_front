new Vue({
  el: "#div1",
  data: {
    user_name: "",
    user_pwd: ""
  },
  methods: {
    checkForm: function (e) {
      e.preventDefault()

      if (this.user_name == "") {
        alert("用户名不能为空")
        return false
      }
      if (this.user_pwd == "") {
        alert("密码不能为空")
        return false
      }

      var url = "http://localhost:8080/fms/userLogin"
      var username = this.user_name

      $.ajax({
        url: url,
        type: "post",
        data: {
          user_name: this.user_name,
          user_pwd: this.user_pwd
        },
        success: function (data) {
          if (data.code == 1) {
            Cookies.set('user_name', username)
            Cookies.set('user_id', data.user_id)
            alert("登录成功")
            window.location.href = "home.html"
          } else {
            alert("用户名或密码错误")
          }
        }
      })
    }
  }
})