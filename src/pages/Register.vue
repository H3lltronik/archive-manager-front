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
        </div>
    </div>
</template>

<script lang="ts">
import RegisterForm from "../components/Forms/RegisterForm.vue";

export default {
    setup() {
        const recoverPassword = () => {}
        const doLogin = () => {}

        return {
            recoverPassword,
            doLogin,
        };
    },
    components: { RegisterForm }
}
</script>