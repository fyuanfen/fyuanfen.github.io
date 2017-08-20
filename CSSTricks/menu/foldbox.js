/**
 * Created by zyy on 2017/3/26.
 */
(function(){
    function css(obj,attr,value){if(arguments.length==2){if(attr=='scale'||attr=='rotate'||attr=='rotateX'||attr=='rotateY'||attr=='scaleX'||attr=='scaleY'||attr=='translateY'||attr=='translateX'||attr=='translateZ'){if(!obj.$Transform){obj.$Transform={}}switch(attr){case'scale':case'scaleX':case'scaleY':return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:100;break;case'translateY':case'translateX':case'translateZ':return obj.$Transform[attr]?obj.$Transform[attr]:0;break;default:return obj.$Transform[attr]?obj.$Transform[attr]:0}}var sCur=obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj,false)[attr];if(attr=='opacity'){return Math.round((parseFloat(sCur)*100))}else{return parseInt(sCur)}}else if(arguments.length==3){switch(attr){case'scale':case'scaleX':case'scaleY':case'rotate':case'rotateX':case'rotateY':case'translateY':case'translateX':case'translateZ':setCss3(obj,attr,value);break;case'width':case'height':case'paddingLeft':case'paddingTop':case'paddingRight':case'paddingBottom':value=Math.max(value,0);case'left':case'top':case'marginLeft':case'marginTop':case'marginRight':case'marginBottom':if(typeof value=="string"){obj.style[attr]=value}else{obj.style[attr]=value+'px'}break;case'opacity':obj.style.filter="alpha(opacity:"+value+")";obj.style.opacity=value/100;break;default:obj.style[attr]=value}}return function(attr_in,value_in){css(obj,attr_in,value_in)}}function setCss3(obj,attr,value){var sTr="";var sVal="";var arr=["Webkit","Moz","O","ms",""];if(!obj["$Transform"]){obj["$Transform"]={}}obj["$Transform"][attr]=parseInt(value);for(sTr in obj["$Transform"]){switch(sTr){case'scale':case'scaleX':case'scaleY':sVal+=sTr+"("+(obj["$Transform"][sTr]/100)+") ";break;case'rotate':case'rotateX':case'rotateY':sVal+=sTr+"("+(obj["$Transform"][sTr])+"deg) ";break;case'translateY':case'translateX':case'translateZ':sVal+=sTr+"("+(obj["$Transform"][sTr])+"px) ";break}}for(var i=0;i<arr.length;i++){obj.style[arr[i]+"Transform"]=sVal}}var MIAOV_MOVE_TYPE={BUFFER:1,FLEX:2,FAST:3,SLOW:4,NORMAL:5};function miaovStartMove(obj,oTarget,iType,fnCallBack,fnDuring){var fnMove=null;if(obj.timer){clearInterval(obj.timer)}switch(iType){case MIAOV_MOVE_TYPE.BUFFER:fnMove=miaovDoMoveBuffer;break;case MIAOV_MOVE_TYPE.FLEX:fnMove=miaovDoMoveFlex;break}obj.timer=setInterval(function(){fnMove(obj,oTarget,fnCallBack,fnDuring);var now=(new Date()).getTime();obj.lastMove=now},30);if(!obj.lastMove){obj.lastMove=0}var now=(new Date()).getTime();if(now-obj.lastMove>30){fnMove(obj,oTarget,fnCallBack,fnDuring);var now=(new Date()).getTime();obj.lastMove=now}}function miaovDoMoveBuffer(obj,oTarget,fnCallBack,fnDuring){var bStop=true;var attr='';var speed=0;var cur=0;for(attr in oTarget){oTarget[attr]=parseInt(oTarget[attr]);cur=css(obj,attr);if(oTarget[attr]!=cur){bStop=false;speed=(oTarget[attr]-cur)/5;speed=speed>0?Math.ceil(speed):Math.floor(speed);css(obj,attr,cur+speed)}}if(fnDuring)fnDuring.call(obj);if(bStop){clearInterval(obj.timer);obj.timer=null;if(fnCallBack)fnCallBack.call(obj)}}function miaovDoMoveFlex(obj,oTarget,fnCallBack,fnDuring){var bStop=true;var attr='';var speed=0;var cur=0;for(attr in oTarget){if(!obj.oSpeed)obj.oSpeed={};if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;cur=css(obj,attr);if(Math.abs(oTarget[attr]-cur)>=1||Math.abs(obj.oSpeed[attr])>=1){bStop=false;obj.oSpeed[attr]+=(oTarget[attr]-cur)/5;obj.oSpeed[attr]*=0.75;css(obj,attr,cur+obj.oSpeed[attr])}}if(fnDuring)fnDuring.call(obj);if(bStop){clearInterval(obj.timer);obj.timer=null;if(fnCallBack)fnCallBack.call(obj)}}function stopMove(obj){clearInterval(obj.timer)}function miaovScroll(oWrap,oCentent,oScroll,oBar){var iBarHieght=oWrap.height()/oCentent.height()*oScroll.height();var iMaxHeight=oScroll.height()-iBarHieght;oBar.css("height",iBarHieght+"px");oBar.mousedown(function(ev){var ev=ev||event;var disY=ev.clientY;var disT=$(this).position().top;document.onmousemove=function(ev){var ev=ev||event;var T=disT+(ev.clientY-disY);if(T<0){T=0}else if(T>iMaxHeight){T=iMaxHeight}var iScale=T/iMaxHeight;oCentent.css('top',(oWrap.height()-oCentent.height())*iScale+'px');oBar.css('top',T+'px')};document.onmouseup=function(){document.onmouseup=document.onmousemove=null};return false});oScroll.get(0).onmousewheel=fn1;oWrap.get(0).onmousewheel=fn1;if(oScroll.get(0).addEventListener){oScroll.get(0).addEventListener('DOMMouseScroll',fn1,false);oWrap.get(0).addEventListener('DOMMouseScroll',fn1,false)}function fn1(ev){var ev=ev||event;var iBtn=true;if(ev.wheelDelta){iBtn=ev.wheelDelta>0?true:false}else{iBtn=ev.detail<0?true:false}var T=0;if(iBtn){T=oBar.position().top-10}else{T=oBar.position().top+10}if(T<0){T=0}else if(T>iMaxHeight){T=iMaxHeight}var iScale=T/iMaxHeight;oCentent.css('top',(oWrap.height()-oCentent.height())*iScale+'px');oBar.css('top',T+'px');if(ev.preventDefault){ev.preventDefault()}return false}}var Tween={linear:function(t,b,c,d){return c*t/d+b},easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return-c*(t/=d)*(t-2)+b},easeBoth:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t+b}return-c/2*((--t)*(t-2)-1)+b},easeInStrong:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOutStrong:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b},easeBothStrong:function(t,b,c,d){if((t/=d/2)<1){return c/2*t*t*t*t+b}return-c/2*((t-=2)*t*t*t-2)+b},elasticIn:function(t,b,c,d,a,p){if(t===0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},elasticOut:function(t,b,c,d,a,p){if(t===0){return b}if((t/=d)==1){return b+c}if(!p){p=d*0.3}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},elasticBoth:function(t,b,c,d,a,p){if(t===0){return b}if((t/=d/2)==2){return b+c}if(!p){p=d*(0.3*1.5)}if(!a||a<Math.abs(c)){a=c;var s=p/4}else{var s=p/(2*Math.PI)*Math.asin(c/a)}if(t<1){return-0.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b}return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b},backIn:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158}return c*(t/=d)*t*((s+1)*t-s)+b},backOut:function(t,b,c,d,s){if(typeof s=='undefined'){s=3.70158}return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},backBoth:function(t,b,c,d,s){if(typeof s=='undefined'){s=1.70158}if((t/=d/2)<1){return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b}return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},bounceIn:function(t,b,c,d){return c-Tween['bounceOut'](d-t,0,c,d)+b},bounceOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b}return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b},bounceBoth:function(t,b,c,d){if(t<d/2){return Tween['bounceIn'](t*2,0,c,d)*0.5+b}return Tween['bounceOut'](t*2-d,0,c,d)*0.5+c*0.5+b}};function tweenMove(obj,oTarget,iTime,iType,fnEnd,fnDuring){var fn=Tween[iType];var t=0;var b={};var c={};var d=iTime/24;var MT={};var sAttr="";clearInterval(obj.timer);for(sAttr in oTarget){b[sAttr]=css(obj,sAttr);c[sAttr]=oTarget[sAttr]-b[sAttr];MT[sAttr]=0}if(iTime<30){for(sAttr in oTarget){css(obj,sAttr,oTarget[sAttr])}}else{obj.timer=setInterval(function(){if(t<d){t++;for(sAttr in oTarget){MT[sAttr]=fn(t,b[sAttr],c[sAttr],d);css(obj,sAttr,fn(t,b[sAttr],c[sAttr],d))}}else{for(sAttr in oTarget){css(obj,sAttr,oTarget[sAttr])}clearInterval(obj.timer);if(fnEnd){fnEnd.call(obj)}}if(fnDuring){fnDuring.call(obj,b,MT,t)}},24)}}

    var oBox = document.getElementById('fold_box');
    var fold = document.getElementById('fold');
    var oH2 = fold.getElementsByTagName('h2')[0];
    var div = document.getElementById('paper');
    var aDiv = fold.getElementsByTagName('div');
    var aA = fold.getElementsByTagName('a');
    var aSpan = fold.getElementsByTagName('span');
    var arrA = [
        '<a href="http://weibo.com/miaovclass" target="_blank">妙味 - 新浪微博</a>',
        '<a href="http://www.miaov.com/2013/download/video_download.html" target="_blank">妙味 - 视频教程</a>',
        '<a href="http://bbs.miaov.com/forum.php?mod=viewthread&tid=9300" target="_blank">妙味 - JQ集训营</a>',
        '<a href="http://bbs.miaov.com/forum.php?mod=viewthread&tid=9638" target="_blank">JS远程 - JS周末班</a>',
        '<a href="http://bbs.miaov.com/forum.php?mod=forumdisplay&fid=19">妙味 - 学员作品</a>',
        '<a href="javascript:;">QQ：2078817153</a>',
        '<a href="javascript:;">QQ：2264453929</a>',
        '<a href="javascript:;">QQ：1146531423</a>',
        '<a href="javascript:;">电话:18810588941</a>'
    ];
    var oTime = null;
    var oTimer = null;
    var iNow = 0;

    // 生成多组DIV
    for(var i=0; i<arrA.length; i++){
        div.innerHTML = arrA[i]+'<span></span><div></div>';
        div = div.getElementsByTagName('div')[0];

        setY(aA[i], i%2==0?'bottom':'top');
        setY(aSpan[i], i%2==0?'bottom':'top');
        setTranslateZ(aSpan[i], i%2==0?1:-1);

        i%2==0&&setRotateX(aA[i], 180);
    }
    for(var i=0; i<aDiv.length; i++){
        aDiv[i].className = 'T3D';
        setOrigin(aDiv[i], i%2==0?'bottom':'top');
    }

    function setOrigin(obj, val){
        obj.style.msTransformOrigin = val;
        obj.style.MozTransformOrigin = val;
        obj.style.WebkitTransformOrigin = val;
        obj.style.OTransformOrigin = val;
        obj.style.transformOrigin = val;
    }

    function setRotateX(obj, val){
        obj.style.msTransform = 'rotateX('+val+'deg)';
        obj.style.MozTransform = 'rotateX('+val+'deg)';
        obj.style.WebkitTransform = 'rotateX('+val+'deg)';
        obj.style.OTransform = 'rotateX('+val+'deg)';
        obj.style.transform = 'rotateX('+val+'deg)';
    }
    function setY(obj, attr){
        obj.style[attr]=0;
    }
    function setTranslateZ(obj, val){
        obj.style.msTransform = 'translateZ('+val+'px)';
        obj.style.MozTransform = 'translateZ('+val+'px)';
        obj.style.WebkitTransform = 'translateZ('+val+'px)';
        obj.style.OTransform = 'translateZ('+val+'px)';
        obj.style.transform = 'translateZ('+val+'px)';
    }

    oBox.onmousemove = function (ev){
        var ev = ev || window.event;
        var pos = ev.clientX-this.offsetLeft;
        var deg = 25;
        var degTarget = 0;

        clearTimeout(oBox.timer);

        if(ev.clientX < this.offsetLeft+this.offsetWidth/2){
            degTarget =(deg-Math.floor(pos/100*deg))*-1;
        }else{
            degTarget = (deg-Math.floor((this.offsetWidth-pos)/100*deg));
        }
        fold.style.msTransform = 'rotateY('+degTarget+'deg)';
        fold.style.MozTransform = 'rotateY('+degTarget+'deg)';
        fold.style.WebkitTransform = 'rotateY('+degTarget+'deg)';
        fold.style.oTransform = 'rotateY('+degTarget+'deg)';
        fold.style.Transform = 'rotateY('+degTarget+'deg)';
    };
    oBox.onmouseout = function (){
        oBox.timer = setTimeout(function(){
            fold.style.msTransform = 'rotateY('+0+'deg)';
            fold.style.MozTransform = 'rotateY('+0+'deg)';
            fold.style.WebkitTransform = 'rotateY('+0+'deg)';
            fold.style.oTransform = 'rotateY('+0+'deg)';
            fold.style.Transform = 'rotateY('+0+'deg)';
        }, 1500);
    };

    fold.onmouseover = function (){
        clearTimeout(oTime);
        setElegant(180);
    };

    fold.onmouseout = function (){
        oTime = setTimeout(function(){
            setElegant(0);
        }, 300);
    };

    function setElegant(target){
        var dir = target==180?1:-1;
        clearInterval(oTimer);
        oTimer = setInterval(function(){
            setRotate(aDiv[iNow], target);
            iNow+=dir;
            if(iNow == aDiv.length && dir == 1 || iNow == -1 && dir == -1){
                clearInterval(oTimer);
                iNow = dir==1?aDiv.length-1:0;
            }
        }, 140);
    }

    function setRotate(obj, target, endFn){

        setTimeout(function(){
            if(obj.getElementsByTagName('span')[0])
                obj.getElementsByTagName('span')[0].style.background = target==180?'#fff':'#dfdfdf';
        }, 100);

        var speed = 0;
        var num = css(obj, 'rotateX');
        clearInterval(obj.timer);
        obj.timer=setInterval(function (){
            speed+=(target-css(obj, 'rotateX'))/16;
            speed*=0.8;
            num += speed;
            if(num<0)num=0;
            css(obj, 'rotateX', num);

            if(speed<1&&Math.abs(target-num)<1){
                clearInterval(obj.timer);
                css(obj, 'rotateX', target);
                endFn&&endFn.call(obj);
            }
        }, 30);
    }

})();