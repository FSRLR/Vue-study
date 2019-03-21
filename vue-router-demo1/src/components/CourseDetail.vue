<template>
  <div class="container">
    <h2>班课{{ id }}详情页面</h2>
    <div class="detail">
      <div class="cover">
        <img :src="course.cover">
      </div>
      <div class="description">
        <p>课程名称：{{course.courseName}}</p>
        <p>班级：{{course.courseClass}}</p>
        <div v-if="course.finished===0">
          <p>状态：正在进行中</p>
          <div v-if="course.userId===2">
            <label @click="finishCouse(course)">结束班课</label>
          </div>
        </div>
        <div class v-else-if="course.finished===1">
          <p>状态：已结束</p>
          <label @click="deleteCourse(course.courseId,index)" class="delable">删除班课</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseDetail",
  data() {
    return {
      id: this.$route.params.id,
      course: {}
    };
  },
  methods: {
    finishCouse: function(course) {
      var _this = this;
      this.$http({
        method: "put",
        url: "http://localhost:8080/api/course",
        data: {
          courseId: course.courseId,
          userId: course.userId,
          courseName: course.courseName,
          courseClass: course.courseClass,
          cover: course.cover,
          finished: 1
        }
      }).then(function() {
        alert("已解结束课程");
        _this.$router.push("/");
      });
    },
    deleteCourse: function(courseId, index) {
      var _this = this;
      this.$http({
        method: "delete",
        url: "http://localhost:8080/api/course/" + courseId
      }).then(function() {
        alert("班课删除成功");
		_this.$router.push("/");
      });
    }
  },
  created() {
    var _this = this;
    this.$http
      .get("http://localhost:8080/api/course/" + this.id)
      .then(function(response) {
        _this.course = response.data;
      });
  }
};
</script>
<style scoped>
.detail {
  display: flex;
  width: 60%;
  height: 300px;
  justify-content: space-between;
  align-items: center
}

.cover {
  flex: 1 1 40%;
}
.cover img {
  width: 100%;
  height: 100%;
}
.description {
  flex: 1 1 50%;
  padding-left: 50px;
  margin-bottom: 30px;
  font-size: 20px;
}
p{
	margin-bottom: 40px;
}

label {
  color: rgb(0, 187, 221);
  font-size: 20px;
}
label:hover {
  color: rgb(174, 200, 204);
}
.delable{
	color: rgb(228, 85, 85);
}
</style>