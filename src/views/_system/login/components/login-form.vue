<template>
  <div class="w-300px sm:w-360px shadow-sm hover:shadow p-20px">
    <div class="mb-20px flex flex-center">
      <icon-custom-logo class="text-40px color-primary" />
      <h2 class="color-primary text-20px font-bold ml-6px">{{ app.name }}</h2>
    </div>
    <NForm ref="formRef" :model="form" :rules="rules" :show-label="false">
      <NFormItem path="username">
        <NInput v-model:value="form.username" placeholder="请输入用户名">
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
        <n-button type="primary" :loading="auth.loginLoading" @click="goLoginHandle">登录</n-button>
      </div>
    </NForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useAppStore, useAuthStore } from '@/store';
import type { FormInst, FormRules } from 'naive-ui';

defineOptions({
  name: 'LoginForm',
});

const app = useAppStore();
const auth = useAuthStore();

const formRef = ref<HTMLElement & FormInst>();

const form = reactive({
  username: 'admin',
  password: 'gypsophila',
});

const rules: FormRules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur',
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  },
};

const rememberMe = ref(false);

async function goLoginHandle() {
  try {
    await formRef.value?.validate();
    const { username, password } = form;
    auth.login(username, password);
  } catch (error) {}
}
</script>

<style lang="scss" scoped></style>
