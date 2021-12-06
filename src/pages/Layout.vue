<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Aside/>
      </el-aside>
      <el-container>
        <el-main>
          <Body />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Body from "../components/Layout/Body.vue";
import Aside from "../components/Layout/Aside.vue";
import Header from "../components/Layout/Header.vue";

export default {
    setup() {
    },
    components: { Body, Aside, Header }
}
</script>