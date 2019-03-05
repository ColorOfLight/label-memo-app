<template lang="pug">
  .page-login
    a.btn.btn-login(@click="signIn") 구글 아이디로 로그인하기
</template>

<script>
import firebase from 'firebase';

export default {
  methods: {
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then((res) => {
        const uid = res.user && res.user.uid;
        this.$store.commit('setUid', res.user.uid);
        this.$router.push({name: 'home'});
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.page-login {
  background-color: $bg-color;
  height: 100vh;
  position: relative;
  width: 100%;
}

.btn-login {
  @include content-center;
  background-color: $primary;
  border-radius: 1rem;
  color: $white;
  font-size: 2rem;
  height: 4rem;
  line-height: 4rem;
  padding: 0 2.5rem;

  &:hover {
    background-color: darken($primary, 10%);
  }
}
</style>