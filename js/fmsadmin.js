//登录验证
if(!Cookies.get('admin_name')){
    window.location.href = 'admin_index.html';
}
var admin_name = Cookies.get('admin_name');
//退出登录按钮
new Vue({
    el: "#app1",
    data: {
        uname: admin_name
    },
    methods: {
        signout: function () {
            Cookies.remove('admin_name');
            window.location.href = "admin_index.html";
        }
    }
})

//获取所有projs
function getUserProjects() {
    var projs;

    $.ajax({
        async: false,
        url: 'http://localhost:8080/fms/getProjectsBy',
        type: "get",
        success: function (data) {
            projs = data.projects
        }
    })
    return projs;
}
var projects = getUserProjects();

//根据类别获取records
function getRecordsBy(category) {
    var records;

    $.ajax({
        async: false,
        url: 'http://localhost:8080/fms/getRecordsBy',
        type: "get",
        data: {
            fund_category_id: category
        },
        success: function (data) {
            records = data.records
        }
    })

    return records;
}