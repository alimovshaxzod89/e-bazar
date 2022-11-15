<template>
    <div class="container" id="container">
        <div class="form-container sign-in-container">
          <div class="form">
              <h1>Log in</h1>
              <label>Email Address</label>
                <input type="text" placeholder="Email" v-model="email">
              <label for=""> Password</label>
                <input type="password" placeholder="Password" v-model="password">
              <button class="loginbtn" @click="register">Log in</button>
              <p v-if="errMsg"> {{errMsg}} </p>
          </div>
        </div>
        <div class="overlay-container">
        </div>
  </div>

  
</template>
<script>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
export default {
    setup(){
        const router = useRouter();

        const email = ref('');
        const password = ref('');
        const errMsg = ref();
 
        const register = () => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email.value, password.value)
                .then((data) => {
                    console.log('successfully signed in!');

                    console.log(auth.currentUser);
                    router.push('/')
                })
                .catch(error => {
                    console.log(error);
                    switch(error.code){
                        case "auth/invalid-email":
                        errMsg.value = "Invalid email";
                        break;

                        case "auth/user-not-found":
                        errMsg.value = "No account with that email was found";
                        break;

                        case "auth/wrong-password":
                        errMsg.value = "Incorrect password";
                        break;

                        default: 
                        errMsg.value = "Email or password was incorrect";
                        break;
                    }
                    alert(error.message);
                });
        }

        return{
            router,

            email,
            password,
            errMsg,

            register
        }
    }
}
</script>
<style scoped>

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
  box-sizing: border-box;
}


.container {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 680px;
  width: 70%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form-container {
  position: absolute;
  height: 100%;
}

.form {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 55px;
  height: 100%;
  text-align: left;
  width: 140%;
}

.overlay-container {
  position: absolute;
  left: 50%;
  width: 50%;
  height: 100%;
  background: url("https://image.freepik.com/free-vector/girls-friends-community-together-cooperation_24877-53878.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

h1 {
  font-weight: bold;
  margin: 5px;
}

label {
  text-align: left;
  font-size: 15px;
  font-weight: bold;
}

span {
  font-size: 12px;
}

a {
  color: rgb(4, 0, 255);
  font-size: 12px;
  /* margin: 15px 0; */
}

.forgotpassword {
  text-align: center;
}
.loginbtn {
  border-radius: 20px;
  border: 1px solid #8400ff;
  background-color: #8400ff;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 2px;
  text-transform: uppercase;
  align-items: center;
  cursor: pointer;
}

.btn {
  border-radius: 20px;
  border: 1px solid #8400ff;
  background-color: #eee;
  width: auto;
  color: #8400ff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 2px;
  text-transform: uppercase;
  align-items: center;
  cursor: pointer;
  margin: 5px;
}

hr {
  border: 0.25px solid rgb(105, 103, 103);
  width: 30%;
}
.loginwith {
  margin: 20px;
  display: flex;
}
@media screen and (max-width: 900px) {
  .overlay-container {
    display: none;
  }
  .form {
    width: 110%;
  }
}
</style>