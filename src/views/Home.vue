<template lang="pug">
  .page-home
    label-list
    .memo-list
      .memo-list-wrapper
        .memo-list-item-container
          .memo-list-item
            .memo-list-item-title 제목 1
            .memo-list-item-content 본 프로그램은 라벨이 포함된 메모를 편집할 수 있는 프로그램입니다.
          .memo-list-item.selected
            .memo-list-item-title 제목 2
            .memo-list-item-content 본 프로그램은 라벨이 포함된 메모를 편집할 수 있는 프로그램입니다.
          .memo-list-item
            .memo-list-item-title 제목 3
            .memo-list-item-content 본 프로그램은 라벨이 포함된 메모를 편집할 수 있는 프로그램입니다.
        a.btn-bottom-sqaure.btn-memo-list-edit 메모 편집하기
    .memo-detail-container
      .memo-detail-title-card
        .memo-detail-title-title 제목 3
        .memo-detail-title-labels 라벨 1, 라벨 2
        .memo-detail-edit-container
          .memo-detail-edit-btn 편집하기
      .memo-detail-content-container
        |본 프로그램은 라벨이 포함된 메모를 편집할 수 있습니다.
        |내용을 편집하고 싶으시면 편집하기를 눌러 내용을 편집해주세요!
      a.btn-new-memo
        i.material-icons edit
</template>

<script>
import LabelList from "@/components/LabelList";

export default {
  components: {
    'label-list': LabelList,
  }
}
</script>

<style lang="scss" scoped>
.page-home {
  height: 100vh;
  position: relative;
  width: 100%;
}

.memo-list {
  background-color: $white;
  bottom: 0;
  box-shadow: $list-box-shadow;
  left: $label-list-width;
  position: absolute;
  top: 0;
  width: $memo-list-width;
  z-index: $z-memo-list;

  .memo-list-item {
    background-color: $white;
    border-bottom: 1px solid $border-color;
    padding: .75rem 1.5rem;

    &.selected {
      background-color: $primary-bg;

      .memo-list-item-title {
        color: $primary;
      }

      .memo-list-item-content {
        color: $primary-dark;
      }
    }
  }

  .memo-list-item-title {
    @include truncate;
    font-size: 1.125rem;
    font-weight: 600;
  }

  .memo-list-item-content {
    @include truncate;
    color: $gray;
    margin-top: .5rem;
  }

  .btn-memo-list-edit {
    background-color: $primary;
    bottom: 1.5rem;
    color: $white;
    left: 1.5rem;
    position: absolute;
    right: 1.5rem;

    &:hover {
      background-color: darken($primary, 10%);
    }
  }
}

.memo-list-wrapper {
  height: 100%;
  position: relative;
  width: 100%;
}

.memo-detail-container {
  background-color: $bg-color;
  height: 100%;
  padding: 1.5rem;
  padding-left: $label-list-width + $memo-list-width + 1.5rem;
  width: 100%;
  z-index: $z-memo-detail;

  .memo-detail-title-card {
    background-color: $white;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    box-shadow: $card-box-shadow;
    padding: 1rem 1.5rem;
    position: relative;
  }

  .memo-detail-title-title {
    font-size: 2rem;
    font-weight: 800;
  }

  .memo-detail-title-labels {
    color: $gray;
    margin-top: .125rem;
  }

  .memo-detail-edit-container {
    margin-top: .5rem;
    position: relative;
    text-align: right;
  }

  .memo-detail-edit-btn {
    color: $secondary;
    font-weight: 600;
    display: inline-block;
  }

  .memo-detail-content-container {
    background-color: $white;
    border: 1px solid $border-color;
    line-height: 1.5;
    margin-top: -1rem;
    padding: 2.5rem 1.5rem 1.5rem;
  }

  .btn-new-memo {
    background-color: $primary;
    border-radius: 2rem;
    bottom: 2rem;
    box-shadow: $btn-box-shadow;
    color: $white;
    height: 4rem;
    padding: 1rem;
    position: absolute;
    right: 2.5rem;
    width: 4rem;

    .material-icons {
      font-size: 2rem;
    }
  }
}
</style>