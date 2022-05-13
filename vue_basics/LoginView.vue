<template>
  <div class="login_bj">
    <h1>登录页面</h1>
    <div class="login_box">
      <el-form :model="form" :rules="rulesLogin" ref="loginRef" label-width="120px" style="width: 100%">
        <el-form-item prop="name" label="用户名">
          <el-input v-model="form.name"/>
          <template #prefix>
            <el-icon class="el-input__icon">
              <User/>
            </el-icon>
          </template>
        </el-form-item>
        <el-form-item prop="pwd" label="密码">
          <el-input v-model="form.pwd" prefix-icon="el-icon-lock"/>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginRequest">登录</el-button>
          <el-button>取消</el-button>
        </el-form-item>
        <!--        <el-form-item>-->
        <!--             记住密码-->
        <!--          -->
        <!--        </el-form-item>-->
      </el-form>
    </div>

  </div>

</template>

<script>
//在组件中导入封装好的api模块
import api from '../api/index.js'
import {ElMessage} from 'element-plus'
// import {User, Lock} from "@element-plus/icons-vue";

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        name: "",
        pwd: ""
      },
      rulesLogin: {
        name: [
          {required: true, message: '账号不能为空', trigger: 'blur'},

        ],
        pwd: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 6, max: 18, message: '密码长度6-18位', trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    clickLogin() {
      console.log(this.$refs.loginRef.validate((res) => {
            console.log('校验结果', res)
            if (res) {
              this.loginRequest()
            }
          }
      ))
      //判断res是否校验通过


    },
    async loginRequest() {
      //登录
      const params = {
        username: this.form.name,
        password: this.form.pwd
      }
      const response = await api.login(params)
      if (response.status == 200) {
        //将登录返回的token存储起来
        const token = response.data.token
        console.log('token值', token)
        //会话关闭自动清空
        window.sessionStorage.setItem('token', token)
        this.$router.push({name: "all"})
        //持久性存储
        //window.localStorage.setItem('token', token)
        //跳转到project 页面
        // this.$router.push('/project')
        // this.$router.push({name:"pro"})
        ElMessage({
          message: '登录成功',
          grouping: true,
          type: 'success',
        })

      } else {
        this.$message({
          message: response.data,
          type: 'error'
        })
        // ElMessage({
        //   message: response.data,
        //   type: 'error',
        //   duration: 3000,
        // })
      }
      console.log("登录返回的结果", response)

    }
  }
}
</script>

<style scoped>
.login_box {
  width: 600px;
  height: 350px;
  padding: 0px 30px;
  position: relative;
  /*通过定位，让登录的盒子居中*/
  top: calc(50vh - 175px);
  left: calc(50vw - 300px);
}

/*登录页面背景图*/
.login_bj {
  height: 100vh;
  background: darkseagreen;


}

/*修改权重*/
/*!*修改组件的样式*!*/
/*.el-form-item{*/
/*  !important;*/
/*}*/
</style>
