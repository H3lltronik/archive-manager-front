<template>
    <el-form ref="ruleForm" :model="form" :rules="requestRecoverRules" class="login_form" label-position="top">
        <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="example@domain.com"></el-input>
        </el-form-item>

        <div class="recover_footer">
            <el-button type="primary" size="small" class="" @click="doRequestRecovery">ENVIAR CORREO</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity"
import { ElNotification } from "element-plus";
import { ROUTES } from "../../constants";
import { requestRecoverRules } from "./validations";

export default {
    setup() {
        const ruleForm = ref();
        const form = ref({
            email: null,
        });

        const doRequestRecovery = () => {
            if (ruleForm.value)
                ruleForm.value.validate((valid: boolean) => {
                    console.log("baer", valid, form.value)
                    
                    ElNotification({
                        title: 'Solicitud enviada',
                        message: "Si el correo existe, se enviaran las instrucciones para la recuperacion de su cuenta",
                        type: "info",
                    })
                })

        }

        return {
            form,
            requestRecoverRules,
            doRequestRecovery,
            ruleForm,
            ROUTES,
        }
    },
}
</script>