<template lang="pug">
  .label-list(:class="{edit: isEditMode}")
    .label-list-wrapper
      .label-list-title 라벨 리스트
      .label-list-item-container
        .label-list-item.total(:class="{selected: !selectedLabel}" @click="setSelectedLabel('')")
          | 전체 보기
          span.number ({{totalMemosLength}})
        .label-list-item(v-for="(label, key) in labels" key="Object.keys(labels)"
                          :class="{selected: selectedLabel === key}" @click="setSelectedLabel(key)")
          .checkbox-wrapper
            input.checkbox-custom(type="checkbox" v-model="selectedLabels[key]")
            label
          | {{label.name}}
          span.number ({{label.memos.length}})
        .label-list-input-wrapper(v-if="isAddMode")
            input.label-list-input(type="text" v-model="newLabelName" @keyup.enter="addNewLabel")
            a.label-list-input-cancel(@click="resetAddMode")
              i.material-icons close
            .label-list-input-comment 입력 후 Enter 키를 눌러주세요
      .label-btn-add-wrapper(v-if="!isAddMode")
        a.btn.btn-label-add(@click="isAddMode = !isAddMode")
          i.material-icons add
          | 라벨 추가하기
      a.btn-bottom-square.btn-label-edit(v-if="!isEditMode" @click="toggleEditMode") 라벨 편집하기
      a.btn-bottom-square.btn-label-edit(v-else-if="isEditMode && !hasSelectedLabels" @click="toggleEditMode") 편집 완료하기
      a.btn-bottom-square.btn-label-edit.warning(v-else @click="removeSelectedLabels") 선택한 라벨 삭제하기
</template>

<script>
export default {
  data () {
    return {
      isEditMode: false,
      isAddMode: false,
      selectedLabels: {},
      // labels: this.$store.state.labels,
      newLabelName: '',
    }
  },
  computed: {
    labels: function () {
      return this.$store.state.labels;
    },
    selectedLabel: function() {
      return this.$store.state.selectedLabel;
    },
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
    resetAddMode() {
      this.newLabelName = "";
      this.isAddMode = false;
    },
    addNewLabel() {
      this.$store.dispatch("addNewLabel", this.newLabelName);
    },
    setSelectedLabel(key) {
      this.$store.commit("setSelectedLabel", key);
    }
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

    &:hover {
      cursor: pointer;
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

  .label-btn-add-wrapper {
    margin-top: 3rem;
    padding-right: 1.5rem;
    text-align: right;
  }

  .btn-label-add {
    background-color: $primary;
    border: 1px solid $white;
    border-radius: .5rem;
    color: $white;
    display: inline-block;
    font-weight: 600;
    height: 2.25rem;
    line-height: 2.25rem;
    padding: 0 1rem 0 .75rem;

    &:hover {
      border-color: $primary-bg;
      color: $primary-bg;
    }

    .material-icons {
      font-size: 1.25rem;
      margin-right: .5rem;
      vertical-align: sub;
    }
  }

  .label-list-input-wrapper {
    padding: 0.5rem 1.5rem;
    padding-right: 3.5rem;
    position: relative;
  }

  .label-list-input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px solid $white;
    color: $white;
    font-size: 2rem;
    font-weight: 600;
    width: 100%;
  }

  .label-list-input-cancel {
    position: absolute;
    top: 1rem;
    right: 1.5rem;

    &:hover {
      cursor: pointer;
    }
  }

  .label-list-input-comment {
    font-size: 0.875rem;
    font-weight: 400;
    margin-top: .25rem;
    text-align: right;
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