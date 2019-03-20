<template>
	<view class="content">
		<view>
			<text class="title">{{title}}的个人中心</text>
			<navigator url="setting" hover-class="navigator-hover">
				<button type="primary">个人设置<tton>
			</navigator>
		<view>
		<view>
</template>

<script>
	export default {
		data() {
			return {
				title: '26'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
	
</style>
