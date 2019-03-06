<template lang="pug">
  .page-signup
    login-module(mode="signup")
</template>

<script>
import firebase from 'firebase';

import LoginModule from '@/components/LoginModule';

export default {
  components: {
    'login-module': LoginModule,
  },
}
</script>

<style lang="scss" scoped>
.page-signup {
  background-color: $primary;
  height: 100vh;
  position: relative;
  width: 100%;
}
</style>