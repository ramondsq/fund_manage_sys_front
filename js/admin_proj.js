//启用、停用proj
function changeProjStatus(proj_id, status) {
    $.ajax({
        async: false,
        url: "http://localhost:8080/fms/updateProjById",
        type: "POST",
        data: {
            project_id: Number.parseInt(proj_id),
            project_status: status
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

//数据表格
var app2 = new Vue({
    el: "#app2",
    data: {
        data: ""
    },
    methods: {
        enableProj: function () {
            var proj_id = $(event.target).parent().siblings("#project_id").text();
            changeProjStatus(proj_id, 1);
        },
        disableProj: function () {
            var proj_id = $(event.target).parent().siblings("#project_id").text();
            changeProjStatus(proj_id, 2);
        },
        delProj: function () {
            var proj_id = $(event.target).parent().siblings("#project_id").text();
            $.ajax({
                url: "http://localhost:8080/fms/delProj",
                type: "POST",
                data: {
                    project_id: Number.parseInt(proj_id)
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
        }
    },
    filters: {
        toChinese: function (value) {
            switch (value) {
                case 1:
                    return "启用";
                case 2:
                    return "停用";
            }
        },
        timeFormat: function (value) {
            var time = new Date(value).toLocaleString();

            return time;
        },
        toUserName: function (value) {
            for (i in users) {
                if (users[i].user_id == value) {
                    return users[i].user_name;
                }
            }
        }
    }
})
app2.data = projects

//新建proj modal
var app3 = new Vue({
    el: "#app3",
    data: {
        project_name: "",
        users: users,
        selected_user: "",
        project_budget: "",
        project_deadline: ""
    },
    methods: {
        submitProject: function (e) {
            e.preventDefault()
            var d = new Date(this.project_deadline)
            var dd = new Date(d.getTime() + 28800000)
            if (this.project_name == "") {
                alert("请输入项目名称");
                return;
            }
            if (this.selected_user == "") {
                alert("请选择项目负责人");
                return;
            }
            if (this.project_budget == "") {
                alert("请输入预算");
                return;
            }
            if (this.project_deadline == "") {
                alert("请输入截止时间");
                return;
            }

            var url = "http://localhost:8080/fms/submitProject";
            $.post(url,
                {
                    project_name: this.project_name,
                    project_user_id: this.selected_user,
                    project_budget: Number.parseFloat(this.project_budget),
                    project_deadline: dd,
                },
                function (data) {
                    if (data.code == 1) {
                        alert("提交成功");
                        window.location.reload();
                    } else {
                        alert("提交失败");
                    }
                }
            )
        }
    }
})