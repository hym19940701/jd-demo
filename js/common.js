/**
 * Created by newuser on 2017/8/25.
 */
window.transVar = {};
//监听css3过渡动画的结束事件
transVar.transitionEnd = function(obj,callback){
    if (typeof  obj == 'object'){
        obj.addEventListener('webkitTransitionEnd',function(){
            callback && callback();
        })
        obj.addEventListener('transitionEnd',function(){
            callback && callback();
        })
    }
}