/**
 * Created by zyy on 2017/1/7.
 */
(function(window, undefined) {
//记录定时器标志
    var clearId = [], stopId = [];
    /**
     * 飞船的超类对象
     * @type {{state: number, speed: number, powerSystem: number, energySystem: number, energy: number, path: number, startOwnCraft: spaceCraft.startOwnCraft, stopOwnCraft: spaceCraft.stopOwnCraft, destoryOwnCraft: spaceCraft.destoryOwnCraft}}
     */
    var spaceCraft = {

        //飞船运行速度
        speed: 0.5,
        //动力系统
        energyConsume: 0.5,
        //能源系统
        energySystem: 0.2,
        //初始能源
        energy: 100,

        changeStyle : function (craft, that) {
            var energyText = craft.querySelector(".energy-text");
            var energyBar = craft.querySelector(".energy");
            energyText.textContent = Math.floor(that.energy);
            energyBar.style.height = that.energy + "%";
            energyBar.style.backgroundColor = that.energy >= 50 ? "#2fa06c" : "#c83b38";

        },
        //清除定时器
        clearTimeIntervel : function (id) {
            if (clearId[id]) {
                clearInterval(clearId[id]);
            }
            if (stopId[id]) {
                clearInterval(stopId[id]);
            }

        },
        /**
         * 接收到飞行指令后, 执行飞行操作
         * @param order
         * @param id
         */
        startOwnCraft: function (order, id) {
            var speed = this.speed;
            var that = this;
            //清除停止的计时器
            this.clearTimeIntervel(id);
            clearId[id] = setInterval(function () {
                var craft = document.querySelector("#craft-" + id);
                that.energy += that.energySystem - that.energyConsume;
                that.changeStyle(craft, that);//更改能量条，能量条文本和颜色的样式
                if (Math.floor(that.energy) <= 0) {
                    that.stopOwnCraft(order, id);
                }
                var angle = /\d*\.?\d/.exec(craft.style.transform);
                angle = parseFloat(angle) + speed;
                craft.style.transform = "rotate(" + angle + "deg)";
            }, 100);
        },
        /**
         * 接收到停止飞行指令后, 执行停止操作
         * @param order
         * @param id
         */
        stopOwnCraft: function (order, id) {
            var that = this;
            var craft = document.querySelector("#craft-" + id);
            this.clearTimeIntervel(id);

            stopId[id] = setInterval(function () {
                if (that.energy < 100) {
                    that.energy += that.energySystem;
                    that.changeStyle(craft, that);//更改能量条，能量条文本和颜色的样式
                }
            }, 100);
        },
        /**
         * 接收到摧毁指令后, 执行自行摧毁操作
         * @param order
         * @param id
         */
        destroyOwnCraft: function (order, id) {
            var craft = document.querySelector("#craft-" + id);
            this.clearTimeIntervel(id);
            craft.parentNode.removeChild(craft);
        }
    };
    window.spaceCraft = spaceCraft;
})(window);
/**
 * 寄生模式继承飞船对象, 之后增强相关属性
 * @param order
 * @returns {spaceCraft}
 */
function createCraft(order) {
    var craft = Object.create(spaceCraft);
    //增强属性, 记录飞船所在的轨道
    craft.order = order;
    /**
     * 信号处理系统
     * @param command
     * @param i
     */
    craft.signalSystem = function(command, i){
        if (command.id == this.order) {
            switch (command.command) {
                case "start":
                    this.startOwnCraft(this.order, i);
                    break;
                case "stop":
                    this.stopOwnCraft(this.order, i);
                    break;
                case "destroy":
                    this.destroyOwnCraft(this.order, i);
                    break;
            }
        }
    };
    return craft;
}
