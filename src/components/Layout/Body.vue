<template>
  <div class="body">
    <div class="body_header">
      <div class="body_header_route">
        <span>INICIO > CARPETA NUEVA > ARCHIVOS</span>
      </div>
      <div class="body_header_buttons">
        <ThemeSwitcher/>

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
      <el-row :gutter="20" v-if="files.length > 0">
        <el-col
          :xs="getOrderType == 'list' ? 24 : 24"
          :md="getOrderType == 'list' ? 24 : 12"
          :lg="getOrderType == 'list' ? 24 : 8"
          v-for="(item, index) in files"
          :key="index"
        >
          <File :class="{ 'file--row': getOrderType == 'list' }" />
        </el-col>
      </el-row>
      <el-empty v-else :image-size="200" description="nothing">
          <p class="empty">
              Parece que no hay archivos. <br>
              Da click en 'Subir Archivos' <br>o arrastra un archivo para empezar
            </p>
      </el-empty>
    </div>
    <div class="body_footer">
        <strong class="">
            0 ARCHIVOS
        </strong>
        <strong class="">
            0 ELEMENTOS SELECCIONADOS
        </strong>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Moon, Filter, List, Grid } from "@element-plus/icons";
import { computed } from "@vue/reactivity";
import File from "../Common/File.vue";
import { useStore } from "vuex";
import { key, orderType } from "../../store";
import ThemeSwitcher from "../Common/ThemeSwitcher.vue";

export default defineComponent({
  components: { File, ThemeSwitcher },
  setup() {
    const showFilters = ref(false);
    const store = useStore(key);
    const files = ref(new Array(0).fill(0).map((x) => x))

    const toggleFilter = () => (showFilters.value = !showFilters.value);

    const changeOrderType = (type: orderType) =>
      store.commit("changeOrderType", type);
    const getOrderType = computed(() => store.state.order);
    return {
      files,
      showFilters,
      toggleFilter,
      changeOrderType,
      getOrderType,
      Grid,
      Moon,
      Filter,
      List,
    };
  },
});
</script>