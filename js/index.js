/**
 * Created by newuser on 2017/8/25.
 */
window.onload = function () {
    banner();
    search();
}

/*搜索栏效果*/
function search() {
    var search = document.querySelector('.jd_header_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    var opacity = 0;

    window.onscroll = function(){
        //页面滑动的高度
        var top = document.body.scrollTop;
        if (top > height*0.6){
            opacity = 0.90;
        }else {
            opacity = (0.90 * (top/height)).toFixed(2);

        }
        search.style.background = 'rgba(220,21,35,'+opacity+')';
    }

}

/*轮播图*/
function banner() {

    var banner = document.querySelector('.jd_banner');
    /*获取设备宽度*/
    var offsetWidth = banner.offsetWidth;
    /*图片容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*分页容器*/
    var pageBox = banner.querySelector('ul:last-child');
    /*获取分页容器所有的点*/
    var pages = pageBox.querySelectorAll('li');

    /*给图片容器添加过渡动画属性*/
    function addTransition() {
        imageBox.style.transition = 'all 0.5s';
        imageBox.style.webkitTransition = 'all 0.5s';
    }

    /*清除图片容器添加过渡动画属性*/
    function removeTransition() {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }

    /*设置X轴定位*/
    function setTranslateX(offsetX) {
        imageBox.style.transform = 'translateX(' + offsetX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + offsetX + 'px)';
    }


    // 定义当前索引
    var index = 1;
    // 自动轮播
    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * offsetWidth);
        //同步设置css
        //底层异步操作
        setPage()
    }, 2000)

    transVar.transitionEnd(imageBox, function () {
        if (index >= 9) {
            index = 1;
            // 清除过渡
            removeTransition();
            //无动画效果的定位到第一张图片
            setTranslateX(-index * offsetWidth);
        } else if (index <= 0) {
            index = 8;
            removeTransition();
            setTranslateX(-index * offsetWidth);
        }

    })
    // 小圆点的跟随
    function setPage() {
        for (var i = 0; i < pages.length; i++) {
            pages[i].className = '';
        }
        var num = index;
        if (index >= 9) {
            num = 1;
        } else if (index <= 0) {
            num = 8;
        }
        pages[num - 1].className = 'now'
    }

    //图片滑动
    var startX = 0; //记录手指刚触摸屏幕时的X坐标
    var moveX = 0; //记录手指进行滑动试的坐标
    var distanceX = 0; //滑动过的距离
    var isMove = false; // 根据滑动距离判断轮播图是否需要移动显示后一张(前一张)图片

    imageBox.addEventListener('touchstart', function (e) {
        // 手机是没有鼠标的 不存在类似mouseenter事件,我们清除计时器,停止广告的自动轮播需要在手指按下时触发
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });

    imageBox.addEventListener('touchmove', function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        /*当前image 便宜量加滑动距离*/
        var translateX = -index * offsetWidth + distanceX;
        isMove = true;
        console.log(distanceX);
        removeTransition();
        setTranslateX(translateX)
    })
    imageBox.addEventListener('touchend', function (e) {
        /*
         滑动不超过一定距离 吸附回去 (左右都一样)
         滑动超过一定距离 滑动到上一页 或下一页
         */
        if (Math.abs(distanceX) > offsetWidth / 3 && isMove) {
            // 滑动超过一定距离
            // 判断往左还是往右
            if (distanceX > 0) { // 左
                index--
            } else {
                index++
            }
        }
        addTransition();
        setTranslateX(-index * offsetWidth);
        //同步小点
        setPage();

        //重置
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;
        //加自动轮播

        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslateX(-index * offsetWidth);
            //同步设置css
            //底层异步操作
            setPage()
        }, 2000)

    })


}