/**
 * Created by zyy on 2017/3/3.
 */
var EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {  // DOM2
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {  // IE
            element.attachEvent('on' + type, handler);
        } else {  // DOM0
            element['on' + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    hasClass: function (obj, cls) {
        if (!obj.className ) {
            return false;
        }
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    addClass: function (obj, cls) {
        if (!this.hasClass(obj, cls)) {
            // console.log(obj.className)
            obj.className = (obj.className===" " )?cls :obj.className + " " +cls
        }
    },

    removeClass: function (obj, cls) {
        // console.log('tihuanqian' + obj.className)
        if (this.hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
            // console.log('tihuanhou '+obj.className);
        }
    },

    toggleClass: function (obj, cls) {
        if (this.hasClass(obj, cls)) {
            this.removeClass(obj, cls);
        } else {
            this.addClass(obj, cls);
        }
    }
};

function onInput(e) {
    if (e.target.value.trim() != '') {
        var s = document.createElement('script');
        s.src = 'http://www.baidu.com/su?&wd=' + encodeURI(this.value.trim()) + '&p=3&cb=fn';
        document.body.appendChild(s);
    }

}

function fn(data) {
    var ulList = document.getElementsByTagName('ul')[0];
    var newUlist = document.createElement('ul');
    newUlist.dataset.query = data.q;
    newUlist.dataset.listIndex = -1;
    data.s.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item;
        newUlist.appendChild(li);

    })
    document.getElementsByTagName('div')[0].replaceChild(newUlist, ulList);
    ulList = null;//gc垃圾回收

    [].forEach.call(newUlist.childNodes,function (item) {
        EventUtil.addHandler(item, 'mouseenter', function (event) {
            var target = event.target ||event.srcElement;
            if (target.tagName.toLowerCase() === 'li') {

                resetStyle(target);
            }
        });
        EventUtil.addHandler(item, 'mouseout', function (event) {
            var target = event.target ||event.srcElement;
            if (target.tagName.toLowerCase() === 'li') {
                console.log(target)
                resetStyle(target);
                EventUtil.removeClass(item, 'hover');
            }
        });

    });


    EventUtil.addHandler(newUlist, 'click', function (event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        if (target.tagName.toLowerCase() === "li") {
            var wd = target.innerHTML;
            console.log(wd);
            window.open('https://www.baidu.com/s?word=' + wd);
        }

    });

//delete scripts
    var s = document.body.querySelectorAll('script');
    for (var i = 1, len = s.length; i < len; i++) {
        document.body.removeChild(s[i]);
    }

}
//输入框失去焦点触发
function hideList(e) {
    var target = e.target || e.srcElement;
    var tagname = target.tagName.toLowerCase();
    var ulList = document.getElementsByTagName('ul')[0];
    if (tagname !== 'li' && tagname !== 'input') {
        EventUtil.addClass(ulList, 'hide');
    }

}
//获得焦点触发
function showList() {
    var ulList = document.getElementsByTagName('ul')[0];
    EventUtil.removeClass(ulList, 'hide');
    ulList.dataset.listIndex = -1;//设置当前搜索列表的索引，初始化为-1
    console.log(ulList.className)

}

function resetStyle(target) {
    [].forEach.call(target.parentNode.childNodes, function (item) {
        EventUtil.removeClass(item, 'hover');
    });
    EventUtil.addClass(target, 'hover');
}
function onKeydown(e) {
    if (e.keyCode != '38' && e.keyCode != '40') {
        return;
    }
    var ulList = document.getElementsByTagName('ul')[0];
    if (!EventUtil.hasClass(ulList, 'hide')) {
        switch (e.keyCode) {
            case 38:
                if (ulList.dataset.listIndex == -1) {
                    ulList.dataset.listIndex = parseInt(ulList.childNodes.length - 1);
                }
                else {
                    ulList.dataset.listIndex = parseInt(ulList.dataset.listIndex) - 1;
                }
                break;
            case 40:
                if (ulList.dataset.listIndex == parseInt(ulList.childNodes.length) - 1) {
                    ulList.dataset.listIndex = parseInt(-1);
                }
                else {
                    ulList.dataset.listIndex = parseInt(ulList.dataset.listIndex) + 1;
                }
                break;
        }
        var txtInput = document.getElementById('txtInput');
        txtInput.value = (ulList.dataset.listIndex == -1) ? ulList.dataset.query : ulList.childNodes[ulList.dataset.listIndex].innerHTML;
        //重新设置样式
        resetStyle(ulList.childNodes[ulList.dataset.listIndex]);

    }

}

window.onload = function () {
    var txtInput = document.getElementById('txtInput');
    EventUtil.addHandler(txtInput, 'input', onInput);
    EventUtil.addHandler(txtInput, 'focus', showList);
    EventUtil.addHandler(window, 'click', hideList);
    EventUtil.addHandler(window, 'keydown', onKeydown);

}