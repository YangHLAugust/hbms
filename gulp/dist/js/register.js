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
let codeBtn = $('#code1');
let number = $('#tele');
let code = $('#code');
let i = $$('#login h6');
// 图标icon
let i1 = $$('#login i');
i1 = [...i1];
//验证码随机数添加
codeBtn.innerHTML = getRandom(1000, 9999);
codeBtn.onclick = function () {
    codeBtn.innerHTML = getRandom(1000, 9999);
}

judge();

function judge() {
    //用户名中英文验证（字符串的长度在7-14之间，一个汉字等于两个字符）
    var reg1 = /^([a-z\u4e00-\u9fa5]+)$/;
    //手机号正则
    var reg2 = /^1[345678]\d{9}$/;
    //密码正则
    var reg3 = /^[0-9a-zA-Z,._]{6,14}$/;
    //用户名判断
    username.onchange = function () {
        var res1 = username.value;
        flag = reg1.test(res1);
        if(flag){
            // 判断：用户名是否存在中文，如果存在就用两个字母替换中文
            res1 = res1.replace(/[\u4e00-\u9fa5]/g, 'aa');
            if (res1.length <= 14 && res1.length >= 4) {
                i[0].style.display = 'none';
                // 图标显示和变色。因为图标自带display:inline-block,所以使用透明度
                i1[0].style.opacity = '1';
                i1[0].style.color = '#2e94f9';
            }else {
                i[0].style.display = 'block';
                i1[0].style.opacity = '0';
            }
        }else{
            i[0].style.display = 'block';
            i1[0].style.opacity = '0';
        }

    }
    //手机号判断
    number.onchange = function () {
        var res2 = number.value;
        if (reg2.test(res2) === false) {
            i[2].style.display = 'block';
            i1[2].style.opacity = '0';
        } else {
            i[2].style.display = 'none';
            i1[2].style.opacity = '1';
            i1[2].style.color = '#2e94f9';
        }
    }
    //密码判断
    password.onchange = function () {
        var res3 = password.value;
        if (reg3.test(res3) === false) {
            i[1].style.display = 'block';
            i1[1].style.opacity = '0';
        } else {
            i[1].style.display = 'none';
            i1[1].style.opacity = '1';
            i1[1].style.color = '#2e94f9';
        }
    }
    //验证码判断
    code.onchange = function () {
        if (code.value !== codeBtn.innerHTML) {
            i[3].style.display = 'block';
            i1[3].style.opacity = '0';
        } else {
            i[3].style.display = 'none';
            i1[3].style.opacity = '1';
            i1[3].style.color = '#2e94f9';
        }
    }
}


// 绑定表单提交事件
form.onsubmit = async function (e) {
    e = e || window.event;
    e.returnValue = false;
    //flag=1表示注册信息无误
    let flag = 1;
    i1.forEach(function (item) {
        //当所有icon都显示才是注册信息无误
        while (item.style.opacity == '0') {
            flag = 0;
            break;
        }
    })
    if (flag) {
        // 发送ajax请求判断是否存在用户名
        let res = await pAjax({
            url: '../api/register.php',
            type: 'post',
            data: {
                username: username.value,
                password: password.value,
                tele: number.value
            }
        })
        console.log(res);
        // 表示注册成功
        if (res.code === 0) {
            alert('用户名已经存在')
            username.value = '';
            i1[0].style.opacity = 0;
        } else {
            alert('注册成功，将跳转页面');
            setTimeout(function () {
                // 还需把url地址切回刚刚来的页面
                let reg = /pathname=(.*)/;
                console.log(reg.test(window.location.search));
                if (reg.test(window.location.search)) {
                    window.location.href = reg.exec(window.location.search)[1];
                } else {
                    window.location.href = `../index.html`;
                }
            }, 1000)
        }
    } else {
        alert('输入有误');
    }

}