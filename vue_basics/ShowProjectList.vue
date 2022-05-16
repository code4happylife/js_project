<template>
  <div class="pro_lists">
    <!--    顶部按钮-->
    <div class="title">
      <!--    项目列表-->
      <span>项目列表</span>
      <el-button @click="clickAdd" style="float:right" type="success" icon="el-icon-plus">添加项目</el-button>
    </div>
    <div class="pro_table" size="mini">
      <el-table :data="proList" style="width: 100%">
        <el-table-column label="项目名" min-width="180" prop="name"></el-table-column>
        <el-table-column label="负责人" min-width="180" prop="leader"></el-table-column>
        <el-table-column label="创建时间" min-width="180">
          <template #default="scope">
            {{ $tools.rTime(scope.row.c_time) }}
          </template>
        </el-table-column>
        <el-table-column label="项目描述" show-overflow-tooltip min-width="180" prop="desc"></el-table-column>
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button size="small" type="success" plain icon="el-icon-view">进入项目</el-button>
            <el-button @click="clickEdit(scope.row)" size="small" type="success" plain icon="el-icon-edit-outline">
              编辑项目
            </el-button>
            <el-button @click='clickDel(scope.row.id)' size="small" type="danger" icon="el-icon-delete">删除项目</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


  </div>


  <el-dialog v-model="addDlg" title="添加项目" width="40%">
    <el-form :model="addForm">
      <el-form-item label="项目名称">
        <el-input v-model="addForm.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="addForm.desc" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDlg = false">取消</el-button>
        <el-button type="primary" @click="addPro">确认</el-button>
      </span>
    </template>
  </el-dialog>


  <el-dialog v-model="editDlg" title="编辑项目" width="40%">
    <el-form :model="editForm">
      <el-form-item label="项目名称">
        <el-input v-model="editForm.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="editForm.desc" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDlg = false">取消</el-button>
        <el-button type="primary" @click="editPro">确认</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  name: "AllProject",
  data() {
    return {
      proList: [],
      addForm: {
        name: "",
        desc: ""
      },
      addDlg: false,
      //编辑项目的表单
      editForm: {
        name: "",
        desc: " "
      },
      editDlg: false
    }
  },
  methods: {
    async getAllPro() {
      const response = await this.$api.getProjects();
      //console.log(response.data)
      if (response.status === 200) {
        this.proList = response.data;
      }
    },
    async deletePro(id) {
      const response = await this.$api.delProject(id)
      if (response.status === 204) {
        ElMessage({
          type: 'success',
          message: '删除成功',
          duration: 1000
        });
        this.getAllPro()

      }
    },
    clickDel(id) {
      ElMessageBox.confirm(
          '确定删除该项目吗?',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            this.deletePro(id)
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消删除',
            })
          })
    },
    async addPro() {
      const response = await this.$api.addProject(this.addForm)
      if (response.status === 201) {
        ElMessage({
          type: 'success',
          message: '添加成功',
          duration: 1000
        });
      this.getAllPro()
      this.addDlg = false

      }
    },
    clickAdd() {
      //显示添加窗口
      this.addDlg = true,
          //清空表单原有数据
      this.addForm = {
        name: "",
        desc: ""
      }
    },
    //发送修改请求
    async editPro() {
      const response = await this.$api.updateProject(this.editForm.id, this.editForm)
      if (response.status === 200) {
        ElMessage({
          type: 'success',
          message: '编辑成功',
          duration: 1000
        });
        this.getAllPro()
        this.addDlg = false
      }

    },

    clickEdit(info) {
      console.log("编辑项目的信息为", info)
      this.editForm = {...info}
      this.editDlg = true
    }
  },
  created() {
    this.getAllPro();
  },


}
</script>
<!--加上scoped， 下面的样式只对当前组件有效-->
<style scoped>
.pro_lists {
  margin: 20px 100px 0px 100px;
}

.title {
  height: 50px;
  color: #42b983;
  font: bold 16px/40px "microsoft yahei";
  border-bottom: solid 3px #42b983;
}
</style>
