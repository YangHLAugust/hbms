//导入gulp模块
const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
const babel = require('gulp-babel')
const gulpuglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const gulpclean = require('gulp-clean')
const webserver = require('gulp-webserver')

//css压缩函数
function css() {
    return gulp.src('./src/css/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}
//js压缩函数
/* 
    浏览器上其实不识别ES6 语法，gulp也不识别ES6语法
    当你的js文件中有ES6语法，这个压缩的时候，不会把ES6压缩进去
    在压缩js之前，我们应该把ES6转化ES5
    把ES6转化为ES5的插件：
        gulp_bebal
    压缩js的时候，一定要先转化为ES5 然后在进行压缩
    把压缩的代码放在执行的文件
*/
function js() {
    return gulp
    .src('./src/js/**')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulpuglify())
    .pipe(gulp.dest('./dist/js'))
}

function html(){
    return gulp
    .src('./src/html/**')
    .pipe(htmlmin({
        collapseWhitespace: true, // 表示去除空格
            removeEmptyAttributes: true, // 移出空的属性
            minifyCSS: true, // 压缩 style 标签
            minifyJS: true, // 压缩 script 标签
    })).pipe(gulp.dest('./dist/html'))
}

// 创建任务把静态资源放到dist,静态不需要压缩，直接复制放到dist
function image() {
    return gulp
        .src('./src/image/**')
        .pipe(gulp.dest('./dist/image'))
}

function api() {
    return gulp
        .src('./src/api/**')
        .pipe(gulp.dest('./dist/api'))
}

//清除缓存。当要更新压缩包时，可能因为缓存问题而未压缩完全，所以需要清除缓存
function clean(){
    return gulp.src(['./dist/**']).pipe(gulpclean())
}

// 创建一个webserver的任务（当压缩完成自动打开我们执行一个页面）
function server() {
    return gulp
        .src('./dist')
        .pipe(webserver({
            host: "localhost",
            port: 3000, //一般gulp的端口都是3000
            open: './html/index.html',
            livereload: true, // 浏览器自动刷新
        }))
}


// 创建一个 实时监听文件变化的任务
function watch() {
    // 监听src文件夹下面的文件如果变化的时候，那么就重新压缩
    // gulp.watch('你要监听的文件',你要执行的任务)
    gulp.watch('./src/html/**', html);
    gulp.watch('./src/css/**', css);
    gulp.watch('./src/js/**', js);
    gulp.watch('./src/data/**', image);
    gulp.watch('./src/static/**', api)
}

//导出函数
exports.css = css;
exports.js = js;
exports.html = html;
exports.image = image;
exports.api = api;
exports.watch = watch;
exports.server = server;
exports.clean = clean;
// 总任务。当执行build的时候，就会执行所有的任务
exports.build = gulp.series(clean, gulp.parallel(css, js, html, api, image), server, watch);