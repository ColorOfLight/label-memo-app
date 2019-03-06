<template lang="pug">
  .memo-detail-container(:class="{edit: isEditMode}")
    .memo-detail-title-card
      .memo-detail-title-title  
      input.memo-detail-title-input(v-model="title")
      .memo-detail-title-labels 라벨 없음
      .memo-detail-edit-container(v-if="selectedMemo")
        a.memo-detail-edit-btn(@click="toggleEditMode") 편집하기
        .memo-detail-editing 편집 중
    .memo-detail-content-container(v-if="!selectedMemo")
      | 본 프로그램은 라벨이 포함된 메모를 편집할 수 있습니다.
      br
      br
      | 오른쪽 아래 버튼을 눌러 새 메모를 추가해보세요!
    textarea.memo-detail-content-textarea(v-model="content")
    .memo-detail-btn-wrapper
      a.btn.memo-detail-finish-btn(@click="uploadMemo") 편집 완료

    a.btn-new-memo(@click="isEditMode = true")
      i.material-icons edit
</template>

<script>
export default {
  data () {
    return {
      isEditMode: false,
      content: '',
      title: '',
    }
  },
  methods: {
    toggleEditMode () {
      this.isEditMode = !this.isEditMode;
    },
    uploadMemo () {
      this.$store.dispatch("uploadMemo", {
        title: this.title,
        content: this.content,
        labels: [],
        timestamp: (new Date).getTime(),
      });
      this.isEditMode = false;
      this.content = '';
      this.title = '';
    }
  },
  computed: {
    selectedMemo () {
      return this.$store.state.selectedMemo;
    }
  },
}
</script>

<style lang="scss" scoped>
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

    &:hover {
      color: darken($secondary, 10%);
      cursor: pointer;
    }
  }

  .memo-detail-editing {
    color: $gray-light;
    font-weight: 600;
    display: none;
  }

  .memo-detail-content-container,
  .memo-detail-content-textarea {
    background-color: $white;
    border: 1px solid $border-color;
    font-size: 1rem;
    line-height: 1.5;
    margin-top: -1rem;
    padding: 2.5rem 1.5rem 1.5rem;
    width: 100%;
  }

  .memo-detail-content-textarea {
    display: none;
    margin-top: .5rem;
    padding-top: 1.5rem;
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

    &:hover {
      background-color: darken($primary, 10%);
      cursor: pointer;
    }

    .material-icons {
      font-size: 2rem;
    }
  }

  .memo-detail-title-input {
    border: 0;
    border-bottom: 2px solid $gray-lighter;
    font-size: 2rem;
    font-weight: 800;
    display: none;
    margin-bottom: .75rem;
    padding-bottom: .125rem;
  }

  .memo-detail-btn-wrapper {
    margin-top: 1rem;
    text-align: right;
  }

  .memo-detail-finish-btn {
    background-color: $white;
    border: 1px solid $primary;
    border-radius: .5rem;
    color: $primary;
    display: none;
    font-weight: 500;
    line-height: 2.5rem;
    height: 2.5rem;
    padding: 0 2rem;
    text-align: center;

    &:hover {
      background-color: $primary-bg;
    }
  }
}

.memo-detail-container.edit {
  .memo-detail-title-title {
    display: none;
  }

  .memo-detail-title-input {
    display: block;
  }

  .memo-detail-edit-btn {
    display: none;
  }

  .memo-detail-editing {
    display: inline-block;
  }

  .memo-detail-content-container {
    display: none;
  }

  .memo-detail-content-textarea {
    display: block;
  }

  .memo-detail-finish-btn {
    display: inline-block;
  }
}
</style>