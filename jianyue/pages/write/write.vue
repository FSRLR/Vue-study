<template>
	<view>
		<view class="content" >
			<input type="text" v-model="title" placeholder="请输入标题" />
			<view class="toolbar">
				<view class="iconfont icon-bold" @click="toolBarClick('bold')"></view>
				<view class="iconfont icon-italic" @click="toolBarClick('italic')"></view>
				<view class="iconfont icon-configure" @click="toolBarClick('fontsize')"></view>
				<view class="iconfont icon-underline" @click="toolBarClick('underline')"></view>
				<view class="iconfont icon-strike" @click="toolBarClick('strike')"></view>
				<view class="iconfont icon-alignleft" @click="toolBarClick('alignleft')"></view>
				<view class="iconfont icon-aligncenter" @click="toolBarClick('aligncenter')"></view>
				<view class="iconfont icon-alignright" @click="toolBarClick('alignright')"></view>
				<view class="iconfont icon-image" @click="insertRichItem('image')"></view>
			</view>
			<textarea auto-height maxlength="-1" v-model="content"  />
			<button class="wirte-article" @tap="postArticle">发布文章</button>
			<br>
			<view class="grace-text">
				<span style="color: #ddd;padding-left: 5px;">
					预览
				</span>
				<rich-text :nodes="content" bindtap="tap" :style="textareaDataStyle"></rich-text>
			</view>
		</view>
	</view>	
</template>

<script>
	export default {
		name: "uni-richtext",
		data: () => {
			return {
				showMask: false,
				showPopup: false,
				showInsertTextPopup: false,
				fontSizeList: ["14px", "16px", "20px", "28px", "35px"],
				richListIndex: 0,
				textareaDataType: "",
				content:"",
				textareaDataStyle: "padding:10px;font-size:14px;",
				textareaDataColor: "",
				tmpTag: "",
				title: '',
				userId: uni.getStorageSync('login_key').userId,
				imgs: []
			}
		},
		props: {
			richList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		watch: {
			richList() {
				this.$emit('update:richList', this.richList)
			},
			textareaDataColor(newValue, oldValue) {
				this.textareaDataStyle = this.textareaDataStyle.replace(/^color:.*;$/, "")
				this.textareaDataStyle += "color:" + newValue + ";";
			}
		},
		methods: {
			insertRichItem(type) {
				if (type == "image") {
					var _this = this;
					uni.chooseImage({
						count: 1,
						sizeType: ['original', 'compressed'],
						sourceType: ['album'],
						success: function(res) {
							console.log(JSON.stringify(res.tempFilePaths));
							uni.uploadFile({
								url: _this.apiServer + '/upload',
								filePath: res.tempFilePaths[0],
								name: 'file',
								success: uploadFileRes => {
									//图片上传成功，回显图片地址
									console.log(uploadFileRes.data);
									//将图片地址加入imgs数组
									_this.imgs.push(uploadFileRes.data);
									//将图片地址拼接HTML标签，加入文章内容
									_this.content += '<img src="' + uploadFileRes.data + '" width = "100%"/>';
								}
							});
						}
					});
				} 
			},
			toolBarClick(type) { //文字编辑工具栏点击
				switch (type) {
					case "bold":
						if (this.textareaDataStyle.indexOf("font-weight:bold;") != -1) {
							this.textareaDataStyle = this.textareaDataStyle.replace(/font-weight:bold;/, "");
						} else {
							this.textareaDataStyle += "font-weight:bold;";
						}
						break;
					case "italic":
						if (this.textareaDataStyle.indexOf("font-style:italic;") != -1) {
							this.textareaDataStyle = this.textareaDataStyle.replace(/font-style:italic;/, "");
						} else {
							this.textareaDataStyle += "font-style:italic;";
						}
						break;
					case "fontsize":
						uni.showActionSheet({
							itemList: this.fontSizeList,
							success: (res) => {
								let fontsize = this.fontSizeList[res.tapIndex];
								this.textareaDataStyle = this.textareaDataStyle.replace(/^font-size:.*px;$/, "");
								this.textareaDataStyle += "font-size:" + fontsize + ";";
							}
						})
						break;
					case "alignleft":
						this.textareaDataStyle = this.textareaDataStyle.replace(/^text-align:.*;$/, "");
						this.textareaDataStyle += "text-align:left;";
						break;
					case "aligncenter":
						this.textareaDataStyle = this.textareaDataStyle.replace(/^text-align:.*;$/, "");
						this.textareaDataStyle += "text-align:center;";
						break;
					case "alignright":
						this.textareaDataStyle = this.textareaDataStyle.replace(/^text-align:.*;$/, "");
						this.textareaDataStyle += "text-align:right;";
						break;
					case "underline":
						if (this.textareaDataStyle.indexOf("text-decoration: underline;") != -1) {
							this.textareaDataStyle = this.textareaDataStyle.replace(/text-decoration: underline;/, "");
						} else {
							this.textareaDataStyle = this.textareaDataStyle.replace(/^text-decoration:.*;$/, "");
							this.textareaDataStyle += "text-decoration: underline;";
						}
						break;
					case "strike":
						if (this.textareaDataStyle.indexOf("text-decoration: line-through;") != -1) {
							this.textareaDataStyle = this.textareaDataStyle.replace(/text-decoration: line-through;/, "");
						} else {
							this.textareaDataStyle = this.textareaDataStyle.replace(/^text-decoration:.*;$/, "");
							this.textareaDataStyle += "text-decoration: line-through;";
						}
						break;
				}
			},
			showInsertText() { //显示插入文字编辑框
				this.textareaDataType = "input";
				//this.hideInputPopup()
				this.showInsertTextPopup = true;
			},
			postArticle: function() {
				var _this = this;
				uni.request({
					url: this.apiServer + '/article/add',
					method: 'POST',
					header: { 'content-type': 'application/x-www-form-urlencoded' },
					data: {
						uId: this.userId,
						title: this.title,
						content: '<div>' + this.content + '</div>'
					},
					success: res => {
						if (res.data.code === 0) {
							//获得发布文章成功返回的文章id
							var aId = res.data.data;
							console.log(aId);
							uni.showToast({
								title: '发布成功'
							});
							//将文章id和文章对应的图片地址数组传到后台，存入数据库
							uni.request({
								url: this.apiServer + '/img/add',
								method: 'POST',
								header: { 'content-type': 'application/x-www-form-urlencoded' },
								data: {
									aId: aId,
									imgs: JSON.stringify(_this.imgs)  //序列化imgs数组
								},
								success: res => {
									if (res.data.code === 0) {
										console.log('文章图片地址已写入数据库');
									}
								}
							});
							uni.switchTab({
								url: '../index/index'
							});
						}
					}
				});
			}
		}
	}
</script>

<style>

	.placeholder-tip {
		width: 100%;
		font-size: 30upx;
		color: #c7c7cd;
	}

	.mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.popup {
		position: fixed;
		z-index: 999;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
		box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
	}

	.popup-insert-text {
		width: 100%;
		height: 100vh;
	}

	.popup-bottom {
		bottom: 0;
		width: 100%;
	}

	.popup-bottom-button {
		width: 20%;
		font-size: 14px;
		text-align: center;
		line-height: 40px;
		display: flex;
		justify-content: center;
	}

	.popup-bottom-button:last-child {
		color: red;
	}


	.input-content {
		width: 100%;
	}

	.input-content textarea {
		padding: 8px 12px 8px 12px;
		font-size: 14px;
		min-height: 250px;
		line-height: 1.5;
	}

	.preview {
		border-top: 1px solid #e0e0e0;
		width: 100%;
	}

	.toolbar {
		width: 100%;
		border-top:0.5px solid #666;
	}

	.toolbar .iconfont {
		display: inline-block;
		cursor: pointer;
		height: 30px;
		width: 30px;
		margin: 6px 0 5px 0px;
		font-size: 16px;
		padding: 5px 6px 5px 4px;
		color: #757575;
		border-radius: 5px;
		text-align: center;
		background: none;
		border: none;
		outline: none;
		line-height: 2.2;
		vertical-align: middle;
	}

	.input-content {
		min-height: ;
	}
	
	input{
		height: 50px;
		padding-left: 10px;
	}
	.wirte-article{
		width: 90%;
		margin: 0 auto;
	}
</style>
