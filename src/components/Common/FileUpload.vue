<template>
  <div class="">
    <div id="input-zone" class="upload-modal_indication">
        <span>Arrastra un archivo o da click para seleccionar un archivo</span>
    </div>

    <input type="file" accept="*" ref="inputRef" hidden />
  </div>
</template>

<script lang="ts">
import Dropzone from "dropzone";
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const inputRef = ref(null);
    const dropzone = ref<Dropzone|null>(null);
    
    onMounted(() => {
        if (!inputRef.value) return

        dropzone.value = new Dropzone('#input-zone', {
            paramName: 'test',
            url: 'https://www.dropzone.dev/js/', // IGNORAR LA URL, LA LIBRERIA ME LO PEDIA xd
            autoProcessQueue: false,
            addedfile: file => {
                console.log("ola?" ,file)
            }
        })
    })

    return {
      inputRef,
    };
  },
});
</script>