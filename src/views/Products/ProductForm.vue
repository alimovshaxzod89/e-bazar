<template>
    <div class="productForm">
        <h4 class="m-4">Tovar qo'shish</h4>
        <hr>
        <form @submit.prevent="submit">
            <div class="row justify-content-around">
                <input 
                    class="col-xxl-6 my-2"
                    type="text" 
                    v-model="newData.product_name"
                    id="namanyay-search-box" 
                    placeholder="Tovar nomi"
                    required
                >
                <input 
                    class="col-xxl-6 my-2"
                    type="number"
                    v-model="newData.product_bulk"
                    id="namanyay-search-box" 
                    placeholder="Tovar miqdori (kg, soni)"
                    required    
                >
                <input 
                    class="col-xxl-6 my-2"
                    type="text" 
                    v-model="newData.begin_date"
                    id="namanyay-search-box" 
                    placeholder="Kelgan sana"
                    required    
                >
                <input 
                    class="col-xxl-6 my-2"
                    type="text" 
                    v-model="newData.end_date"
                    id="namanyay-search-box" 
                    placeholder="Yaroqlilik muddati"
                >
            </div>
            <div class="buttons d-md-flex justify-content-end m-4">
                <button class="btn btn-danger m-2" type="button" @click="close">Bekor qilish</button>
                <button class="btn btn-success m-2" type="submit">Saqlash</button>
            </div>
        </form>
    </div>
</template>
<script>
import { ref } from 'vue'
import axios from 'axios'
export default {
    setup(props, context){

        // For close Modal
        const close = () => {
            context.emit("close")
        }

        // Add new row
        const newData = ref({
            product_name: null,
            product_bulk: null,
            begin_date: null,
            end_date: null,
        });

        // For auto refresh
        const reload = () => {
            window.location.reload()
        }

        // For submit datas in server
        const submit = () => {
            axios.post('http://localhost:3000/products', {
                id: Math.floor(Math.random() * 100000),
                title: newData.value.product_name,
                bulk: newData.value.product_bulk,
                begin_day: newData.value.begin_date,
                end_day: newData.value.end_date,
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
            .then(
                close()
            )
            .then(
                reload()
            )
        }

        return{
            newData,

            submit,
            close,
            reload,
        }
    }
}
</script>
<style scoped>
.productForm{
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid rgba(0, 0, 0, 0.451);
    border-radius: 10px;
    background-color: white;
}
#namanyay-search-box {
    background: white;
    padding: 10px;
    border-radius: 5px;
    -moz-border-radius: 5px 0 0 5px;
    -webkit-border-radius: 5px;
    -o-border-radius: 5px;
    border-color: rgb(118,54,230);
    width: 300px;
}
@media only screen and (max-width: 571px) {
  .productForm{
    width: 70%;
  }
  #namanyay-search-box {
    background: white;
    width: 80%;
    margin: auto;
  }
}
</style>