<template>
  <div class="body_footer">
    <strong class=""> {{ totalFiles }} ARCHIVOS </strong>

    <div class="">
      <el-button
        style="margin-right: 10px"
        type="default"
        v-if="selectedFiles.length > 0"
        :icon="Delete"
      >
        <span>BORRAR</span>
      </el-button>
      <router-link :to="ROUTES.ANALISIS.route">
        <el-button
          style="margin-right: 10px"
          type="default"
          v-if="searchMode"
          :icon="FullScreen"
        >
          <span>ANALIZAR</span>
        </el-button>
      </router-link>
      <strong class="">
        {{ selectedFiles.length }} ELEMENTOS SELECCIONADOS
      </strong>
    </div>
  </div>
</template>

<script lang="ts">
import { Delete, FullScreen } from "@element-plus/icons";
import { computed, defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { ROUTES } from "../../constants";
import { key } from "../../store";

export default defineComponent({
  components: {},
  setup() {
    const store = useStore(key);
    const selectedFiles = computed(() => store.state.selectedFiles);
    const searchMode = computed(() => store.state.searchMode);

    const allFiles = computed(() => store.getters.getFilteredFiles);
    const filesByName = computed(() => store.getters.getFilteredFilesByName);
    const filesByContent = computed(
      () => store.getters.getFilteredFilesByContent
    );

    let totalFiles = ref(0);
    watchEffect(() => {
      if (searchMode.value) {
        totalFiles.value =
          filesByContent.value.length + filesByName.value.length;
      } else {
        totalFiles.value = allFiles.value.length;
      }
    });

    return {
      selectedFiles,
      totalFiles,
      Delete,
      FullScreen,
      ROUTES,
      searchMode,
    };
  },
});
</script>