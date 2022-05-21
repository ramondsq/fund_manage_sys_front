//数据表格
var app2 = new Vue({
    el: "#app2",
    data: {
        data: categories
    },
    methods: {
        delCate: function (event) {
            var name = $(event.target).parent().siblings("#catename").text()
            $.ajax({
                async: false,
                url: 'http://localhost:8080/fms/removeCategory',
                type: "post",
                headers: {
                    'token': Cookies.get('user_token')
                },
                data: {
                    category_name: name
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
        storeCate: function(event){
            modal2.category_id = $(event.target).parent().siblings("#cate_id").text()
            modal2.category_name = $(event.target).parent().siblings("#catename").text()
        }
    }
})

//添加类目modal
var app3 = new Vue({
    el: "#app3",
    data: {
        category_name: ""
    },
    methods: {
        setCategory: function (e) {
            e.preventDefault()
            if (this.category_name == "") {
                alert("请输入类目名称")
                return
            }

            $.ajax({
                async: false,
                url: 'http://localhost:8080/fms/submitCategory',
                type: "post",
                headers: {
                    'token': Cookies.get('user_token')
                },
                data: {
                    category_name: this.category_name
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

//修改类目modal
var modal2 = new Vue({
    el: "#modal2",
    data: {
        category_id: "",
        category_name: ""
    },
    methods: {
        modifyCate: function(e) {
            e.preventDefault()
            if (this.category_name == "") {
                alert("请输入类目名称")
                return
            }

            $.ajax({
                async: false,
                url: 'http://localhost:8080/fms/modifyCategory',
                type: "post",
                headers: {
                    'token': Cookies.get('user_token')
                },
                data: {
                    category_id: this.category_id,
                    category_name: this.category_name
                },
                success: function (data) {
                    if (data.code == 1) {
                        alert("修改成功");
                        window.location.reload();
                    } else {
                        alert("修改失败");
                    }
                }
            })
        }
    }
})

