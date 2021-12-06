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
            <el-row :gutter="20">
                <el-col :xs="24" :md="12" :lg="8" v-for="(item, index) in ((new Array(100)).fill(0).map(x => x))" :key="index">
                    <File/>
                </el-col>
            </el-row>
        </div>
        <div class="body_footer"></div>
    </div>
</template>

<script setup lang="ts">
import {Moon, Filter, List, Grid} from '@element-plus/icons'
import { ref } from '@vue/reactivity';
import { DARK_THEME } from '../../constants';
import { switchTheme } from '../../utils';
import File from '../Common/File.vue';

const showFilters = ref(false)

const toggleFilter = () => showFilters.value = !showFilters.value
const toggleTheme = () => switchTheme(DARK_THEME)
</script>