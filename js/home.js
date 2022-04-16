//获取user对应的project
function getUserProjects(user_id) {
    var projs;

    $.ajax({
        async: false,
        url: 'http://localhost:8080/fms/getProjectsBy',
        type: "get",
        data: {
            project_user_id: user_id
        },
        success: function (data) {
            projs = data.projects
        }
    })
    return projs;
}

var userProjects = getUserProjects(user_id);

//通过user对应的projs获取record
function getRecordsByProj(projects, category) {
    var allrecords = [];

    for (i in projects) {
        $.ajax({
            async: false,
            url: 'http://localhost:8080/fms/getRecordsBy',
            type: "get",
            data: {
                fund_proj_id: projects[i].project_id,
                fund_category_id: category
            },
            success: function (data) {
                for (i in data.records) {
                    allrecords.push(data.records[i])
                }
            }
        })
    }

    return allrecords;
}

//获取所有的资金类别categories
function getCategories() {
    var categories;

    $.ajax({
        async: false,
        url: 'http://localhost:8080/fms/getCategoriesBy',
        type: 'get',
        success: function (data) {
            categories = data.categories
        }
    })

    return categories;
}

var categories = getCategories();

//数据表格部分
var app2 = new Vue({
    el: "#app2",
    data: {
        data: ""
    },
    methods: {
        deleteRecord: function () {
            var fund_id = $(event.target).parent().siblings("#fund_id").text()
            $.ajax({
                url: 'http://localhost:8080/fms/deleteRecord',
                type: "post",
                data: {
                    fund_id: fund_id
                },
                success: function (data) {
                    if (data.code == 1) {
                        alert("删除成功");
                        window.location.reload()
                    }
                }
            })
        },
        changeRecord: function () {
            currentModify = $(event.target).parent().siblings("#fund_id").text()
        }
    },
    filters: {
        toChinese: function (value) {
            switch (value) {
                case 1:
                    return "未审核";
                case 2:
                    return "已通过";
                case 3:
                    return "已拒绝";
            }
        },
        timeFormat: function (value) {
            var date = new Date(value);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        },
        toCategoryName: function (value) {
            for (i in categories) {
                if (categories[i].category_id == value) {
                    return categories[i].category_name;
                }
            }
        }
    }
})
app2.data = getRecordsByProj(userProjects)



var app3 = new Vue({
    el: "#app3",
    data: {
        fund_username: user_name,
        fund_amount: "",
        fund_date: "",
        selected: "",
        data: categories
    },
    methods: {
        submitRecord: function (e) {
            e.preventDefault()
            var d = new Date(this.fund_date)
            var dd = new Date(d.getTime() + 28800000)
            if (this.fund_amount == "") {
                alert("金额不能为空")
                return false
            }
            if (this.fund_date == "") {
                alert("日期不能为空")
                return false
            }
            if (this.selected == "") {
                alert("类别不能为空")
                return false
            }
            var url = "http://localhost:8080/fms/submitRecord"
            $.post(url, {
                fund_username: this.fund_username,
                fund_amount: Number.parseFloat(this.fund_amount),
                fund_date: dd,
                fund_category: this.selected
            }, function (data) {
                alert("提交成功")
                window.location.reload()
            })
        }
    }
})

var modal2 = new Vue({
    el: "#modal2",
    data: {
        fund_username: user_name,
        fund_amount: "",
        fund_date: "",
        selected: "",
        data: categories
    },
    methods: {
        modifyRecord: function (e) {
            e.preventDefault()
            var d = new Date(this.fund_date)
            var dd = new Date(d.getTime() + 28800000)
            console.log(dd)
            if (this.fund_amount == "") {
                alert("金额不能为空")
                return false
            }
            if (this.fund_date == "") {
                alert("日期不能为空")
                return false
            }
            if (this.selected == "") {
                alert("类别不能为空")
                return false
            }
            var url = "http://localhost:8080/fms/modifyRecord"
            $.post(url, {
                fund_id: Number.parseInt(currentModify),
                fund_amount: Number.parseFloat(this.fund_amount),
                fund_date: dd,
                fund_category: this.selected
            }, function (data) {
                alert("修改成功")
                window.location.reload()
            })
        }
    }
})


var app4 = new Vue({
    el: "#app4",
    data: {
        data: categories,
        selected: "1"
    },
    methods: {
        dispRecords: function () {
            if (this.selected == "1") {
                app2.data = getRecordsByProj(userProjects)
            } else {
                app2.data = getRecordsByProj(userProjects, this.selected)
            }
        }
    }
})
