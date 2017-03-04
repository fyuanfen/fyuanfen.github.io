/**
 * Created by zyy on 2017/1/4.
 */
$ = function (id) {
    return document.querySelector(id);
};

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

(function () {
    var timer = null;
    var animateList = [];
    var container = $('.container');
    var preorder = $('#preorder');
    var inorder = $('#inorder');
    var postorder = $('#postorder');

    var TBT = {

        preOrder: function (node) {
            if (node != null){
                animationList.push(node);
                if ( node.firstElementChild != null ) {
                    arguments.callee(node.firstElementChild);
                }

                if (node.lastElementChild != null) {
                    arguments.callee(node.lastElementChild);
                }
            }

        },
        inOrder: function (node) {
            if (node != null){
                if ( node.firstElementChild != null ) {
                    arguments.callee(node.firstElementChild)
                }

                animationList.push(node);

                if (node.lastElementChild != null) {
                    arguments.callee(node.lastElementChild);
                }
            }

        },
        postOrder: function (node) {
            if (node != null){
                if ( node.firstElementChild != null ) {
                    arguments.callee(node.firstElementChild)
                }

                if (node.lastElementChild != null) {
                    arguments.callee(node.lastElementChild);
                }
                animationList.push(node);
            }

        },

        resetData: function () {
            animationList.forEach(function (item) {
                item.className = item.className.replace(' active','');

            });

        },

        animate: function () {
            var i = 0;
            animationList[i].className +=' active';
            timer = setInterval(function () {
                i++;
                if( i < animationList.length) {
                    animationList[i - 1].className = animationList[i - 1].className.replace(' active','');
                    animationList[i].className += ' active';
                }

                else{
                    clearInterval(timer);
                    animationList[i - 1].className = animationList[i - 1].className.replace(' active','');
                }


            },500);

        },


    };

    var Operation = {
        addButtonEvent: function () {

            addHandler(preorder,'click',function (type) {
                clearInterval(timer);
                animationList = [];
                TBT.preOrder(container);
                TBT.resetData();
                TBT.animate();


            });

            addHandler(inorder,'click',function (type) {
                clearInterval(timer);
                animationList = [];
                TBT.inOrder(container);
                TBT.resetData();
                TBT.animate();


            });


            addHandler(postorder,'click',function (type) {
                clearInterval(timer);
                animationList = [];
                TBT.postOrder(container);
                TBT.resetData();

                TBT.animate();

            });

        },
        init:function () {
            this.addButtonEvent();

        }




    };
    Operation.init();




})()
