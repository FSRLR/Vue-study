<template>
	<view class="content">
		<view class="top">
			<view class="title">微信</view>
			<image src="../../static/wechat/search.png" style="margin-right: 100upx;"></image>
			<image src="../../static/wechat/add.png"></image>
		</view>
		<view class="message-box" v-for="(message,index) in messages" :key="index">
			<image :src="message.avatar"></image>
			<view class="details">
				<view class="rename">
					{{message.rename}}
				</view>
				<view class="message">
					{{message.news}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messages: [
					{
						avatar:'static/avatar/wechat.jpg',
						rename:'微信团队',
						news:'登录操作通知'
					},
					{
						avatar:'/static/avatar/Tencent.jpg',
						rename:'腾讯新闻',
						news:'习近平主持召开中央深改委会议'
					},
					{
						avatar:'/static/avatar/1.jpg',
						rename:'朱芮林',
						news:'你好'
					},
					{
						avatar:'/static/avatar/2.jpg',
						rename:'张楠燕',
						news:'我已经把作业里我的代码发你了'
					},
										{
						avatar:'/static/avatar/3.jpg',
						rename:'朱林杰',
						news:'待会一起上自习'
					}
				
				]
			}


		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.top{
		display: flex;
		height: 100upx;
		width: 100%;
		align-items: center;
		background-color: #F8F8F8;
		justify-content: flex-start;
		
	}
	.top image{
		width: 40upx;
		height: 40upx;
	}
	
	.content {
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 30upx;
		padding-left: 50upx;
		padding-right: 200px;
	}
	.message-box{
		height: 160upx;
		display: flex;
		align-items:center;
		border: 1upx solid #ddd ;
		border-top: none;
	}
	.message-box image{
		flex: 1 1 20%;
		width: 45%;
		height: 80%;
		padding-left: 20upx;
		border-radius: 5upx;
		margin-right: 10px;
	}
	.details{
		flex: 1 1 80%;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.rename{
		font-size: 36upx;
		padding-top: -10upx;
		margin-bottom: 5px;
		
	}
	.message{
		font-size: 24upx;
		color: #8F8F94;
	}
	
</style>
