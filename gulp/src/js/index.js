//导航栏下拉菜单显示与否
let xiala = document.querySelector('.dropdown-toggle');
let xianshi = document.querySelector('.dropdown-menu');
xiala.onclick = function () {
    xianshi.classList.toggle('appear');
}
let header = document.querySelector('#header');
let header1 = document.querySelector('.header');
let login = document.querySelector('#login');
let aColor = document.querySelectorAll('.aColor')
aColor = [...aColor];
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
//swiper轮播图
var mySwiper = new Swiper('.banner1', {
    loop: true, // 循环模式选项
    autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    effect: 'fade'
})


//如果有登录，把用户名显示在登录按钮中
let exist = getCookie('login')
if (exist) {
    login.classList.add('loginBtn')
    login.innerHTML = `欢迎,${exist}`;
}
//点击登录按钮
login.onclick = function () {
    exist = getCookie('login')
    if (!exist) {
        window.location.href = 'html/login.html';
    } else {
        login.innerHTML = exist;
        login.classList.add('loginBtn')
        //点击退出登录
        let flag = confirm(`要退出登录吗？`);
        if (flag){
            login.classList.remove('loginBtn')
            setCookie('login', '', -1);
            login.innerHTML = '登录'
           
        }else{
            login.innerHTML = `欢迎,${exist}`;
        }
    }
}


//点击注册按钮
let register = document.querySelector('#register');
register.onclick = function () {
    window.location.href = 'html/register.html'
}


//点击导航栏绘画按钮
// let listImg = document.querySelector('#listImg');
// let listMv = document.querySelector('#listMv')
// let listPlane = document.querySelector('#listPlane')
// listImg.onclick = function (e) {
//     // e.preventDefault();
//     this.href = 'html/list1.html' + '?pathname=category=paint_illustration';
// }
// listMv.onclick = function (e) {
//     // e.preventDefault();
//     this.href = 'html/list1.html' + '?pathname=category=video_animation';
// }
// listPlane.onclick = function (e) {
//     // e.preventDefault();
//     this.href = 'html/list1.html' + '?pathname=category=graphic_design';
// }







//成功项目实例轮播图
var swiper1 = new Swiper('.banner2', {
    slidesPerView: 3, //三个图片
    spaceBetween: 30, //间隔30px
    slidesPerGroup: 3, //三个轮换
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

//轮播图寻找服务按钮
let bannerBtn1 = document.querySelector('.bannerBtn1');
bannerBtn1.onclick = function () {
    window.location.href = 'html/list1.html'
}


// getData()
// //成功项目实例获取数据(问题：轮播图和渲染数据出现冲突)
// async function getData() {
//     await new Promise(function (resolve, reject) {
//         let xhr = new XMLHttpRequest();
//         xhr.open('get', `/isindex`);
//         xhr.send();
//         xhr.onload = function () {
//             res = JSON.parse(xhr.responseText);
//             resolve()
//         }
//     })
//     console.log(res);
//     renderHTML(res);
//     //跳转到列表页
//     // let lis = document.querySelectorAll('.listMain .row');
//     // lis.forEach((item,index)=>{
//     //     item.onclick = ()=>{
//     //         window.location.href = `./details.html?id=${res[index].service_id}`
//     //     }
//     // })
// }
// let swiperDiv= document.querySelector('.banner2 .swiper-wrapper');
// function renderHTML(data) {
//     let str ='';
//     data.forEach(item => {
//         str += `<div class="swiper-slide">
//         <img src="https://muse-img.huabanimg.com/${item.cover.key}_/sq/600"
//             alt="">
//         <p>${item.service.name}</p>
//         <p>${item.service.user.username}</p>
//     </div>`
//     })
//     swiperDiv.innerHTML = str;
// }


//寻找设计师，跳转到相对应的页面，传递的参数是为了请求接口
let List = document.querySelectorAll('.List');
List.forEach(function (item, index) {
    item.onclick = function () {
        // e.preventDefault();
        {
            switch (index) {
                case 0:
                case 12:
                case 24:
                    this.href = 'html/list1.html' + '?pathname=category=paint_illustration';
                    break;
                case 1:
                case 13:
                case 25:
                    this.href = 'html/list1.html' + '?pathname=category=industry_product';
                    break;
                case 2:
                case 14:
                case 26:
                    this.href = 'html/list1.html' + '?pathname=category=web_app_ui';
                    break;
                case 3:
                case 15:
                case 27:
                    this.href = 'html/list1.html' + '?pathname=category=web_app_ui&sub_category=mobile_web_ui';
                    break;
                case 4:
                case 16:
                case 28:
                    this.href = 'html/list1.html' + '?pathname=category=logo_brand';
                    break;
                case 5:
                case 17:
                case 29:
                    this.href = 'html/list1.html' + '?pathname=category=graphic_design';
                    break;
                case 6:
                case 18:
                case 30:
                    this.href = 'html/list1.html' + '?pathname=category=graphic_design&sub_category=package_graphic';
                    break;
                case 7:
                case 19:
                case 31:
                    this.href = 'html/list1.html' + '?pathname=category=logo_brand';
                    break;

                case 8:
                case 20:
                case 32:
                    this.href = 'html/list1.html' + '?pathname=q=活动页面设计';
                    break;
                case 9:
                case 21:
                case 33:
                    this.href = 'html/list1.html' + '?pathname=category=photography';
                    break;
                case 10:
                case 22:
                case 34:
                    this.href = 'html/list1.html' + '?pathname=q=吉祥物';
                    break;
                case 11:
                case 23:
                case 35:
                    this.href = 'html/list1.html' + '?pathname=category=interior_home_design';
                    break;

            }
        }
        2222222
    }
})

//weChat
let weChat = document.querySelector('.weChat');
let qrCode = document.querySelector('.qrCode')

weChat.onmouseover = function () {
    qrCode.style.opacity = 1;
}
weChat.onmouseout = function () {
    qrCode.style.opacity = 0;
}

//需求
let necessary = document.querySelectorAll('.ness');
necessary.forEach(item => {
    item.onclick = () => {
        window.location.href = 'https://muse.huaban.com/requirement';
    }
})
//浏览所有分类
let browse = document.querySelector('.browse');
browse.onclick = function () {
    window.location.href = 'html/list1.html'
}

//轮播图的跳转
//跳转到列表页
goto(1, '1TsPaX3gbWW');
goto(2, '1OtGnqzG4oY');
goto(3, '1RlS74PWosU');
goto(4, '1U6OJCkgPa4');
goto(5, '1T9ojTyTyUs');
goto(6, '1SyVt8CL1Cw');
goto(7, '1TfmKxLwMc8');
goto(8, '1RKgfLKlduO');
goto(9, '1TF2ercAZOM');

function goto(num, string) {
    let goto = document.querySelector(`.project .goto${num}`);
    goto.onclick = () => {
        window.location.href = `html/details.html?id=${string}`
    }
}


//联系客服

let kf = document.querySelector('.kf');
let box = document.querySelector('#box');
kf.onclick = function () {
    box.classList.remove('hidden')
    box.classList.toggle('appear');
}

let arr = ['机器人小羊为您服务', '您的商品会尽快安排发货的噢', '您当前账户总余额为100000000元，当然是假的', '您就是大名鼎鼎的联系客服狂魔吧', '虽然不知道你说什么，爱你。','机器人小羊累了，您还是关闭吧'];
let boxUl = document.querySelector('#boxUl');
let boxEnter = document.querySelector('#boxEnter');
let textarea = document.querySelector('#textarea');
let bContentText = document.querySelector('#box .contentText');
let bClose =document.querySelector('#bClose');
//右上角关闭事件
bClose.onclick = function(){
    box.classList.remove('appear');
    box.classList.add('hidden');
    boxUl.innerHTML = '';
}
//发送按钮点击事件
boxEnter.onclick = function () {
    if(!textarea.value){
        alert('不能发送空的信息噢');
        return
    }
    send();
    require();
    textarea.value = ''; 
};
//按键发送
textarea.onkeydown = function (e) {
    var e = e || window.event;
    if(e.keyCode == 13 && !textarea.value){
        alert('不能发送空的信息噢');
        return
    }
    if (e.keyCode == 13) {
        send();
        require();
        textarea.value = '';
    }
}
//发送的函数
function send() {
    if (textarea.value) {
        var li = document.createElement('li');
        li.classList.add('active');
        li.innerHTML = textarea.value;
        boxUl.appendChild(li);
    } else {
        alert('请输入内容')
    }
}
//回复信息的函数
function require() {
    if (textarea.value) {
        setTimeout(function () {
            var li = document.createElement('li');
            li.classList.add('activeLeft');
            li.innerHTML = arr[parseInt(Math.random() * arr.length)];
            boxUl.appendChild(li);
            //在延时器操控滚动条到底部
            bContentText.scrollTo(0, boxUl.offsetHeight);
        }, 500)
    }

}