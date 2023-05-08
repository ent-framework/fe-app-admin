<template>
  <Login :mobile-login-enable="false" />
</template>
<!--示例，如何定制登录界面-->
<script lang="ts">
  import { Login } from 'fe-ent-login';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'CustomLogin',
    components: { Login },
  });
</script>
