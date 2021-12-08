<template>
  <el-form
    ref="ruleForm"
    :model="form"
    :rules="loginRules"
    class="login_form"
    label-position="top"
  >
    <el-form-item prop="email">
      <el-input
        v-model="form.email"
        placeholder="example@domain.com"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="Contraseña"
      ></el-input>
    </el-form-item>

    <div class="login_footer">
      <router-link :to="ROUTES.RECOVERY.route">
        <el-button type="default" size="small" class=""
          >RECUPERAR CONTRASEÑA</el-button
        >
      </router-link>
      <el-button type="primary" size="small" class="" @click="doLogin"
        >INICIAR SESION</el-button
      >
    </div>
  </el-form>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { ROUTES } from "../../constants";
import { loginRules } from "./validations";
import { doLogin as APILogin } from "../../api";

export default {
  emits: ["wrongCredentials", "loginSucceeded"],
  setup(_, { emit }) {
    const ruleForm = ref();
    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const doLogin = () => {
      if (ruleForm.value)
        ruleForm.value.validate(async (valid: boolean) => {
          if (!valid) return;
          const result = await APILogin(form.value.email, form.value.password);
          console.log("baer", result);
          if (result.error) {
            emit("wrongCredentials");
          } else {
            emit("loginSucceeded");
          }
        });
    };

    return {
      form,
      loginRules,
      doLogin,
      ruleForm,
      ROUTES,
    };
  },
};
</script>