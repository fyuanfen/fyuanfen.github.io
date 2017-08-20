/**
 * Created by zyy on 2017/5/8.
 */
/**
 * @author yuriel
 * @name  cssControl 1.0.0
 * @description 原生 JS 实现 CSS 样式的 get 与 set，兼容主流浏览器与 IE678
 * -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 * 1、使用原生 JS 实现 CSS 样式的 get 与 set
 *
 * 2、初始化方法，
 *  1）提供 var cc = new CC() 构造函数，构建 cssControl 实例，然后 cc.getStyle(elem, style) 调用
 *  2）也可以不使用 new 运算符将 cssControl 实例化 var cc = CC(); 然后 cc.getStyle(elem, style) 调用
 *  3）或者直接 CC().getStyle(elem, style) 进行调用
 *
 * 3、核心方法
 *  getStyle(elem, style) -- 用于获取结点为 elem 的 style 样式
 *  setStyle(elem, style, value) -- 用于设置结点为 elem 的 style 样式为 value
 *
 */
;
(function(window, undefined) {

    var
        doc = document,
        win = window,
        cssControl = function() {
            return new cssControl.prototype.init();
        }

    // IE 下获取透明度
    function getIEOpacity(elem) {
        var filter = null;

        // 早期的 IE 中要设置透明度有两个方法：
        // 1、alpha(opacity=0)
        // 2、filter:progid:DXImageTransform.Microsoft.gradient( GradientType= 0 , startColorstr = ‘#ccccc’, endColorstr = ‘#ddddd’ );
        // 利用正则匹配，注意 ?: 的用法
        filter = elem.style.filter.match(/(?:progid:[\w.]+.)?alpha\((?:[^,]+,)?\s*opacity=(\d+)\s*\)/i) || elem.style.filter.match(/alpha\(opacity=(.*)\)/i);

        if (filter) {
            var value = parseFloat(filter);
            if (!isNaN(value)) {
                // 转化为标准结果
                return value ? value / 100 : 0;
            }
        }
        // 默认返回 1
        return 1;
    }

    // IE 下将 CSS 命名转换为驼峰表示法
    // background-color --> backgroundColor
    // 利用正则处理一下就可以了
    function camelize(attr) {
        // /\-(\w)/g 正则内的 (\w) 是一个捕获，对应后面 function 的 letter
        // 意思是将 匹配到的 -x 结构的 x 转换为大写的 X (x 这里代表任意字母)
        return attr.replace(/\-(\w)/g, function(all, letter) {
            return letter.toUpperCase();
        });
    }

    cssControl.prototype = {
        init: function() {
            return this;
        },
        // 获取样式
        getStyle: function(elem, style) {
            // 主流浏览器
            if (win.getComputedStyle) {
                // 获取 float 属性使用 cssFloat
                // 测试最新版的浏览器，使用 cssFloat 已经获取不到 float 了，直接使用下面的通用语法
                // if(style === "float"){
                // 	return win.getComputedStyle(elem, null).getPropertyValue("cssFloat");
                // }
                return win.getComputedStyle(elem, null).getPropertyValue(style);

                // 不支持 getComputedStyle
            } else {
                // IE 下获取透明度
                if (style == "opacity") {
                    getIEOpacity(elem);

                    // IE687 下获取浮动使用 styleFloat
                } else if (style == "float") {
                    return elem.currentStyle.getAttribute("styleFloat");

                    // 未设置元素的高宽，获取的值是 auto
                    // 这里要获取精确的 px 值，使用 elem.getBoundingClientRect 进行 hack
                    // 跨浏览器的方法 getBoundingClientRect 可以获得元素四个点相对于文档视图左上角的值 top、left、bottom、right ，通过计算就可以容易地获得准确的元素大小
                } else if ((style == "width" || style == "height") && (elem.currentStyle[style] == "auto")) {
                    var clientRect = elem.getBoundingClientRect();

                    // 加上 px ，转化为标准输出
                    return (style == "width" ? clientRect.right - clientRect.left : clientRect.bottom - clientRect.top) + "px";
                }

                // 其他样式，无需特殊处理
                return elem.currentStyle.getAttribute(camelize(style));
            }
        },
        // 设置样式
        setStyle: function(elem, style, value) {
            // 如果是设置 opacity ，需要特殊处理
            if (style == "opacity") {

                //IE7 bug:filter 滤镜要求 hasLayout=true 方可执行（否则没有效果）
                if (!elem.currentStyle || !elem.currentStyle.hasLayout) {
                    // 设置 hasLayout=true 的一种方法
                    elem.style.zoom = 1;
                }
                // IE678 设置透明度叫 filter ，不是 opacity
                style = "filter";

                // !!转换为 boolean 类型进行判断
                if (!!window.XDomainRequest) {
                    value = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=" + value * 100 + ")";
                } else {
                    value = "alpha(opacity=" + value * 100 + ")"
                }
            }

            // 通用方法
            elem.style.cssText += ';' + (style + ":" + value);
        }
    }

    cssControl.prototype.init.prototype = cssControl.prototype;

    // 暴露接口
    window.CC = cssControl;

})(window);