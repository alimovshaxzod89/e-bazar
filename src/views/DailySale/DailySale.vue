<template>
    <div class="dailysales px-md-4 ms-auto">
        <h1 class="title">Kunlik sotuvlar</h1>
        <hr>
        <div class="container-fluid">
            <div class="d-flex justify-content-between py-4">
                <input id="namanyay-search-box" type="text" placeholder="Izlash..." v-model="search"/>
                <button class="defaultBtn btn" @click="openModal()">Qo'shish</button>
            </div>
            <div 
                class="product d-md-flex justify-content-between my-1"
                v-for='dailysale in filteredDailySale' :key='dailysale.id'
            >
                <div class="w-25">
                    <p>Mahsulot nomi</p>
                    {{dailysale.title}}
                </div>
                <div>
                    <p>Mahsulot soni</p>
                    {{dailysale.bulk}} (kg, dona)
                </div>
                <div>
                    <p> 1 kg yoki dona mahsulot narxi</p>
                    {{dailysale.price}}
                </div>
                <div>
                    <p>Umumiy mahsulot narxi</p>
                    {{dailysale.last_price}}
                </div>
                <div>
                    <p>Sana</p>
                    {{dailysale.date}}
                </div>
                <div>
                    <p>Amallar</p>
                    <i @click="confirmDelete(dailysale.id)" class='icon_trash bx bxs-trash'></i>
                </div>

                <!-- Modals -->
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
        <DailySaleForm v-if="isAdd" @close="closeModal" />
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios'
import DailySaleForm from './DailySaleForm.vue'
import DailySaleStoreModule from './DailySaleStoreModule'
export default {
    components: {
        DailySaleForm,
        DailySaleStoreModule,
    },
    
    setup(){
        // declare the store variable
        const store = DailySaleStoreModule;

        const dailysales = computed(() => {
            return store.state.dailysales;
        })

        // For searching list
        const search = ref('');
        const filteredDailySale = computed(()=>{
            return dailysales.value.filter(dailysale => dailysale.title.toLowerCase().includes(search.value.toLowerCase()))
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
       

        onMounted(() => {
            store.dispatch("fetchDailySale");
        })

        return{
            dailysales,
            search,
            isAdd,
            isConfirmDelete,
            defaultId,
            // modalForEdit,
            // defaultProduct,

            openModal,
            closeModal,
            confirmDelete,
            deleteRow,

            filteredDailySale,
        }
    }
}
</script>
<style scoped>
.dailysales{
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