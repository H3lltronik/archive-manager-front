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

            <RecoverForm @submit="doRequestReset" class="form"/>
            <router-link :to="ROUTES.LOGIN.route">
                <el-button>Volver</el-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { requestReset } from "../api";
import RecoverForm from "../components/Forms/RecoverForm.vue";
import { ROUTES } from "../constants";

export default {
    setup() {
        const doRequestReset = async (username: string) => {
            const result = await requestReset(username);

            console.log("result", result);
        }

        return {
            doRequestReset,
            ROUTES,
        };
    },
    components: { RecoverForm }
}
</script>