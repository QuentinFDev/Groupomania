<template>
    <div class="header-post">
        <router-link to="/forum"><i class="fas fa-angle-double-left fa-4x"></i></router-link>
        <h3>Créer une publication</h3>
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'HeaderPost',
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

.header-post{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 2vw;
    padding-bottom: 2vw;
    border-bottom: 2px solid black;
    .fa-4x{
        color: #d1515a;
        cursor: pointer;
        &:hover{
            transition: 0.5s ease-in-out;
            transform: translate(-10px);
        }
    }
    h3{
        color: $clrlogos;
        font-size: 5vw;
    }
    
}
@media screen and (max-width: 1000px){
    .header-post{
        h3{
            font-size: 7vw;
        }
    }
}

@media screen and (max-width: 650px){
    .header-post{
        margin: auto 2vw;
        .fa-4x{
            scale: 0.9;
            margin-right: 2vw;
        }
    }
}

</style>
