
# 仿百度搜索框下拉效果

 ![Untitled Image](http://images.zyy1217.com/4pQTj)
 
 这是2017腾讯前端实习生一面的笔试题，当时虽然磕磕巴巴的做了出来，可是踩了很多坑。
 比如直接使用js拼接html字符串，会导致xss漏洞。比如使用了with语法。比如没有实现模块化和复用思想，没有考虑兼容性等等。所以面试结束后，又心平气和的静下心来，重新写了个比较完备的demo，具体样式效果如下：

## [在线演示](http://www.zyy1217.com/project/searchlist/)
 
今天就来简单讲解下如何做这样一个类似百度搜索框的下拉效果。

# 1、页面部分

首先你得要有个输入框，这里我用了 <input type='text' /> 控件，其次当用户在输入框中输入内容后，下拉效果随即出现。
至于下拉框我本来使用的是select, 经过腾讯面试官litten的指点，改成了ul和li，这样就可以自定义样式，开放性更好。li元素是js动态生成的，html 和 css 部分相对来说还是比较简单的，直接看代码。

```html
<div>
<input id="txtInput" type="text"/>
<ul id="list">
</ul>
</div>
```

# 2、Javascript 部分之数据的获取

很显然，demo 的核心是数据的获取，也就是说当用户输入一些词汇的时候，你怎么去找到那些联想词。在之前，我一直以为百度首页是用 ajax 去调用接口的，其实不然，原来是 jsonp。其实也很好理解，很多网址导航网站或者个人网站都有百度搜索，如果是用 ajax 去调用的，除非设置了 CORS，否则根据同源策略就取不到数据了嘛！所以 jsonp 还是个很好的办法。

我们可以打开 [2345网址导航](https://www.2345.com/) 的首页，调出 chrome 下的 network 面板，在网页的百度搜索框处随便输入一些字符（比如s），这时就会在 network 面板下发现一些 http 请求，其中我们要的就是以下这个了：
![Untitled Image](http://images.zyy1217.com/YRlAn)

看该请求的 url，很明显是个 jsonp 获取数据的格式，cb 后面跟着的就是 callback 的函数名嘛，你也可以把这个 url 在浏览器中打开，返回的是一个包裹着 json 数据的函数执行。

既然2345网址导航能用百度的接口，当然我们自己写的网页也可以啦。我们可以动态插入一个 script 标签，然后把 src 属性指向该接口的 url（url中需要约定一个回调函数的函数名），然后再写个函数来处理数据，比如这样：
```javascript
function onInput(event) {
    if (event.target.value.trim() !=='') {
        var s = document.createElement('script');
        s.src = 'http://www.baidu.com/su?&wd=' + encodeURI(this.value.trim()) + '&p=3&cb=fn';
        document.body.appendChild(s);
    }
    
}

function fn(data) {
    var ulList = document.getElementsByTagName('ul')[0];
    var newUlist = document.createElement('ul');
    data.s.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item;
        newUlist.appendChild(li);
    })
    document.getElementsByTagName('div')[0].replaceChild(newUlist, ulList);
    EventUtil.addHandler(newUlist,'click',function (event) {
        var e = event ||window.event;
        var target = e.target || e.srcElement;
        var wd = target.innerHTML;
        window.open('https://www.baidu.com/s?word='+ wd);
    })


//delete scripts
    var s = document.body.querySelectorAll('script');
    for (
    var i = 1, len = s.length; i < len; i++) {
        document.body.removeChild(s[i]);
    }
    
}
```
其中onInput是input输入框的监听处理事件，动态添加了一个script脚本。
fn函数则负责处理返回的json数据，动态生成li元素。

这里注意几点：

1. appenChild是dom操作，每次执行都要进行页面重绘。为了提高性能，我改为在js中直接创建一个ul元素，将多个li元素添加到新的ul中，然后执行一次替换dom节点的操作，这样可以大大提高性能。
2. 老的ul节点记得要赋为空哦，避免内存泄漏。
3. 注意执行完 fn 函数后，也就是说我们已经处理完了得到的数据（数据已经展示在了 table 中），那么就可以把这个动态插入的脚本删掉了（delete scripts）。
4. 使用事件代理，在ul中绑定click事件，免去绑定多个监听事件。同时，通过事件冒泡获得触发事件的li元素内容。

# 3、Javascript 部分之其他逻辑处理

解决了这个最重要的环节，其他的就是一些细节问题了。

### 1. 比如说这里我是监听了输入框的 oninput 事件,
本来我采用的是监听keyup事件，但考虑到当点击键盘上下键时，文本输入框会实时显示选中的li元素。
这样输入框的内容每次更改时都会生成一个查询脚本，每次点击都会生成不同的list元素，违背了初衷。
因此我选择监听oninput事件。

　　oninput事件是IE之外的大多数浏览器支持的事件，在value改变时实时触发，但是通过js改变value时不会触发；也就是说

　　1. 当脚本中改变value时，不会触发；

　　2. 从浏览器的自动下拉提示中选取时，不会触发；
符合我们的需求，就是不能兼容ie蛮头疼的，暂时还没解决。

### 2. 使用dataset记录列表索引，实现键盘上下键选择列表元素。
因为考虑到程序的开放性，可以自定义样式，我使用的是ul和li实现搜索列表，但是就没办法像select标签一样获得index值了。我采用的方式是使用dataset，设置一个listIndex属性记录当前列表的索引。当按上下键时，实时更新选中列表的文本到输入框中。并设置query属性记录我们原本搜索的内容。

同时，通过js动态添加class，实现list的hover样式改变。

### 3. 绑定输入框focus和失去焦点事件
文本输入框获得焦点时，js动态添加类，显示下拉搜索框，并重置当前listIndex索引。
**失去焦点时，下拉搜索列表隐藏。我一开始是绑定了输入框的onblur事件，在失去焦点时隐藏列表。但是这么做存在一个很大的问题，当我用鼠标点击搜索列表的元素时，首先会触发blur事件，隐藏列表，因此我永远无法点到列表元素，也就没办法实现跳转搜索页面。**
因此，我改为绑定window的onclick事件，如果触发点击事件的元素不是list和输入框，就隐藏列表。

### 4. 绑定鼠标事件
使用mouseenter实现鼠标悬停搜索下拉框的样式特效。





