<template>
    <ul class="side-menu" v-if="isLoggedIn">
        <li><router-link to="/" class="aToRoutern"><i class='bx bx-home' ></i>Asosiy Panel</router-link></li>
        <li><router-link to="/products" class="aToRoutern"><i class='bx bx-cart-alt'></i>Tovarlar</router-link></li>
        <li><router-link to="/debtors" class="aToRoutern"><i class='bx bxs-user-detail'></i>Qarzdorlar</router-link></li>
        <li><router-link to="/dailysale" class="aToRoutern"><i class='bx bx-spreadsheet'></i>Kunlik sotuvlar</router-link></li>
        <div class="d-flex justify-content-end">
          <button class="btn btn-danger" @click="handleSignOut" v-if="isLoggedIn"> Sign Out </button>
        </div>
    </ul>
</template>
<script>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import {useRouter} from 'vue-router'

export default {
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter();

    let auth;
    onMounted(() => {
      auth = getAuth();
      onAuthStateChanged(auth, user => {
        if(user){
          isLoggedIn.value = true;
        }else{
          isLoggedIn.value = false;
        }
      })

    })

    const handleSignOut = () =>{
      signOut(auth).then(() => {
        router.push('/sign-in');
      })
    }

    return{
      isLoggedIn,
      auth,
      router,

      handleSignOut,
    }
  }
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Roboto';
.side-menu {
  font-family: 'Roboto', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 60px;
  list-style-type: none;
  background: rgb(19, 15, 39);
  overflow: hidden;
  transition: width .3s;
  z-index: 1;
}

.side-menu:hover {
  width: 300px;
}

.side-menu li {
  width: 300px;
}

.side-menu li i {
  font-size: 1.4rem;
  margin: 29px 30px 0 22px;
}

.side-menu li .aToRoutern {
  display: block;
  font-size: 1rem;
  text-decoration: none;
  color: rgb(221, 221, 221);
  height: 80px;
}

.side-menu li .aToRoutern:hover {
  background: rgb(118,54,230);
  background: linear-gradient(276deg, rgba(118,54,230,1) 0%, rgba(164,107,233,1) 77%, rgba(164,107,233,1) 93%);
  display: block;
}
</style>