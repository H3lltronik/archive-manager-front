<template>
  <div class="analisis">
    <div class="analisis_header">
      <el-button @click="goBack">
        <span>Volver</span>
      </el-button>
      <h1>Analisis de la busqueda {{ search }}</h1>
    </div>
    <el-row>
      <el-col :span="24">
        <h2>
          Se ha encontrado la palabra `{{ search }}` en {{ titleTimes }}
          <i>titulos de archivos</i> distintos
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
            <canvas id="canvas1"></canvas>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <h2>Histograma de palabras dentro de archivos</h2>
        <div style="width: 100%; overflow-x: auto">
          <div
            :style="{
              width: filesByContent.length * 50 + 'px',
              height: 'auto',
            }"
            style="min-width: 1200px; max-height: 50vh"
          >
            <canvas id="canvas2"></canvas>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <h2>Histograma de caracteres dentro de archivos</h2>
        <div style="width: 100%; overflow-x: auto">
          <div
            :style="{
              width: filesByContent.length * 50 + 'px',
              height: 'auto',
            }"
            style="min-width: 1200px; max-height: 50vh"
          >
            <canvas id="canvas3"></canvas>
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
import { useRouter } from "vue-router";

export default {
  setup() {
    const canvas = ref<HTMLCanvasElement>();
    const store = useStore(key);
    const router = useRouter();
    const titleTimes = ref(0);
    const search = computed(() => store.state.search);
    const filesByName = computed(() => store.getters.getFilteredFilesByName);
    const filesByContent = computed(
      () => store.getters.getFilteredFilesByContent
    );
    let chartOcurrences = null;
    let chartWords = null;
    let chartCharacters = null;

    onMounted(() => {
      //Chart1
      Chart.register(...registerables);
      const ctxOcurrences = document
        .querySelector<HTMLCanvasElement>("#canvas1")
        ?.getContext("2d");

      if (!ctxOcurrences) return;
      chartOcurrences = new Chart(ctxOcurrences, {
        type: "bar",
        data: {
          labels: filesByContent.value.map((file: FileResultContents) => file.filename),
          datasets: [
            {
              label: search.value,
              data: filesByContent.value.map(
                (file: FileResultContents) => file.ocurrences
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
        chartOcurrences.data.labels = filesByContent.value.map(
          (file: FileResultContents) => file.filename
        );
        chartOcurrences.data.datasets[0].data = filesByContent.value.map(
          (file: FileResultContents) => file.ocurrences
        );
        chartOcurrences.update();

        filesByName.value.forEach((file) => {
          if (file.ocurrences) titleTimes.value += file.ocurrences;
        });
      });

      //Chart2
      const ctxWords = document
        .querySelector<HTMLCanvasElement>("#canvas2")
        ?.getContext("2d");

      if (!ctxWords) return;
      chartWords = new Chart(ctxWords, {
        type: "bar",
        data: {
          labels: filesByContent.value.map((file: FileResultContents) => file.filename),
          datasets: [
            {
              label: "Palabras",
              data: filesByContent.value.map(
                (file: FileResultContents) => file.words
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
        chartWords.data.labels = filesByContent.value.map(
          (file: FileResultContents) => file.filename
        );
        chartWords.data.datasets[0].data = filesByContent.value.map(
          (file: FileResultContents) => file.words
        );
        chartWords.update();

        filesByName.value.forEach((file) => {
          if (file.words) titleTimes.value += file.words;
        });
      });

      //Chart3
      const ctxCharacters = document
        .querySelector<HTMLCanvasElement>("#canvas3")
        ?.getContext("2d");

      if (!ctxCharacters) return;
      chartCharacters = new Chart(ctxCharacters, {
        type: "bar",
        data: {
          labels: filesByContent.value.map((file: FileResultContents) => file.filename),
          datasets: [
            {
              label: "Caracters",
              data: filesByContent.value.map(
                (file: FileResultContents) => file.characters
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
        chartCharacters.data.labels = filesByContent.value.map(
          (file: FileResultContents) => file.filename
        );
        chartCharacters.data.datasets[0].data = filesByContent.value.map(
          (file: FileResultContents) => file.characters
        );
        chartCharacters.update();

        filesByName.value.forEach((file) => {
          if (file.characters) titleTimes.value += file.characters;
        });
      });
    });

    const goBack = () => {
      router.push(ROUTES.HOME.route);
      if (chartOcurrences) chartOcurrences.destroy();
      if (chartWords) chartWords.destroy();
      if (chartCharacters) chartCharacters.destroy();
    };

    return {
      search,
      goBack,
      titleTimes,
      filesByName,
      ROUTES,
      filesByContent,
    };
  },
};
</script>