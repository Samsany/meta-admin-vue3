<template>
  <a-card title="基本设置" :bordered="false">
    <span>敬请期待！</span>
    <!--    <a-row :gutter="24">-->
    <!--      <a-col :span="14">-->
    <!--        <BasicForm @register="register" />-->
    <!--      </a-col>-->
    <!--      <a-col :span="10">-->
    <!--        <div class="change-avatar">-->
    <!--          <div class="mb-2">头像</div>-->
    <!--          <CropperAvatar-->
    <!--            :uploadApi="uploadApi"-->
    <!--            :value="avatar"-->
    <!--            btnText="更换头像"-->
    <!--            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"-->
    <!--            @change="updateAvatar"-->
    <!--            width="150"-->
    <!--          />-->
    <!--        </div>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--    <a-button type="primary" @click="handleSubmit"> 更新基本信息 </a-button>-->
  </a-card>
</template>

<script lang="ts" setup name="BaseSetting">
import { onMounted } from 'vue'

// const [register, { setFieldsValue }] = useForm({
//   labelWidth: 120,
//   schemas: baseSettingSchemas,
//   showActionButtonGroup: false
// })

onMounted(async () => {
  // const data = await accountInfoApi()
  // await setFieldsValue({})
})

// const avatar = computed(() => {
//   const { avatar } = userStore.getUserInfo
//   console.log(avatar)
//   return avatar || headerImg
// })
//
// function updateAvatar({ src, data }) {
//   const userinfo = userStore.getUserInfo
//   userinfo.avatar = src
//   userStore.setUserInfo(userinfo)
//   console.log('data', data)
// }
//
// function handleSubmit() {
//   createMessage.success('更新成功！')
// }
</script>

<style lang="less" scoped>
.account-setting {
  margin: 12px;
  background-color: @component-background;

  .base-title {
    padding-left: 0;
  }

  .ant-tabs-tab-active {
    background-color: @item-active-bg;
  }
}
</style>
