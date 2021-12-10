<template>
    <div class="login">
        <div class="form_container">
            <div class="">
                <img src="/logo.png" alt="">
            </div>

            <div class="login_text">
                <strong>Recuperar contraseña</strong>
                <p>Ingresa el correo electronico del usuario a recuperar</p>
            </div>

            <RecoverForm class="form"/>
            <router-link :to="ROUTES.LOGIN.route">
                <el-button>Volver</el-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import RecoverForm from "../components/Forms/RecoverForm.vue";
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
    components: { RecoverForm }
}
</script>