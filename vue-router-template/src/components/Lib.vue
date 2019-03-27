<template>
	<div class="container">
		<div class="side-bar">
			<router-link to="/lib_group">库分组</router-link>
		</div>
		<div class="top-bar">
			<router-link to="/lib_exercises">题库</router-link>
			<router-link to="/lib_resource">资源库</router-link>
			<router-link to="/lib_activity">活动库</router-link>
		</div>
		<div class="content"><router-view /></div>
	</div>
</template>

<script>
export default {
	name: 'Lib',
	data() {
		return {
			
		};
	}
};
</script>

<style>
.container {
		display: flex;
		width: 90%;
		margin: 0 auto;
		
	}
.side-bar{
	flex: 1 1 20%;
	flex-direction: column;
	background-color: #fff;
}
.top-bar{
	flex: 1 1 70%;
	padding-bottom: 20px;
	}
</style>
