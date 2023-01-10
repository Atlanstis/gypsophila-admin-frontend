<template>
  <div class="w-300px sm:w-360px shadow-sm hover:shadow p-20px">
    <div class="mb-20px flex flex-center">
      <icon-custom-logo class="text-40px color-primary" />
      <h2 class="color-primary text-20px font-bold ml-6px">{{ app.name }}</h2>
    </div>
    <NForm ref="formRef" :model="form" :show-label="false">
      <NFormItem path="userName">
        <NInput v-model:value="form.userName" placeholder="请输入用户名">
          <template #prefix>
            <icon-line-md-account class="text-16px" />
          </template>
        </NInput>
      </NFormItem>
      <NFormItem path="password">
        <n-input
          v-model:value="form.password"
          type="password"
          show-password-on="click"
          placeholder="请输入密码"
        >
          <template #prefix>
            <icon-ri-lock-password-line class="text-16px" />
          </template>
        </n-input>
      </NFormItem>
      <div class="justify-between flex-y-center">
        <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
        <n-button type="primary" :loading="loginLoading" @click="goLoginHandle">登录</n-button>
      </div>
    </NForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useBoolean } from '@/hooks';
import { useAppStore } from '@/store';

defineOptions({
  name: 'LoginForm',
});

const app = useAppStore();

const form = reactive({
  userName: '',
  password: '',
});

const rememberMe = ref(false);
const {
  bool: loginLoading,
  setTrue: setLoginLoadingTrue,
  setFalse: setLoginLoadingFalse,
} = useBoolean(false);

function goLoginHandle() {
  setLoginLoadingTrue();
  setTimeout(() => {
    setLoginLoadingFalse();
  }, 1000);
}
</script>

<style lang="scss" scoped></style>
