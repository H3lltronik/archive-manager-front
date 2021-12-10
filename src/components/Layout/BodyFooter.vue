<template>
  <div class="body_footer">
    <strong class=""> {{ totalFiles }} ARCHIVOS </strong>

    <div class="body_footer_actions">
      <el-button
        style="margin-right: 10px"
        type="default"
        v-if="selectedFiles.length > 0"
        @click="deleteArchive"
        :icon="Delete"
      >
        <span class="hide-mobile">BORRAR</span>
      </el-button>
      <router-link :to="ROUTES.ANALISIS.route">
        <el-button
          style="margin-right: 10px"
          type="default"
          v-if="searchMode"
          :icon="FullScreen"
        >
          <span class="hide-mobile">ANALIZAR</span>
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
import { ElMessageBox } from "element-plus";
import { computed, defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { deleteFile } from "../../api";
import { ROUTES } from "../../constants";
import { showNotification } from "../../notifications";
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

    const goToAnalisis = () => {
      const URL = ROUTES.ANALISIS.route;
      const strWindowFeatures = `location=yes,height=${window.innerHeight},width=${window.innerWidth},scrollbars=yes,status=yes`;
      window.open(URL, "_blank", strWindowFeatures);
    };
    const deleteArchive = () => {
      ElMessageBox.confirm(
        "Estas seguro de que deseas eliminar?",
        "Confirmar accion",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          store.dispatch("deleteSelectedFiles");
          showNotification("Hecho", "Se estan borrando los archivos", "info");
        })
        .catch(() => {});
    };

    return {
      selectedFiles,
      totalFiles,
      Delete,
      FullScreen,
      ROUTES,
      searchMode,
      deleteArchive,
    };
  },
});
</script>