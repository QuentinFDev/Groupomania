<template>
    <div class="header-forum">
        <div class="header-bar">
            <div class="rounduser">
                <p class="letteruser" v-bind="letteruser()">{{letterUser}}</p>
            </div>
            <div class="logo">
                <img src="../assets/iconwithoutbackground.png" alt="logo groupomania">
                <h1>Groupomania</h1>
            </div>
            <div class="menu-burger" @click="menu()">
                <i class="fas fa-bars fa-4x"></i>
            </div>
        </div>
        <div class="header-menu">
            <ul class="menu" v-bind:class="{'open':menuopen}">
                <li @click="newPost()">Nouveau Post</li>
                <li @click="myAcount()">Mon compte (supprimer mon compte)</li>
                <li @click="logout()">Deconnexion</li>
            </ul>
            <router-view/>
        </div>
        <div class="newPostFloat" @click="newPost()">+</div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
Vue.use(Vueaxios, axios)

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
        async myAcount(){
            await axios.delete(`http://localhost:5000/users`,
                {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                })
                localStorage.clear()
                this.$router.push('/')
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

$clrprimaire : #c4c4c4;
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
    .logo{
        display: flex;
        background-color: $clrprimaire;
        width: auto;
        justify-content: center;
        align-items: center;
        img {
            width: 18vh;
            height: 18vh;
        }
        h1{
            font-family: 'nevis', 'calibri', 'sans-serif';
            color: $clrlogos;
            font-size: 10vh;
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

.newPostFloat{
    display: flex;
    font-size: 110px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 99;
    position: fixed;
    left: 90vw;
    top: 80vh;
    width: 100px;
    height: 100px;
    background: $clrlogos;
    border-radius: 100px;
    &:hover{
        scale: 0.95;
    }
    &:active{
        scale: 0.9;
    }
}

@media screen and (max-width: 1350px){
    .newPostFloat{
        left: 85vw;
    }
}

@media screen and (max-width: 1100px){
    .header-bar{
    height: 15vw;
        .logo{
            img{
                display: none;
            }
            h1{
                font-size: 7vw;
            }
        }
        .rounduser{
            width: 10vw;
            height: 10vw;
            .letteruser{
                font-size: 6vw;
            }
        }
        .menu-burger .fa-4x{
            scale: 0.8;
        }
    }
}

@media screen and (max-width: 870px){
    .newPostFloat{
        left: 80vw;
    }
}

@media screen and (max-width: 550px){
    .header-bar{
        .rounduser{
            width: 12vw;
            height: 12vw;
        }
        .menu-burger .fa-4x{
            scale: 0.8;
        }
    }
    .newPostFloat{
        left: 75vw;
    }
}

@media screen and (max-width: 450px){
    .newPostFloat{
        left: 70vw;
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
