<template lang="pug">
  .memo-list(:class="{edit: isEditMode}")
    .memo-list-wrapper
      .memo-list-empty(v-if="!memos")
        .text 해당 라벨의 메모가 하나도 없습니다.
        .text 
          | 오른쪽 아래 버튼을 눌러
          br
          | 새 메모를 추가해보세요!
      .memo-list-item-container(v-else)
        .memo-list-item(v-for="(memo, key) in memos" key="Object.keys(memos)"
                          :class="{selected: selectedMemo === key}" @click="setSelectedMemo(key)")
          .checkbox-wrapper
            input.checkbox-custom(type="checkbox" v-model="selectedMemosList[key]")
            label
          .memo-list-item-wrapper
            .memo-list-item-title {{memo.title}}
            .memo-list-item-content {{memo.content}}
      a.btn-bottom-square.btn-memo-list-edit(v-if="!isEditMode" @click="toggleEditMode") 메모 편집하기
      a.btn-bottom-square.btn-memo-list-edit(v-else-if="isEditMode && !hasSelectedMemos" @click="toggleEditMode") 편집 완료하기
      a.btn-bottom-square.btn-memo-list-edit.warning(v-else) 선택한 메모 삭제하기
</template>

<script>
export default {
  data () {
    return {
      isEditMode: false,
      selectedMemosList: {},
    }
  },
  methods: {
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
    setSelectedMemo(key) {
      this.$store.commit('setSelectedMemo', key);
    },
  },
  computed: {
    memos: function () {
      return this.$store.state.memos;
    },
    selectedMemo: function () {
      return this.$store.state.selectedMemo;
    },
    hasSelectedMemos: function () {
      return this.selectedMemosList && Object.values(this.selectedMemosList).filter(item => item).length > 0;
    },
  }
}
</script>

<style lang="scss" scoped>
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
    position: relative;

    &:hover {
      cursor: pointer;
    }

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

    &.warning {
      background-color: $secondary;

      &:hover {
        background-color: darken($secondary, 10%);
      }
    }
  }

  .checkbox-wrapper {
    display: none;
    left: 1rem;
    position: absolute;
    top: .75rem;
  }

  .checkbox-custom {
    height: 1.5rem;
    width: 1.5rem;

    & + label:before {
      color: $gray-light;
      font-size: 1.5rem;
    }

    &:checked + label:before {
      color: $secondary;
    }
  }

  .memo-list-empty {
    padding: 3.5rem 1.5rem 0;
    width: 100%;

    .text {
      color: $gray-dark;
      font-size: 1.125rem;
      line-height: 1.5;
      text-align: center;
    }

    .text + .text {
      margin-top: 1rem;
    }
  }
}

.memo-list-wrapper {
  height: 100%;
  position: relative;
  width: 100%;
}

.memo-list.edit {
  .checkbox-wrapper {
    display: inline-block;
  }

  .memo-list-item {
    padding-left: 3rem;
  }
}
</style>