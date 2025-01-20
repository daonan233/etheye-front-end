<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
// import { useUserStore } from '@/stores/user'
import { registerAPI } from '@/apis/login';

// 表单校验
// 1、准备表单对象
const form = ref({
    username: '',
    password: '',
})

// 2、准备规则对象
const rules = {
    // 规则对象中的属性名要和表单对象中的属性名一一对应
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' }
    ],

}

// 3、获取 form 组件实例做同一校验
const formRef = ref(null)

const emit = defineEmits(["gotoLogin"])  // gotoLogin为父组件传来的方法

// 注册按钮的响应函数
const doRegister = () => {
    const { username, password} = form.value

    // 调用实例方法
    formRef.value.validate(async (valid) => {
        // valid: 所有表单都通过校验，才为 true
        // 以valid作为判断条件，如果通过校验才执行登录逻辑
        if (valid) {
            // 调用注册接口
            await registerAPI(username, password).then(res=>{
              if(res.code === "0"){
                // 注册成功提示
                ElMessage({ type: 'success', message: '注册成功' })
                // 返回登录页面
                emit("gotoLogin")
              }
              else if(res.code === "456")
                ElMessage({type:'error',message:"注册失败！当前账号已存在"})
              else ElMessage({type:'error',message:'网络或服务器不稳定，请重试'})
            })

            // 在拦截器里做了注册错误提示


        }
    })
}


onMounted(() => {

})
</script>

<template>
    <div class="account-box">
        <div class="form">
            <!-- 给表单组件model绑定form，rules绑定表单校验rules -->
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="70px" status-icon>
                <!-- 来到表单里的item组件，通过prop属性置顶表单校验的字段名 -->
                <el-form-item prop="username" label="账号">
                    <!-- 在input里使用v-model进行双向绑定 -->
                    <el-input v-model="form.username" placeholder="username" />
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input show-password
                              v-model="form.password"
                              placeholder="password">
                      </el-input>
                </el-form-item>
                <el-button size="large" class="subBtn" @click="doRegister">立即注册</el-button>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
/* 头像区域 */
/* 表单区域 */
.form {
    position: relative;
    margin-top:25vh;
    margin-left: -10px;
}

/* 头像上传组件 */
.avatar-uploader .avatar {
    position: relative;
    width: 140px;
    height: 120px;
    display: block;
}

.account-box {
    position: absolute;
    left: 60%;
    /* 调整 "account-box" 到竖线右边 */
    top: 0px;
}

.subBtn {
    background: white;
    margin-left: 30px;
    letter-spacing: 2px;
    border-radius: 20px;
    padding-left: 40px;
    padding-right: 40px;
    margin-top: 20px;
}

.subBtn:hover {
    border-color: #a100ff;
    color: #000;
}

/* 设置按钮点击后又不再聚焦时样式恢复原样 */
.subBtn:focus:not(.subBtn:hover) {
    border-color: #888888;
    color: #555555;
}
</style>

<style>
/* 上传头像 */
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}
</style>