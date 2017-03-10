# Selectpick下拉框插件
模拟select下拉框
效果图如下所示
![select](example/selectpick.png)

**[DEMO请案例点击这里查看.](https://fyuanfen.github.io/selectpick/)**

#### [源码解析](https://github.com/fyuanfen/fyuanfen.github.io/blob/master/selectpick/%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.md)

----------
#调用示例
	<select name="select" id="select">
		<option value="-1">请选择</option>
		<option value="1">男</option>
		<option value="0" selected="true">女</option>
		<option value="10" disabled="true">"'人妖</option>
	</select>
	<select id="select2"></select>
	<input type="text" id="select3" style="height:30px;" value="2">
	<a id="select4" data-value="1"></a>
	<script type="text/javascript" src="../src/jquery-1.11.2.js"></script>
	<script type="text/javascript" src="../src/select.js"></script>
	<script>
	var select = new Select();
	select.init({
		target: '#select'
	});
	$('#select2').Select({
		width:100,
		model: [{
			text: "请选择",
			value: "1"
		}]
	});
	var model=[{
			text: "浙江浙江浙江浙江浙江",
			value: "1"
		},{
			text: "杭州",
			value: "2"
		},{
			text: "宁波",
			value: "3"
		},{
			text: "湖北",
			value: "4"
		},{
			text: "上海",
			value: "5"
		},{
			text: "万达",
			value: "6"
		},{
			text: "物美",
			value: "7",
			disabled:true
		},{
			text: "中国",
			value: "8"
		},{
			text: "外国",
			value: "9"
		}];
	$('#select3').change(function(){
		console.log('选中个：'+$(this).val())//或者selected
	}).Select({
		width:100,
		maxHeight:300,
		maxWidth:'auto',
		model: model
	});
	var sel=$('#select4').Select({
		width:100,
		height:24
		})[0];
	setTimeout(function(){
		sel.setData(model);//动态更改数据源
	},2000);
	</script>
#API
##属性
###target：`[DOM|String|$]`
	要改变成select的节点，可以原来就是select，也可以是其他元素，如果是其他元素时，优先取value取为选中项，否则取data-value值；
###model:`Array`
	数据源数组[value:'1',text:'文本',disabled:false]，如果无的时候，会去option,disabled可以控制是否可选，option上同
###multi:`bool`
	是否多选，暂缺
###disabled:`bool`
	是否可用,默认可用false,
	如果没有这个值会去取target的disabled或target.hasClass('disabled')来判断是否可用
##方法
###setData:`function(data)`
	更改数据源data为数组[value:'1',text:'文本',disabled:false]
###selected:`function(val,txt)`
	选中后的回调
##事件
###change:`[value]`
	选中项改变时触发
###blur:
	隐藏时触发
###set:function(e,val)
	$(target).trigger('set','1')设置选中项
