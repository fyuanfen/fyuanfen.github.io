/**
 * Created by zyy on 2017/1/7.
 */

/**
 * initControlButton
 * 初始化控制台按钮
 */
function initControlButton() {
    var controlButton = document.querySelectorAll(".craft-control");
    /**
     * 飞船指令发送按钮事件处理程序,点击号码之后，出现操作按钮
     * @param event
     */
    function controlHandler(event) {
        var target = event.currentTarget;
        for (var j = 0; j < controlButton.length; j++) {
            controlButton[j].className = controlButton[j].className.replace(/selected/, "");
        }
        target.className += " selected";
    }

    for (var i = 0; i < controlButton.length; i++) {
        EventHandler.addEventHandler(controlButton[i], "click", controlHandler);
    }
}

/**
 * initAddButton
 * 初始化添加飞船的按钮
 */
function initAddButton() {
    var addButton = document.querySelector(".craft-add");

    EventHandler.addEventHandler(addButton, "click", function () {
        commander.addCraft();
    });
}

/**
 * initStopButton
 * 初始化飞船停止按钮
 */

function initOperationButton() {
    var buttonclass = ['start', 'stop', 'destroy'];
    //两个循环嵌套的立即执行函数，分别对start，stop和destroy按钮进行事件绑定
    for (var j = 0; j < buttonclass.length; j++) {
        (function (type) {
            var buttons = document.querySelectorAll('.' + type);
            for (var i = 0; i < buttons.length; i++) {
                //立即执行函数
                (function (i) {
                    EventHandler.addEventHandler(buttons[i], 'click', function (event) {
                        var parentnode = event.currentTarget.parentNode.parentNode;
                        var command = {
                            id: i + 1,
                            command: type
                        }
                        //执行命令，并更改按钮样式

                        commander.performCommand(parentnode, command);
                    });
                })(i);
            }

        })(buttonclass[j])
    }
}
/**
 * 初始化界面
 */
function init() {
    commander.init();
    initControlButton();
    initAddButton();
    initOperationButton();
}

init();