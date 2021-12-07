<template>
    <el-form ref="ruleForm" :model="form" :rules="registerRules" class="login_form" label-position="top">
        <el-form-item prop="name" >
            <el-input v-model="form.name" placeholder="Armando Hoyos"></el-input>
        </el-form-item>
        <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="example@domain.com"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="Contraseña"></el-input>
        </el-form-item>

        <div class="register_footer">
            <el-button type="primary" size="small" class="" @click="doLogin">CREAR CUENTA</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity"
import { ROUTES } from "../../constants";
import { registerRules } from "./validations";

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
            registerRules,
            doLogin,
            ruleForm,
            ROUTES,
        }
    },
}
</script>