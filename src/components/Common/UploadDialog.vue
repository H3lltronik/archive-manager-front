<template>
  <div class="upload-modal">
    <el-dialog width="40%" v-model="dialogVisible" :before-close="handleClose">
      <h3>Subir Archivo</h3>

      <div class="upload-modal_indication">
          <span>Arrastra un archivo o da click para seleccionar un archivo</span>
      </div>

      <div class="upload-modal_input">
          <el-input v-model="customFilename" placeholder="(Opcional) Ingresa un nuevo nombre de archivo"></el-input>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="handleClose">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import { key } from "../../store";

export default defineComponent({
  setup() {
    const store = useStore(key);
    const customFilename = ref('');
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
});
</script>