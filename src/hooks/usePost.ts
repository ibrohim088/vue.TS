import axios, { type AxiosResponse } from "axios";
import { ref, onMounted, type Ref } from 'vue';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UsePostsReturn {
  posts: Ref<Post[]>;
  isPostsLoading: Ref<boolean>;
  totalPages: Ref<number>;
  loadPosts: (page: number) => Promise<void>; // функция загрузки страницы
}

export function usePosts(limit: number): UsePostsReturn {
  const posts = ref<Post[]>([]);
  const totalPages = ref<number>(0);
  const isPostsLoading = ref<boolean>(false);

  const loadPosts = async (page: number , title = ''): Promise<void> => {
    isPostsLoading.value = true;
    try {
      const response: AxiosResponse<Post[]> = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: page,
          _limit: limit,
          title_likes: title || undefined
        } 
      });

      const totalCount = response.headers['x-total-count'];
      totalPages.value = Math.ceil(Number(totalCount || 100) / limit);
      posts.value = response.data;
    } catch (e) {
      alert('Ошибка загрузки постов');
    } finally {
      isPostsLoading.value = false;
    }
  }

  // Можно загрузить первую страницу автоматически
  onMounted(() => {
    loadPosts(1);
  });

  return {
    posts,
    isPostsLoading,
    totalPages,
    loadPosts,
  };
}
