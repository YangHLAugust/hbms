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
            if (flag) {
                login.classList.remove('loginBtn')
                login.innerHTML = '登录'
                setCookie('login', '', -1);
            } else {
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


    //通过首页传参获取数据渲染页面
    async function getData(n) {
        let reg = /pathname=(.*)/;
        //如果首页传参数过来，则接口不同
        if (reg.test(window.location.search)) {
            await new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest();
                xhr.open('get', `/islist?${reg.exec(window.location.search)[1]}&limit=20&page=${n}`);
                xhr.send();
                xhr.onload = function () {
                    res = JSON.parse(xhr.responseText);
                    resolve()
                }
            })
            renderHTML(res);
            // document.body.scrollTop = 0;
            // console.log(1);
        } else {
            await new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest();
                xhr.open('get', `/islist?limit=20&page=${n}`);
                xhr.send();
                xhr.onload = function () {
                    res = JSON.parse(xhr.responseText);
                    resolve()
                }
            })
            renderHTML(res);
            console.log(res);
            // document.body.scrollTop = 0;

        }

        //跳转到列表页
        goto()
    }
    let ul = document.querySelector('#listMain .ul')

    function renderHTML(data) {
        if (!data[0]) {
            alert('此页无数据喽')
            return;
        }
        let str = ''
        data.forEach(item => {
            str += `<li class="list-item" class=".col-xs-3">
    <div class="row">
        <div>
            <div class="thumbnail">
                <img src="https://muse-img.huabanimg.com/${item.cover[0].key}_/both/280x280"
                    alt="..."  >
                <div class="caption">
                    <h3>${item.name}</h3>
                    <div class="sort">
                        <p>${item.complete_in.number} ${item.complete_in.unit}</p>
                        <p>${item.price?item.price :'价格面议'}</p>
                    </div>                   
                </div>
            </div>
        </div>
    </div>
</li>`
        })
        ul.innerHTML = str;

    }



    //生成Pager，当前页码, 总页数, 回调function
    $.fn.pager = function (page, total, callback) {
        var html = '';
        html += '<a class="first" href="javascript:;">首页</a>';
        html += '<a class="first" href="javascript:;">上一页</a>';
        var start = page - 5 < 0 ? 0 : page - 5;
        var end = page + 5 < total ? page + 5 : total;
        for (var i = start; i < end; i++) {
            html += i == page - 1 ? '<span>' + (i + 1) + '</span>' : '<a href="javascript:;">' + (i + 1) + '</a>';
        }
        html += '<a class="first" href="javascript:;">下一页</a>';
        html += '<a class="last" href="javascript:;">末页</a>';
        $(this).html(html).find('a').click(function () {
            var p = $(this).text();
            if (p == '上一页') p = page == 1 ? 1 : page - 1;
            if (p == '下一页') p = page == total ? total : page + 1;
            if (p == '首页') p = 1;
            if (p == '末页') p = total;
            if (p != page) callback(parseInt(p));
        });
        getData(page);
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    }

    onload = function () {
        //总页码数的确定
        let str = window.location.search;
        var totalN = 1;
        switch (str) {
            case '':
            case '?pathname=category=graphic_design':
                totalN = 100;
                break;
            case '?pathname=category=logo_brand':
                totalN = 75;
                break;
            case '?pathname=category=web_app_ui':
                totalN = 72;
                break;
            case '?pathname=category=paint_illustration':
                totalN = 99;
                break;
            case '?pathname=category=industry_product':
                totalN = 28;
                break;
            case '?pathname=category=custom_design':
            case '?pathname=category=video_animation':
                totalN = 3;
                break;
            case '?pathname=interior_home_design':
                totalN = 18;
                break;

            case '?pathname=category=others':
                totalN = 5;
                break;
            case '?pathname=category=web_app_ui&sub_category=mobile_web_ui':
            case '?pathname=q=吉祥物':
            case '?pathname=category=photography':
                totalN = 10;
                break;
            case '?pathname=category=graphic_design&sub_category=package_graphic':
                totalN = 27;
                break;
            case '?pathname=q=吉祥物':
                totalN = 12;
                break;
            case '?pathname=category=fashion_design':
            case '?pathname=category=costume_design':
            default:
                totalN = 1;
                break;
        }
        //用用回调
        function go(p) {
            $('.pager').pager(p, totalN, go);
        }
        $('.pager').pager(1, totalN, go);
    }


    //通过按钮点击获取数据渲染页面
    //问题：只要重新获取数据，class名添加不上去
    let List = document.querySelectorAll('.ListL');
    List = [...List]
    List.forEach(function (item, index) {
        // List[index].classList.remove('active')
        item.onclick = function () {
            switch (index) {
                case 0:
                    this.href = 'list1.html'
                    break;
                case 1:
                    this.href = 'list1.html' + '?pathname=category=logo_brand';
                    break;
                case 2:
                    this.href = 'list1.html' + '?pathname=category=graphic_design';
                    break;
                case 3:
                    this.href = 'list1.html' + '?pathname=category=web_app_ui';
                    break;
                case 4:
                    this.href = 'list1.html' + '?pathname=category=paint_illustration';
                    break;
                case 5:
                    this.href = 'list1.html' + '?pathname=category=industry_product';
                    break;
                case 6:
                    this.href = 'list1.html' + '?pathname=category=video_animation';
                    break;
                case 7:
                    this.href = 'list1.html' + '?pathname=category=photography';
                    break;
                case 8:
                    this.href = 'list1.html' + '?pathname=category=costume_design';
                    break;
                case 9:
                    this.href = 'list1.html' + '?pathname=category=interior_home_design';
                    break;
                case 10:
                    this.href = 'list1.html' + '?pathname=category=fashion_design';
                    break;
                case 11:
                    this.href = 'list1.html' + '?pathname=category=custom_design';
                    break;
                case 12:
                    this.href = 'list1.html' + '?pathname=category=others';
                    break;
            }
            item.classList.add('active');

        }
    })

    //排序功能的实现(问题:select option不能添加点击事件)
    // let sortF = document.querySelector('#sortF');
    // sortF.onchange =async function () {
    //     await new Promise(function (resolve, reject) {
    //         let xhr = new XMLHttpRequest();
    //         xhr.open('get', `/islist?sort=rating`);
    //         xhr.send();
    //         xhr.onload = function () {
    //             res = JSON.parse(xhr.responseText);
    //             resolve()
    //         }
    //     })
    //     renderHTML(res);
    // }

    //weChat
    let weChat = document.querySelector('.weChat');
    let qrCode = document.querySelector('.qrCode')

    weChat.onmouseover = function () {
        qrCode.style.opacity = 1;
    }
    weChat.onmouseout = function () {
        qrCode.style.opacity = 0;
    }
    //排序功能的实现，通过后端请求数据重新渲染
    let sortF1 = document.querySelector('#sortF1');
    let ej1 = document.querySelector('#sortF1 .ej1');
    let label = document.querySelector('#sortF1 label');
    let a1 = document.querySelectorAll('#sortF1 .ej1>a')
    sortF1.onclick = function (e) {
        e.preventDefault()
        ej1.classList.toggle('appear');
    }
    a1[0].onclick = function () {
        sort('')
        label.innerText = a1[0].innerText;
    };
    a1[1].onclick = function () {
        sort('sort=created_at', '');
        label.innerText = a1[1].innerText;
    }
    a1[2].onclick = function () {
        sort('sort=rating', '');
        label.innerText = a1[2].innerText;
    }
    let sortF2 = document.querySelector('#sortF2');
    let ej2 = document.querySelector('#sortF2 .ej2');
    let a2 = document.querySelectorAll('#sortF2 .ej2>a');
    let label2 = document.querySelector('#sortF2 label');
    sortF2.onclick = function (e) {
        e.preventDefault()
        ej2.classList.toggle('appear');
    }
    a2[0].onclick = function () {
        sort('', '')
        label2.innerText = a2[0].innerText;
    };
    a2[1].onclick = function () {
        sort('', 'complete_in=24%5D');
        label2.innerText = a2[1].innerText;
    }
    a2[2].onclick = function () {
        sort('', 'complete_in=168%5D');
        label2.innerText = a2[2].innerText;

    }
    a2[3].onclick = function () {
        sort('', 'complete_in=720%5D');
        label2.innerText = a2[3].innerText;
    }
    a2[4].onclick = function () {
        sort('', 'complete_in=1440%5D');
        label2.innerText = a2[4].innerText;
    }
    a2[5].onclick = function () {
        sort('', 'complete_in=2160%5D');
        label2.innerText = a2[5].innerText;
    }
    a2[6].onclick = function () {
        sort('', 'complete_in=%282160');
        label2.innerText = a2[6].innerText;
    }
    //排序的数据请求
    async function sort(parameter1, parameter2) {
        await new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('get', `/islist?${parameter1}${parameter1 && parameter2 ? '&':''}${parameter2}`);
            xhr.send();
            xhr.onload = function () {
                res = JSON.parse(xhr.responseText);
                resolve()
            }
        });
        renderHTML(res);
        //排序之后仍可以跳转到列表页
        goto();
    }

    function goto() {
        //跳转到列表页
        let lis = document.querySelectorAll('.listMain .row');
        lis.forEach((item, index) => {
            item.onclick = () => {
                window.location.href = `./details.html?id=${res[index].service_id}`
            }
        })
    }