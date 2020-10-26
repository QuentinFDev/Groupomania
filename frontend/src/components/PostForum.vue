<template>
    <div>
        <div class="post" v-for="post in posts.slice()" :key="post.id">
            <div class="headerpost">
                <div class="data-post">
                    <div class="userpost"><p class="letteruser">{{post.letterUserPost}}</p></div>
                    <div class="postdata">
                        <h3>{{post.createdby}}</h3>
                        <p>{{post.created}}</p>
                    </div>
                </div>
                <div class="options" v-if="post.createdby == userName">
                    <button class="btn modifyPost" @click="modifyPost(post)">Modifier</button>
                    <button class="btn removePost" @click="removePost(post)">Supprimer</button>
                </div>
            </div>
            <div class="corpspost">
                <p class="textpost">{{post.post}}</p>
                <img :src="post.imageUrl" alt="">
                <div class="react">
                    <h3 v-if="post.comments.length < 1">Pas de commentaire pour ce post !</h3>
                    <h3 v-else @click="comments()"><i>{{post.comments.length}} commentaire</i><i v-if="post.comments.length > 1">s</i></h3>
                    <h3 v-if="post.likes.length < 1">Pas de j'aimes pour ce post !</h3>
                    <h3 v-else @click="likes()"><i>{{post.likes.length}} personne</i><i v-if="post.likes.length > 1">s</i><i> aime<i v-if="post.likes.length > 1">nt</i> ce post </i></h3>
                </div>
            </div>
            <div class="postComments" v-bind:class="{'open':commentsopen}" v-for="comment in post.comments" :key="comment.id">
                <p v-if="comment.createdby == userName">({{comment.created}}) Vous avez dit : {{comment.comment}}</p>
                <p v-else>({{comment.created}}) {{comment.createdby}} a dit : {{comment.comment}}</p>
                <div v-if="comment.createdby == userName">
                    <button class="btn removeComment" @click="removeComment(comment)">Supprimer</button>
                </div>
            </div>
            <div class="postLikes" v-bind:class="{'open':likesopen}" v-for="like in post.likes" :key="like.id">
                <p v-if="like.userName == userName">Vous aimez ce post</p>
                <p v-else>{{like.userName}} aime ce post</p>
                <div v-if="like.userName == userName">
                    <button class="btn removeLike" @click="removeLike(like)">J'aime plus</button>
                </div>
            </div>
            <div class="footerpost">
                <input class="comment" type="text" placeholder="Ecrire un commentaire..." id="comment" name="comment" v-model="comment[post.id]" @keypress="fetchComment(post.id, $event)"/>
                <div class="like" @click="onLike(post.id)">
                    <i class="fa-heart fa-3x far" style="margin-right: 10%; cursor: pointer;"></i>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
Vue.use(Vueaxios, axios)

export default {
    name: "PostForum",
    data(){
        return{
            posts : [],
            comment: {},
            userId: localStorage.getItem('UserId'),
            userName: localStorage.getItem('Name'),
            commentsopen : false,
            likesopen : false
        }
    },
    methods : {
        //Récuperer tous les posts
        async fetchPosts() {
            const posts = await axios.get('http://localhost:5000/posts', {headers:
            {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Name' : localStorage.getItem('Name')
            }})
            this.posts = posts.data
            console.log(posts.data);
        },
        //Poster un commentaire
        async fetchComment(postId, e){
            if(e.key == 'Enter' && this.comment[postId] != null) {
                await axios.post('http://localhost:5000/posts/comments', {
                    content: this.comment[postId],
                    postId : postId,
                    name: localStorage.getItem('Name'),
                })
                location.reload()
            }
        },
        //Supprimer un post, les commentaires et les likes du post
        async removePost(post) {
            await axios.delete(`http://localhost:5000/posts/likes/${post.id}`, {headers:
                {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }})
            await axios.delete(`http://localhost:5000/posts/comments/${post.id}`, {headers:
                {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }})
            await axios.delete(`http://localhost:5000/posts/${post.id}`, {headers:
                {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }})
            location.reload()
        },
        //Modifier un post
       async modifyPost(post) {
           if(post.userId == localStorage.getItem('UserId')) {
                this.$router.push(`/modifyPost?post=${post.id}`)
           }
           else {
               alert('Vous ne pouvez pas modifier ce post')
           }
        },
        //ouvrir le panneau des commentaires
        comments(){
            this.commentsopen=!this.commentsopen
        },
        //ouvrir le panneau des likes
        likes(){
            this.likesopen=!this.likesopen
        },
        //supprimer un commentaire
        async removeComment(post) {
            await axios.delete(`http://localhost:5000/posts/comment/${post.id}`, {headers:
                {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }})
            location.reload()
        },
        //Liker un post
        async onLike(postId) {
            await axios.post('http://localhost:5000/posts/likes', {
                postId : postId,
                userName: localStorage.getItem('Name'),
            })
            location.reload()
        },
        //supprimer un like
        async removeLike(post) {
            await axios.delete(`http://localhost:5000/posts/like/${post.id}`, {headers:
                {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }})
            location.reload()
        },
    },
    mounted(){
        this.fetchPosts()
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
$clrfooterpost : #c4c4c4;


.post{
    background-color: white;
    font-family: "calibri", sans-serif;
    border: 1px solid black;
    margin: 2%;
    .headerpost{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 2%;
        .data-post{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            .userpost{
                width: 6vw;
                height: 6vw;
                border-radius: 100px;
                background-color: $clrlogos;
                .letteruser{
                    color: white;
                    font-size: 4vw;
                    text-transform: uppercase;
                }
            }
            .postdata{
                margin-left: 1vw;
                color: black;
                text-align: start;
            }
        }
        .options{
            .btn{
                appearance: none;
                background: none;
                border: none;
                outline: none;
                cursor: pointer;
                padding: 10px 20px;
                border-radius: 4px;
                color: #FE4880;
                font-size: 14px;
                font-weight: 600;
                margin: 0 15px;
                transition: 0.4s;
                border: 3px solid #FE4880;
                background-image: linear-gradient(to right, transparent 50%, #FE4880 50%);
                background-size: 200%;
                background-position: 0%;
                &:hover{
                    color: #FFF;
                    background-position: 100%;
                }
                &:active{
                    scale: 0.95;
                }
            }
        }
    }
    .corpspost{
        .textpost{
        text-align: start;
        margin: 4%;
        font-size: 1.6em;
        white-space: pre-wrap;
        word-wrap: break-word;
        }
        img{
            margin-bottom: 2%;
        }
        h3 i{
            font-size: 1.5vw;
            cursor: pointer;
            color: blue;
            text-decoration: underline overline $clrlogos;
        }
    }
    .react{
        display: flex;
        justify-content: space-around;
    }
    .postComments{
        display: none;
        &.open{
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-align: left;
            padding-left: 2%;
            margin: 1%;
            min-height: 73px;
            background: $clrprimaire;
            border-radius: 25px;
            p{
                font-size: 1.5em;
            }
            .btn{
                appearance: none;
                background: none;
                border: none;
                outline: none;
                cursor: pointer;
                padding: 10px 20px;
                border-radius: 30px;
                color: #FE4880;
                font-size: 14px;
                font-weight: 600;
                margin: 15px;
                transition: 0.4s;
                border: 3px solid #FE4880;
                background-image: linear-gradient(to right, transparent 50%, #FE4880 50%);
                background-size: 200%;
                background-position: 0%;
                &:hover{
                    color: #FFF;
                    background-position: 100%;
                }
                &:active{
                    scale: 0.95;
                }
            }
        }
    }
    .postLikes{
        display: none;
        &.open{
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-align: left;
            padding-left: 2%;
            margin: 1%;
            min-height: 73px;
            background: $clrprimaire;
            border-radius: 25px;
            p{
                font-size: 1.5em;
            }
            .btn{
                appearance: none;
                background: none;
                border: none;
                outline: none;
                cursor: pointer;
                padding: 10px 20px;
                border-radius: 30px;
                color: #FE4880;
                font-size: 14px;
                font-weight: 600;
                margin: 15px;
                transition: 0.4s;
                border: 3px solid #FE4880;
                background-image: linear-gradient(to right, transparent 50%, #FE4880 50%);
                background-size: 200%;
                background-position: 0%;
                &:hover{
                    color: #FFF;
                    background-position: 100%;
                }
                &:active{
                    scale: 0.95;
                }
            }
        }
    }
    .footerpost{
        background: $clrfooterpost;
        height: 3vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 2vh;
        .comment{
            margin-left: 2vw;
            padding-left: 20px;
            width: 60%;
            height: 75%;
            background-color: $clrlogos;
            font-size: 1.7vw;
            border-radius: 30px;
            border: 0px;
            text-shadow: 2px 2px #e6e6e6;
            color: black;
            &:hover{
                color: black;
                text-shadow: none;
            }
        }
        .like{
            margin-right: 10%;
        }
    }
}

@media screen and (max-width: 1160px){
    .post{
        .footerpost{
            height: 6vw;
        }
        .textpost{
        font-size: 1.3em;
        }
    }
}

@media screen and (max-width: 800px){
    .post{
        .footerpost{
            height: 8vw;            
        }
        .textpost{
        font-size: 1.2em;
        }
    }
}

@media screen and (max-width: 600px){
    .post{
        .headerpost{
            .userpost{
                width: 8vw;
                height: 8vw;
            }
        }
        .textpost{
        font-size: 1.1em;
        }
        .footerpost{
            height: 11vw;
            .comment{
                width: 70%;
                font-size: 5vw;
            }           
        }
    }
}

@media screen and (max-width: 450px){
    .post{
        .headerpost{
            .userpost{
                width: 10vw;
                height: 10vw;
            }
        }
        .footerpost{
            height: 14vw; 
        }
    }
}
</style>
