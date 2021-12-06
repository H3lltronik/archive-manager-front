<template>
  <router-view />
</template>

<script setup lang="ts">
import { DARK_THEME } from './constants';
import { switchTheme } from './utils';

switchTheme(DARK_THEME)
</script>

<style>
</style>
