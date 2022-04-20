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