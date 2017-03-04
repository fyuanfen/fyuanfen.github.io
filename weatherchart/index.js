/**
 * Created by zyy on 2016/12/29.
 */

/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

// 统计表颜色
var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
    '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

function hideDetail(e){
    var detail = e.childNodes[0];
    detail.style.visibility= 'hide';

}

function hoverDetail(e) {
    var detail = e.childNodes[0];
    detail.style.visibility= 'visiable';
}


/**
 * 渲染图表
 */
function renderChart() {
    var title;
    switch (pageState.nowGraTime){
        case 'day':   title = '天'; break;
        case 'week':  title = '周'; break;
        case 'month': title = '月'; break;
    }
    var chart = document.getElementById('aqi-chart-wrap');
    var width = chart.clientWidth/(Object.keys(chartData).length);
    var index = 0;
    var text = '<div class="title">2016年' + pageState.nowSelectCity + '1月-3月每' + title + '平均空气质量指数</div>';
    for(var item in chartData) {
        var positionLeft = Math.ceil((index + 1/4) * width);
        var hintHeight = chartData[item]+30;
        var hintLeft = Math.ceil((Math.ceil(width/2) -100)/2);
        text += '<div class="aqi-bar" onmouseover="hoverDetail(this)" onmouseout="hideDetail(this)" ' +
            'style="height: '+ chartData[item] + 'px; width: ' + Math.ceil(width/2) + 'px; left:' +
            positionLeft + 'px; background-color:' + colors[Math.floor(Math.random()*11)]+'">'+
            '<span class="aqi-hint" style="left:'+ hintLeft + 'px; bottom: ' + hintHeight + 'px">' + item + '<br />[AQI]: ' + chartData[item] + '</span></div>';

        index ++;

    }
    chart.innerHTML = text;

    //给每个bar添加事件处理程序
    var bar = document.getElementsByClassName('aqi-bar');
    [].forEach.call(bar,function (item) {

        addEventHandler(item,'mouseenter',function (e) {
            var ele = e.target || e.srcElement;
            ele.className +=' show';

        });
        addEventHandler(item,'mouseleave',function (e) {
            var ele = e.target || e.srcElement;
            ele.className =ele.className.replace(' show','');

        });

    });




}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
    // 确定是否选项发生了变化
    var value = e.value;
    var item = e.previousElementSibling;//单位
    var items = document.getElementsByTagName('span');
    for (var i = 0; i < items.length; i++){
        items[i].className = '';

    }
    item.className = 'selected';
    // 设置对应数据
    if (value != pageState.nowGraTime) {
        pageState.nowGraTime = value;
        // 调用图表渲染函数

        initAqiChartData();
        renderChart();
    }

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var city = this.value;
    if (city != pageState.nowSelectCity){
        pageState.nowSelectCity = city;
        initAqiChartData();
        renderChart();
    }


    // 设置对应数据

    // 调用图表渲染函数
}


/**
 * addEventHandler方法
 * 跨浏览器实现事件绑定
 */
function addEventHandler(ele, event, handler) {
    if (ele.addEventListener) {
        ele.addEventListener(event, handler, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, handler);
    } else  {
        ele["on" + event] = handler;
    }
}


/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

    var time = document.getElementsByName('gra-time');
    for (var item = 0; item < time.length; item++ ){
        (function(n){
            addEventHandler(time[n],'click',function() {
                graTimeChange(time[n]);

            });
        })(item);
    }


}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select = document.getElementById('city-select');
    var cityAttr = Object.keys(aqiSourceData);
    var htmlAttr = cityAttr.map( function (item) {
        return "<option>" + item +"</option>";

    });
    pageState.nowSelectCity = cityAttr[0];
    select.innerHTML = htmlAttr.join('');
    addEventHandler(select,'change',citySelectChange);

    // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData = {};//数据源重置为空
    var char={};
    var city = document.getElementById('city-select').value;
    for(var item in aqiSourceData) {
        if(city==item) {
            char=aqiSourceData[item];

        }
    }

    switch (pageState.nowGraTime) {

        case 'day':
            chartData = char;
            break;
        case 'week':
            chartData = {};
            var sum = 0,i = 0,week = 0;
            for (var item in char){
                sum += aqiSourceData[city][item];
                i ++;
                if (new Date(item).getDay()==6){
                    week++;
                    chartData['2016年第'+ week +'周'] = Math.round(sum/i);
                    sum = 0;
                    i = 0;
                }
            }
            if(i!=0) {
                week++;
                chartData['2016年第'+ week+'周']=Math.round(sum/i);
            }
            break;

        case 'month':
             var sum = 0,i = 0,month = -1;
             for (var item in char) {
                 var date = new Date(item);
                 if (month == -1) {
                     month = date.getMonth() + 1;
                 }
                 else if ((date.getMonth()+1) != month) {
                     chartData['2016年'+month + "月"] = Math.round(sum / i);
                     month = date.getMonth() + 1;
                     i = 0;
                     sum = 0;

                 }
                 sum += aqiSourceData[city][item];
                 i++;

             }
            chartData['2016年' + month + "月"] = Math.round(sum / i);
             break;


    }

}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();
