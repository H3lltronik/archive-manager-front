<template>
  <div class="aside">
    <el-button @click="openModal" class="aside_button">
      <el-icon>
        <Plus />
      </el-icon>
      <span>SUBIR ARCHIVOS</span>
    </el-button>

    <el-checkbox-group class="aside_filters" v-model="filters" fill="#ff00FF">
      <el-checkbox :label="1">Archivos Nivel 1</el-checkbox>
      <el-checkbox :label="2">Archivos Nivel 2</el-checkbox>
      <el-checkbox :label="3">Archivos Nivel 3</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
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

    watchEffect(() => {
      store.commit('setFilters', filters.value);
    })

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