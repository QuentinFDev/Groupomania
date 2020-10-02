<template>
    <div>
        <div class="post" v-for="post in posts.slice().reverse()" :key="post.id">
            <div class="headerpost">
                <div class="data-post">
                    <div class="userpost"><p class="letteruser">{{post.letterUserPost}}</p></div>
                    <div class="postdata">
                        <h3>{{post.createdby}}</h3>
                        <p>{{post.created}}</p>
                    </div>
                </div>
                <div class="options" v-if="post.createdby == userName">
                    <button class="btn modifyPost">Modifier</button>
                    <button class="btn removePost">Supprimer</button>
                </div>
            </div>
            <div class="corpspost">
                <p class="textpost">{{post.post}}</p>
                <img :src="post.imageUrl" alt="">
                <h2>commentaires: </h2>
            </div>
            <div class="postComments" v-for="comment in comments.slice().reverse()" :key="comment.id">
                <div v-if="post.id == comment.postId">
                    <h3>{{comment.createdby}} le <i>{{comment.created}}</i></h3>
                    <p>{{comment.comment}}</p>
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
            comments: [],
            likes:[],
            comment: {},
            like: {},
            userId: localStorage.getItem('UserId'),
            userName: localStorage.getItem('Name'),
        }
    },
    methods : {
        async fetchPosts() {
            const posts = await axios.get('http://localhost:5000/posts', {headers:
            {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Name' : localStorage.getItem('Name')
            }})
            this.posts = posts.data
            console.log(posts.data);
        },
        async fetchComment(postId, e){
            if(e.key == 'Enter') {
                await axios.post('http://localhost:5000/posts/comments', {
                    content: this.comment[postId],
                    postId : postId,
                    name: localStorage.getItem('Name'),
                })
                location.reload()
            }
        },
        async fetchComments() {
            const comments = await axios.get('http://localhost:5000/posts/comments', {headers:
            {
                'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                'Name' : localStorage.getItem('Name')
            }})
            this.comments = comments.data
        },
        onLike(postId) {
            axios.post('http://localhost:5000/posts/likes', {
                postId : postId,
                userId : localStorage.getItem('UserId'),
                name: localStorage.getItem('Name'),
            })
        },
    },
    mounted(){
        this.fetchPosts()
        this.fetchComments()
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
    }
    .postComments{
        text-align: left;
        padding-left: 2%;
        margin: 1%;
        background: $clrprimaire;
        border-radius: 25px;
        h3{
            padding-top: 1%;
        }
        p{
            font-size: 1.2em;
            padding-bottom: 1%;
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
