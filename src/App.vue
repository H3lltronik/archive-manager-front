<template>
  <router-view />
</template>

<script setup lang="ts">
import { switchTheme } from './utils';

switchTheme('theme-dark')
</script>

<style>
</style>
