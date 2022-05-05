<script>
export default {
  // component options
  data(){
    return{
      message:"Hello World!",
      message2:"This is so cool!"
    }
  }
}
</script>

<template>
  <h1>Hello World!</h1>
  <h1>{{message}}</h1>
  <h1>
    {{message2}}
  </h1>
</template>
