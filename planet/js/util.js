/**
 * Created by zyy on 2017/1/7.
 */

var EventHandler = {
    addEventHandler: function (ele, event, hanlder) {
        if (ele.addEventListener) {
            ele.addEventListener(event, hanlder, false);
        } else if (ele.attachEvent) {
            ele.attachEvent("on" + event, hanlder);
        } else {
            ele["on" + event] = hanlder;
        }
    },
    getCharCode: function (event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },

    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    hasClass: function (element, className) {
        var classNames = element.className;
        if (!classNames) {
            return false;
        }
        classNames = classNames.split(/\s+/);
        for (var i = 0, len = classNames.length; i < len; i++) {
            if (classNames[i] === className) {
                return true;
            }
        }
        return false;
    },

    addClass: function (element, className) {
        if (!this.hasClass(element, className)) {
            element.className = element.className ? [element.className, className].join(' ') : className;
        }
    },

    removeClass: function (element, className) {
        if (className && this.hasClass(element, className)) {
            var classNames = element.className.split(/\s+/);
            for (var i = 0, len = classNames.length; i < len; i++) {
                if (classNames[i] === className) {
                    classNames.splice(i, 1);
                    break;
                }
            }
            element.className = classNames.join(' ');
        }
    }

}
