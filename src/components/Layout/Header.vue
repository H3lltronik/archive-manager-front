<template>
  <div class="">
    <div class="header">
      <div class="header_logo" @click="restartReset" style="cursor: pointer;">
        <div class="">
          <img class="" src="/8-archive-manager.png" alt="">
        </div>
        <h1><i>Archive Manager</i></h1>
      </div>

      <div class="header_search">
        <el-input v-model="search" placeholder="Type something" @keydown.enter="handleEnter" :suffix-icon="Search"/>
      </div>
      <div class="header_search_mobile">
        <el-button :icon="searchOpen? Close : Search" round size="small" @click="searchOpen = !searchOpen"></el-button>
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
    <div class="header_search_mobile_input " :class="{'header_search_mobile--open': searchOpen}">
      <el-input v-model="search" placeholder="Type something" @keydown.enter="handleEnter"/>
      <el-button :icon="Search" round size="small" @click="handleEnter"></el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Calendar, Search, Avatar, Close } from "@element-plus/icons";
import { ref } from "@vue/reactivity";
import { doLogout } from "../../api";
import { useRouter } from "vue-router";
import { DARK_THEME, LIGHT_THEME, ROUTES } from "../../constants";
import { useStore } from "vuex";
import { computed, watchEffect } from "vue";
import { key } from "../../store";
import { switchTheme } from '../../utils';

export default {
  setup() {
    const router = useRouter();
    const store = useStore(key);
    const searchOpen = ref(false); // mobile search
    const search = computed<string>({
      get() {
        return store.state.search;
      },
      set(value) {
        store.commit("setSearch", value);
      },
    });

    const logout = async () => {
      const result = await doLogout();
      store.commit("resetStore");
      switchTheme(LIGHT_THEME);
      if (!result.error) {
        router.push(ROUTES.LOGIN.route);
      }
    };
    const handleEnter = () => {
      store.dispatch("fetchFilesByName", search.value);
      store.dispatch("fetchFilesByContent", search.value);
      if (search.value.length <= 0) store.commit("setSearchMode", false);
      else store.commit("setSearchMode", true);
    };

    const user = computed(() => store.state.user);
    const username = user.value ? user.value.name : "Account Name";
    const restartReset = () => {
      search.value = "";
      handleEnter();
    }

    return {
      search,
      restartReset,
      logout,
      Close,
      username,
      handleEnter,
      searchOpen,
      Calendar,
      Search,
      Avatar,
    };
  },
  components: { Calendar, Search, Avatar },
};
</script>