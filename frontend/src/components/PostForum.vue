<template>
    <div>
        <div class="post" v-for="post in posts.slice().reverse()" :key="post.id">
            <div class="headerpost">
                <div class="userpost"><p class="letteruser">{{post.letterUserPost}}</p></div>
                <div class="postdata">
                    <h3>{{post.createdby}}</h3>
                    <p>{{post.created}}</p>
                </div>
            </div>
            <p class="textpost">{{post.post}}</p>
            <img :src="post.imageUrl" alt="">
            <div class="postComments" v-if="post.id == comment.postId">
            <h2>commentaires</h2>
                <div v-for="comment in comments.slice().reverse()" :key="comment.id">
                    <p>{{comment.createdby}} dit: {{comment.comment}} le: {{comment.created}} pour le post n°{{comment.postId}}</p>
                </div>
            </div>
            <div class="noComments" v-else>
                <h2>Pas de commentaires pour ce post</h2>
            </div>
            <div class="footerpost">
                <input class="comment" type="text" placeholder="Ecrire un commentaire..." id="comment" name="comment" v-model="comment[post.id]" @keypress="fetchComment(post.id, $event)"/>
                <i class="fa-heart fa-3x"
                v-bind:class="{far: isActive, 'fas': isLike}" @click="like()"></i>
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
            comment: {},
            isActive: false,
            isLike: true,
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
        like(){
            this.isActive = false,
            this.isLike = true
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
        margin: 2vw 0 2vw 2vw;
        align-items: center;
        .userpost{
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
        .postdata{
            margin-left: 1vw;
            color: black;
            text-align: start;
        }
    }
    .textpost{
        text-align: start;
        margin: 4%;
        font-size: 1.6em;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    .mediapost{
        max-width: 100%;
        max-height: 100%;
    }
    .footerpost{
        background: $clrfooterpost;
        height: 5vw;
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
            font-size: 4vh;
            border-radius: 30px;
            border: 0px;
            text-shadow: 2px 2px #e6e6e6;
            color: black;
            
            &:hover{
                color: black;
                text-shadow: none;
            }
        }
        .fa-3x{
            padding-right: 20%;
            cursor: pointer;
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
            .fa-3x{
            padding-right: 10%;
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
            .fa-3x{
                padding-right: 5%;
            }
        }
    }
}
</style>
