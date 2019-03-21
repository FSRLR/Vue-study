<template>
  <div id="app">
		<div class="header">
			<router-link to="/" class="nav-item1"><img :src="title"></router-link>
			<router-link to="/task" class="nav-item">任务中心</router-link>
			<router-link to="/lib" class="nav-item">库管理</router-link>
			<router-link to="/ucenter" class="nav-item">刘磊</router-link>
		</div>
    <div class="container">
			<router-view></router-view>
		</div>
  </div>
</template>

<script>
export default {
  name: 'App',
		data() {
			return {
				title: 'https://static.cdn.oss.mosoteach.cn/mosoteach2/common/images/logo.png'
			}
		},
};
</script>

<style>
	#app{
		background-color: rgb(244,244,244);
	}
.header{
		display: flex;
		height: 100px;
		background-color: #fff;
		font-size: 20px;
		padding-left: 120px;
		align-items: center;
}
.header img{
	height: 150%;
	width: 150%;
}
.nav-item1{
	padding-left: 100px;
	width: 100px;
	margin-right: 800px;
}
.nav-item{
	width: 100px;
	margin-right: 20px;
	padding-bottom: 10px;
}
.container {
	width: 80%;
	margin: 0 auto;
}
a{
	text-decoration: none;
	color: #aaa;
}
a:hover{
	color: rgb(2,165,218);
}
</style>