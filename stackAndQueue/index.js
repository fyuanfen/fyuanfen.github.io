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



window.onload=function () {

    function addDeleteEvent() {
        var items = document.getElementsByClassName('item');
        [].forEach.call(items, function (item, index) {
            addEventhandler(item, 'click',function(){
                que.deleteID(index)
            });

        });

    }

    var buttons = document.getElementsByTagName('button');

    var que = {
        str: [],
        leftPush: function (num) {
            this.str.unshift(num);
            this.paint();

        },
        rightPush: function (num) {
            this.str.push(num);
            this.paint();

        },
        leftPop: function () {
            if (!this.isEmpty()) {
                this.str.shift();
                this.paint();
            }
            else {
                alert('There is nothing to Pop');
            }

        },
        rightPop: function () {
            if (!this.isEmpty()) {
                this.str.pop();
                this.paint();
            }
            else {
                alert('There is nothing to Pop');
            }

        },
        deleteID: function (index) {
            this.str.splice(index, 1);
            this.paint();

        },
        isEmpty: function () {
            return this.str.length == 0;

        },
        paint: function () {
            var down = document.getElementsByClassName('down')[0]
            var text = this.str.map(function (item) {
                return '<div class="item">' + item + '</div>';
            });
            down.innerHTML = text.join('');
            addDeleteEvent();


        }
    };

    [].forEach.call(buttons,function (item,index) {

        switch (index) {
            case 0:
                addEventhandler(item,'click',function() {
                    var value = document.getElementById('input-text').value;
                    if (/^\d{1,3}$/.test(value)) {
                        que.leftPush(value);
                    }
                    else{
                        alert('Please enter a number between 0 and 999.');
                    }

                });
                break;
            case 1:
                addEventhandler(item,'click',function() {
                    var value = document.getElementById('input-text').value;
                    if (/^\d{1,3}$/.test(value)) {
                        que.rightPush(value);
                    }
                    else {
                        alert('Please enter a number between 0 and 999.');
                    }
                });
                break;

            case 2:
                addEventhandler(item,'click',function(){
                    que.leftPop();
                });
                break;

            case 3:
                addEventhandler(item,'click',function(){
                    que.rightPop();
                });
                break;
        }

    });


}
