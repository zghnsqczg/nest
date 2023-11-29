<template>
  <el-form
    :model="form"
    ref="ruleFormRef"
    style="width: 365px"
    label-width="100px"
  >
    <el-form-item label="账号">
      <el-input v-model="form.account" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item label="验证码">
      <div class="w-full flex gap-[10px]">
        <el-input v-model="form.code" class="flex-1" />
        <img
          class="w-[100px] h-[34px]] cursor-pointer"
          @click="restCode"
          :src="codeUrl"
          alt=""
        />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm(ruleFormRef)">登陆</el-button>
    </el-form-item>
    <el-button @click="downLoad">下载</el-button>
    <el-button @click="()=>immediate=!immediate">{{ immediate?'发送':'手动' }}</el-button>
    <el-button @click="handleAddTodo">发送</el-button>
    <!-- <div>
      <el-tag
      v-for="tag in list"
      :key="tag.name"
      class="mx-1"
      closable
      :type="tag.type"
    >
    {{ tag.name }}
    </el-tag>
    </div> -->
  </el-form>
</template>

<script setup lang="ts">
import { useRequest } from "alova";
import http from "@/utils/request";
import axios from "axios";
type formType = {
  account: string;
  password: string;
  code: string;
};
const form = ref<formType>({
  account: "",
  password: "",
  code: "",
});
const codeUrl = ref("/api/user/code");
const ruleFormRef = ref();

const immediate=ref(false)


const {
  // ...
  // 手动发送器请求的函数，调用后发送请求
  send: addTodo
} = useRequest(() => http.Get('/user/list',), {
  // 当immediate为false时，默认不发出
  immediate:immediate.value,
});
// 手动发送请求
const handleAddTodo =async () => {
  // send函数返回一个Promise对象，可接收响应数据
const data=  await  addTodo()

console.log(`output->res`,data)
};

const submitForm = (formEl: any) => {
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      const { onSuccess }: any = useRequest(
        http.Post("/user/create", form.value, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
      );
      onSuccess(({ data }: any) => {
        if (data.code !== 200) {
          restCode();
        }
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
const downLoad=async()=>{
  const {data}=await axios({
    method:'get',
    url:'/api/upload/stream',
    responseType: 'blob',
  })
 if(data.size){
    console.log(`output->data`,data)
    const urlDownload = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = urlDownload;
    link.setAttribute('download', '11.png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
 }
}
onMounted(() => {});
const restCode = () => {
  codeUrl.value = codeUrl.value + "?" + Math.random();
};
</script>

<style></style>
