<template>
    <div class="header-forum">
        <div class="header-bar">
            <div class="rounduser"><p class="letteruser" v-bind="letteruser()">{{letterUser}}</p></div>
            <input class="search-bar" type="text" placeholder="Rechercher..." id="search" name="search"/>
            <div class="menu-burger" @click="menu()">
                <i class="fas fa-bars fa-4x"></i>
            </div>
        </div>
        <div class="header-menu">
            <ul class="menu" v-bind:class="{'open':menuopen}">
                <li @click="newPost()">Nouveau Post</li>
                <li @click="myAcount()">Mon compte</li>
                <li @click="logout()">Deconnexion</li>
            </ul>
            <router-view/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HeaderForum',
  data() {
    return {
        menuopen:false,
        letterUser: null
    }
  },
  methods:{
      menu(){
          this.menuopen=!this.menuopen
      },
      newPost(){
          this.$router.push('/post')
      },
      myAcount(){
          this.$router.push('#')
      },
      logout(){
          localStorage.clear()
          this.$router.push('/')
      },
      letteruser(){
          const name = localStorage.getItem('Name')
          this.letterUser = name.substr(0, 1)
      }
  },
}
</script>

<style scoped lang="scss">

@font-face {
    font-family: "nevis";
    src: url("../assets/fonts/nevis.ttf") format("truetype");
}

$clrprimaire : #c4c4c4; /*Couleur de font*/
$clrecriture : #fd2f04; 
$clrlogos : #d1515a;
$clrtextsearch : #928f8f;


.header-bar{
    font-family: "nevis", "calibri", sans-serif;
    display: flex;
    justify-content: space-around;
    background-color: $clrprimaire;
    width: auto;
    height: 20vh;
    align-items: center;
    .rounduser{
        width: 6vw;
        height: 6vw;
        border-radius: 100px;
        background-color: $clrlogos;
        display: flex;
        align-items: center;
        justify-content: center;
        .letteruser{
            color: white;
            font-size: 4vw;
            text-transform: uppercase;
        }
    }
    input{
        padding-left: 20px;
        width: 50%;
        height: 40%;
        background-color: white;
        font-size: 4vh;
        border-radius: 30px;
        border: 0px;
        text-shadow: 2px 2px #e6e6e6;
        color: $clrtextsearch;
        &:hover{
            color: black;
            text-shadow: none;
        }
    }
    .menu-burger .fa-4x{
        color: #d1515a;
        cursor: pointer;
    }
}

.header-menu ul{
    display: block;
    float: right;
    flex-direction: column;
    align-items: center;
    background: $clrprimaire;
    width: 40%;
    transform: translateX(100%);
    transition: transform 0.33s ease-in-out;
    &.open{
        transform: translateX(0);
        transition: transform 0.33s ease-in-out;
    }
    li{
        color: #551a8b;
        cursor: pointer;
        display: block;
        padding: 3%;
        list-style: none;
        border: 1px solid black;
        text-decoration: none;
        &:hover{
            background: $clrlogos;
        }
    }
}

@media screen and (max-width: 850px){
    .header-bar{
    height: 15vw;
        .rounduser{
            width: 10vw;
            height: 10vw;
        }
        .menu-burger .fa-4x{
            scale: 0.8;
        }
    }
}

@media screen and (max-width: 550px){
    .header-bar{
        .rounduser{
            width: 12vw;
            height: 12vw;
        }
        input{
        height: 60%;
        font-size: 3.5vw;
        }
        .menu-burger .fa-4x{
            scale: 0.8;
        }
    }
}

@media screen and (max-width: 400px){
    .header-bar{
        .menu-burger .fa-4x{
            scale: 0.7;
        }
    }
}
</style>
