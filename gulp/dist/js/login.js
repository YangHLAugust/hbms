var mySwiper = new Swiper('.swiper-container', {
    loop: true, // 循环模式选项
    autoplay: {
        delay: 5000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    effect: 'fade'
})


let form = $('form');
let username = $('#username');
let password = $('#password');

// 绑定表单提交事件
form.onsubmit = async function (e) {
    e = e || window.event;
    e.returnValue = false;
    // 发送ajax请求判断是否登录成功
    let res = await pAjax({
        url: '../api/login.php',
        type: 'post',
        data: {
            username: username.value,
            password: password.value
        }
    })
    console.log(res);
    if (res.code === 1) {
        // 表示登录成功
        // 把当前的用户名 存储的cookie中
        setCookie('login', username.value, 7 * 24 * 60 * 60)
        // 还需把url地址切回刚刚来的页面
        let reg = /pathname=(.*)/;
        if (reg.test(window.location.search)) {
            window.location.href = reg.exec(window.location.search)[1];
        } else {
            window.location.href = `../index.html`;
        }
    }else{
        alert('账号或密码不正确或用户不存在')
    }
}

let gotoR = $('.haveNone .gotoR');
gotoR.onclick = function(){
    window.location.href = `../html/register.html?pathname=${window.location.href}`
}