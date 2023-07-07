<script>
export default {
    props: {
        data_page: 1
    },
    data() {
        return {
            pagina: parseInt(localStorage.getItem('actualPage')) || 1
        }
    },
    methods: {
        changePageUp() {
            this.pagina +=1
            localStorage.setItem('actualPage',this.pagina)
            this.$emit('evento-page-up')
            window.scrollTo(0, 0);
        },
        changePageDown(){
            this.pagina-=1
            localStorage.setItem('actualPage',this.pagina)
            this.$emit('evento-page-down')
            window.scrollTo(0, 0);
        },
        setPage(value) {
            this.pagina = value
            console.log(value)
            localStorage.setItem('actualPage', value)
            this.$emit('evento-page')
            window.scrollTo(0, 0);
        }
    }
}
</script>

<template>
        <div class="pie-pagina">
                <!-- CHANGE PAGE BUTTON -->
                <button class="change-page" @click="setPage(1)" v-show="this.pagina != 1">&lt;==</button>
                <button v-show="this.pagina != 1" @click="changePageDown()" class="change-page">&lt;=</button>
               
                <!-- CENTRAL BUTTON -->
                <button @click="setPage(this.pagina - 2)" v-show="this.pagina > 2"> {{ this.pagina - 2 }}</button>
                <button @click="setPage(this.pagina - 1)" v-show="this.pagina > 1"> {{ this.pagina -1 }}</button>
                <button @click="setPage(this.pagina)"> {{ this.pagina }}</button>
                <button @click="setPage(this.pagina + 1 )" v-show="this.pagina < 500"> {{ this.pagina + 1}}</button>
                <button @click="setPage(this.pagina + 2)" v-show="this.pagina <499"> {{ this.pagina + 2 }}</button>

                <!-- CHANGE PAGE BUTTON -->
                <button @click="changePageUp()" class="change-page" v-show="this.pagina < 500">=></button>
                <button class="change-page" @click="setPage(500)" v-show="this.pagina < 500">==></button>
        </div>
</template>

<style scoped>
    .pie-pagina {
        display: flex;
        align-items: center;
        justify-content: center;
        position: static;
        bottom: 0;
        height: 95px;
        background-image: linear-gradient(to top, #212529, black);
        color: black,;
        width: 100%;     
    }

    button {
        background-color: beige;
        border: unset;
        padding: 5px 7px;
        margin: 7px;
        border-radius: 3px;
        font-size: 20px;
        transition: transform 0.3s ease-in-out;
        cursor: pointer;
    }

    button:nth-child(5) {
        color: beige;
        background-color: #0dcaf0;
    }

    button:nth-child(2),
    button:nth-child(8) {
        color: white;
        background-color: #0f645d;
    }
    
    button:first-child,
    button:last-child {
        color: white;
        background-color: rgb(199, 36, 36);
    }

    .change-page:hover {
        transform: scale(1.3);
    }
</style>