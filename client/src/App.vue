<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components:{
    Navbar
  } 
}
</script>


<style src='@/assets/css/app.css'></style>
<style src='@/assets/css/style1.css'></style>
<style src='@/assets/fullcalendar/lib/main.css'></style>
<style src='@/assets/css/calendar.css'></style>


<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
	background: url(./assets/bod.jpg) no-repeat
}
</style>