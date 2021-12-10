<template>
    <div class="login">
        <div class="form_container">
            <div class="">
                <img src="/logo.png" alt="">
            </div>

            <div class="login_text">
                <strong>Crear cuenta</strong>
                <p>Ingresa los datos de tu cuenta</p>
            </div>

            <RegisterForm class="form"/>
            <router-link :to="ROUTES.LOGIN.route">
                <el-button>Volver</el-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import RegisterForm from "../components/Forms/RegisterForm.vue";
import { ROUTES } from "../constants";

export default {
    setup() {
        const recoverPassword = () => {}
        const doLogin = () => {}

        return {
            recoverPassword,
            doLogin,
            ROUTES,
        };
    },
    components: { RegisterForm }
}
</script>