<template>
    <div class="products px-md-4 ms-auto">
        <h1 class="title">Tovarlar</h1>
        <hr>
        <div class="container-fluid">
            <div class="d-flex justify-content-between py-4">
                <input id="namanyay-search-box" type="text" placeholder="Izlash..." v-model="search"/>
                <button class="defaultBtn btn" @click="openModal()">Qo'shish</button>
            </div>
            <div 
                class="product d-md-flex justify-content-between my-1"
                v-for='product in filteredProducts' :key='product.id'
            >
                <div class="w-25">
                    <p>Tovar nomi</p>
                    {{product.title}}
                </div>
                <div>
                    
                    <p>Tovar hajmi</p>
                    <ins>
                    {{product.bulk}} (kg, dona)
                        <i 
                            @click="editModal(product)"
                            class='bx bx-pencil'
                        >
                        </i>
                    </ins>
                </div>
                <div>
                    <p>Kelgan sana</p>
                    {{product.begin_day}}
                </div>
                <div>
                    <p>Yaroqlilik muddati</p>
                    {{product.end_day}}
                </div>
                <div>
                    <p>Amallar</p>
                    <i @click="confirmDelete(product.id)" class='icon_trash bx bxs-trash'></i>
                </div>

                <!-- Modals -->
                <!-- edit modal -->
                <div class="confirmDelete" v-if="modalForEdit">
                    <h4>Tovar hajmi</h4>
                    <form @submit.prevent="submit">
                        <input id="namanyay-search-box" style="width: 100%;" type="text" v-model="defaultProduct.bulk">
                    
                        <div class="d-flex justify-content-end my-4">
                            <button class="btn btn-danger mx-2" @click="modalForEdit = !modalForEdit">Yo'q</button>
                            <button class="btn btn-success" type="submit">Ha</button>
                        </div>
                    </form>
                </div>

                <!-- delete modal -->
                <div class="confirmDelete" v-if="isConfirmDelete">
                    <h4>O'chirishga aminmisiz?</h4>
                    <p style="font-size: 16px;">Xurmatli mijoz bu ma'lumotni o'chirishga aminmisiz. Kelgusida sizga kerakli ma'limot emasligiga ishinchingiz komilmi?</p>
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-success mx-2" @click="isConfirmDelete = !isConfirmDelete">Yo'q</button>
                        <button class="btn btn-danger" @click="deleteRow">Ha</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- dark zones -->
        <div class="dark_place" v-if="isAdd" @click="isAdd = !isAdd"></div>
        <div class="dark_place" v-if="isConfirmDelete" @click="isConfirmDelete = !isConfirmDelete"></div>
        <div class="dark_place" v-if="modalForEdit" @click="modalForEdit = !modalForEdit"></div>
        <ProductForm v-if="isAdd" @close="closeModal" />
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios'
import ProductForm from './ProductForm.vue'
import ProductStoreModule from './ProductsStoreModule'
export default {
    components: {
        ProductForm,
        ProductStoreModule,
    },
    
    setup(){
        // declare the store variable
        const store = ProductStoreModule;

        const products = computed(() => {
            return store.state.products
        })

        // For searching list
        const search = ref('');
        const filteredProducts = computed(()=>{
            return products.value.filter(product => product.title.toLowerCase().includes(search.value.toLowerCase()))
        });

        // For open Form
        const isAdd = ref(false)
        const openModal = () =>{
            isAdd.value = true;
        }

        // For close Form
        const closeModal = () => {
            isAdd.value = false;
        }

        // For delete Form
        const defaultId = ref(0);
        const isConfirmDelete = ref(false)
        const confirmDelete = (id) => {
            isConfirmDelete.value = true;
            defaultId.value = id;
        }
        const deleteRow = () => {
            store.commit('REMOVE_ROW', defaultId.value);
        }

        // Edit row
        const modalForEdit = ref(false)
        const defaultProduct = ref({
            id: null,
            title: null,
            bulk: null,
            begin_day: null,
            end_day: null,
        })
        const editModal = (product) => {
            defaultProduct.value.id = product.id;
            defaultProduct.value.title = product.title;
            defaultProduct.value.bulk = product.bulk;
            defaultProduct.value.begin_day = product.begin_day;
            defaultProduct.value.end_day = product.end_day;
            modalForEdit.value = true;
        }
        const submit = () => {
            axios.post('http://localhost:3000/products', {
                id: Math.floor(Math.random() * 100000),
                title: defaultProduct.value.title,
                bulk: defaultProduct.value.bulk,
                begin_day: defaultProduct.value.begin_day,
                end_day: defaultProduct.value.end_day,
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
            .then(
                modalForEdit.value = false
            )
            .then(
                store.commit('REMOVE_ROW', defaultProduct.value.id)
            )
            .then(
                window.location.reload()
            )
        }
       

        onMounted(() => {
            store.dispatch("fetchProducts");
        })

        return{
            products,
            search,
            isAdd,
            isConfirmDelete,
            defaultId,
            modalForEdit,
            defaultProduct,

            openModal,
            closeModal,
            confirmDelete,
            deleteRow,
            editModal,
            submit,

            filteredProducts,
        }
    }
}
</script>
<style scoped>
.products{
    width: calc(100% - 60px);
}
.title{
    margin-top: 2.5rem;
}
.container-fluid{
    background-color: white;
    border-radius: 10px;
    padding-bottom: 2rem;
}
#namanyay-search-box {
    background: white;
    padding: 10px;
    border-radius: 5px;
    -moz-border-radius: 5px 0 0 5px;
    -webkit-border-radius: 5px;
    -o-border-radius: 5px;
    border-color: rgb(118,54,230);
    width:300px;
}
.defaultBtn{
    color: white;
    background: rgb(118,54,230);
    background: linear-gradient(276deg, rgba(118,54,230,1) 0%, rgba(164,107,233,1) 77%, rgba(164,107,233,1) 93%);
}
.product{
    border: 2px solid rgb(118,54,230);
    border-radius: 5px;
    padding: 10px;
}
.product div p{
    color: rgba(0, 0, 0, 0.617);
    font-size: 10px;
    margin: 0;
}
.icon_trash{
    font-size: 25px;
    color: red;
    cursor: pointer;
}
.dark_place{
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.539);
    position: absolute;
    top: 0;
    right: 0;
}
.confirmDelete{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 2px solid rgba(0, 0, 0, 0.568);
    border-radius: 5px;
    z-index: 1;
    width: 50%;
    padding: 10px;
}
/* Tooltip */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>