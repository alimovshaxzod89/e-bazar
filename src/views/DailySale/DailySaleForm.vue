<template>
    <div class="productForm">
        <h4 class="m-4">Kunlik to'lov qo'shish</h4>
        <hr>
        <form @submit.prevent="submit">
            <div class="row justify-content-around">
                <select
                    v-model="newData.product_name"
                    id="namanyay-search-box" 
                    style="height: 48px; padding: 0; margin-top: 8px;"
                >
                    <option value="selected">Mahsulot nomini tanlang</option>
                    <option v-for="product in products" :key="product.id"> {{product.title}} </option>
                </select>
                <input 
                    class="col-xxl-6 my-2"
                    type="text" 
                    v-model="newData.product_bulk"
                    id="namanyay-search-box" 
                    placeholder="Mahsulot miqdori (kg, soni)"
                    required    
                >
                <input 
                    class="col-xxl-6 my-2"
                    type="text" 
                    v-model="newData.price"
                    id="namanyay-search-box" 
                    placeholder="Mahsulot narxi"
                    required    
                >
                <input 
                    class="col-xxl-6 my-2"
                    type="nubmer" 
                    v-model="newData.date"
                    id="namanyay-search-box" 
                    placeholder="Sana"
                >
                <div class="text-center"> Umumiy narx: {{ newData.price * newData.product_bulk }} </div>
            </div>
            <div class="buttons d-md-flex justify-content-end m-4">
                <button class="btn btn-danger m-2" type="button" @click="close">Bekor qilish</button>
                <button class="btn btn-success m-2" type="submit">Saqlash</button>
            </div>
        </form>
    </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import DailySaleStoreModule from './DailySaleStoreModule'
export default {
    components: {
        DailySaleStoreModule
    },
    setup(props, context){

        const store = DailySaleStoreModule;

        const products = computed(() => {
            return store.state.products
        })

        // For close Modal
        const close = () => {
            context.emit("close")
        }

        // Add new row
        const newData = ref({
            product_name: 'selected',
            product_bulk: null,
            price: null,
            last_price: null,
            date: null,
        });

        // For auto refresh
        const reload = () => {
            window.location.reload()
        }

        // Edit product bulk
         const oldProductId = ref(null)
         

        // For submit datas in server
        const submit = () => {
            axios.post('http://localhost:3000/dailysales', {
                id: Math.floor(Math.random() * 100000),
                title: newData.value.product_name,
                bulk: newData.value.product_bulk,
                price: newData.value.price,
                last_price: newData.value.product_bulk * newData.value.price,
                date: newData.value.date,
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
                products.value.filter(el => {
                    if(el.title == newData.value.product_name){
                        oldProductId.value = el.id;
                        axios.post('http://localhost:3000/products', {
                            id: Math.floor(Math.random() * 100000),
                            title: newData.value.product_name,
                            bulk: el.bulk - newData.value.product_bulk,
                            begin_day: el.begin_day,
                            end_day: el.end_day,
                        })
                    }
                })
            )
            .then(
                store.commit('REMOVE_PRODUCT_ROW', oldProductId.value)
            )
        }

        onMounted(() => {
            store.dispatch("fetchProducts");
        })

        return{
            newData,
            products,
            oldProductId,

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