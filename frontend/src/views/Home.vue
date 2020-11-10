<template>
  <div class="home">
      <headerauth/>
      <router-link to="/login" class="btn">Connexion</router-link>
      <router-link to="/signup" class="btn">Inscription</router-link>
        <router-view/>
  </div>
</template>

<script>
import headerauth from '@/components/HeaderAuth.vue'


export default {
  name: 'Home',
  components: {
    headerauth
  }
}
</script>

<style lang="scss" scoped>
$clrprimaire : #091f43; /*Couleur de font*/
$clrecriture : #fd2f04; 
$clrbtn: #d1515a;

@font-face {
  font-family: "nevis";
  src: url("../assets/fonts/nevis.ttf") format("truetype");
}


.btn{
  display: flex;
  flex-direction: column;
  color: white;
  width: 40%;
  margin: 20vh auto;
  border: 1px solid $clrprimaire;
  padding:10px;
  font-size: 1.4em;
  border-radius:16px;
  text-decoration: none;
  cursor: pointer;
  transition: 0.4s;
  background-color: $clrbtn;
  font-family: "nevis", "calibri", sans-serif;
  &:hover{
    background-color: rgba(255,255,255,0.75);
    scale: 0.97;
    color: $clrbtn;
  }
  &:active{
    scale: 0.93;
    color: $clrbtn;
  }
}

</style>