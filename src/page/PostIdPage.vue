<template>
  <div>
    <h1>Это страница поста с ID = {{ postId }}</h1>
    <div v-if="loading">Загрузка комментариев...</div>
    <div v-else>
      <h2>Комментарии:</h2>
      <ul>
        <li v-for="comment in comments" :key="comment.id">
          <strong>{{ comment.name }}</strong>: {{ comment.body }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Тип для комментария
interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

const route = useRoute()
const postId = route.params.id as string

const comments = ref<Comment[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    if (!res.ok) throw new Error('Ошибка загрузки')
    const data: Comment[] = await res.json()
    comments.value = data
  } catch (err) {
    console.error('Ошибка при загрузке комментариев:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
ul {
  padding-left: 1rem;
}
li {
  margin-bottom: 0.5rem;
}
</style>
