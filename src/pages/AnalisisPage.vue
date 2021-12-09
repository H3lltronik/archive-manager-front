<template>
  <el-container>
    <el-header>
      <Header/>
    </el-header>
    <el-container>
      <el-container>
        <el-main>
          <Analisis />
          <UploadDialog/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Body from "../components/Layout/Body.vue";
import Aside from "../components/Layout/Aside.vue";
import Header from "../components/Layout/Header.vue";
import UploadDialog from "../components/Common/UploadDialog.vue";
import Analisis from "../components/Layout/Analisis.vue";

export default {
    setup() {
    },
    components: { Body, Aside, Header, UploadDialog, Analisis }
}
</script>