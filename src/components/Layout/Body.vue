<template>
  <div class="body">
    <div class="body_header">
      <div class="body_header_route">
        <span>INICIO > CARPETA NUEVA > ARCHIVOS</span>
      </div>
      <div class="body_header_buttons">
        <el-button type="text" :icon="Moon" @click="toggleTheme"
          >ACTIVAR MODO OSCURO</el-button
        >

        <div class="order" v-show="showFilters">
          <el-button
            :class="{ 'order--active': getOrderType == 'list' }"
            type="text"
            @click="() => changeOrderType('list')"
            :icon="List"
            >LISTA</el-button
          >
          <el-button
            :class="{ 'order--active': getOrderType == 'grid' }"
            type="text"
            @click="() => changeOrderType('grid')"
            :icon="Grid"
            >CUADRICULA</el-button
          >
        </div>

        <el-button type="text" :icon="Filter" @click="toggleFilter"
          >ORDENAR POR</el-button
        >
      </div>
    </div>
    <div class="body_content">
      <el-row :gutter="20">
        <el-col
          :xs="getOrderType == 'list' ? 24 : 24"
          :md="getOrderType == 'list' ? 24 : 12"
          :lg="getOrderType == 'list' ? 24 : 8"
          v-for="(item, index) in new Array(100).fill(0).map((x) => x)"
          :key="index"
        >
          <File :class="{ 'file--row': getOrderType == 'list' }" />
        </el-col>
      </el-row>
    </div>
    <div class="body_footer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Moon, Filter, List, Grid } from "@element-plus/icons";
import { computed } from "@vue/reactivity";
import { DARK_THEME } from "../../constants";
import { switchTheme } from "../../utils";
import File from "../Common/File.vue";
import { useStore } from "vuex";
import { key, orderType } from "../../store";

export default defineComponent({
  components: { Moon, Filter, List, Grid, File },
  setup() {
    const showFilters = ref(false);

    const toggleFilter = () => (showFilters.value = !showFilters.value);
    const toggleTheme = () => switchTheme(DARK_THEME);
    const store = useStore(key);

    const changeOrderType = (type: orderType) =>
      store.commit("changeOrderType", type);
    const getOrderType = computed(() => store.state.order);
    return {
      showFilters,
      toggleFilter,
      toggleTheme,
      changeOrderType,
      getOrderType,
    };
  },
});
</script>