<template>
    <el-form ref="ruleForm" :model="form" :rules="requestRecoverRules" class="login_form" label-position="top">
        <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="Tu nueva contraseña" type="password"></el-input>
        </el-form-item>

        <div class="recover_footer">
            <el-button type="primary" size="small" class="" @click="doRequestRecovery">RECUPERAR CONTRASEÑA</el-button>
        </div>
    </el-form>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity"
import { ElNotification } from "element-plus";
import { ROUTES } from "../../constants";
import { requestRecoverRules } from "./validations";

export default {
    emits: ['submit'],
    setup(_, {emit}) {
        const ruleForm = ref();
        const form = ref({
            password: null,
        });

        const doRequestRecovery = () => {
            if (ruleForm.value)
                ruleForm.value.validate((valid: boolean) => {
                    if (valid) {
                        emit('submit', form.value.password);
                    }
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