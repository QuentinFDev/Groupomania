<template>
    <div class="header-auth">
        <img src="../assets/iconwithoutbackground.png" alt="logo groupomania">
        <h1>Groupomania</h1>
    </div>
</template>

<script>
export default {
  name: 'HeaderAuth'
}
</script>

<style scoped lang="scss">

@font-face {
    font-family: "nevis";
    src: url("../assets/fonts/nevis.ttf") format("truetype");
}

$clrprimaire : #091f43; /*Couleur de font*/
$clrecriture : #fd2f04; 



.header-auth{
    display: flex;
    background-color: $clrprimaire;
    width: auto;
    height: 15vh;
    justify-content: center;
    align-items: center;
    img {
        width: 18vh;
        height: 18vh;
    }
    h1{
        font-family: 'nevis', 'calibri', 'sans-serif';
        color: $clrecriture;
        font-size: 10vh;
    }
}
@media screen and (max-width: 700px){
    .header-auth{
    height: 15vw;
    img {
        width: 18vw;
        height: 18vw;
    }
    h1{
        font-size: 10vw;
    }
}
}

</style>
