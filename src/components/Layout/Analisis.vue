<template>
  <div class="analisis">
    <div class="analisis_header">
      <router-link :to="ROUTES.HOME.route">
        <el-button>
          <span>Volver</span>
        </el-button>
      </router-link>
      <h1>Analisis de la busqueda {{ search }}</h1>
    </div>
    <el-row>
      <el-col :span="24">
        <h2>
          Se ha encontrado la palabra `{{ search }}` en
          {{ filesByName.length }} <i>archivos</i> distintos
        </h2>
      </el-col>
      <el-col :span="24">
        <h2>Histograma de apariciones dentro de archivos</h2>
        <div style="width: 100%; overflow-x: auto">
          <div
            :style="{
              width: filesByContent.length * 50 + 'px',
              height: 'auto',
            }"
            style="min-width: 1200px; max-height: 50vh"
          >
            <canvas id="canvas" ref="canvas"></canvas>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "@vue/reactivity";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import { key } from "../../store";
import { Chart, registerables } from "chart.js";
import { ROUTES } from "../../constants";

export default {
  setup() {
    const canvas = ref<HTMLCanvasElement>();
    const store = useStore(key);
    const search = computed(() => store.state.search);
    const filesByName = computed(() => store.getters.getFilteredFilesByName);
    const filesByContent = computed(
      () => store.getters.getFilteredFilesByContent
    );

    onMounted(() => {
      Chart.register(...registerables);
      const ctx = document
        .querySelector<HTMLCanvasElement>("#canvas")
        ?.getContext("2d");

      if (!ctx) return;
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: filesByContent.value.map((file: FileResult) => file.filename),
          datasets: [
            {
              label: search.value,
              data: filesByContent.value.map(
                (file: FileResult) => file.ocurrences
              ),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      watchEffect(() => {
        console.log("chart.data.datasets", chart.data.datasets);
        chart.data.labels = filesByContent.value.map(
          (file: FileResult) => file.filename
        );
        chart.data.datasets[0].data = filesByContent.value.map(
          (file: FileResult) => file.ocurrences
        );
        chart.update();
      });
    });

    return {
      search,
      filesByName,
      ROUTES,
      filesByContent,
    };
  },
};
</script>