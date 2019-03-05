<template lang="pug">
  .label-list(:class="{edit: isEditMode}")
    .label-list-wrapper
      .label-list-title 라벨 리스트
      .label-list-item-container
        .label-list-item.total
          | 전체 보기
          span.number ({{totalMemosLength}})
        .label-list-item(v-for="(label, key) in labels" key="Object.keys(labels)")
          .checkbox-wrapper
            input.checkbox-custom(type="checkbox" v-model="selectedLabels[key]")
            label
          | {{label.name}}
          span.number ({{label.memos.length}})
      a.btn-bottom-square.btn-label-edit(v-if="!isEditMode" @click="toggleEditMode") 라벨 편집하기
      a.btn-bottom-square.btn-label-edit(v-else-if="isEditMode && !hasSelectedLabels" @click="toggleEditMode") 편집 완료하기
      a.btn-bottom-square.btn-label-edit.warning(v-else @click="removeSelectedLabels") 선택한 라벨 삭제하기
</template>

<script>
export default {
  data () {
    return {
      isEditMode: false,
      selectedLabels: {},
      labels: this.$store.state.labels
    }
  },
  computed: {
    totalMemosLength: function () {
      return Object.keys(this.$store.state.memos).length;
    },
    hasSelectedLabels: function () {
      return Object.values(this.selectedLabels).filter(item => item).length > 0;
    },
  },
  methods: {
    toggleEditMode () {
      this.isEditMode = !this.isEditMode;
    },
    removeSelectedLabels() {
      // TODO
    },
  }
}
</script>

<style lang="scss" scoped>
.label-list {
  background-color: $primary;
  box-shadow: $list-box-shadow;
  color: $white;
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
  width: $label-list-width;
  z-index: $z-label-list;

  .label-list-title {
    padding: 1rem 1.5rem 0;
  }

  .label-list-item-container {
    margin-top: .5rem;
  }

  .label-list-item {
    font-size: 2rem;
    font-weight: 800;
    padding: .375rem 1.5rem;

    .number {
      font-size: 1.125rem;
      font-weight: 600;
      margin-left: .375rem;
      vertical-align: middle;
    }

    &.selected {
      background-color: $white;
      border-bottom-right-radius: .5rem;
      border-top-right-radius: .5rem;
      color: $primary;
    }
  }

  .label-list-item-checkbox {
    display: inline-block;
    margin-right: .75rem;
    vertical-align: middle;

    .material-icons {
      color: $white;
      font-size: 1.75rem;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .btn-label-edit {
    bottom: 1.5rem;
    left: 1.5rem;
    position: absolute;
    right: 1.5rem;
  }

  .checkbox-wrapper {
    display: none;
  }
}

.label-list.edit {
  .label-list-item.total {
    margin-left: 2.75rem;
  }

  .checkbox-wrapper {
    display: inline-block;
  }
}

.label-list-wrapper {
  height: 100%;
  position: relative;
  width: 100%;
}

.checkbox-wrapper {
  margin-right: .75rem;
}
</style>