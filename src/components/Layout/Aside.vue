<template>
    <div class="aside">
        <el-button class="aside_button">
            <el-icon>
                <Plus />
            </el-icon>
            <span>SUBIR ARCHIVOS</span>
        </el-button>

        <el-checkbox-group class="aside_filters" v-model="filters" fill="#ff00FF">
            <el-checkbox :value="1" label="Archivos Nivel 1" text-color="#ff00FF" />
            <el-checkbox :value="2" label="Archivos Nivel 2" />
            <el-checkbox :value="3" label="Archivos Nivel 3" />
        </el-checkbox-group>
    </div>
</template>

<script setup lang="ts">
import {Plus} from '@element-plus/icons'
import { ref } from '@vue/reactivity'

const filters = ref([]);

</script>