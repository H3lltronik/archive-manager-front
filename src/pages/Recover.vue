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
        </div>
    </div>
</template>

<script lang="ts">
import RecoverForm from "../components/Forms/RecoverForm.vue";

export default {
    setup() {
        const recoverPassword = () => {}
        const doLogin = () => {}

        return {
            recoverPassword,
            doLogin,
        };
    },
    components: { RecoverForm }
}
</script>