<template>
    <el-form ref="ruleForm" :model="form" :rules="loginRules" class="login_form" label-position="top">
        <el-form-item prop="name" >
            <el-input v-model="form.name" placeholder="Armando Hoyos"></el-input>
        </el-form-item>
        <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="example@domain.com"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="Contraseña"></el-input>
        </el-form-item>

        <div class="login_footer">
            <router-link :to="ROUTES.RECOVERY.route">
                <el-button type="text" size="small" class="">RECUPERAR CONTRASEÑA</el-button>
            </router-link>
            <el-button type="primary" size="small" class="" @click="doLogin">INICIAR SESION</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity"
import { ROUTES } from "../../constants";
import { loginRules } from "./validations";

export default {
    setup() {
        const ruleForm = ref();
        const form = ref({
            name: '',
            email: '',
            password: '',
        });

        const doLogin = () => {
            if (ruleForm.value)
                ruleForm.value.validate((valid: boolean) => {
                    console.log("baer", valid, form.value)
                })
        }

        return {
            form,
            loginRules,
            doLogin,
            ruleForm,
            ROUTES,
        }
    },
}
</script>