<template>
  <div class="aside">
    <el-button @click="openModal" class="aside_button">
      <el-icon>
        <Plus />
      </el-icon>
      <span>SUBIR ARCHIVOS</span>
    </el-button>

    <el-checkbox-group class="aside_filters" v-model="filters" fill="#ff00FF">
      <el-checkbox :value="1" label="Archivos Nivel 1" text-color="#ff00FF" />
      <el-checkbox :value="2" label="Archivos Nivel 2" />
      <el-checkbox :value="3" label="Archivos Nivel 3" />
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../../store";
import { Plus } from "@element-plus/icons";

export default defineComponent({
  components: { Plus },
  setup() {
    const store = useStore(key);

    const isModalOpened = computed(() => store.state.uploadModalOpened);
    const openModal = () => store.commit("setUploadModal", true);
    const closeModal = () => store.commit("setUploadModal", false);
    const toggleModal = () =>
      isModalOpened.value ? closeModal() : openModal();

    const filters = ref([]);

    return {
      filters,
      toggleModal,
      openModal,
      closeModal,
      Plus,
    };
  },
});
</script>