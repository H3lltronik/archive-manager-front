<template>
    <el-form ref="ruleForm" :model="form" :rules="registerRules" class="login_form" label-position="top">
        <el-form-item prop="name" >
            <el-input v-model="form.name" placeholder="Armando Hoyos"></el-input>
        </el-form-item>
        <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="example@domain.com"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input v-model="form.password" type="password" placeholder="Contraseña"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
            <el-input v-model="form.confirmPassword" type="password" placeholder="Confirmar Contraseña"></el-input>
        </el-form-item>
        <el-form-item prop="level">
            <el-select v-model="form.level" placeholder="Nivel">
                <el-option v-for="lvl in [1,2,3]" :key="lvl" :label="`Nivel ${lvl}`" :value="lvl"></el-option>
            </el-select>
        </el-form-item>

        <div class="register_footer">
            <el-button type="primary" size="small" class="" @click="register">CREAR CUENTA</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity"
import { useRouter } from "vue-router";
import { doRegister } from "../../api";
import { ROUTES } from "../../constants";
import { showNotification } from "../../notifications";
import { registerRules } from "./validations";

export default {
    setup() {
        const router = useRouter();
        const ruleForm = ref();
        const form = ref({
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
            level: null,
        });

        const confirmPassValidation = 
        {
            trigger: 'blur', 
            required: true,
            validator: (rule: any, value: any, callback: any) => {
                if (value !== form.value.password) callback (new Error("Las contraseñas no son iguales"))
                callback();
            }
        }
        registerRules.confirmPassword = [confirmPassValidation]

        const register = () => {
            if (ruleForm.value)
                ruleForm.value.validate(async (valid: boolean) => {
                    console.log("baer", valid, form.value)
                    if (!valid) return
                    
                    const result = await doRegister({
                        name: form.value.name,
                        username: form.value.username,
                        password: form.value.password,
                        confirmPassword: form.value.confirmPassword,
                        level: form.value.level ?? 0,
                    });

                    if (result.error) {
                        showNotification("Error", "Ocurrio un error al crear la cuenta", "error");
                    } else {
                        showNotification("Hecho", "La cuenta fue creada", "success");
                        setTimeout(() => {
                            router.push(ROUTES.LOGIN.route);
                        }, 1000);
                    }
                })
        }

        return {
            form,
            registerRules,
            register,
            ruleForm,
            ROUTES,
        }
    },
}
</script>