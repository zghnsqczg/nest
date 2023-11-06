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
  </el-form>
</template>

<script setup lang="ts">
import { useRequest } from "alova";
import http from "@/utils/request";
import { json } from "stream/consumers";
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
onMounted(() => {});
// const getCode = () => {

// };

const restCode = () => {
  codeUrl.value = codeUrl.value + "?" + Math.random();
};
</script>

<style></style>
