<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <HoverContainer class="px-12px">
      <NAvatar round>Name</NAvatar>
      <span class="pl-8px text-16px font-medium">UserName</span>
    </HoverContainer>
  </n-dropdown>
</template>

<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui';
import { useIconRender } from '@/composables';

defineOptions({
  name: 'UserAvatar',
});

const { iconRender } = useIconRender();

enum EnumDropDownkey {
  UserCenter = 'user-center',
  Logout = 'logout',
}

const options: DropdownOption[] = [
  {
    label: '用户中心',
    key: EnumDropDownkey.UserCenter,
    icon: iconRender({ icon: 'line-md:account' }),
  },
  {
    type: 'divider',
    key: 'divider',
  },
  {
    label: '退出登录',
    key: EnumDropDownkey.Logout,
    icon: iconRender({ icon: 'carbon:logout' }),
  },
];

function handleSelect(key: EnumDropDownkey) {
  if (key === EnumDropDownkey.Logout) {
    window.$dialog?.info({
      title: '提示',
      content: '您确定要退出登录吗？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        // TODO
      },
    });
  }
}
</script>

<style lang="scss" scoped></style>
