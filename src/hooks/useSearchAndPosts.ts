import { ref, computed, type Ref, type ComputedRef } from 'vue'

interface Post {
  title: string
  [key: string]: string | number | undefined
}

interface UseSearchedPostsReturn {
  searchQuery: Ref<string>
  searchedPosts: ComputedRef<Post[]>
}

export default function useSearchedPosts(posts: Ref<Post[]>): UseSearchedPostsReturn {
  const searchQuery = ref<string>('')

  const searchedPosts = computed(() => {
    return posts.value.filter(post =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  return {
    searchQuery,
    searchedPosts,
  }
}