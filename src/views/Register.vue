<template>
    <h1>Create an account</h1>
    <div class="d-flex flex-column ">
        <input type="email" placeholder="Email" v-model="email" class="w-25 mx-auto">
        <input type="password" placeholder="Password" v-model="password" class="w-25 mx-auto">
        <button @click="register" class="w-25 mx-auto">Submit</button>
        <button @click="signInWithGoogle" class="w-25 mx-auto"> Sign In With Google</button>
    </div>
</template>
<script>
import {ref} from 'vue'
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth'
import {useRouter} from 'vue-router'
export default {
    setup(){
        const router = useRouter();

        const email = ref('');
        const password = ref('');
        
        const register = () => {
            createUserWithEmailAndPassword(getAuth(), email.value, password.value)
                .then((data) => {
                    console.log("Successfully registered!");
                    router.push('/')
                })
                .catch((error) => {
                    console.log(error.code);
                    alert(error.message);
                })
        }

        const signInWithGoogle = () => {
            const provider = new GoogleAuthProvider()
            signInWithPopup(getAuth(), provider)
                .then((result) => {
                    console.log(result.user);
                    router.push('/')
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    
        return{
            router,

            email,
            password,

            register,
            signInWithGoogle,
        }
    }
}
</script>