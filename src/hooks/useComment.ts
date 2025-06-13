import { ref, type Ref } from 'vue'
import axios from 'axios'

interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export function useComments(postId: number, limit = 2) {
  const comments: Ref<Comment[]> = ref([])
  const isLoading = ref(false)
  const hasMore = ref(true)
  const page = ref(1)

  const loadComments = async () => {
    if (isLoading.value || !hasMore.value) return

    isLoading.value = true
    try {
      const response = await axios.get<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        {
          params: {
            _page: page.value,
            _limit: limit
          }
        }
      )

      if (response.data.length < limit) {
        hasMore.value = false
      }

      comments.value.push(...response.data)
      page.value++
    } catch (e) {
      alert('Ошибка загрузки комментариев')
    } finally {
      isLoading.value = false
    }
  }

  return {
    comments,
    isLoading,
    loadComments,
    hasMore
  }
}
