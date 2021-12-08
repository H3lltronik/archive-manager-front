<template>
  <div class="header">
    <div class="header_logo">
      <h1>Logo</h1>
    </div>

    <div class="header_search">
      <el-input
        v-model="search"
        placeholder="Type something"
        @keydown.enter="handleEnter"
        :suffix-icon="Search"
      />
    </div>

    <el-dropdown>
      <div class="header_account">
        <span>{{ username }}</span>
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
import { useStore } from "vuex";
import { computed, watchEffect } from "vue";
import { key } from "../../store";

export default {
  setup() {
    const router = useRouter();
    const store = useStore(key);
    const search = ref("");

    const logout = async () => {
      const result = await doLogout();
      if (!result.error) {
        router.push(ROUTES.LOGIN.route);
      }
    };
    const handleEnter = () => {
      console.log("enter", search.value);
      store.dispatch("fetchFiles", search.value);
    }

    const user = computed(() => store.state.user);
    const username = user.value ? user.value.name : "Account Name";

    return {
      search,
      logout,
      username,
      handleEnter,
      Calendar,
      Search,
      Avatar,
    };
  },
  components: { Calendar, Search, Avatar },
};
</script>