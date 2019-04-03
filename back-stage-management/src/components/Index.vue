<template>
		<el-container>
			<el-aside width="200px">
				<template slot="title" class="logo">
				  <router-link to="/index">FSRLR Admin</router-link>
				</template>
				<el-col :span="12">
					<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="rgb(54, 65, 80)"
					 text-color="#fff" active-text-color="#ffd04b">
						<el-submenu index="1">
						  <template slot="title">
						    <i class="el-icon-menu"></i>
						    <router-link to="/DASHBOARD">DASHBOARD</router-link>
						  </template>
						</el-submenu>
						<el-submenu index="2">
						  <template slot="title">
						    <i class="el-icon-menu"></i>
						    <router-link to="/CHARTS">CHARTS</router-link>
						  </template>
						</el-submenu>
						<el-submenu index="3">
						  <template slot="title">
						    <i class="el-icon-setting"></i>
						    <router-link to="/UI_ELEMENTS">UI ELEMENTS</router-link>
						  </template>
						</el-submenu>
						<el-submenu index="4">
						  <template slot="title">
						    <i class="el-icon-setting"></i>
						    <router-link to="/TABLES">TABLES</router-link>
						  </template>
						</el-submenu>
					</el-menu>
				</el-col>
			</el-aside>
			<el-container>
				<el-header>
					<div class="line"></div>
					<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
					 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
					 <el-dropdown>
					   <i class="el-icon-bell" style="margin-right: 15px"></i>
					 </el-dropdown>
					 <el-dropdown>
					   <i class="el-icon-bell" style="margin-right: 15px"></i>
					 </el-dropdown>
					 <el-dropdown>
					   <i class="el-icon-setting" style="margin-right: 15px"></i>
					   <el-dropdown-menu slot="dropdown">
					     <el-dropdown-item>查看</el-dropdown-item>
					     <el-dropdown-item>新增</el-dropdown-item>
					     <el-dropdown-item>删除</el-dropdown-item>
					   </el-dropdown-menu>
					 </el-dropdown>
					</el-menu>
				</el-header>
				<el-main>
					<router-view/>
				</el-main>
			</el-container>
		</el-container>
</template>
  <router-link to="/inform"></router-link>
  <router-link to="/admin"></router-link>
  <router-link to="/setting"></router-link>
<script>
export default {
  name: "Index",
  data() {
    return {};
  }
};
</script>

<style>
.logo {
  padding: 18px 0px;
  margin: 0;
  height: 75px;
  text-align: center;
}
a {
  color: #fff;
  text-decoration: none;
}
a:hover {
  color: rgb(227, 103, 81);
}
  
</style>
