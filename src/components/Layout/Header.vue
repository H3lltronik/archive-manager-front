<template>
  <div class="header">
    <div class="header_logo">
      <h1>Logo</h1>
    </div>

    <div class="header_search">
      <el-input
        v-model="input2"
        placeholder="Type something"
        :suffix-icon="Search"
      />
    </div>

    <el-dropdown>
      <div class="header_account">
        <span>Account Name</span>
        <div class="header_account_icon">
          <el-icon>
            <Avatar />
          </el-icon>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
</script>

<script lang="ts">
import { Calendar, Search, Avatar } from "@element-plus/icons";
import { ref } from "@vue/reactivity";
import { doLogout } from "../../api";
import { useRouter } from "vue-router";
import { ROUTES } from "../../constants";
export default {
  setup() {
    const router = useRouter();
    const input2 = ref("");
    
    const logout = async () => {
      const result = await doLogout();
      if (!result.error) {
          router.push(ROUTES.LOGIN.route)
      }
    };

    return {
      input2,
      logout,
    };
  },
  components: { Calendar, Search, Avatar },
};
</script>