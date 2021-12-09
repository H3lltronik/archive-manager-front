<template>
  <el-button type="text" :icon="data.icon" @click="toggleTheme">
    ACTIVAR {{ data.text }}
  </el-button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Moon, Sunny } from "@element-plus/icons";
import { DARK_THEME, LIGHT_THEME } from "../../constants";
import { switchTheme } from "../../utils";
import { useStore } from "vuex";
import { key } from "../../store";

export default defineComponent({
  components: { Moon, Sunny },
  setup() {
    const store = useStore(key);
    const toggleTheme = () => {
      if (store.state.theme == DARK_THEME) {
        switchTheme(LIGHT_THEME);
      } else if (store.state.theme == LIGHT_THEME) {
        switchTheme(DARK_THEME);
      }
    };
    const theme = computed(() => store.state.theme);

    const data = computed(() => {
      if (store.state.theme == LIGHT_THEME) {
        return {
          icon: Moon,
          text: "MODO OSCURO",
        };
      } else if (store.state.theme == DARK_THEME) {
        return {
          icon: Sunny,
          text: "MODO LIGHT",
        };
      }
    });

    return {
      toggleTheme,
      data,
      theme,
    };
  },
});
</script>