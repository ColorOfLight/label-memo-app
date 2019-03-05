<template lang="pug">
  .page-home
    label-list
    memo-list
    memo-detail
</template>

<script>
import LabelList from "@/components/LabelList";
import MemoList from "@/components/MemoList";
import MemoDetail from "@/components/MemoDetail";

export default {
  components: {
    'label-list': LabelList,
    'memo-list': MemoList,
    'memo-detail': MemoDetail,
  }
}
</script>

<style lang="scss" scoped>
.page-home {
  height: 100vh;
  position: relative;
  width: 100%;
}
</style>