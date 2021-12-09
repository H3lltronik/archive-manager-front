<template>
  <el-row style="height: 100%" class="search-results">
    <el-col :span="12" style="position: relative;">
      <h1>Resultados por contenido</h1>
      <el-row :gutter="20" v-if="filesByContent.length > 0">
        <el-col
          :md="getOrderType == 'list' ? 24 : 24"
          v-for="(file, index) in filesByContent"
          :key="index"
        >
          <File :file="file" :class="{ 'file--row': getOrderType == 'list' }" />
        </el-col>
      </el-row>
      <Empty v-else/>
    </el-col>
    <el-col :span="12"
    style="border-left: 1px solid gray; padding-left: 15px; position: relative;">
      <h1>Resultados por nombre</h1>
      <el-row :gutter="20" v-if="filesByName.length > 0">
        <el-col
          :md="getOrderType == 'list' ? 24 : 24"
          v-for="(file, index) in filesByName"
          :key="index"
        >
          <File :file="file" :class="{ 'file--row': getOrderType == 'list' }" />
        </el-col>
      </el-row>
      <Empty v-else/>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "../../store";
import File from "../Common/File.vue";
import Empty from "../Common/Empty.vue";

export default defineComponent({
    setup() {
        const store = useStore(key);
        const loading = computed(() => store.state.loading);
        const getOrderType = computed(() => store.state.order);
        const filesByName = computed(() => store.getters.getFilteredFilesByName);
        const filesByContent = computed(() => store.getters.getFilteredFilesByContent);
        return {
            filesByContent,
            filesByName,
            loading,
            getOrderType,
        };
    },
    components: { File, Empty }
});
</script>