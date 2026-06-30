<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useUserStore } from './stores/userStore';

onMounted(() => {
  const userStore = useUserStore()
  userStore.loadUser()
})
</script>

<template>
  <RouterView />
</template>
