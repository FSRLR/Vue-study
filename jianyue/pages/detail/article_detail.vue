<template>
	<view class="container">
		<view class="title">
			<text class="article-title">{{ article.title }}</text>
			<image src="../../static/collcet.png" v-if="userId != article.uId && !collected" @tap="collcet"></image>
			<image src="../../static/collect-active.png" v-if="userId != article.uId && collected" @tap="cancelCollect"></image>
		</view>
		<view class="article-info">
			<image :src="article.avatar" class="avatar small"></image>
			<text style="margin-left: 5px;">{{ article.nickname }}</text>
			<text class="info-text" style="margin-left: 10px;margin-right: 20px;">{{ handleTime(article.createTime) }}</text>
			<!-- 登录用户和文章作者不是同一个人，就显示关注或取消关注按钮 -->
			<button v-if="userId != article.uId && followed" class="followed link" @tap="cancelFollow">
				<uni-icon class="uni-icon uni-icon-checkmarkempty" color="#ddd" style="font-size:20px"></uni-icon>已关注
			</button>
			<button v-if="userId != article.uId && !followed" class="cancle-followed link" @tap="follow">
				<uni-icon class="uni-icon uni-icon-plusempty" style="font-size:14px" color="#ddd" ></uni-icon>关注
			</button>
		</view>

		<view class="grace-text" style="margin:20px 0;font-size: 20px;"><rich-text :nodes="article.content" bindtap="tap"></rich-text></view>
		<text class="info-text">评论{{ comments.length }}</text>
		<view class="comment-item" v-for="(comment, index) in comments" :key="index">
			<view class="left"><image :src="comment.avatar" class="avatar small"></image></view>
			<view class="right">
				<text style="margin-bottom: 5px;">{{ comment.nickname }}</text>
				<text class="comment-font" style="margin-bottom: 10px;">{{ comment.content }}</text>
				<view class="comment-font slow">
					<text style="margin-right: 10px;">{{ comments.length - index }}楼</text>
					<text>{{ handleTime(comment.commentTime) }}</text>
				</view>
			</view>
		</view>
		<input class="uni-input comment-box" type="text" placeholder="写下你的评论" v-model="content" required="required" />
		<button class="green-btn" @tap="send">提交</button>
	</view>
</template>

<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue'
export default {
	components: {
		uniIcon
	},
	data() {
		return {
			article: {
				aId: 0,
				uId: 0,
				title: '',
				content: '',
				avatar: '',
				nickname: '',
				createTime: ''
			},
			comments: [],
			content: '',
			userId: uni.getStorageSync('login_key').userId,
			followed: false,
			collected:false
		};
	},
	onLoad: function(option) {
		//option为object类型，会序列化上个页面传递的参数
		this.article.aId = option.aId;
	},
	onShow: function() {
		this.getArticle();
	},
	onPullDownRefresh: function() {
		this.getArticle();
	},
	methods: {
		getArticle: function() {
			var _this = this;
			uni.request({
				url: this.apiServer + '/article/' + this.article.aId,
				method: 'GET',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					userId: this.userId
				},
				success: res => {
					// console.log(res.data.data.article);
					_this.article.aId = res.data.data.article.id;
					_this.article.uId = res.data.data.article.uid;
					_this.article.title = res.data.data.article.title;
					_this.article.content = res.data.data.article.content;
					_this.article.nickname = res.data.data.article.nickname;
					_this.article.avatar = res.data.data.article.avatar;
					_this.article.createTime = res.data.data.article.createTime;
					_this.comments = res.data.data.comments;
					if (res.data.data.followed === '已关注') {
						_this.followed = true;
					}
					if(res.data.data.collected==='已收藏'){
						_this.collected=true;
					}
				},
				complete: function() {
					uni.stopPullDownRefresh();
				}
			});
		},
		handleTime: function(date) {
			var d = new Date(date);
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
			var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
			var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
			var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
			return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
		},
		handleContent:function(msg){
			var description=msg
			description = description.replace(/(\n)/g, "");
			description = description.replace(/(\t)/g, "");
			description = description.replace(/(\r)/g, "");
			description = description.replace(/<\/?[^>]*>/g, "");
			description = description.replace(/\s*/g, "");
			return msg.toString();
		},
		send: function() {
			console.log('评论人编号：' + this.userId + ',文章编号：' + this.article.aId + '，评论内容：' + this.content);
			uni.request({
				url: this.apiServer + '/comment/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					aId: this.article.aId,
					uId: this.userId,
					content: this.content
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '评论成功'
						});
						this.getArticle();
						this.content = '';
					}
				}
			});
		},
		follow:function(){
			uni.request({
				url: this.apiServer + '/follow/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.userId,
					toUId: this.article.uId
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '关注成功'
						});
						this.followed = true;
					}
				}
			});
		},
		collcet:function(){
			uni.request({
				url: this.apiServer + '/collect/add',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.userId,
					toAId: this.article.aId
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '收藏成功'
						});
						this.collected = true;
					}
				}
			});
		},
		cancelFollow:function(){
			uni.request({
				url: this.apiServer + '/follow/cancel',
				method: 'POST',
				header: { 'content-type': 'application/x-www-form-urlencoded' },
				data: {
					fromUId: this.userId,
					toUId: this.article.uId
				},
				success: res => {
					if (res.data.code === 0) {
						uni.showToast({
							title: '已取消关注'
						});
						this.followed = false;
					}
				}
			});
		},
		cancelCollect:function(){
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
					}
				}
			});
		}
	}
};
</script>

<style>
.comment-item {
	display: flex;
	border-bottom: 1px solid #eee;
	margin-bottom: 10px;
	padding: 5px;
	font-size: 20px;
}
.comment-item .left {
	flex: 1 1 10%;
}
.comment-item .right {
	flex: 1 1 90%;
	display: flex;
	flex-direction: column;
}
.comment-box {
	border: 1px solid #fff;
	border-radius: 5px;
	background-color: #eee;
	height: 100px;
	margin-bottom: 10px;
	font-size: 16px;
	
}
.comment-font{
	font-size: 16px;
}
.slow{
	color: rgb(142, 134, 139);
}
.follow-btn {
	height: 33px;
	width: 70px;
	font-size: 12pt;
	text-align: center;
	padding-bottom: 20px;
	margin-right: 0px;
}
.cancel{
	background-color: #aaa;
}
.content{
	
}
.article{
	width: 90%;
	margin: 8px auto;
}
.article-title{
	font-size: 24px;
	font-weight: 700;
	margin-right: 20px;
}
.middle-box{
	display: flex;
	font-size: 20px;
	margin-top: 40upx;
}
.thumbnail-box{
	display: flex;																																																																																												
}
.thumbnail-item{
	margin-right: 10px;		
}
.text-img-box{
	display: flex;
	margin-right: 10px;
}
.left{
	flex: 1 1 40%;
	margin-right: 30px;
}
.right{
	flex: 1 1 50%;
}
.article-info{
	font-size: 18px;
	display: flex;
	align-items: center;
	margin-top: 20px;
}
.small{
	width: 40px;
	height: 40px;
}
.middle-box image{
	width: 100px;
	height: 80px;
}
.article-box{
	border: 1px solid #eee;
	width: 100%;
}
.info-text{
	font-size: 16px;
}
.followed {
	color: #ddd;
	font-size: 12px;
}
.cancle-followed{
	background-color: rgb(26, 173, 25);
	color: #ddd;
	font-size: 12px;
}
.link{
	cursor: pointer;
}
.title{
	display: flex;
}
.title image{
	width: 30px;
	height: 30px;
}
</style>
