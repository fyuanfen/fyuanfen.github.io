/**
 * Created by zyy on 2017/1/7.
 */
/**
 * commander 指挥官单例对象, 用于发送指令, 与DOM的按钮绑定
 * @type {{spaceCraft: *[], mediator: ({msgArr, spaceCraft, renderConsole, addOneCraft, removeOneCraft, performOneCommander, init}|{msgArr: Array, spaceCraft: *[], renderConsole: renderConsole, addOneCraft: addOneCraft, removeOneCraft: removeOneCraft, performOneCommander: performOneCommander, init: init}), addCraft: commander.addCraft, performCommand: commander.performCommand, removeCraft: commander.removeCraft, init: commander.init}}
 */


/**Commander是一个单例模式
 */
var  commander = (function () {
        /**私有变量*/
        //指挥官认为自己启动的飞船, 由于丢包率, 会与mediator有出入
        var spaceCraft ;

        /**单例模式的公有方法*/
        return {
            /**
             * addCraft 向Mediator发送添加飞船的指令
             * 如果飞船数量超过4个, 则给出警告
             */
            addCraft: function(){
                var res = spaceCraft.every(function(item){
                        return item == true;
                    });
                if (!res) {
                    for (var i = 0; i < 4; i++) {
                        if (!spaceCraft[i]) {
                            break;
                        }
                    }
                    //找到控制台里面的最小的飞船编号
                    var controlButton = document.querySelectorAll(".craft-control");
                    EventHandler.removeClass(controlButton[i],'hidden');

                    //初始化按钮的样式
                    this.changebuttonStyle(controlButton[i],"start","stop");//使开始按钮可用，禁用停止按钮
                    spaceCraft[i] = true;

                    var html = "[指挥官]:" + (i+1) +"号轨道添加飞船的指令已发送";
                    mediator.renderConsole(html, true);
                    mediator.addOneCraft(i);//在第i轨道添加飞船
                } else {
                    var html = "[指挥官]:轨道已满,请先销毁飞船!!!";
                    mediator.renderConsole(html);
                }
            },
            /**
             *当操作执行后，更改控制台的样式按钮
             * @param target 点击的父元素节点
             * @param able 可用的样式按钮的类名
             * @param disable 禁用的样式按钮的类名
             */
            changebuttonStyle :function (target,able,disable) {
                var a = target.querySelector("."+able);
                var b = target.querySelector("."+disable);
                //设置button的样式改变
                EventHandler.removeClass(a, 'forbid');
                EventHandler.addClass(b, 'forbid');
                //设置button的功能改变
                a.disabled=false;
                b.disabled=true;

            },
            /**
             * performCommand 发出相应的指令
             * @param command
             */
            performCommand: function(target, command) {
                var html;
                if (command.command == "destroy") {
                    html = "[指挥官]:" + command.id +"号飞船摧毁指令已发送";
                    this.removeCraft(command.id);
                } else if (command.command == "start") {
                    html = "[指挥官]:" + command.id +"号飞船飞行指令已发送";
                    this.changebuttonStyle(target, 'stop','start');
                } else {
                    html = "[指挥官]:" + command.id + "号飞船停止指令已发送";
                    this.changebuttonStyle(target, 'start','stop');
                }
                mediator.renderConsole(html, true);
                mediator.performOneCommander(command);
            },
            /**
             * removeCraft, 当指挥官发出摧毁指令后调用该函数删除飞船
             * @param craft
             */
            removeCraft: function(craft){
                var controlButton = document.querySelectorAll(".craft-control");
                EventHandler.addClass(controlButton[craft-1],'hidden');
                spaceCraft[craft-1] = false;
            },
            init :function () {
                spaceCraft =  [true, true, false, false];//初始化飞船状态
                mediator.init();
            }
        }
})(mediator);

