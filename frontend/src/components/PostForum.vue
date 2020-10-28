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
            </div>
            <div class="reacts">
                <div class="showComments">
                    <button class="btnShow" v-if="post.comments.length > 0" @click="showCommentsAction(post)">{{post.comments.length}} Commentaire<strong v-if="post.comments.length > 1">s</strong></button>
                    <transition name="fade" appear>
                        <div class="comments-overlay" v-if="showComments[post.id]" @click="showComments[post.id] = false"></div>
                    </transition>
                    <transition name="slide" appear>
                        <div class="comments" v-if="showComments[post.id]">
                            <div class="oneComment" v-for="comment in post.comments" :key="comment.postId">
                                <p><b>({{comment.created}}) {{comment.createdby}} a dit : </b>{{comment.comment}}</p>
                                <div v-if="comment.createdby == userName">
                                    <button class="btn removeComment" @click="removeComment(comment)">Supprimer</button>
                                </div>
                            </div>
                            <button class="button" @click="showComments[post.id] = false">Fermer</button>
                        </div>
                    </transition>
                </div>
                <div class="showLikes">
                    <button class="btnShow" v-if="post.likes.length > 0" @click="showLikesAction(post)">{{post.likes.length}} Like<strong v-if="post.likes.length > 1">s</strong></button>
                    <transition name="fade" appear>
                        <div class="likes-overlay" v-if="showLikes[post.id]" @click="showLikes[post.id] = false"></div>
                    </transition>
                    <transition name="slide" appear>
                        <div class="likes" v-if="showLikes[post.id]">
                            <div class="oneLike" v-for="like in post.likes" :key="like.postId">
                                <p><b>{{like.userName}}</b> aime ce post</p>
                                <div v-if="like.userName == userName">
                                    <button class="btn removeLike" @click="removeLike(like)">J'aime plus</button>
                                </div>
                            </div>
                            <button class="button" @click="showLikes[post.id] = false">Fermer</button>
                        </div>
                    </transition>
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
            likesopen : false,
            showComments : {},
            showLikes : {},
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
            posts.data.forEach(element => {
                this.showComments[element.id] = false
            });
            this.posts = posts.data
            console.log(posts.data);
            console.log(this.showComments);
        },
        //Poster un commentaire
        async fetchComment(postId, e){
            if(e.key == 'Enter' && this.comment[postId] != null) {
                await axios.post('http://localhost:5000/posts/comments', {
                    content: this.comment[postId],
                    postId : postId,
                    name: localStorage.getItem('Name'),
                })
                this.posts = this.posts.map(element => {
                    if(element.id == postId) {
                        element.comments.push({
                        comment : this.comment[postId],
                        postId : postId,
                        createdby : localStorage.getItem('Name'),
                        created : new Date()
                        })
                    }
                    return element
                })
                this.comment[postId] = ''
                this.comment = JSON.parse(JSON.stringify(this.comment))
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
            this.posts = this.posts.map(element => {
                if(element.id == postId) {
                    element.likes.push({
                        userName: localStorage.getItem('Name')
                    })
                }
                return element
            })
            this.like = JSON.parse(JSON.stringify(this.like))
        },
        //supprimer un like
        async removeLike(post) {
            await axios.delete(`http://localhost:5000/posts/like/${post.id}`, {headers:
                {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }})
            location.reload()
        },
        //afficher la fenetre des commentaires
        showCommentsAction(post) {
            this.showComments[post.id] = !this.showComments[post.id]
            this.showComments = JSON.parse(JSON.stringify(this.showComments))
        },
        //afficher la fenetre des likes
        showLikesAction(post) {
            this.showLikes[post.id] = !this.showLikes[post.id]
            this.showLikes = JSON.parse(JSON.stringify(this.showLikes))
        }
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
    .reacts{
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-bottom: 2vw;
        width: 100vw;
        overflow-x: hidden;
        .btnShow{
            appearance: none;
            outline: none;
            border: none;
            background: none;
            cursor: pointer;
            display: inline-block;
            padding: 15px 25px;
            background-image: linear-gradient(to right, #CC2E5D, #FF5858);
            border-radius: 8px;
            color: #FFF;
            font-size: 18px;
            font-weight: 700;
            box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
            transition: 0.4s ease-out;
            &:hover {
                box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
            }
        }
        .comments-overlay,
        .likes-overlay{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 98;
            //background-color: rgba(0, 0, 0, 0.3);
        }
        .comments,
        .likes{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 99;
            width: 100%;
            max-width: 40vw;
            max-height: 60vh;
            overflow-y: scroll;
            background-color: $clrfooterpost;
            border-radius: 16px;
            padding: 25px;
            .oneComment,
            .oneLike{
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    text-align: left;
                    font-size: 1.3em;
                    font-weight: 500;
                    margin-bottom: 5%;
                }
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
            .button{
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
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity .5s;
        }
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
        .slide-enter-active,
        .slide-leave-active {
            transition: transform .5s;
        }
        .slide-enter,
        .slide-leave-to {
            transform: translateY(-50%) translateX(100vw);
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
