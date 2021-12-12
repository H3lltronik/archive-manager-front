<template>
  <div class="login" v-loading="loading">
    <div class="form_container">
      <div class="">
        <img src="/logo.png" alt="" />
      </div>

      <div class="login_text">
        <strong>Recuperar contraseña</strong>
        <p>Ingresa tu nueva contraseña</p>
      </div>

      <DoRecoverForm @submit="reset" class="form" />
      <router-link :to="ROUTES.LOGIN.route">
        <el-button>Volver</el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { ROUTES } from "../constants";
import DoRecoverForm from "../components/Forms/DoRecoverForm.vue";
import { doReset, getResetRequest } from "../api";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { showNotification } from "../notifications";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const token = route.params.token;
    const loading = ref(true);

    onMounted(async () => {
      if (!token || Array.isArray(token)) return;
      const reset = await getResetRequest(token);
      loading.value = false;

      if (reset.error) {
          showNotification("Errro", "No se encontro el reset token", "error");
          router.push(ROUTES.LOGIN.route);
      }
      if (reset.data)
        showNotification("Listo", "Token valido, ingresa tu nueva contraseña", "success");
    });

    const reset = async (password: string) => {
      if (!token || Array.isArray(token)) return;

      loading.value = true;
      const result = await doReset(token, password);
      loading.value = false;
      if (result.error)
        showNotification("Error", "Ocurrio un error, intentalo mas tarde", "error");
      if (result.data) {
          showNotification("Hecho", "Contraseña actualizada", "success");
          router.push(ROUTES.LOGIN.route);
      }
    };

    return {
      reset,
      loading,
      ROUTES,
    };
  },
  components: { DoRecoverForm },
};
</script>