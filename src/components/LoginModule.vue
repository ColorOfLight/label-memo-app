<template lang="pug">
  .login-container
    .login-wrapper
      .login-title(v-if="mode === 'signup'") 메모 앱 시작하기
      .login-title(v-else) 메모 앱 로그인하기
      .login-input-wrapper
        .login-input-label 이메일
        input.login-input(type="text")
      .login-input-wrapper
        .login-input-label 비밀번호
        input.login-input(type="password")
      .login-btn-wrapper
        a.btn.btn-finish(v-if="mode === 'signup'") 회원 가입
        a.btn.btn-finish(v-else) 로그인
      .login-comment(v-if="mode === 'signup'")
        | 이미 가입한 회원이시면 
        router-link(to="/login").link-accent 로그인
        |  하세요!
      .login-comment(v-else)
        | 처음 사용하시는 분들은 
        router-link(to="/signup").link-accent 회원가입
        | 하세요!
</template>

<script>
export default {
  props: [
    'mode',
  ],
}
</script>

<style lang="scss" scoped>

.login-container {
  @include content-center;
  width: 30rem;
}

.login-wrapper {
  position: relative;
  width: 100%;
}

.login-title {
  color: $white;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
}

.login-input-wrapper {
  & + .login-input-wrapper {
    margin-top: 1.5rem;
  }
}

.login-input-label {
  color: $white;
  font-weight: 600;
  padding-bottom: .375rem;
}

.login-input {
  border: 0;
  box-shadow: $btn-box-shadow;
  font-size: 2rem;
  font-weight: 600;
  height: 3.5rem;
  padding: 0 .75rem;
  width: 100%;
}

.login-btn-wrapper {
  margin-top: 2.25rem;
  text-align: right;

  .btn-finish {
    background-color: $white;
    border-radius: .5rem;
    box-shadow: $btn-box-shadow;
    color: $primary;
    display: inline-block;
    font-size: 1.125rem;
    font-weight: 800;
    height: 3rem;
    line-height: 3rem;
    padding: 0 2.75rem;

    &:hover {
      background-color: $primary-bg;
    }
  }
}

.login-comment {
  color: $primary-bg;
  font-size: 1.125rem;
  font-weight: 400;
  margin-top: 4rem;
  text-align: center;

  .link-accent {
    color: $white;
    font-weight: 700;
    text-decoration: underline;
  }
}
</style>