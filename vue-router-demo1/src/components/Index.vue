<template>
  <!-- 根容器 -->
  <div class="container">
    <div class="top">
      <p>{{ coursesI.length }}门进行中的班課</p>
      <router-link to="/newCourse">
        <label>新建班课</label>
      </router-link>
    </div>
    <hr>
    <div class="course-conainer">
      <div class="course" v-for="(course, index) in coursesI" :key="index">
        <div class="course-cover">
          <router-link :to="'/course/' + course.courseId">
            <img :src="course.cover">
          </router-link>
        </div>
        <div class="course-class">{{ course.courseClass }}</div>
        <div class="course-name">{{ course.courseName }}</div>
        <div class="tearcher">
          <div class="left">
            <div class="user-avatar">
              <img :src="course.avatar">
            </div>
            <div class="use-username">{{course.username}}</div>
          </div>
          <div class="course-code" v-if="course.userId===loginUserId">{{ course.courseCode }}</div>
        </div>
      </div>
    </div>

    <p>{{ coursesF.length }}门已结束的班课</p>
    <hr>
    <div class="course-conainer">
      <div class="courseF" v-for="(course, index) in coursesF" :key="index">
        <div class="course-cover">
          <router-link :to="'/course/' + course.courseId">
            <img :src="course.cover">
          </router-link>
        </div>
        <div class="course-class">{{ course.courseClass }}</div>
        <div class="course-name">{{ course.courseName }}</div>
        <div class="tearcher">
          <div class="left">
            <div class="user-avatar">
              <img :src="course.avatar">
            </div>
            <div class="use-username">{{course.username}}</div>
          </div>
          <div class="course-code" v-if="course.userId===loginUserId">{{ course.courseCode }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      loginUserId: 2,
      coursesI: [],
      coursesF: []
    };
  },
  created() {
    var _this = this;
    this.$http
      .get("http://localhost:8080/api/coursesI")
      .then(function(response) {
        _this.coursesI = response.data;
      });
    this.$http
      .get("http://localhost:8080/api/coursesF")
      .then(function(response) {
        _this.coursesF = response.data;
      });
  }
};
</script>
<style scoped>
.container {
  padding-top: 30px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: 30px;
}
hr {
  margin-bottom: 20px;
}
.course-conainer {
  display: flex;
  flex-wrap: wrap;
}
.course {
  width: 200px;
  height: 320px;
  margin-right: 20px;
  margin-bottom: 30px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 8px;
}
.courseF {
  -webkit-filter: grayscale(1);
  width: 200px;
  height: 320px;
  margin-right: 20px;
  margin-bottom: 30px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 8px;
}
.course-cover img {
  width: 100%;
  height: 220px;
  justify-content: center;
  align-content: center;
}
.course-class {
  font-size: 13px;
  padding-top: 10px;
  margin-bottom: 10px;
}
.course-name {
  font-size: 13px;
  margin-bottom: 10px;
}
.user-avatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.tearcher {
  display: flex;
  justify-content: space-between;
}
.left {
  display: flex;
  align-items: center;
  justify-content: center;
}
.use-username {
  font-size: 12px;
  color: #666;
}
.course-code {
  color: #00bbdd;
  margin-top: 5px;
}

label {
  color: rgb(194, 193, 193);
  font-size: 19px;
}
label:hover {
  color: rgb(0, 187, 221);
}
.course-code {
  color: rgb(0, 187, 221);
}
</style>