<template>
  <div class="upload-modal">
    <el-dialog v-model="dialogVisible" :before-close="handleClose">
      <h3>Subir Archivo</h3>

      <FileUpload/>

      <div class="upload-modal_input">
          <el-input v-model="customFilename" placeholder="(Opcional) Ingresa un nuevo nombre de archivo"></el-input>
      </div>

      <template #footer>
        <div class="upload-modal_footer">
          <el-button type="text" @click="handleClose">CANCELAR</el-button>
          <el-button type="primary" @click="handleClose">CARGAR ARCHIVO</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import { key } from "../../store";
import FileUpload from "./FileUpload.vue";

export default defineComponent({
    setup() {
        const store = useStore(key);
        const customFilename = ref("");
        const dialogVisible = computed(() => store.state.uploadModalOpened);
        const handleClose = (done: any) => {
            store.commit("setUploadModal", false);
        };
        return {
            dialogVisible,
            handleClose,
            customFilename,
        };
    },
    components: { FileUpload }
});
</script>