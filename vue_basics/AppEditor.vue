<template>
  <Editor v-model="editData" lang='python' theme="monokai" height="400px"></Editor>

</template>

<script>
import Editor from "@/components/Editor";
export default {
  name: 'App',
  components: {
    Editor
  },
  data(){
    return{
      editData:""
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
