<!--
 * @Author: Rookier
 * @Description: 
 * 
 * 
-->
<script setup lang="ts">
import { ref } from 'vue';
const clickFN = () => {
  visible.value = true
}
const visible = ref(false)
const attributeName = ref('href')
const url = ref('www.baidu.com')
const eventName = ref({
  name: 'clickA'
})
const clickA = () => {
  console.log("11331");
  
}
</script>
<template>
  <main>
    <!-- <TheWelcome  @click="visible = true "/> -->
    <button @click="visible = true">Open Modal</button>

    <p @click=[clickA]>1111</p>
  </main>

  <Teleport to="body">
  <div v-if="visible" class="modal">
    <p>Hello from the modal!</p>
    <button @click="visible = false">Close</button>
  </div>
</Teleport>
</template>

<style scoped>
.modal {
background-color: antiquewhite;
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
