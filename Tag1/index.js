/**
 * Created by zyy on 2016/12/31.
 */


function addEventhandler(ele,event,listener){
    if (ele.addEventListener) {
        ele.addEventListener(event, listener, false);
    }
    else if (ele.attachEvent) {
        ele.attachEvent(event,listener);

    }
    else ele['on' + event] = listener;

}

$ = function (id) {
    return document.querySelector(id);

}

window.onload=function () {

    function addDeleteEvent() {
        var items = document.getElementsByClassName('item');
        [].forEach.call(items, function (item, index) {
            addEventhandler(item, 'click',function(){
                que.deleteID(index);
            });

        });

    }

    function getInput() {
        var values = $('#input').value;
        return values.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/)
            .filter(function(item) {
                return item != '';
            });

    }


    var que = {
        str: [],
        leftPush: function (num) {
            [].forEach.call(num,function (item ) {
                que.str.unshift(item);

            });
            this.render();


        },
        rightPush: function (num) {
            [].forEach.call(num,function (item ) {
                que.str.push(item);

            });
            this.render();

        },
        leftPop: function () {
            if (!this.isEmpty()) {
                this.str.shift();
                this.render();
            }
            else {
                alert('There is nothing to Pop');
            }

        },
        rightPop: function () {
            if (!this.isEmpty()) {
                this.str.pop();
                this.render();
            }
            else {
                alert('There is nothing to Pop');
            }

        },
        deleteID: function (index) {
            this.str.splice(index, 1);
            this.render();

        },
        isEmpty: function () {
            return this.str.length == 0;

        },
        render: function (match) {
            $('.down').innerHTML = this.str.map(function (item) {
                if ( match != null && match.length > 0) {
                    item = item.replace(new RegExp(match,"g"),'<span class="selected">'+match+'</span>');
                }
                return '<div class="item">' + item + '</div>';
            }).join('');
            addDeleteEvent();
        }
    };

    addEventhandler($('#left-in'),'click',function() {
        que.leftPush(getInput());
                });

    addEventhandler($('#right-in'),'click',function() {
        que.rightPush(getInput());
                });

    addEventhandler($('#left-out'),'click',function(){
        que.leftPop();
                });

    addEventhandler($('#right-out'),'click',function(){
        que.rightPop();
                });

    addEventhandler($('#searchBtn'),'click',function () {
        que.render($('#search-text').value);

    });


}
