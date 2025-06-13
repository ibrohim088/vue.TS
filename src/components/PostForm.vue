<template>
  <form @submit.prevent>
    <my-input v-focus v-model="post.title" type="text" placeholder="Название" />
    <my-input v-model="post.body" type="text" placeholder="Описание" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>