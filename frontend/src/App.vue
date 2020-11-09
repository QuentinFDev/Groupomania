<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

</script>


<style>
*{
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: none;
}


body{
  background-image:url(./assets/batgroupomaniamax.jpg);
  background-repeat:no-repeat;
  height: 100vh;
}


.fontawesome-i2svg-active{
  background: #091f43;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
