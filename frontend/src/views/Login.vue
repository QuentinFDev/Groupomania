<template>
<div class="body">
    <headerauth/>
   <form id="login-form" @submit="authUser">
        <p>Connexion</p>
        <h5 v-if="errors.length">
            <b>Merci de corrigé les erreurs:</b>
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </h5>
        <input class="input_field" aria-label="email" type="email" placeholder="email" id="email" name="email" v-model="auth.email"/>
        <input class="input_field" aria-label="mot de passe" type="password" placeholder="mot de passe" id="password" name="password" v-model="auth.password"/>
       <button type="submit">Envoyer</button>
    </form>
    <router-view/>
</div>
</template>

<script>
import headerauth from '@/components/HeaderAuth.vue'
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
Vue.use(Vueaxios, axios)


export default {
  name: "Auth",
  components: {
    headerauth
  },
  data(){
      return{
          errors: [],
          auth:{
              email:null,
              password:null,
          }
      }
  },
  methods:{
    authUser(e){
        this.errors = [];
            if(!this.auth.email){
                this.errors.push('Email requis !')
            }
            if(!this.auth.password){
                this.errors.push('Mot de passe requis !')
            }
            if(!this.errors.length){
                this.axios.post('http://localhost:5000/users/login', this.auth)
                    .then((result) =>{
                        if(result.data.error !=undefined) {
                            console.log("result", result.data.error);
                        }
                        else{
                            //console.log(result.data)
                            //stocker les données de l'utilisateur
                            localStorage.setItem("Name", [result.data.userFirstName + ' ' + result.data.userLastName])
                            localStorage.setItem("UserId", result.data.userId)
                            localStorage.setItem("token", result.data.token)
                            if(result.data.userAdmin === true){
                                localStorage.setItem("Admin", result.data.userAdmin)
                            }
                            this.$router.push('forum')
                        }
                    })
                    .catch(() => {
                        alert('Identifiant incorrect !')
                    })
                //console.log(this.auth);
            }       
        e.preventDefault();
    },
    validEmail: function (email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }
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

.body{
    background-image:url(../assets/batgroupomaniamax.jpg);
    background-repeat:no-repeat;
    height: 100vh;
}
#login-form{
    margin-top: 10vh;
    p{
        color: white;
        margin-bottom: 10vh;
        width: 40%;
        margin: 5vh auto;
        border: 1px solid $clrprimaire;
        padding:10px;
        font-size: 1.4em;
        border-radius:16px;
        background-color: $clrbtn;
        font-family: "nevis", "calibri", sans-serif;
    }
    h5{
        color: white;
    }
    .input_field{
        margin:0 auto 30px auto;
        display: flex;
        flex-direction: column;
    }
        [type="email"], [type="password"]{
            width: 90%;
            max-width: 500px;
            border: 1px solid $clrprimaire;
            padding:10px ;
            border-radius: 0px 16px 0px 16px;
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
            transition: 0.4s;
            color: $clrprimaire;
            font-family: "nevis", "calibri", sans-serif;
            &:placeholder-shown{
                background-color: rgba(255,255,255,0.75);
                border-radius: 16px 0px 16px 0px;
            }
        }
        [type="submit"] {
            margin-top: 3vh;
            cursor: pointer;
            width: 90%;
            max-width: 350px;
            border: 1px solid $clrprimaire;
            padding:10px ;
            border-radius:16px;
            transition: 0.4s;
            color: white;
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
    }

@media screen and (max-width: 1000px){
    .body{
        background: $clrprimaire
    }
}
</style>
