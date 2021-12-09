<template>
    <div class="analisis">
        <h1>Analisis de la busqueda {{search}}</h1>
        <el-row>
            <el-col :span="12">
                <h2>Se ha encontrado la palabra {{search}} en {{filesByName.length}} <i>archivos</i> distintos</h2>
            </el-col>
            <el-col :span="12"></el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { key } from "../../store";

export default {
  setup() {
    const store = useStore(key);
    const search = computed(() => store.state.search);
    const filesByName = computed(() => store.getters.getFilteredFilesByName);
    const filesByContent = computed(
      () => store.getters.getFilteredFilesByContent
    );
    return {
        search,
        filesByName,
        filesByContent,
    }
  },
};
</script>