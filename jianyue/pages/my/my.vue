<template>
	<view class="container">
		<!-- 顶部头像和昵称区域，纵向排列 -->
		<view class="top">
			<view class="avatar-box">
				<image src="../../static/default.png" mode="scaleToFill" class="avatar" v-if="!storageData.login"></image>
				<image :src="avatar" mode="scaleToFill" class="avatar" v-if="storageData.login"></image>
			</view>
			<view class="info-box">
				<navigator url="../signin/signin" v-if="!storageData.login">点击登录</navigator>
				<text v-if="storageData.login">{{ nickname }}</text>
				<navigator url="../setting/setting" v-if="storageData.login"><text class="setting-txt">个人设置</text></navigator>
			</view>
		</view>
		
		<view>
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control style="font-size: 18px;" :current="current" :values="items" v-on:clickItem="onClickItem" styleType="text" activeColor="#dd524d"></uni-segmented-control>
			</view>
			<view class="content">
				<view v-show="current === 0">
					<view class="list">
						<view class="list-item" v-for="(article, index) in articles" :key="index">
							<uni-swipe-action :options="option" @tap="deleteArticle(article.id,index)">
								<text @tap="gotoDetail(article.id)">{{ article.title }}</text>
							</uni-swipe-action>
						</view>
					</view>
				</view>
				<view v-show="current === 1">
					<view class="list">
						<view class="list-item" v-for="(follow, index) in follows" :key="index">
							<image :src="follow.avatar" class="avatar small"></image>
							<text style="margin-left: 20px;margin-right: 35%">{{ follow.nickname }}</text>
							<button class="followed link" @tap="cancelFollow(follow.toUId,index)">取消关注</button>
						</view>
					</view>
				</view>
				<view v-show="current === 2">
					<view class="list">
						<view class="list-item" v-for="(collect, index) in collects" :key="index">
							<uni-swipe-action :options="option1" @tap="cancelCollect(article.id,index)">
								<text>{{collect.title }}</text>
							</uni-swipe-action>
						</view>
					</view>
				</view>
				<view v-show="current === 3">
					选项卡4的内容
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
var loginRes, _self;

export default {
		components: {
			uniSwipeAction,
			uniSegmentedControl
		},
	data() {
		return {
			storageData: {},
			avatar: '',
			nickname: '',
			items: [
				'文章',
				'关注',
				'收藏',
				'积分'
			],
			current: 0,
			articles: [],
			collects:[],
			follows: [],
			option: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
			option1: [{
					text: '取消收藏',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
			followed: true,
			collected:true
		};
	},
	onLoad: function() {},
	onShow: function() {
		var _this = this;
		const loginKey = uni.getStorageSync('login_key');
		if (loginKey) {
			this.storageData = {
				login: loginKey.login,
				nickname: loginKey.nickname,
				avatar: loginKey.avatar,
				userId: loginKey.userId
			};
			uni.request({
				url: this.apiServer + '/article/user_count',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: this.storageData.userId
				},
				success: res => {
					_this.articleCount = res.data.data;
				}
			});
			uni.request({
				url: this.apiServer + '/article/user',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: this.storageData.userId
				},
				success: res => {
					_this.articles = res.data.data;
				}
			});
			uni.request({
				url: this.apiServer + '/article/collect',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: this.storageData.userId
				},
				success: res => {
					_this.collects = res.data.data;
				}
			});
			uni.request({
				url: this.apiServer + '/follow/list',
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.storageData.userId
				},
				success: res => {
					_this.follows = res.data.data;
				}
			});
		} else {
			this.storageData = {
				login: false
			};
		}
		uni.request({
			url: 'http://127.0.0.1:8080/api/user/' + uni.getStorageSync('login_key').userId,
			method: 'GET',
			header: { 'content-type': 'application/json' },
			success: res => {
				if (res.data.code === 0) {
					console.log(res.data.data.avatar+'————————————');
					_this.avatar = res.data.data.avatar;
					_this.nickname = res.data.data.nickname;
				}
			}
		});
	},
	methods: {
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
			}
		},
		gotoDetail: function(aId) {
			uni.navigateTo({
				url: '../detail/article_detail?aId=' + aId + '&userId=' + this.storageData.userId
			});
		},
		deleteArticle:function(id,index){
				uni.request({
				url: this.apiServer + '/article/delete',
				method: 'DELETE',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					id:id
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '文章删除成功'
						});
					}
					this.articles.splice(index,1);
				}
			});
		},
		cancelCollect:function(id,index){
			uni.request({
				url: this.apiServer + '/collect/cancel',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.userId,
					toAId: this.article.aId
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '已取消收藏'
						});
						this.collected = false;
						this.collects.splice(index,1);
					}
				}
			});
		},
		cancelFollow:function(id,index){
			uni.request({
				url: this.apiServer + '/follow/cancel',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.storageData.userId,
					toUId:id
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '已取消关注'
						});
						this.followed = false;
						this.follows.splice(index,1);
					}
				}
			});
		}
	}
};
</script>

<style scoped>
.top {
	display: flex;
	flex-direction: column;
	text-align: center;
	height: 100px;
	margin-top: 5px;
}
.avatar-box {
	flex: 1 1 30%;
}
.info-box {
	flex: 1 1 70%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
}
.setting-txt {
	color: #00b26a;
	margin-left: 15px;
}
.center {
	display: flex;
	justify-content: center;
}
.info {
	flex: 1 1 25%;
	display: flex;
	flex-direction: column;
	text-align: center;
	border-right: 1px solid #eee;
}
.content {
	margin-top: 20px;
	font-size: 17px;
}
.avatar{
	width: 50px;
	height: 50px;
}
.link{
	cursor: pointer;
}
.followed {
	color: #666;
	font-size: 12px;
}
</style>
