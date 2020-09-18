let header = document.querySelector('#header');
let header1 = document.querySelector('.header');
let login = document.querySelector('#login');
let aColor = document.querySelectorAll('.aColor')
aColor = [...aColor];

let exist = getCookie('login')
if (exist) {
    login.classList.add('loginBtn')
    login.innerHTML = `欢迎,${exist}`;
}
//点击首页返回首页
let indexH = document.querySelector('.header .indexH');
indexH.onclick = function () {
    this.href = '../index.html'
}
//点击列表页跳转
let jump = document.querySelector('.header .jump');
jump.onclick = function () {
    this.href = '../html/list1.html'
}
//点击登录按钮
login.onclick = function () {
    exist = getCookie('login')
    if (!exist) {
        window.location.href = '../html/login.html';
    } else {
        login.innerHTML = exist;
        login.classList.add('loginBtn')
        //点击退出登录
        let flag = confirm(`要退出登录吗？`);
        if (flag){
            login.classList.remove('loginBtn')
            login.innerHTML = '登录'
            setCookie('login', '', -1);
        }else{
            login.innerHTML = `欢迎,${exist}`;
        }
    }
}
//点击注册按钮
let register = document.querySelector('#register');
register.onclick = function () {
    window.location.href = '../html/register.html' + '?pathname=' + window.location.href;
}

//滚动条滚动，导航栏变化
window.onscroll = function () {
    if (window.scrollY > 0) {
        header.style.backgroundColor = '#fff';
        header1.classList.add('later');
        login.classList.add('changeBc');
        aColor.forEach(item => {
            item.classList.add('changeC')
        })
    } else {
        header.style.backgroundColor = 'transparent';
        header1.classList.remove('later');
        login.classList.remove('changeBc');
        aColor.forEach(item => {
            item.classList.remove('changeC')
        })
    }
}

//放大镜
let big = document.querySelector('#main .left .big');
let listName = document.querySelector('.listName')
getData();
async function getData() {
    let reg = /id=(.*)/;
    if (reg.test(window.location.search)) {
        await new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('get', `/isdetail/${reg.exec(window.location.search)[1]}`);
            xhr.send();
            xhr.onload = function () {
                res = JSON.parse(xhr.responseText);
                resolve()
            }
        })
        listName.innerText = res.name
        console.log(res);
        renderHTML(res);
        new Enlarge(big, res);

    } else {
        document.body.innerHTML = `<div class="jumbotron common" style="margin-top:100px !important;">
            <h1>你还没有选择商品，请去列表页选择</h1>
            <p><a class="btn btn-primary btn-lg" href="./list1.html" role="button" style="margin:15px 20px;  ">去列表页</a></p>
          </div>`
    }
}
//设计服务的标题
let name = document.querySelector('#main .p1>span');
let name1 = document.querySelector('#main .p2');

//详情图
let small = document.querySelector('#main .left .small .imgS');
//预估完成时间
let time = document.querySelector('#main .left .p5');
//价格
let price = document.querySelectorAll('#main .right .price span')[0];
let unit = document.querySelectorAll('#main .right .price span')[1];
//成交量
let order_count = document.querySelector('#main .right .order_count .number');
//星星
let star = document.querySelector('#main .right .star')
//作者头像
let icon = document.querySelector('#main .middle .media-left')
//作者名字
let userName = document.querySelector('#main .middle .media-body h4');
//作者介绍
let message = document.querySelector('#main .middle .message');
//作者平均响应时间
let response_time = document.querySelector('#main .middle .response_time');

function renderHTML(data) {
    //设计服务的标题
    name.innerText = data.name;
    name1.innerText = data.name;
    //详情图
    let str = ''
    data.desc.forEach(item => {
        if (item.image) {
            str += `<img src="https://muse-img.huabanimg.com/${item.image.key}_/fw/820"
            alt="">`
        }
    });
    small.innerHTML = str;
    //预估完成时间
    time.innerText = `${data.complete_in.number} ${data.complete_in.unit}`
    //价格
    if (data.price) {
        price.innerText = `${data.price}/`;
    } else {
        if (data.extra.urgent) {
            price.innerText = `${data.extra.urgent.price}/`
        } else {
            if (data.extra.price) {
                price.innerText = `${data.extra.price}/`
            } else {
                price.innerText = '0/'
            }

        }
    }
    unit.innerText = data.unit;
    //成交量
    order_count.innerText = data.order_count;
    //星星
    if(data.rating){
        let str1=''
        for(let i=0;i<data.rating;i++){
            str1 +='<i class="glyphicon glyphicon-star"></i>'
        }
        star.innerHTML = str1;
    }else{
        star.innerHTML = '暂无评价'
    }

    //作者
    icon.innerHTML = `<img class="media-object" src="https://hbimg.huabanimg.com/${data.user.avatar.key}_/both/70x70"  alt="..." >`
    if (data.username) {
        userName.innerHTML = data.username;
    } else {
        userName.innerHTML = data.user.username;
    }
    message.innerText = data.user.desc;

    //响应时间的计算
    let userTime = data.user.extra.response_time;
    let day = parseInt(userTime / (24 * 60 * 60));
    let hour = parseInt((userTime - 24 * 60 * 60 * day) / (60 * 60));
    let minute = parseInt((userTime - 24 * 60 * 60 * day - 60 * 60 * hour) / 60);
    let sec = userTime - 24 * 60 * 60 * day - 60 * 60 * hour - minute * 60;


    if (userTime) {
        if (userTime >= 24 * 60 * 60) {
            response_time.innerText = `${day}天${hour}时${minute}分${sec}秒`;
        }
        if (userTime >= 60 * 60 && userTime < 24 * 60 * 60) {
            response_time.innerText = `${hour}时${minute}分${sec}秒`;
        }
        if (userTime >= 60 && userTime < 60 * 60) {
            response_time.innerText = `${minute}分${sec}秒`;
        }
        if (userTime < 60 && userTime >= 0) {
            response_time.innerText = `${sec}秒`;
        }
    } else {
        response_time.innerText = '无';
    }
}


//点击加入购物车，判断是否登录，没登录直接跳转到登录页面，登陆了就往数据库添加数据
let btnAdd = document.querySelectorAll('.btnAdd');
btnAdd.forEach(item => {
    item.onclick = async function () {
        exist = getCookie('login')
        if (!exist) {
            window.location.href = '../html/login.html' + '?pathname=' + window.location.href;
        } else {
            await new Promise(function (resolve, reject) {
                let username = exist;
                let goods_id;
                let reg = /id=(.*)/;
                if (reg.test(window.location.search)) {
                    goods_id = reg.exec(window.location.search)[1];
                }
                let xhr = new XMLHttpRequest();
                xhr.open('get', `../api/addCarData.php?username=${username}&goods_id=${goods_id}`);
                xhr.send();
                xhr.onload = function () {
                    res = JSON.parse(xhr.responseText);
                    resolve()
                }
            })
            console.log(res);
            alert('加入购物车成功');
        }
    }
})

//点击立即购买，登录了就跳转到购物车页面
let btnBuy = document.querySelectorAll('.btnBuy');
btnBuy.forEach(item => {
    item.onclick = function () {
        exist = getCookie('login')
        if (!exist) {
            window.location.href = '../html/login.html' + '?pathname=' + window.location.href;
        } else {
            window.location.href = '../html/car.html'
        }
    }
})


//放大镜
/* 
1、创建放大镜盒子放入big中
2、鼠标移动，mask和enlarge的背景图跟着改变
*/
class Enlarge {
    constructor(ele, obj) {
        this.ele = ele;
        this.obj = obj;
        this.init();
    };
    init() {
        this.renderShow();
        this.renderLarge();
        this.setStyle();
        // 给show盒子绑定鼠标移入事件，显示遮罩层和放大镜
        this.show.onmouseover = () => this.mask.style.display = this.enlarge.style.display = 'block';

        //鼠标移出show盒子，隐藏遮罩层和放大镜
        this.show.onmouseout = () => this.mask.style.display = this.enlarge.style.display = 'none';

        //鼠标移动事件
        this.show.onmousemove = this.move;

    };
    renderShow() {
        //渲染show盒子
        this.show = document.createElement('div');
        this.show.classList.add('show');
        this.showImg = document.createElement('img');
        this.showImg.src = `https://muse-img.huabanimg.com/${this.obj.cover[0].key}_/fw/880`;
        this.show.appendChild(this.showImg);
        this.mask = document.createElement('div');
        this.mask.classList.add('mask');
        this.show.appendChild(this.mask);
        this.ele.appendChild(this.show);
    };
    renderLarge() {
        //渲染放大镜盒子
        this.enlarge = document.createElement('div');
        this.enlarge.classList.add('enlarge');
        this.enlarge.style.backgroundImage =`url('https://muse-img.huabanimg.com/${this.obj.cover[0].key}')`;
        this.ele.appendChild(this.enlarge);
    };
    setStyle() {
        // 求遮罩层的大小,因为mask是隐藏的 this.mask.offsetWidth = 0 ,所以要用getStyle来获取宽高，背景图同理
        //获取mask大小 (得到的值有px，所以记得parseInt)
        this.maskW = parseInt(getStyle(this.mask, 'width'));
        this.maskH = parseInt(getStyle(this.mask, 'height'));

        //获取背景图大小 (如果不使用split得到的是7，split之后[0]才是750px)
        this.bgW = parseInt(getStyle(this.enlarge, 'backgroundSize').split(' ')[0]);
        this.bgH = parseInt(getStyle(this.enlarge, 'backgroundSize').split(' ')[1]);
        //show盒子高度。宽度
        this.showW = this.show.offsetWidth;
        this.showH = this.show.offsetHeight;
        //得到large盒子的高度
        this.largeBoxW = parseInt(this.maskW * this.bgW / this.showW);
        this.largeBoxH = parseInt(this.maskH * this.bgH / this.showH);
        //把值赋给盒子
        this.enlarge.style.width = this.largeBoxW + 'px';
        this.enlarge.style.height = this.largeBoxH + 'px';

    };
    move = (e) => {
        let leftBox = document.querySelector('.left')
        // console.log(1);
        //鼠标位置 - box离浏览器边的位置 - 自身宽度/2（在中间）
        //这里不能用this.maskL.
        let maskL = e.pageX - leftBox.offsetLeft - this.maskW / 2;
        //top值多了一个头部的margin
        let maskT = e.pageY - this.ele.offsetTop - this.maskH / 2 -55;
        if (maskL <= 0) {
            maskL = 0;
        }
        if (maskT <= 0) {
            maskT = 0
        }
        if (maskL >= this.showW - this.maskW) {
            maskL = this.showW - this.maskW
        }
        if (maskT >= this.showH - this.maskH) {
            maskT = this.showH - this.maskH
        }
        this.mask.style.left = maskL + 'px';
        this.mask.style.top = maskT + 'px';
        //背景图跟随鼠标的移动而移动
        //背景图移动的left top
        let bgL = parseInt(this.bgW * maskL / this.showW);
        let bgT = parseInt(this.bgH * maskT / this.showH);
        // console.log(bgL,bgT);
        this.enlarge.style.backgroundPosition = `${-bgL}px ${-bgT}px`
    };
}

//weChat
let weChat = document.querySelector('.weChat');
let qrCode = document.querySelector('.qrCode')

weChat.onmouseover = function () {
    qrCode.style.opacity = 1;
}
weChat.onmouseout = function () {
    qrCode.style.opacity = 0;
}