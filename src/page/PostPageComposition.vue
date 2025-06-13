<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePosts } from '../hooks/usePost';
import PostList from '../components/PostList.vue';
import MyInput from '../components/UI/MyInput.vue';
import MYbtn from '../components/UI/MYbtn.vue';

interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

const route = useRoute();
const router = useRouter();
const limit = 10;

const searchQuery = ref<string>((route.query.search as string) || '');
const page = ref<number>(Number(route.query.page) || 1);

const { posts, totalPages, isPostsLoading, loadPosts } = usePosts(limit);

const observer = ref<HTMLElement | null>(null);
let intersectionObserver: IntersectionObserver | null = null;

const loadPage = async () => {
  await loadPosts(page.value, searchQuery.value);
};

watch(searchQuery, (newSearch) => {
  page.value = 1;
  router.replace({ query: { search: newSearch, page: '1' } });
  
  loadPage();
});

watch(page, (newPage) => {
  router.replace({ query: { search: searchQuery.value, page: newPage.toString() } });
  loadPage();
});

onMounted(async () => {
  await loadPage();

  if (observer.value) {
    intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && searchQuery.value && !isPostsLoading.value) {
        page.value++;
      }
    });
    intersectionObserver.observe(observer.value);
  }
});

onUnmounted(() => {
  if (intersectionObserver) {
    intersectionObserver.disconnect();
  }
});

const goToPage = (pageNumber: number) => {
  if (pageNumber !== page.value) {
    page.value = pageNumber;
  }
};

const removePost = (post: Post): void => {
  const index = posts.value.findIndex((p) => p.id === post.id);
  if (index !== -1) {
    posts.value.splice(index, 1);
  }
};
</script>

<template>
  <div>
    <h1>Страница с постами</h1>

    <MyInput v-model="searchQuery" placeholder="Поиск..." />

    <post-list :posts="posts" @remove="removePost" v-if="!isPostsLoading" />

    <div class="page__wrapper" v-if="!searchQuery && totalPages > 1">
      <MYbtn
        class="page"
        :class="{ 'current-page': page === p }"
        v-for="p in totalPages"
        :key="p"
        @click="goToPage(p)"
      >
        {{ p }}
      </MYbtn>
    </div>

    <div v-else>Идет загрузка...</div>

    <div v-show="!isPostsLoading && searchQuery" ref="observer" class="observer"></div>
  </div>
</template>

<style scoped>
.page__wrapper {
  display: flex;
  gap: 20px;
  margin-top: 15px;
  justify-content: center;
}

.page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: green;
}
</style>
