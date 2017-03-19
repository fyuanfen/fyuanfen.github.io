<template>
	<div class="sys-wrap">
		<div v-if="msgObj.login" class="sys-msg">
			{{msgObj.user.username}} 加入群聊
		</div>
    <div v-if="msgObj.logout" class="sys-msg">
      {{msgObj.user.username}} 退出群聊
    </div>
	</div>
</template>
<script type="text/javascript">
	export default {
	  data () {
	    return {
	    }
	  },

	  props: ['msgObj']

	}
</script>
<style lang='less'>
	.sys-wrap{
		/*background-color: #fff;*/
		padding: 3px;
		display: flex;
		justify-content: center;
		align-items: center;
		.sys-msg{
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgba(0,0,0,0.05);
			border-radius: 10px;
			min-width: 40%;
			color: #999;
			font-size: 12px;
			padding: 3px;
		}

	}
</style>
