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
var userRecords = getRecordsByProj(userProjects);






//数据表格部分
var app2 = new Vue({
    el: "#app2",
    data: {
        data: ""
    },
    methods: {
        deleteRecord: function (e) {//删除记录record
            e.preventDefault()
            var fund_id = $(event.target).parent().siblings("#fund_id").text()

            for (i in userRecords) {
                if (userRecords[i].fund_id == fund_id) {
                    if (userRecords[i].fund_audit != 1) {
                        alert("该记录已经审核，不能删除");
                        return;
                    }
                }
            }

            var confirm = window.confirm("确定删除该条记录吗？");
            if (confirm == true) {
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
        changeRecord: function (e) {//暂存当前修改的记录的fund_id
            e.preventDefault()
            var modify_fund_id = $(e.target).parent().siblings("#fund_id").text()
            var modify_record
            for (i in userRecords) {
                if (userRecords[i].fund_id == modify_fund_id) {
                    modify_record = userRecords[i]
                }
            }
            if (modify_record.fund_audit != 1) {
                alert("该记录已经审核，不能修改");
                return;
            }
            //把当前修改的record的各项值填入表单
            modal2.fund_id = modify_record.fund_id
            modal2.fund_amount = modify_record.fund_amount
            modal2.fund_date = modify_record.fund_date
            modal2.fund_manager = modify_record.fund_manager
            modal2.selected_category = modify_record.fund_category_id
            modal2.selected_project = modify_record.fund_proj_id
            $("#modal2").modal("show")
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
            for (i in userProjects) {
                if (userProjects[i].project_id == value) {
                    return userProjects[i].project_name;
                }
            }
        }
    }
})
app2.data = userRecords


//添加记录modal
var app3 = new Vue({
    el: "#app3",
    data: {
        fund_amount: "",
        fund_date: "",
        fund_manager: "",
        selected_category: "",
        selected_project: "",
        categories: categories,
        projects: userProjects
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
            if (this.fund_manager == "") {
                alert("经办人不能为空")
                return false
            }
            if (this.selected_category == "") {
                alert("类别不能为空")
                return false
            }
            if (this.selected_project == "") {
                alert("项目不能为空")
                return false
            }
            var url = "http://localhost:8080/fms/submitRecord"
            $.post(url, {
                fund_amount: Number.parseFloat(this.fund_amount),
                fund_date: dd,
                fund_category_id: this.selected_category,
                fund_manager: this.fund_manager,
                fund_proj_id: this.selected_project
            }, function (data) {
                if (data.code == 1) {
                    alert("提交成功")
                    window.location.reload()
                } else {
                    alert("提交失败")
                }
            })
        }
    }
})

//修改记录modal
var modal2 = new Vue({
    el: "#modal2",
    data: {
        fund_id: "",
        fund_amount: "",
        fund_date: "",
        fund_manager: "",
        selected_category: "",
        selected_project: "",
        categories: categories,
        projects: userProjects,
        fund_audit: ""
    },
    methods: {
        modifyRecord: function (e) {
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
            if (this.fund_manager == "") {
                alert("经办人不能为空")
                return false
            }
            if (this.selected_category == "") {
                alert("类别不能为空")
                return false
            }
            if (this.selected_project == "") {
                alert("项目不能为空")
                return false
            }
            var url = "http://localhost:8080/fms/modifyRecord"
            $.post(url, {
                fund_id: Number.parseInt(this.fund_id),
                fund_amount: Number.parseFloat(this.fund_amount),
                fund_date: dd,
                fund_category_id: this.selected_category,
                fund_manager: this.fund_manager,
                fund_proj_id: this.selected_project
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

//切换类别
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
