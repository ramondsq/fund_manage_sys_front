var app2 = new Vue({
    el: "#app2",
    data: {
        data: ""
    },
    methods: {
        
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
app2.data = userProjects