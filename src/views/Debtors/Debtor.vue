<template>
    <div class="debtors px-md-4 ms-auto">
        <h1 class="title">Qarzdorlar</h1>
        <hr>
        <div class="container-fluid">
            <div class="d-flex justify-content-between py-4">
                <input id="namanyay-search-box" style="width: 300px;" type="text" placeholder="Izlash..." v-model="search"/>
                <button class="defaultBtn btn" @click="openModal()">Qo'shish</button>
            </div>
            <div 
                class="debtor d-md-flex justify-content-between my-1"
                v-for='debtor in filteredDebtors' :key='debtor.id'
            >
                <div class="w-25">
                    <p>Ism / Familiya</p>
                    {{debtor.fullname}}
                </div>

                <div>
                    <p>Qarz summasi </p>
                    {{debtor.amount}}
                </div>
                
                <div>
                    <p>Boshlangan sana</p>
                    {{debtor.begin_day}}
                </div>
                <div>
                    <p>Oxirgi muddat</p>
                    {{debtor.end_day}}
                </div>
                <div>
                    <p class="text-center">Amallar</p>
                    <i @click="editModal(debtor)" class='icon_edit bx bx-pencil'></i>
                    <i @click="confirmDelete(debtor.id)" class='icon_trash bx bxs-trash'></i>
                </div>

                <!-- Modals -->
                <div class="confirmDelete w-75 p-4" v-if="modalForEdit">
                    <h4>Qarzdor ma'lumotlarini tahrirlash</h4>
                    <form @submit.prevent="submit">
                        <div class="row justify-content-around">
                            <input id="namanyay-search-box" class="col-md-5 col-12 my-md-2" type="text" v-model="defaultDebtor.fullname" required>
                            <input id="namanyay-search-box" class="col-md-5 col-12 my-md-2" type="text" v-model="defaultDebtor.amount" required>
                            <input id="namanyay-search-box" class="col-md-5 col-12 my-md-2" type="text" v-model="defaultDebtor.begin_day" placeholder="olingan sana" required>
                            <input id="namanyay-search-box" class="col-md-5 col-12 my-md-2" type="text" v-model="defaultDebtor.end_day" placeholder="oxirgi muddat" required>
                        </div>
                    
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-danger mx-2" @click="modalForEdit = !modalForEdit">Bekor qilish</button>
                            <button class="btn btn-success" type="submit">Saqlash</button>
                        </div>
                    </form>
                </div>

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
        <DebtorForm v-if="isAdd" @close="closeModal" />
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios'
import DebtorForm from './DebtorForm.vue'
import DebtorsStoreModule from './DebtorsStoreModule'
export default {
    components: {
        DebtorForm,
        DebtorsStoreModule,
    },
    
    setup(){
        // declare the store variable
        const store = DebtorsStoreModule;

        const debtors = computed(() => {
            return store.state.debtors
        })

        // For searching list
        const search = ref('');
        const filteredDebtors = computed(()=>{
            return debtors.value.filter(debtor => debtor.fullname.toLowerCase().includes(search.value.toLowerCase()))
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
        const defaultDebtor = ref({
            id: null,
            fullname: null,
            amount: null,
            begin_day: null,
            end_day: null,
        })
        const editModal = (debtor) => {
            defaultDebtor.value.id = debtor.id;
            defaultDebtor.value.fullname = debtor.fullname;
            defaultDebtor.value.amount = debtor.amount;
            defaultDebtor.value.begin_day = debtor.begin_day;
            defaultDebtor.value.end_day = debtor.end_day;
            modalForEdit.value = true;
        }
        const submit = () => {
            axios.post('http://localhost:3000/debtors', {
                id: Math.floor(Math.random() * 100000),
                fullname: defaultDebtor.value.fullname,
                amount: defaultDebtor.value.amount,
                begin_day: defaultDebtor.value.begin_day,
                end_day: defaultDebtor.value.end_day,
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
                store.commit('REMOVE_ROW', defaultDebtor.value.id)
            )
            .then(
                window.location.reload()
            )
        }
       

        onMounted(() => {
            store.dispatch("fetchDebtors");
        })

        return{
            debtors,
            search,
            isAdd,
            isConfirmDelete,
            defaultId,
            modalForEdit,
            defaultDebtor,

            openModal,
            closeModal,
            confirmDelete,
            deleteRow,
            editModal,
            submit,

            filteredDebtors,
        }
    }
}
</script>
<style scoped>
.debtors{
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
    /* width:300px; */
}
.defaultBtn{
    color: white;
    background: rgb(118,54,230);
    background: linear-gradient(276deg, rgba(118,54,230,1) 0%, rgba(164,107,233,1) 77%, rgba(164,107,233,1) 93%);
}
.debtor{
    border: 2px solid rgb(118,54,230);
    border-radius: 5px;
    padding: 10px;
}
.debtor div p{
    color: rgba(0, 0, 0, 0.617);
    font-size: 10px;
    margin: 0;
}
.icon_trash{
    font-size: 25px;
    color: red;
    cursor: pointer;
}
.icon_edit{
    font-size: 25px;
    color: yellowgreen;
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
@media only screen and (max-width: 571px) {
  #namanyay-search-box {
    background: white;
    /* width: 80%; */
    margin: auto;
  }
}

</style>