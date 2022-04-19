//获取日志
function getLogs() {
    var logs;
    $.ajax({
        async: false,
        url: 'http://localhost:8080/fms/getLogsBy',
        type: "get",
        success: function (data) {
            logs = data.logs
        }
    })

    return logs;
}

//数据表格
var app2 = new Vue({
    el: "#app2",
    data: {
        data: ""
    },
    filters: {
        timeFormat: function (value) {
            return new Date(value).toLocaleString();
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
app2.data = getLogs()