<template>
  <div class="body">
    <div class="body_header">
      <div class="body_header_route"></div>
      <div class="body_header_buttons">
        <ThemeSwitcher />

        <div class="order" v-show="showFilters">
          <el-button
            :class="{ 'order--active': getOrderType == 'list' }"
            type="text"
            @click="() => changeOrderType('list')"
            :icon="List"
            >
              <span class="hide-mobile">LISTA</span>
            </el-button
          >
          <el-button
            :class="{ 'order--active': getOrderType == 'grid' }"
            type="text"
            @click="() => changeOrderType('grid')"
            :icon="Grid"
            >
              <span class="hide-mobile">CUADRICULA</span>
            </el-button
          >
        </div>

        <el-button type="text" :icon="Filter" @click="toggleFilter"
          >
            <span class="hide-mobile">ORDENAR POR</span>
          </el-button
        >
      </div>
    </div>
    <div class="body_content" v-loading="loading">
      <SearchResults v-if="searchMode"/>
      <div class="" v-else>
        <el-row :gutter="20" v-if="allFiles.length > 0">
          <el-col
            :xs="getOrderType == 'list' ? 24 : 24"
            :md="getOrderType == 'list' ? 24 : 12"
            :lg="getOrderType == 'list' ? 24 : 8"
            v-for="(file, index) in allFiles"
            :key="index"
          >
            <File
              :file="file"
              :class="{ 'file--row': getOrderType == 'list' }"
            />
          </el-col>
        </el-row>
        <Empty v-else/>
      </div>
    </div>
    <BodyFooter/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { Moon, Filter, List, Grid } from "@element-plus/icons";
import { computed } from "@vue/reactivity";
import File from "../Common/File.vue";
import { useStore } from "vuex";
import { key, orderType } from "../../store";
import ThemeSwitcher from "../Common/ThemeSwitcher.vue";
import SearchResults from "./SearchResults.vue";
import BodyFooter from "./BodyFooter.vue";
import Empty from "../Common/Empty.vue";

export default defineComponent({
  components: { File, ThemeSwitcher, SearchResults, BodyFooter, Empty },
  setup() {
    const showFilters = ref(false);
    const store = useStore(key);
    const loading = computed(() => store.state.loading);
    const searchMode = computed(() => store.state.searchMode);

    const allFiles = computed(() => store.getters.getFilteredFiles);
    onMounted(async () => {
      store.dispatch("fetchAllFiles");
    });

    const toggleFilter = () => (showFilters.value = !showFilters.value);

    const changeOrderType = (type: orderType) =>
      store.commit("changeOrderType", type);
    const getOrderType = computed(() => store.state.order);
    return {
      allFiles,
      loading,
      showFilters,
      toggleFilter,
      changeOrderType,
      searchMode,
      getOrderType,
      Grid,
      Moon,
      Filter,
      List,
    };
  },
});
</script>