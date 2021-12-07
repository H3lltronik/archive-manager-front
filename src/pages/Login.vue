<template>
    <div class="login">
        <div class="form_container">
            <div class="">
                <img src="/logo.png" alt="">
            </div>

            <div class="login_text">
                <strong>Acceder</strong>
                <p>Ingresa los datos de tu cuenta</p>
            </div>

            <LoginForm class="form"/>

            <router-link :to="ROUTES.REGISTER.route">
                <el-button type="default" size="small" class="">CREAR CUENTA</el-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import LoginForm from "../components/Forms/LoginForm.vue";
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
    components: { LoginForm }
}
</script>