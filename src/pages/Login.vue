<template>
  <div class="login">
    <div class="form_container">
      <div class="">
        <img src="/logo.png" alt="" />
      </div>

      <div class="login_text">
        <strong>Acceder</strong>
        <p>Ingresa los datos de tu cuenta</p>
      </div>

      <div class="error-box" v-show="isError">
        <span
          >No se encontro el usuario especificado. <br />Revise sus
          credenciales</span
        >
      </div>

      <LoginForm
        class="form"
        @wrongCredentials="handleWrongCredentials"
        @loginSucceeded="handleLoginSucceded"
      />

      <router-link :to="ROUTES.REGISTER.route">
        <el-button type="default" size="small" class="">CREAR CUENTA</el-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity";
import LoginForm from "../components/Forms/LoginForm.vue";
import { ROUTES } from "../constants";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const isError = ref(false);
    const handleLoginSucceeded = () => {
      console.log("good login");
      router.push(ROUTES.HOME.route);
    };

    const handleWrongCredentials = () => {
      isError.value = true;
      setTimeout(() => {
        isError.value = false;
      }, 5000);
    };

    return {
      handleLoginSucceded: handleLoginSucceeded,
      handleWrongCredentials,
      ROUTES,
      isError,
    };
  },
  components: { LoginForm },
};
</script>