<template>
	<div class="container">
		<div class="info">
			<label class="">班级</label>
			<input
				type="text"
				placeholder="请输入班级"
				v-model="course.courseClass"
				class="input-box"
			/>
			<label class="">课程</label>
			<input
				type="text"
				placeholder="请输入班课名称"
				v-model="course.courseName"
				class="input-box"
			/>
			<p>设置班课封面</p>
			<div class="preview" @click="handleClick()">
				<img :src="course.cover" class="cover" v-if="!show" />
				<img src="../assets/plus.png" class="icon-plus" v-if="show" />
				<input type="file" @change="getFile($event)" style="display: none;" id="coverFile" />
			</div>
		</div>
		<hr>
		<div class="btn">
			<button @click="addCourse(course,$event)" class="btn1">确定</button>
			<button class="btn2">取消</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NewCourse',
	data() {
		return {
			loginUserId: 2,
			file:'',
			show:true,
			course: {
				courseName: '',
				courseClass: '',
				cover: ''
			}
		};
	},
	methods: {
		addCourse: function(course,event) {
			event.preventDefault();
			let formData = new FormData();
			formData.append("file", this.file);
			this.$http
			  .post("http://localhost:8080/upload", formData)
			  .then(function(response) {
			    this.course.cover = response.data;
			  });
			var _this = this;
			this.$http({
				method: 'post',
				url: 'http://localhost:8080/api/course',
				data: {
					userId: _this.loginUserId,
					courseName: course.courseName,
					courseClass: course.courseClass,
					cover: course.cover,
					finished: 0
				}
			}).then(function() {
				alert('新增班课成功');
				_this.$router.push('/');
			});
		},
		//点击图片预览区，即模拟点击文件选择组件
		handleClick: function() {
			document.getElementById('coverFile').click();
		},
		//图片预览
		getFile: function() {
			this.file = event.target.files[0];
			var windowURL = window.URL || window.webkitURL;
			this.course.cover= windowURL.createObjectURL(this.file);
			this.show = false;
		}
	}
};
</script>
<style scoped>
.container {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	margin-top: 20px;
}
.info{
	padding-left: 200px;
	padding-top: 20px;
}
label{
    display: block;
    color: #333;
    font-size: 12px;
    padding-bottom: 8px;
    vertical-align: middle;
    text-align: left;
}
label:after{
	content: " * ";
    font-family: "宋体", SimSun, serif;
    color: red
}
.input-box {
	width: 500px;
	height: 25px;
	margin-bottom: 40px;
	font-size: 14px;
}
.btn{
	display: flex;
	padding-left: 40%;
}
.btn1{
	width: 80px;
	height: 30px;
	background-color: #fff;
	border-radius: 8px;
	outline: none;
	color: rgb(0, 187, 221);
	font-size: 16px;
	border: 1px solid rgb(0, 187, 221);
	margin-right: 10px;
}
.btn2{
	width: 80px;
	height: 30px;
	background-color: #fff;
	border-radius: 8px;
	outline: none;
	color: rgb(102, 102, 102);
	font-size: 16px;
	border: 1px solid rgb(102, 102, 102);
}
hr{
	width: 60%;
	color: black;
	margin-bottom: 50px;
}
.preview {
	width: 100px;
	height: 100px;
	border: 1px dashed #aaa;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 30px;
}
.icon-plus {
	width: 50px;
	height: 50px;
}
.cover {
	width: 100%;
	height: 100%;
}
</style>