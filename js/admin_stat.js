//获取每个类目的记录
function getRecordsPerCate(fund_proj_id) {
    var stats;
    var url = "http://localhost:8080/fms/getRecordsPerCate"
    $.ajax({
        async: false,
        url: url,
        type: "GET",
        data: {
            fund_proj_id: fund_proj_id
        },
        success: function (data) {
            stats = data.data;
        }
    });
    //移除启动资金项
    for (i in stats) {
        if (stats[i].amount < 0) {
            delete stats[i];
        }
    }

    return stats;
}
var stats = getRecordsPerCate()

//获取标签
function getLabels(stats) {
    var labels = [];
    for (i in stats) {
        labels.push(stats[i].category_name);
    }
    return labels;
}

//随机颜色
function rgba() {
    var rgb = {};
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    rgb.normal = 'rgba(' + r + ',' + g + ',' + b + ',' + '1' + ')';
    rgb.light = 'rgba(' + r + ',' + g + ',' + b + ',' + '0.2' + ')';
    return rgb;
}

//颜色列表
var bgColorList = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
];
var borderColorList = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
];

// 饼图
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: getLabels(stats),
        datasets: [{
            data: stats,
            backgroundColor: borderColorList
        }]
    },
    options: {
        parsing: {
            key: "amount"
        }
    }
})


//为折线图创建数据集
function createDataset() {
    var datasets = [];

    for (i in projects) {
        var item = {};
        item.label = projects[i].project_name;
        var proj_id = projects[i].project_id;
        item.data = getRecordsPerCate(proj_id);

        var color = rgba();
        item.backgroundColor = color.light;
        item.borderColor = color.normal;
        datasets.push(item);
    }
    return datasets;
}

// 折线图
var ctx2 = document.getElementById('myChart2');
var myChart = new Chart(ctx2, {
    type: 'line',
    data: {
        datasets: createDataset()
    },
    options: {
        parsing: {
            xAxisKey: "category_name",
            yAxisKey: "amount"
        }
    }
})