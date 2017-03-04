/**
 * Created by zyy on 2017/1/2.
 */


/**
tag和hobby都需要进行以下步骤
1。初始化
2。获取文本数据
3。 验证数据是否有效
4。 显示数据
5。 添加显示标签的事件处理程序
 */

//Add Event
function addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}

window.onload=function () {
    /**
     * @param {String} -input 输入框的id
     * @param {String} -output 输出框的class
     * @param {String} -button 按钮的id，可选，如果不选则默认触发键盘事件
     */
    //createTag获得的是立即执行函数的返回值，_tag构造函数
    var createTag = (function() {

        //构造函数
        function _tag(input,output,button) {
            this.data =[];

            //公有属性
            this.input = document.getElementById(input);
            this.output = document.getElementsByClassName(output)[0];
            this.outputList = document.querySelector('.' + output + ' div');
            this.button = document.getElementById(button);

            this.getData = function () {
                var value = '';
                switch (input){
                    case 'tagInput':
                        value = this.input.value.match(/([^,\， ]*)/)[0];
                        break;
                    case 'hobbyInput':
                        //回车13，逗号188（全角半角均可），顿号191，空格（全角半角、Tab等均可）
                        value = this.input.value.split(/,|，|、|\s|\n|\r|\t/);
                        break;
                }

                return value;

            };

            this.render = function () {
                var text= '';
                this.data.forEach(function (item) {
                    text += '<span>' + item + '</span>';

                });
                    this.output.innerHTML = text;
            };
            this.delData = function (ele) {
                var index = this.data.indexOf(ele.innerHTML.replace(/删除:/, ''));
                if (index != -1) {
                    this.data.splice(index, 1);
                    this.render();
                }

            };
            this.button ? this.init('ButtonEvent') : this.init('KeyEvent');




        }



        
        //构造函数原型方法
        _tag.prototype = {
            /**
             * 检测输入的数据是否重复
             * @param {String} - data 输入的数据
             * @return {Boolean} - 是否重复
             */
            validateData: function (value) {

                if (value != null && value != '') {
                    if (this.data.indexOf(value) == -1) {
                        this.data.push(value);
                        if (this.data.length > 10) {
                            this.data.shift();
                        }
                    }
                    else {
                        alert(value + 'already exist!');
                    }
                }


            },



            init : function (type) {
                var that = this;//记住构造函数本身;

                addHandler(that.output,'mouseover',function (e) {
                        if(e.target && e.target.nodeName == "SPAN") {
                            event.target.innerHTML = '删除:' + event.target.innerHTML;
                            event.target.style.backgroundColor = '#edae9e';
                        }

                });
                addHandler(that.output,'mouseout',function (e) {
                    if(e.target && e.target.nodeName == "SPAN") {
                        event.target.innerHTML = event.target.innerHTML.replace(/删除:/, '');
                        event.target.style.backgroundColor = '#16324a';
                    }
                });
                addHandler(that.output,'click',function (event) {
                    that.delData(event.target);

                });
                switch (type){
                    case 'KeyEvent':

                        addHandler(document,'keyup',function (event) {
                            //空格：32，逗号：188,换行:13
                            if (/(,| |\，)$/.test(that.input.value) || ( document.activeElement.id =='tagInput' && event.keyCode===13 )) {
                                //如果标签输入验证通过
                                that.validateData( that.getData() );
                                that.input.value = '';
                                that.render();
                            }
                        });
                        break;
                    case 'ButtonEvent':

                        addHandler(that.button,'click',function () {
                            var values = that.getData();//获得数组
                            values.forEach(function (item) {
                                that.validateData(item.trim());
                            });
                            that.input.value = '';
                            that.render();

                        });
                        break;



                }

            }


        };



        return _tag;

        
    })();

    var tag = new createTag('tagInput','tagList');
    var hobby = new createTag('hobbyInput','hobbyList','confirm');

}

