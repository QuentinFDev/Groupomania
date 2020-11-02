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
                    <button class="btn-like">
                        <span class="btn-text">J'aime</span>
                        <span class="btn-icon">
                            <svg 
                            class="icon" 
                            height="18" 
                            viewBox="0 -20 464 464" 
                            width="18" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="m340 0c-44.773438.00390625-86.066406 24.164062-108 63.199219-21.933594-39.035157-63.226562-63.19531275-108-63.199219-68.480469 0-124 63.519531-124 132 0 172 232 292 232 292s232-120 232-292c0-68.480469-55.519531-132-124-132zm0 0" 
                            fill="#fff"/>
                            </svg>
                        </span>
                        <ul class="social-icons">
                            <li>
                                <a href="#">
                                    <svg 
                                    class="icon" 
                                    height="30" 
                                    viewBox="0 -20 464 464" 
                                    width="30" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="m340 0c-44.773438.00390625-86.066406 24.164062-108 63.199219-21.933594-39.035157-63.226562-63.19531275-108-63.199219-68.480469 0-124 63.519531-124 132 0 172 232 292 232 292s232-120 232-292c0-68.480469-55.519531-132-124-132zm0 0" 
                                    fill="#fff"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </button>
                </div>
                <div class="share">
                    <button class="btn-share">
                        <span class="btn-text">Share</span>
                        <span class="btn-icon">
                            <svg
                            t="1580465783605"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="9773"
                            width="18"
                            height="18"
                            >
                            <path
                                d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"
                                p-id="9774"
                                fill="#ffffff"
                            ></path>
                            </svg>
                        </span>
                        <ul class="social-icons">
                            <li>
                            <a href="https://twitter.com/" target="_blank">
                            <svg
                                t="1580195676506"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="2099"
                                width="18"
                                height="18"
                                >
                                <path
                                    d="M962.267429 233.179429q-38.253714 56.027429-92.598857 95.451429 0.585143 7.972571 0.585143 23.990857 0 74.313143-21.723429 148.260571t-65.974857 141.970286-105.398857 120.32-147.456 83.456-184.539429 31.158857q-154.843429 0-283.428571-82.870857 19.968 2.267429 44.544 2.267429 128.585143 0 229.156571-78.848-59.977143-1.170286-107.446857-36.864t-65.170286-91.136q18.870857 2.852571 34.889143 2.852571 24.576 0 48.566857-6.290286-64-13.165714-105.984-63.707429t-41.984-117.394286l0-2.267429q38.838857 21.723429 83.456 23.405714-37.741714-25.161143-59.977143-65.682286t-22.308571-87.990857q0-50.322286 25.161143-93.110857 69.12 85.138286 168.301714 136.265143t212.260571 56.832q-4.534857-21.723429-4.534857-42.276571 0-76.580571 53.979429-130.56t130.56-53.979429q80.018286 0 134.875429 58.294857 62.317714-11.995429 117.174857-44.544-21.138286 65.682286-81.115429 101.741714 53.174857-5.705143 106.276571-28.598857z"
                                    p-id="2100"
                                    fill="white"
                                ></path></svg
                            ></a>
                            </li>
                            <li>
                            <a href="https://www.facebook.com/" target="_blank"
                                ><svg 
                                version="1.1" 
                                id="Capa_1" 
                                xmlns="http://www.w3.org/2000/svg" 
                                xmlns:xlink="http://www.w3.org/1999/xlink" 
                                x="0px" 
                                y="0px" viewBox="0 0 512 512" 
                                style="enable-background:new 0 0 512 512;" 
                                xml:space="preserve"
                                width="18"
                                height="18"
                                >
                                <path
                                    d="M452,0H60C26.916,0,0,26.916,0,60v392c0,33.084,26.916,60,60,60h392c33.084,0,60-26.916,60-60V60 C512,26.916,485.084,0,452,0z M472,452c0,11.028-8.972,20-20,20H338V309h61.79L410,247h-72v-43c0-16.975,13.025-30,30-30h41v-62 h-41c-50.923,0-91.978,41.25-91.978,92.174V247H216v62h60.022v163H60c-11.028,0-20-8.972-20-20V60c0-11.028,8.972-20,20-20h392 c11.028,0,20,8.972,20,20V452z"
                                    p-id="2430"
                                    fill="white"
                                ></path></svg
                            ></a>
                            </li>
                            <li>
                            <a href="https://github.com/QuentinFDev/Groupomania" target="_blank"
                                ><svg
                                t="1580195767061"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="2759"
                                width="18"
                                height="18"
                                >
                                <path
                                    d="M950.930286 512q0 143.433143-83.748571 257.974857t-216.283429 158.573714q-15.433143 2.852571-22.601143-4.022857t-7.168-17.115429l0-120.539429q0-55.442286-29.696-81.115429 32.548571-3.437714 58.587429-10.313143t53.686857-22.308571 46.299429-38.034286 30.281143-59.977143 11.702857-86.016q0-69.12-45.129143-117.686857 21.138286-52.004571-4.534857-116.589714-16.018286-5.12-46.299429 6.290286t-52.589714 25.161143l-21.723429 13.677714q-53.174857-14.848-109.714286-14.848t-109.714286 14.848q-9.142857-6.290286-24.283429-15.433143t-47.689143-22.016-49.152-7.68q-25.161143 64.585143-4.022857 116.589714-45.129143 48.566857-45.129143 117.686857 0 48.566857 11.702857 85.723429t29.988571 59.977143 46.006857 38.253714 53.686857 22.308571 58.587429 10.313143q-22.820571 20.553143-28.013714 58.88-11.995429 5.705143-25.746286 8.557714t-32.548571 2.852571-37.449143-12.288-31.744-35.693714q-10.825143-18.285714-27.721143-29.696t-28.306286-13.677714l-11.410286-1.682286q-11.995429 0-16.603429 2.56t-2.852571 6.582857 5.12 7.972571 7.460571 6.875429l4.022857 2.852571q12.580571 5.705143 24.868571 21.723429t17.993143 29.110857l5.705143 13.165714q7.460571 21.723429 25.161143 35.108571t38.253714 17.115429 39.716571 4.022857 31.744-1.974857l13.165714-2.267429q0 21.723429 0.292571 50.834286t0.292571 30.866286q0 10.313143-7.460571 17.115429t-22.820571 4.022857q-132.534857-44.032-216.283429-158.573714t-83.748571-257.974857q0-119.442286 58.88-220.306286t159.744-159.744 220.306286-58.88 220.306286 58.88 159.744 159.744 58.88 220.306286z"
                                    p-id="2760"
                                    fill="white"
                                ></path></svg
                            ></a>
                            </li>
                        </ul>
                    </button>
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
            like: false,
            dislike: true
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
            //console.log(posts.data);
            //console.log(this.showComments);
        },
        //Poster un commentaire
        async fetchComment(postId, e){
            if(e.key == 'Enter' && this.comment[postId] != null) {
                await axios.post('http://localhost:5000/posts/comments', 
                {
                    content: this.comment[postId],
                    postId : postId,
                    name: localStorage.getItem('Name'),
                },
                {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                })
                this.posts = this.posts.map(element => {
                    if(element.id == postId) {
                        let date = new Date()
                        let day = date.getDate()
                        let month = date.getMonth()+1
                        let year = date.getFullYear()
                        let dateLocale = year + '-' + month + '-' + day
                        element.comments.push({
                        comment : this.comment[postId],
                        postId : postId,
                        createdby : localStorage.getItem('Name'),
                        created : dateLocale
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
            await axios.post(`http://localhost:5000/posts/likes/${postId}`, {
                postId : postId,
                userName: localStorage.getItem('Name'),
            }, {
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            })
            this.posts = this.posts.map(element => {
                if(element.id == postId) {
                    element.likes.push({
                        userName: localStorage.getItem('Name')
                    })
                }
                return element
            })
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
        padding: 0;
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
        .like,
        .share{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 3vw;
            .btn-like,
            .btn-share {
                --btn-color: #d1515a;
                position: relative;
                padding: 16px 32px;
                font-family: Roboto, sans-serif;
                font-weight: 500;
                font-size: 16px;
                line-height: 1;
                color: white;
                background: none;
                border: none;
                outline: none;
                overflow: hidden;
                cursor: pointer;
                filter: drop-shadow(0 2px 8px rgba(#d1515a, 0.32));
                transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1); //ease-out-cubic
                &::before {
                    position: absolute;
                    content: "";
                    top: 0;
                    left: 0;
                    z-index: -1;
                    width: 100%;
                    height: 100%;
                    background: var(--btn-color);
                    border-radius: 24px;
                    transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
                }
                .btn-text,
                .btn-icon {
                    display: inline-flex;
                    vertical-align: middle;
                    transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
                }
                .btn-text {
                    transition-delay: 0.05s;
                }
                .btn-icon {
                    margin-left: 8px;
                    transition-delay: 0.1s;
                }
                .social-icons {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    display: flex;
                    margin: 0;
                    padding: 0;
                    list-style-type: none;
                    transform: translateY(-50%);
                    li {
                    flex: 1;
                    a {
                        display: inline-flex;
                        vertical-align: middle;
                        transform: translateY(55px);
                        transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
                        &:hover {
                        opacity: 0.5;
                        }
                    }
                    }
                }
                &:hover {
                    &::before {
                    transform: scale(1.2);
                    }
                    .btn-text,
                    .btn-icon {
                    transform: translateY(-55px);
                    }
                    .social-icons li {
                    a {
                        transform: translateY(0);
                    }
                    @for $i from 1 through 3 {
                        &:nth-child(#{$i}) a {
                        transition-delay: 0.1s + 0.05s * $i;
                        }
                    }
                    }
                }
            }
        }
    }
}


@media screen and (max-width: 1050px){
    .post{
        .footerpost{
            .like,
            .share{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 3vw;
                .btn-like,
                .btn-share {
                    padding: 12px 24px;
                    font-weight: 500;
                    font-size: 12px;
                    .btn-icon {
                        margin-left: 8px;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 850px){
    .post{
        .footerpost{
            height: 8vw;
        }
        .textpost{
        font-size: 1.2em;
        }
    }
}

@media screen and (max-width: 800px){
    .post{
        .footerpost{
            .like,
            .share{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 3vw;
                .btn-like,
                .btn-share {
                    padding: 12px 24px;
                    font-weight: 500;
                    font-size: 12px;
                    .btn-icon {
                        margin-left: 8px;
                    }
                }
            }
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
