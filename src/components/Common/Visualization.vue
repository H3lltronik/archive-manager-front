<template>
  <Teleport to="#dialogs">
    <el-dialog v-model="dialogOpened" :before-close="handleClose">
      <iframe
        class="preview-doc"
        :src="`https://docs.google.com/gview?url=${fileUrl}&embedded=true`"
      ></iframe>
    </el-dialog>
  </Teleport>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { SUPPORTED_MIMETYPES } from "../../constants";

// https://zipvisual.com/Test.txt
export default {
  props: {
    fileUrl: {
      default: "",
      required: true,
    },
    fileMimetype: {
      default: "",
      required: true,
    },
    dialogOpened: {
      default: false,
      required: true,
    },
  },
  emits: ["doClose"],
  setup({ fileUrl, fileMimetype }, { emit }) {
    const supported = ref(false);

    const mimetype = SUPPORTED_MIMETYPES.find((m) => m == fileMimetype);
    supported.value = !!mimetype;
    const handleClose = () => {
      emit("doClose");
    };

    return {
      fileUrl,
      supported,
      handleClose,
      fileMimetype,
    };
  },
};
</script>