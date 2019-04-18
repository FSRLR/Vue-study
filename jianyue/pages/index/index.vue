<template>
	<view class="content">
		<view class="article" v-for="(article,index) in articles" :key="index">
			<view class="article-box">
				<text class="article-title" @tap="gotoDetail(article.id)">{{article.title}}</text>
				<!-- 大于三张 -->
				<view class="middle-box" v-if="article.imgs.length >=3">
					<view class="thumbnail-box">
						<view class="thumbnail-item" v-for="(item,index1) in article.imgs" :key="index1<3">
							<image :src="item.imgUrl">
							</image>
						</view>
					</view>
				</view>
				<!-- 小于三张 -->
				<view class="middle-box" v-else-if="article.imgs.length >=1">
					<view class="text-img-box">
						<view class="left">
							<text class="text">{{ handleContent(article.content) }}</text>
						</view>
						<view class="right">
							<image :src="article.imgs[article.imgs.length - 1].imgUrl"></image>
						</view>
					</view>
				</view>
				<!-- 没有图片的显示方式 -->
				<view class="middle-box text-box" v-else>
					<text class="text">{{ handleContent(article.content) }}</text>
				</view>
				<!-- 文章作者等信息 -->
				<view class="article-info">
					<image :src="article.avatar" class="avatar small"></image>
					<text class="info-name" style="margin-left: 10px;">{{article.nickname}}</text>
					<text class="info-comment" style="margin-left: 15px;">评论:({{article.comments}})</text>
					<text class="info-time" style="margin-left: 20px;">{{ handleTime(article.createTime) }}</text>
				</view>
			</view>
			<view class="grey-bar"></view>
		</view>
		<button class="circle-btn" @tap="gotoWrite()"><text class="icon-text">+</text></button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userId:uni.getStorageSync('login_key').userId,
			articles:[],
			comments: []
		};
	},
	onLoad:function() {
		this.getArticles();
	},
	onShow:function(){},
	onPullDownRefresh:function(){
		this.getArticles();
	},
	methods: {
		getArticles:function(){
			var _this=this;
			uni.request({
				url:this.apiServer+'/article/list',
				method:'GET',
				header:{'content-type':'application/x-www-form-urlencoded'},
				success:res=>{
					_this.articles=res.data.data;
				},
				complete:function(){
					uni.stopPullDownRefresh();
				}
			});
		},
		gotoDetail:function(aId){
			uni.navigateTo({
				url:'../detail/article_detail?aId='+aId
			})
		},
		gotoWrite:function(){
				if(uni.getStorageSync('login_key').login === true){
				uni.navigateTo({
					url:'../write/write'
				});
				}else{
					uni.navigateTo({
						url:'../signin/signin'
					});
				}
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
			return description.substring(0,20);
		}
	}
};
</script>

<style>
.content{
	
}
.article{
	width: 90%;
	margin: 8px auto;
}
.article-title{
	font-size: 24px;
	font-weight: 700;
}
.middle-box{
	display: flex;
	font-size: 20px;
	margin-top: 20upx;
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
	flex: 1 1 60%;
	margin-right: 30px;
}
.right{
	flex: 1 1 40%;
}
.right image{
	width: 100%;
	height: 100%;
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
.thumbnail-item image{
	width: 100px;
	height: 80px;
}

.article-box{
	border: 1px solid #eee;
	width: 100%;
}
.icon-text {
	font-size: 20pt;
	color: #fff;
}
.circle-btn {
	position: fixed;
	bottom: 80px;
	right: 10px;
	width: 45px;
	height: 45px;
	border-radius: 50%;
	background-color: #de533a;
	background: linear-gradient(40deg, #ffd86f, #fc6262);
	box-shadow: 2px 5px 10px #aaa;
	cursor: pointer;
	border: none;
	outline: none;
	display: flex;
	justify-content: center;
	align-items: center;
}
.text{
	font-size: 20px;
}
</style>