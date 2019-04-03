<template>
	<view class="container">
		<!-- <view>
			<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
			<view class="content">
				<view v-show="current === 0">选项卡1的内容</view>
				<view v-show="current === 1">选项卡2的内容</view>
				<view v-show="current === 2">选项卡3的内容</view>
				<view v-show="current === 3">选项卡4的内容</view>
			</view>
		</view> -->
		<button class="circle-btn"><text class="icon-text">+</text></button>
	</view>
</template>

<script>
// import uniSegmentedControl from '@/components/uni-segmented-control.vue';
export default {
	// components: { uniSegmentedControl },
	data() {
		return {
// 			items: ['人物', '风景', '科技', '汽车'],
// 			current: 0
		};
	},
	onLoad() {},
	methods: {
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
			}
		}
	}
};
</script>

<style>
.icon-text {
	font-size: 20pt;
	color: #fff;
}
.circle-btn {
	position: absolute;
	bottom: 20px;
	right: 10px;
	width: 45px;
	height: 45px;
	border-radius: 50%;
	background-color: #de533a;
	background: linear-gradient(40deg, #ffd86f, #fc6262);
	/* background-image: url(../../static/Pencil32.png); */
	box-shadow: 2px 5px 10px #aaa;
	cursor: pointer;
	border: none;
	outline: none;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>