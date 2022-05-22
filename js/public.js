//获取所有的资金类别categories
function getCategories() {
    var categories;

    $.ajax({
        async: false,
        url: 'http://localhost:8080/fms/getCategoriesBy',
        type: 'get',
        headers: {
            'token': Cookies.get('user_token')
        },
        success: function (data) {
            categories = data.categories
        }
    })

    return categories;
}

var categories = getCategories();

//获取user对应的project
function getUserProjects(user_id) {
    var projs;

    $.ajax({
        async: false,
        url: 'http://localhost:8080/fms/getProjectsBy',
        type: "get",
        headers: {
            'token': Cookies.get('user_token')
        },
        data: {
            project_user_id: user_id,
            project_status: 1
        },
        success: function (data) {
            projs = data.projects
        }
    })
    return projs;
}


//获取users
function getUsers() {
    var users;

    $.ajax({
        async: false,
        headers: {
            'token': Cookies.get('user_token')
        },
        url: 'http://localhost:8080/fms/getUsers',
        type: "get",
        success: function (data) {
            users = data.users
        }
    })

    return users;
}
var users = getUsers();