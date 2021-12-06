<template>
    <div class="body">
        <div class="body_header">
            <div class="body_header_route">
                <span>INICIO > CARPETA NUEVA > ARCHIVOS</span>
            </div>
            <div class="body_header_buttons">
                <el-button type="text" :icon="Moon" @click="toggleTheme">ACTIVAR MODO OSCURO</el-button>

                <div class="order" v-show="showFilters">
                    <el-button type="text" :icon="List">Lista</el-button>
                    <el-button type="text" :icon="Grid">Cuadricula</el-button>

                </div>

                <el-button type="text" :icon="Filter" @click="toggleFilter">ORDENAR POR</el-button>
            </div>
        </div>
        <div class="body_content">
            <router-view />
        </div>
        <div class="body_footer"></div>
    </div>
</template>

<script setup lang="ts">
import {Moon, Filter, List, Grid} from '@element-plus/icons'
import { ref } from '@vue/reactivity';
import { DARK_THEME } from '../../constants';
import { switchTheme } from '../../utils';

const showFilters = ref(false)

const toggleFilter = () => showFilters.value = !showFilters.value
const toggleTheme = () => switchTheme(DARK_THEME)
</script>