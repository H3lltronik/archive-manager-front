<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core';
import { checkUser } from './api';
import { DARK_THEME } from './constants';
import { switchTheme } from './utils';

switchTheme(DARK_THEME);

onMounted(async () => {
  
});
</script>

<style>
</style>
