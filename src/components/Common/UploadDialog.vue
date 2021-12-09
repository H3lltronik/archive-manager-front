<template>
  <div class="upload-modal">
    <el-dialog v-model="dialogVisible" :before-close="handleClose">
      <h3>Subir Archivo</h3>

      <FileUpload @fileSelected="handleFileSelected" />

      <div class="upload-modal_input">
        <el-input
          v-model="customFilename"
          placeholder="(Opcional) Ingresa un nuevo nombre de archivo"
        ></el-input>
      </div>

      <div class="upload-modal_file" v-show="selectedFile">
        Archivo: {{ selectedFile?.name }} <br />
        Peso: {{ niceBytes(selectedFile?.size) }}
      </div>

      <template #footer>
        <div class="upload-modal_footer">
          <el-button type="default" @click="handleClose">CANCELAR</el-button>
          <el-button type="primary" @click="handleSubmit"
            >CARGAR ARCHIVO</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { doCreateFile, doFileUpload } from "../../api";
import { showNotification } from "../../notifications";
import { key } from "../../store";
import { niceBytes } from "../../translations";
import FileUpload from "./FileUpload.vue";

export default defineComponent({
  setup() {
    const store = useStore(key);
    const customFilename = ref(null);
    const selectedFile = ref<Dropzone.DropzoneFile | null>(null);
    const dialogVisible = computed(() => store.state.uploadModalOpened);
    const handleClose = (done: any) => {
      store.commit("setUploadModal", false);
    };
    const handleFileSelected = (file: Dropzone.DropzoneFile) => {
      selectedFile.value = file;
    };
    const handleSubmit = async () => {
      if (!selectedFile.value) {
        showNotification("Error", "Selecciona un archivo valido", "error");
        return;
      }

      const uploadRes = await doFileUpload(selectedFile.value);
      if (uploadRes.error || !uploadRes.data) {
        showNotification(
          "Error",
          "Ocurrio un error al subir el archivo",
          "error"
        );
        console.error(uploadRes.error);
        return;
      }

      const filedata = uploadRes.data;

      const creationRes = await doCreateFile({
        filename: customFilename.value ?? filedata.originalname,
        path: filedata.path.substring("public/".length),
        level: store.state.user?.level ?? 1,
        mimetype: filedata.mimetype,
        size: filedata.size,
      });

      if (creationRes.error) {
        showNotification("Error", "Ocurrio un error al subir el archivo", "error");
        console.error(creationRes.error);
        return;
      } else {
        showNotification("Hecho", "Archivo subido correctamente", "success");
        store.dispatch("fetchFiles");
      }
      
    };

    return {
      dialogVisible,
      handleClose,
      selectedFile,
      handleSubmit,
      handleFileSelected,
      customFilename,
      niceBytes,
    };
  },
  components: { FileUpload },
});
</script>