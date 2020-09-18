/* 
求出n-m之间的 4 叶玫瑰数
例如：1634 == 1 * 1 * 1 * 1  +  6 * 6 * 6 * 6  + 3 * 3 * 3 * 3  + 4 * 4 * 4 * 4 
 */
function rose(n, m) {
    for (i = n; i <= m; i++) {
        var ge = i % 10;
        var shi = parseInt((i % 100) / 10);
        var bai = parseInt(i / 100) % 10;
        var qian = parseInt(i / 1000);

        if (i == Math.pow(ge, 4) + Math.pow(shi, 4) + Math.pow(bai, 4) + Math.pow(qian, 4)) {
            return (i + "是四叶玫瑰数");
        }
    }
}

//求两数之间的水仙花数
function daffodil(n, m) {
    for (i = n; i <= m; i++) {
        var ge = i % 10;
        var shi = parseInt(i / 10) % 10;
        var bai = parseInt(i / 100);
        if (i == Math.pow(ge, 3) + Math.pow(shi, 3) + Math.pow(bai, 3)) {
            return (i + "是水仙花数");
        }
    }
}


//求最大公约数
function greatest() {
    var one = prompt("请输入第一个数") * 1;
    var two = prompt("请输入第二个数:") * 1;
    var min = one < two ? one : two;
    // 未添加条件。当找到最小公约数时break，因为一定有最小公约数1，所以不会陷入死循环。
    for (var i = min;; i--) {
        if (one % i == 0 && two % i == 0) {
            return (one + "与" + two + "的最大公约数为：" + i);
        }
    }
}

//最小公倍数
function least() {
    var one = prompt("请输入第一个数") * 1;
    var two = prompt("请输入第二个数:") * 1;
    var max = one > two ? one : two;
    for (var i = max;; i++) {
        // 这里容易犯错误，写为max/one，注意！
        if (i % one == 0 && i % two == 0) {
            return (one + "与" + two + "的最小公倍数为：" + i)
        }
    }
}


//回文数

function pali(n, m) {
    for (var i = n; i <= m; i++) {
        // 都是对10取余，不要错误地对100、1000取余
        var one = parseInt(i / 10000);
        var two = parseInt(i / 1000) % 10;
        var thr = parseInt(i / 100) % 10;
        var four = parseInt(i / 10) % 10;
        var fif = i % 10;
        if ((one == fif) && (two == four) && (two == one + 1) && (thr == two + 1)) {
            return i + "</br>";
        }

    }
}


//任意多数的最大值
function max() {
    var count = arguments.length;
    //max放在for循环外面，否则会重复执行，结果就会为最后一个实参。
    var max = arguments[0];
    for (var i = 0; i < count; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    return max
}

//任意多数的最小值
function min() {
    var count = arguments.length;
    var min = arguments[0];
    for (var i = 0; i < count; i++) {
        if (arguments[i] < min) {
            min = arguments[i];
        }
    }
    return min
}

//判断质数
function prime(n) {
    var flag = false;
    for (var i = 2; i <= n - 1; i++) {
        // 如果有其他的数能整除，则不是质数
        if (n % i == 0) {
            flag = true;
            break;
        }
    }
    if (flag) {
        return ("不是质数");
    } else {
        return ("是质数");
    }
}

// 求任意两个数 之间随机数 
function getRandom(n, m) {
    // 111 = m - n +1
    // 20 = n
    if (n > m) {
        return parseInt(Math.random() * (n - m + 1)) + m;
    } else {
        return parseInt(Math.random() * (m - n + 1)) + n;
    }
}

//冒泡排序 升序
function bubbleSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        //每一轮比较的次数
        for (var j = 0; j < arr.length - (i + 1); j++) {
            if (arr[j] > arr[j + 1]) {
                //交换两个数位置
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr
}

// 数组去重
function noRepeat(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                //将后面这个数删除
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr
}
// 选择排序
function changeSortAsc(arr) { //升序（从小到大）
    for (var i = 0; i < arr.length - 1; i++) {
        //被比较的数的下标
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr
}


function changeSortDesc(arr) { //降序
    for (var i = 0; i < arr.length - 1; i++) {
        //被比较的数的下标
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] < arr[j]) {
                var tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr
}

// 时间格式化 函数
/* 
    需要传两个参数
    参数1：时间对象
    参数2：连接时间的符号
*/
function date(date, n) {
    // 先获取时间的 年月日 时分秒
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;

    var hours = date.getHours();
    hours = hours >= 10 ? hours : '0' + hours;
    var min = date.getMinutes();
    min = min >= 10 ? min : '0' + min;
    var sec = date.getSeconds();
    sec = sec >= 10 ? sec : '0' + sec;
    // console.log(year, month, day, hours, min, sec);
    // 把这个数字拼接成规定格式字符串
    // 把这个字符串返回
    if (n === '-') {
        return `${year}-${month}-${day} ${hours}:${min}:${sec}`
    } else if (n === '/') {
        return `${year}/${month}/${day} ${hours}:${min}:${sec}`
    } else if (n === '.') {
        return `${year}.${month}.${day} ${hours}:${min}:${sec}`
    }

}


//时间格式化函数（不传参）
// 效果为   2020年8月6日 星期四 19:37:38  （当前时间）
function showTime() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1; //0~11
    var date = d.getDate();

    var week = d.getDay(); //0~6  0是周日

    week = numOfChinese(week); //此为数字转化为中文的一个函数

    var hour = doubleNum(d.getHours()); //doubleNum为两位数的封装函数
    var min = doubleNum(d.getMinutes());
    var sec = doubleNum(d.getSeconds());

    var str = year + "年" + month + "月" + date + "日 星期" + week + " " + hour + ":" + min + ":" + sec;
    return str;
}

//数字转成中文
function numOfChinese(num) {
    var arr = ["日", "一", "二", "三", "四", "五", "六"];
    return arr[num];
}

// 两位数
function doubleNum(n) {
    if (n < 10) {
        return "0" + n;
    } else {
        return n;
    }
}

//时间差，返回对象
function dateCha(d1, d2, callback) {
    // 当调用 dateCha() 没有回调函数
    // callback = undefined
    var time1 = d1.getTime();
    var time2 = d2.getTime();

    // 如果时间越往后面，到格林威治时间的毫秒数就越大
    // 如果 time2 的值比time1的值大，那么说明 d2的时间大于 d1的时间
    if (time2 >= time1) {
        //  callback  存在 那么才会执行 调用callback()
        callback && callback();
        time2 = time1
    }
    var cha = Math.abs(time2 - time1);
    var miao = parseInt(cha / 1000) % 60;
    var fenzhong = parseInt(cha / 1000 / 60) % 60;
    var xiaoshi = parseInt(cha / 1000 / 60 / 60) % 24;
    var tian = parseInt(cha / 1000 / 60 / 60 / 24);
    var obj = {
        day: tian,
        hours: xiaoshi,
        min: fenzhong,
        sec: miao
    }
    return obj;
}



// 获取样式的方法
// 有两个参数
// 参数1：元素
// 参数2：css属性
function getStyle(ele, attr) {
    return style = window.getComputedStyle ? window.getComputedStyle(ele)[attr] : ele.currentStyle[attr]
}

// 动画函数
function move(ele, obj, callback) {
    let speed;
    let index = 0; //记录定时器的个数
    // 循环对象创建定时器
    for (let attr in obj) {
        // 透明度的变化的时候 0-1
        // console.log(attr);
        index++;
        // 清除上一次的定时器
        clearInterval(ele[attr])
        // 属性：attr
        // 属性值：obj[key]
        // box['width'] 给box这个dom元素添加一个 width属性(dom属性)
        // dom 对象，以地址形式存储的，当上一次更改dom对象中的值，那么这次获取这个对象的时候是能拿到被更改之后的dom对象
        ele[attr] = setInterval(() => {
            // 把透明度的取值 改边为0-100的取值
            // 0-1=====》0-100
            let style;
            if (attr == 'opacity') {
                style = getStyle(ele, attr) * 100;
            } else {
                style = parseInt(getStyle(ele, attr));
            }

            speed = (obj[attr] - style) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            style += speed;


            if (attr === 'opacity') {
                ele.style[attr] = style / 100;
            } else {
                ele.style[attr] = style + 'px';
            }

            if (style == obj[attr]) {
                clearInterval(ele[attr]);
                // 有多少个属性参数动画就会执行多少次
                // 执行一次怎么？
                // 没清除一次定时器，那么定时器的个数 -1
                index--;
                // 当定时器的个数 为0 的时候，说明所有动画执行完毕
                if (index === 0) {
                    callback && callback();
                }
            }
        }, 30)
    }
}
//expires
//设置cookie (属性，属性值，存在秒数)
function setCookie(key, value, delay) {
    // 1、当前+8时区的时间
    let time = new Date();
    // 2、换为 0 时区的时间
    let t = time.getTime() - 8 * 60 * 60 * 1000 + delay * 1000;
    // 3、设置时间
    time.setTime(t);
    // 4、创建cookie path使得cookie全域可以使用
    document.cookie = `${key}=${value};expires=` + time + ";path=/";
}

//获取cookie key这个属性的属性值
function getCookie(key) {
    // 1、首先，cookie有很多属性属性值，用;隔开，所以，首先割它变为[属性=属性值，属性=属性值]这样的数组
    let str = document.cookie.split('; ');
    // 2、用value来储存属性值，如果不存在就返回空。
    let value = '';
    str.forEach((item) => {
        // 3、将数组分割为[属性，属性值]
        let arr = item.split('=');
        // 4、存在此属性就将属性值赋值给value
        if (arr[0] === key) {
            value = arr[1];
        }
    })
    return value;
}

//ajax
/**
 * @param {object} option I am argument option. 
 */
function ajax(option) {
    // 在发送请求之前先判断参数是否正确
    // 1.必须有的参数：url
    if (!option.url) {
        // 当没有url地址的时候 应该手动抛出一个错误，告诉调用者，url是必填参数
        // throw 抛出错误
        throw new Error('url是必填参数')
    }

    // 2.设置默认的参数
    let defInfo = {
        type: 'get',
        data: '',
        async: true,
        success() {}
    }

    // 3.循环把传递进来的参数 取出来拿给默认参数对象
    for (let attr in option) {
        defInfo[attr] = option[attr];
    }

    // 4.判断请求方式type 是否是get 或者 post
    if (!/^(get|post)$/i.test(defInfo.type)) {
        throw new Error('暂时只支持get 和post请求');
    }

    // 5.ajax请求携带的参数只支持 "key=value&age=18"
    if (!(typeof defInfo.data === 'string' && /^(\w+=\w+&?)*$/.test(defInfo.data) || Object.prototype.toString.call(defInfo.data) == '[object Object]')) {
        throw new Error('data参数只支持key=vlue 或者对象')
    }

    // {name:aa,age:18}===> name=aa&age=18
    // 6.如果参数时对象的时候，那么久把这个对象处理 key=value&age=18
    let str = '';
    if (Object.prototype.toString.call(defInfo.data) == '[object Object]') {
        for (let key in defInfo.data) {
            // console.log(key);
            str += `${key}=${defInfo.data[key]}&`
        }
    }
    // 把处理好的结果赋值给data
    defInfo.data = str.slice(0, -1);

    // 7.判断传进来的success是否是函数
    if (!(Object.prototype.toString.call(defInfo.success) === "[object Function]")) {
        throw new Error('success 必须是一个函数')
    }

    // 8.判断async的值是否是布尔值
    if (!(Object.prototype.toString.call(defInfo.async) === "[object Boolean]")) {
        throw new Error('saync 只能是布尔值')
    }

    // 8.发送ajax请求
    // let xhr = new XMLHttpRequest();
    // let xhr = new ActiveXObject("Microsoft.XMLHTTP");

    /* 
        try{
            尝试执行这里的代码，如果这里的代码能执行就会把这个代码执行
            如果这里代码有错误，那么久执行 catch
        }catch(error){
            当try中代码有问题，执行这里代码
            如果try中代码没有问题，不会执行这里
        }
    */
    // let xhr;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 设置请求的方式 和url地址
    // 进行判断，如果过get请求，需要把参数拼接在url地址后面
    if (/^(get)$/i.test(defInfo.type)) {
        xhr.open(defInfo.type, defInfo.url + defInfo.data ? '?'+ defInfo.data : '', defInfo.async);
        xhr.send();
    } else {
        xhr.open(defInfo.type, defInfo.url, defInfo.async);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(defInfo.data)
    }

    // 接收响应体
    xhr.onreadystatechange = function () {
        if (/^2\d{2}$/.test(xhr.status) && xhr.readyState === 4) {
            defInfo.success(xhr.responseText);
        }
    }

}


// 封装一个promise的ajax
function pAjax(option) {
    return new Promise(function (resvole, reject) {
        ajax({
            url: option.url,
            data: option.data || '',
            type: option.type || 'get',
            async: option.async || true,
            success(res3) {
                resvole(JSON.parse(res3));
            }
        })
    })
}