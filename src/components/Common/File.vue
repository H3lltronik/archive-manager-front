<template>
  <div class="file" @click="toggleChecked">
    <div class="file_checkbox">
      <el-checkbox v-model="checked"></el-checkbox>
    </div>
    <div class="file_body">
      <div class="file_header">
        <div class="file_icon">
          <el-icon>
            <Document />
          </el-icon>
        </div>
        <div class="">
          <h3>{{ file.filename }}</h3>
          <span class="">Archivo Nivel {{ file.level }}</span>
        </div>
      </div>

      <div class="file_image">
        <img
          src="https://curate.nd.edu/assets/curate/default-1d435cdbfc607f1ce11e41ab0baa1704f437a7944c5a75a1d509edaf28b05902.png"
          alt=""
        />
      </div>

      <div class="file_description">
        <p>
          Subido por: <strong>{{ file.user.name }}</strong>
        </p>
        <p>{{ getMimetypeName(file.mimetype) }}</p>
        <p>Tamaño: {{ niceBytes(+file.size) }}</p>
      </div>
    </div>

    <div class="file_buttons">
      <a target="_blank" :href="`${API_URL}/${file.path}`">
        <el-button type="default">
          <span>DESCARGAR</span>
        </el-button>
      </a>
      <el-button
        type="default"
        v-if="isSupported(file)"
        @click="visualizationOpened = true"
      >
        <span>VISUALIZAR</span>
      </el-button>

      <Visualization
        :dialogOpened="visualizationOpened"
        @do-close="visualizationOpened = false"
        :fileUrl="fileUrl"
        :fileMimetype="file.mimetype"
      />
    </div>
    <!-- {{file}} -->
  </div>
</template>

<script lang="ts">
import { Document } from "@element-plus/icons";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { API_URL, SUPPORTED_MIMETYPES } from "../../constants";
import { key } from "../../store";
import { getMimetypeName, niceBytes } from "../../translations";
import Visualization from "./Visualization.vue";

export default defineComponent({
  components: { Document, Visualization },
  props: {
    file: {
      required: true,
      default: () => {},
      type: Object as () => FileCreationRes,
    },
  },
  setup(props) {
    const checked = ref(false);
    const visualizationOpened = ref(false);
    const store = useStore(key);
    const toggleChecked = () => {
      checked.value = !checked.value;
      if (checked.value) {
        store.commit("addSelectedFile", props.file);
      } else {
        store.commit("removeSelectedFile", props.file);
      }
    };
    const isSupported = (file: FileCreationRes) =>
      SUPPORTED_MIMETYPES.find((i) => i == file.mimetype);

    const fileUrl = API_URL + "/" + props.file.path;

    return {
      checked,
      fileUrl,
      API_URL,
      visualizationOpened,
      toggleChecked,
      getMimetypeName,
      niceBytes,
      isSupported,
    };
  },
});
</script>