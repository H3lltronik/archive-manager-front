<template>
    <div class="header">
        <div class="header_logo">
            <h1>Logo</h1>
        </div>

        <div class="header_search">
            <el-input v-model="input2" placeholder="Type something" :suffix-icon="Search"/>
        </div>

        <div class="header_account">
            <span>Account Name</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Calendar, Search } from '@element-plus/icons'
import { ref } from '@vue/reactivity';
const input2 = ref('')
</script>