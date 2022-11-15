<template>
    <div class="confirmDelete">
        O'chirishga aminmisiz
        <button class="btn btn-success">Yo'q</button>
        <button class="btn btn-danger" @click="deleteRow">Ha</button>
    </div>
</template>
<script>
import ProductStoreModule from '@/views/Products/ProductsStoreModule'
export default {
    props: ['id'],
    setup() {
        const store = ProductStoreModule;
        

        return{
            store,

            deleteRow
        }
    },
}
</script>
<style scoped>
.confirmDelete{
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid rgba(0, 0, 0, 0.451);
    border-radius: 10px;
    background-color: white;
}
@media only screen and (max-width: 600px) {
  .confirmDelete{
    width: 90%;
  }
}
</style>