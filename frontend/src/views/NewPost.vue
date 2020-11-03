<template>
    <div class="form-post">
        <headerpost/>
        <form id="post-form" @submit="postForm">
            <div class="form-group">
                <textarea class="form-control" placeholder="Ecrivez-ici..." id="description" v-model="newpost.form"></textarea>
                <label for="file" >Télécharger une image: </label>
                <input class="inputFile" type="file" accept="image/*" ref="file" @change="selectFile"/>
            </div>
            <button class="submit" type="submit">Publier</button>
        </form>
    </div>
</template>

<script>
import headerpost from '@/components/HeaderPost.vue'
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
Vue.use(Vueaxios, axios)

export default {
    name: 'NewPost',
    components:{
        headerpost,
    },
    data(){
        return{
            newpost:{
                form:null,
                file : "",
                createdby: localStorage.getItem("Name"),
                userId : localStorage.getItem('UserId'),
                letterUserPost: localStorage.getItem("Name").substr(0, 1)
            }
        }
    },
    methods:{
        selectFile() {
            console.log(this.$refs.file.files[0]);
            this.newpost.file = this.$refs.file.files[0]  
        },
        postForm(e){
            let formData = new FormData()
            formData.append('form', this.newpost.form)
            formData.append('createdby', this.newpost.createdby)
            formData.append('userId', this.newpost.userId)
            formData.append('letterUserPost', this.newpost.letterUserPost)
            formData.append('file', this.newpost.file)
            if(this.newpost.form != null){
                this.axios.post('http://localhost:5000/posts', formData, {headers:
                    {
                    'Content-Type': 'multipart/form-data',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                    },
                })
                .then((result) =>{
                    if(result.data.error !=undefined) {
                        console.log("result", result.data.error)
                    }
                    else {
                        this.$router.push('forum')
                    }
                })
            }
            else{
                alert("Vous n'aviez rien écris !")
            }
        console.log(this.newpost);
        e.preventDefault();
        },
    }
}
</script>

<style lang="scss" scoped>
@font-face {
    font-family: "nevis";
    src: url("../assets/fonts/nevis.ttf") format("truetype");
}

$clrprimaire : #c4c4c4; /*Couleur de font*/
$clrecriture : #fd2f04; 
$clrlogos : #d1515a;
$clrtextsearch : #928f8f;


#post-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    .form-group{
        margin: 2vw auto;
        #description{
            margin-right: 2vw;
            width: 95vw;
            height: 20vw;
            font-size: 1.5vw;
            font-family: Calibri, 'Trebuchet MS', sans-serif;
            padding: 1%;
        }
        label{
            margin: 2%;
            color: white;
            font-size: 1.5vw;
        }
        input[type=file]::file-selector-button {
            border: 2px solid $clrprimaire;
            padding: .2em .4em;
            border-radius: .2em;
            background-color: $clrlogos;
            transition: 1s;
            color: white;
            }
        input[type=file]::file-selector-button:hover {
            background-color: $clrprimaire;
            border: 2px solid $clrlogos;
        }
    }
    .submit{
        cursor: pointer;
        width: 10%;
        max-width: 200px;
        border: 1px solid $clrprimaire;
        padding:10px ;
        border-radius:16px;
        transition: 0.4s;
        color: white;
        background-color: $clrlogos;
        font-family: "nevis", "calibri", sans-serif;
        &:hover{
            background-color: rgba(255,255,255,0.75);
            scale: 0.97;
            color: $clrlogos;
        }
        &:active{
            scale: 0.93;
            color: $clrlogos;
        }
    }
    img{
        width: 30%;
        margin: auto;
        display: block;
        margin-bottom: 10px;
    }
}

@media screen and (max-width: 1100px){
    #post-form{
        .form-group{
            label{
                font-size: 3vw;
            }
        }
    }
}

@media screen and (max-width: 900px){
    #post-form{
        .form-group{
            #description{
                font-size: 3vw;
            }
        }
        .submit{
            width: 20%;
        }
    }
}

@media screen and (max-width: 650px){
    #post-form{
        .form-group{
            label{
                color: black;
            }
        }
    }
}

@media screen and (max-width: 500px){
    #post-form{
        .form-group{
            #description{
                font-size: 6vw;
            }
        }
        .submit{
            width: 30%;
        }
    }
}

@media screen and (max-width: 400px){
    #post-form{
        .form-group{
            label{
                font-size: 5vw;
            }
        }
    }
}
</style>