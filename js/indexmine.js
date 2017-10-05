/**
 * Created by newuser on 2017/8/25.
 */
window.onload = function () {
    banner();
};

/*轮播图*/
function banner() {
    var header=document.querySelector('.jd_header_box');
    var banner = document.querySelector('.jd_banner');
    /*获取设备宽度*/
    var offsetWidth = banner.offsetWidth;
    /*图片容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*分页容器*/
    var pageBox = banner.querySelector('ul:last-child');
    /*获取分页容器所有的点*/
    var pages = pageBox.querySelectorAll('li');
    //控制settimeOut结束开始
    var control='loop';

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


    //定义当前索引
    var index = 1;
    // var timer = setInterval(function () {
    //     index++;
    //     addTransition();
    //     setTranslateX(-index * offsetWidth);
    //     setPage()
    // }, 2000)

//滑动切换图片
    banner.addEventListener('touchstart',function(e){
        // console.log( 'start', e.targetTouches.pageX );
        var startX=e.touches[0].pageX;
        banner.addEventListener('touchmove',function(e){
            var endX=e.touches[0].pageX;
            banner.addEventListener('touchend',function(){
                setTimeout(function(){
                    chang=endX-startX;
                    if(endX-startX>100000000){
                        index++;
                        console.log(index);
                        addTransition();
                        setTranslateX(-index * offsetWidth);
                        setPage();
                    }else if(endX-startX<100000000){
                        index--;
                        addTransition();
                        setTranslateX(-index * offsetWidth);
                        setPage();
                    }
                },100);
            });
        })
    });
    //点击按钮切换图片
    for(var i=0;i<pages.length;i++){
        pages[i].index=i;
        // var pages[i].className='';
        pages[i].addEventListener('touchstart',function(){
            control='stop';
            // console.log(control);
            for(var i=0;i<pages.length;i++){
                pages[i].className=''
            }
            this.className='now';
            index=this.index+1;
            setTranslateX(-index * offsetWidth);
            setPage();
        });
        pages[i].addEventListener('touchend',function(){
            control='loop';
        })

    }

//图片自动轮播

    function loop (control) {
                setTimeout(function (){
                    if (control==='stop') {
                        console.log('stop');
                        return
                    } else if(control==='loop'){
                        console.log('loop');
                        index++;
                        addTransition();
                        setTranslateX(-index * offsetWidth);
                        setPage();
                        if (index >= 10) {
                            index = 1;
                            removeTransition();
                            setTranslateX(-index * offsetWidth);
                        }
                        loop(control)
                    }

                }, 5000);


    }
    loop(control);

    // transVar.transitionEnd(imageBox, function () {
    //     if (index >= 9) {
    //         index = 1;
    //         removeTransition();
    //         setTranslateX(-index * offsetWidth);
    //     } else if (index <= 0) {
    //         index = 8;
    //         removeTransition();
    //         setTranslateX(-index * offsetWidth);
    //     }
    //
    // });

    function setPage() {
        for (var i = 0; i < pages.length; i++) {
            pages[i].className = '';
        }
        var num = index;
        if (index >= 9) {
            num = 1;
        }
        pages[num - 1].className = 'now'
    }

//拖动页面改变头部样式
    document.onscroll=function(){
        console.log(document.body.scrollTop);
        var scrollTop=document.documentElement.scrollTop|| document.body.scrollTop;
        if (scrollTop>0){
            header.style.transition='all 0.5s';
            header.style.webkitTransition = 'all 0.5s';
            header.style.backgroundColor='red';

        }else{
            header.style.transition='all 0.5s';
            header.style.webkitTransition = 'all 0.5s';
            header.style.backgroundColor='';

        }
    }












}