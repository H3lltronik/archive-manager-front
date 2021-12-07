<template>
    <div class="file" @click="toggleChecked">
        <div class="file_checkbox">
            <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="file_body">
            <div class="file_header">
                <div class="file_icon">
                    <el-icon>
                        <Document/>
                    </el-icon>
                </div>
                <div class="">
                    <h3>Documento de Texto</h3>
                    <span class="">Archivo Nivel 1</span>
                </div>
            </div>

            <div class="file_image">
                <img src="https://somoskudasai.com/wp-content/uploads/2021/01/portada_usada-pekora-6.jpg" alt="">
            </div>

            <div class="file_description">
                <p>Documento de Texto</p>
                <p>Tamaño: 12KB</p>
            </div>
        </div>

        <div class="file_buttons">
            <el-button type="default">
                <span>DESCARGAR</span>
            </el-button>
            <el-button type="default">
                <span>VISUALIZAR</span>
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Document } from '@element-plus/icons'
import { defineComponent, ref } from 'vue'

export default defineComponent({
    components: {Document},
    setup() {
        const checked = ref(false)
        const toggleChecked = () => checked.value = !checked.value

        return {
            checked,
            toggleChecked,
        }
  },
})
</script>