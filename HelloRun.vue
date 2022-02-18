<template>
  <div id="list-rendering">
    <ol>
      <li v-for="todo in todos" v-bind:key="todo">
        {{ todo.text }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "HelloRun",
  data() {
    return {
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
