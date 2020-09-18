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

getData();
//获取此用户的数据
async function getData() {
    let exist = getCookie('login');
    await new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', `../api/getCarData.php?username=${exist}`);
        xhr.send();
        xhr.onload = function () {
            res = JSON.parse(xhr.responseText);
            resolve()
        }
    });
    if (!res[0]) {
        renderHTML(res);
        return;
    }
    //数组要定义在外面，否则会一直被覆盖，localStorage也存不上去
    var arr = new Array()
    //拿到goods_id(请求花瓣美思数据需要的参数)再向花瓣接口请求数据
    res.forEach(item => {
        getCarData();
        async function getCarData() {
            await new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest();
                xhr.open('get', `/isdetail/${item.goods_id}`);
                xhr.send();
                xhr.onload = function () {
                    res1 = JSON.parse(xhr.responseText);
                    resolve()
                }
            });
            //因为后端传过来的数据样式比较多，所以要判断到底能不能拿到价格，如果不能就定价为10000
            let isPrice = 0;
            if (res1.price) {
                isPrice = res1.price
            } else if (res1.extra.urgent) {
                isPrice = res1.extra.urgent.price
            } else {
                isPrice = 10000;
            }
            var obj = {
                goods_name: res1.name,
                price: isPrice,
                unit: res1.unit,
                username: res1.username || res1.user.username,
                url: `https://muse-img.huabanimg.com/${res1.cover[0].key}_/both/130x130`,
                is_select: "0",
                goods_num: item.goods_num,
                goods_id: item.goods_id
            }
            arr.push(obj);
            localStorage.setItem('carData', JSON.stringify(arr));
            renderHTML(arr);
        }
    })

}


function renderHTML(data) {
    let box = document.querySelector('.product');
    let str = '';
    // console.log(qtyAddPrice(data).qty,qtyAddPrice(data));
    if (!data[0]) {
        str = `<div class="isNull">
        <div class="panel panel-default">
            <div class="panel-heading">购物车没有商品噢</div>
            <div class="panel-body">
             <a href="../html/list1.html"><button class="btn">到列表页看看吧</button></a>
            </div>
          </div>
    </div>`
        box.innerHTML = str;
        return;
    }
    let allChecked = data.every(item => {
        return item.is_select == 1;
    })
    str = `<div class="isExist">
    <div class="header">
        <div class="div1"><input type="checkbox" id="carBigC" ${allChecked ? 'checked':''}><span>&ensp;全选</span></div>
        <div><span>商品种类：</span><span>${data.length}</span></div>
        <div><span>所选商品数量：</span><span id="qty">${qtyAddPrice(data).qty}</span></div>
        <div><span>所选商品价格：￥</span><span id="allPrice">${qtyAddPrice(data).allPrice}</span></div>
        <div><button class="btn btn-warning btn-xs total" id="total">结算</button><button
                class="btn btn-danger btn-xs clear" style="margin-left: 10px;" id="clear">清空购物车</button></div>
    </div>
</div>
<div class="body">`

    data.forEach(item => {
        let oneP = item.price * item.goods_num;
        str += `<div class="media">
    <div class="media-left">
        <input type="checkbox" id="checkB" data_id="${item.goods_id}" ${item.is_select == 1? 'checked':''}>
        <a href="#">
            <img class="media-object"
                src="${item.url}"
                alt="...">
        </a>
    </div>
    <div class="media-body">
        <h4 class="media-heading">${item.goods_name}<span class="priceBox">￥<span id="price">${oneP}</span></span>
        </h4>
        <p class="p1">￥<span class="price">${item.price}</span>/<span class="unit">${item.unit}</span></p>
        <p class="p2">服务方:<span class="username">${item.username}</span></p>
        <div class="carBtn">
            <button class="btn btn-danger " id="delete" data_id ="${item.goods_id}">删除商品</button>
            <div class="btn-group" role="group" aria-label="..." data_id ="${item.goods_id}">
                <button type="button" class="btn btn-default" id="subtract">-</button>
                <button type="button" class="btn btn-default">${item.goods_num}</button>
                <button type="button" class="btn btn-default" id="add">+</button>
            </div>
        </div>
    </div>
</div>`
    })
    str += `</div>
</div>`
    box.innerHTML = str;
}


let box = document.querySelector('.product');
//事件委托
box.onclick = function (e) {
    e = e || window.event;
    let t = e.target;
    let goods_id, goods_num;
    switch (t.id) {
        //加(前一个元素的内容改变，重要的是改变数据库和本地储存的值)
        case 'add':
            goods_id = t.parentNode.getAttribute('data_id');
            goods_num = t.previousElementSibling.innerHTML * 1 + 1;
            changeQty(exist, goods_id, goods_num);
            break;
            //减
        case 'subtract':
            goods_id = t.parentNode.getAttribute('data_id');
            goods_num = t.nextElementSibling.innerHTML * 1 - 1;
            if (goods_num <= 1) {
                goods_num = 1;
            }
            changeQty(exist, goods_id, goods_num);
            break;
            //单选
        case 'checkB':
            let id = t.getAttribute('data_id');
            //换为JS数据不要忘记
            let carData = JSON.parse(localStorage.getItem('carData'));
            carData.forEach(item => {
                if (item.goods_id == id) {
                    item.is_select = t.checked ? 1 : 0;
                }
            });
            renderHTML(carData);
            //换为json数据
            localStorage.setItem('carData', JSON.stringify(carData));
            break;
            //全选
        case 'carBigC':
            let carData1 = JSON.parse(localStorage.getItem('carData'));
            carData1.forEach(item => {
                item.is_select = t.checked ? 1 : 0;
            });
            renderHTML(carData1);
            localStorage.setItem('carData', JSON.stringify(carData1));
            break;
            //删除
        case 'delete':
            let id1 = t.getAttribute('data_id');
            removeData(id1, exist);
            break;
            //结算
        case 'total':
            let carData2 = JSON.parse(localStorage.getItem('carData'));
            if (!qtyAddPrice(carData2).allPrice) {
                alert('您没有选中商品噢')
            } else {
                alert(`您已经成功支付${qtyAddPrice(carData2).allPrice}元`);
                settleAccount(carData2);
            }
            break;
            //清空
        case 'clear':
            clearData(exist);
            break;

    }
}


async function changeQty(name, id, num) {
    //改变数据库的数据
    await new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', `../api/updCarData.php?username=${name}&goods_id=${id}&goods_num=${num}`);
        xhr.send();
        xhr.onload = function () {
            res1 = JSON.parse(xhr.responseText);
            resolve()
        }
    });
    //改变本地存储数据
    let carData = JSON.parse(localStorage.getItem('carData'));
    carData.forEach(item => {
        if (item.goods_id == id) {
            item.goods_num = num;
        }
    });
    renderHTML(carData);
    localStorage.setItem('carData', JSON.stringify(carData));
}


async function removeData(id, name) {
    await new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', `../api/removeCarData.php?username=${name}&goods_id=${id}`);
        xhr.send();
        xhr.onload = function () {
            // let res = JSON.parse(xhr.responseText);
            // console.log(res);
            resolve()
        };
    });
    let carData = JSON.parse(localStorage.getItem('carData'));
    //因为localStorage只能删除key所以不能用这种方法
    // carData.forEach(item=>{
    //     if(item.goods_id==id && item.username == name){
    //     }
    // })
    carData = carData.filter(item => {
        return item.goods_id != id;
    });
    console.log(carData);
    renderHTML(carData);
    localStorage.setItem('carData', JSON.stringify(carData));
}

//所选商品数量和商品价格
function qtyAddPrice(data) {
    data = data.filter(item => {
        return item.is_select == 1;
    })
    obj = {
        qty: 0,
        allPrice: 0
    }
    data.forEach(item1 => {
        obj.qty += item1.goods_num * 1;
        obj.allPrice += item1.price * item1.goods_num;

    })
    return obj;
}

async function clearData(name) {
    await new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', `../api/clearCarData.php?username=${name}`);
        xhr.send();
        xhr.onload = function () {
            resolve()
        }
    });
    localStorage.removeItem('carData');
    renderHTML([])
}

function settleAccount(data) {
    //先删除数据库中is_select为1的数据，再把is_select不为1的给到localStorage
    data = data.filter(item => {
        return item.is_select == 1;
    });
    data.forEach(async item1 => {
        await new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('get', `../api/removeCarData.php?username=${exist}&goods_id=${item1.goods_id}`);
            xhr.send();
            xhr.onload = function () {
                resolve()
            };
        });
    })
    let data1 = JSON.parse(localStorage.getItem('carData'));
    data1 = data1.filter(item2 => {
        return item2.is_select != 1;
    });
    renderHTML(data1);
    localStorage.setItem('carData', JSON.stringify(data1));
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