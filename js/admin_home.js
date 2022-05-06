//类别下拉栏
var app4 = new Vue({
    el: "#app4",
    data: {
        selected: 1,
        data: categories
    },
    methods: {
        dispRecords: function () {
            if (this.selected == "1") {
                app2.data = getRecordsBy()
            } else {
                app2.data = getRecordsBy(this.selected)
            }
        }
    }
})




//审核功能
function auditRecord(id, status) {
    $.ajax({
        url: 'http://localhost:8080/fms/auditRecord',
        type: "post",
        data: {
            fund_audit: status,
            fund_id: Number.parseInt(id)
        },
        success: function (data) {
            if (data.code == 1) {
                alert("审核成功");
                window.location.reload();
            } else {
                alert("审核失败, 原因：" + data.msg);
            }
        }
    })
}

//数据表格
var app2 = new Vue({
    el: "#app2",
    data: {
        data: ""
    },
    methods: {
        passRecord: function () {//通过审核
            var fund_id = $(event.target).parent().siblings("#fund_id").text()
            auditRecord(fund_id, 2)
        },
        rejectRecord: function () {//拒绝通过审核
            var fund_id = $(event.target).parent().siblings("#fund_id").text()
            auditRecord(fund_id, 3)
        },
        deleteRecord: function () {//删除记录
            var confirm = window.confirm("确定删除该条记录吗？");
            if (confirm == true) {
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
                        } else {
                            alert("删除失败");
                        }
                    }
                })
            }
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
            return new Date(value).toLocaleString();
        },
        toCategoryName: function (value) {
            for (i in categories) {
                if (categories[i].category_id == value) {
                    return categories[i].category_name;
                }
            }
        },
        toProjName: function (value) {
            for (i in projects) {
                if (projects[i].project_id == value) {
                    return projects[i].project_name;
                }
            }
        }
    }
})
app2.data = getRecordsBy()



new Vue({
    el: "#myModal2",
    data: {
        // fund_username: user_name,
        fund_amount: "",
        fund_date: "",
        fund_category: ""
    },
    methods: {
        modifyRecord: function (e) {
            e.preventDefault()
            if (this.fund_amount == "") {
                alert("金额不能为空")
                return false
            }
            if (this.fund_date == "") {
                alert("日期不能为空")
                return false
            }
            if (this.fund_category == "") {
                alert("类别不能为空")
                return false
            }
            var url = "http://localhost:8080/fms/modifyRecord"
            $.post(url, {
                fund_id: Number.parseInt(currentModify),
                fund_amount: Number.parseFloat(this.fund_amount),
                fund_date: new Date(this.fund_date),
                fund_category: this.fund_category
            }, function (data) {
                alert("修改成功")
                window.location.reload()
            })
        }
    }
})


