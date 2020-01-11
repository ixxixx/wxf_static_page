<template>
  <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>用户信息</span>
        </div>
        <el-row :gutter="40">
            <el-col :span="12">
                <el-form :model="user" status-icon label-width="100px" class="demo-ruleForm">
                    <el-form-item label="手机号">
                        <el-input type="text" disabled v-model="user.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input type="text" v-model="user.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录账号">
                        <el-input type="text" v-model="user.intro" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="text" v-model="user.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="updateUser">修改</el-button>
                    </el-form-item>
                </el-form>

            </el-col>
            <el-col :span="12">
                <el-upload class="avatar-uploader" action="www.baidu.com" :show-file-list="false">
                    <img :src="user.photo" class="avatar">
                    <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
                </el-upload>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      user: {
        mobile: '13753217896',
        name: '某某某',
        accounts: '13753217896',
        password: '123456',
        photo: 'http://b-ssl.duitang.com/uploads/item/201511/13/20151113110434_kyReJ.jpeg'
      }
    }
  },
  methods: {
    updateUser () {
      // 提示用户更新成功
      this.$message({
        message: '用户信息更新成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
