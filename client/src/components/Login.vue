<template>
 <div class="container">
    <div class="row justify-content-center mt-5">
        <div class="col-md-5" style="background-color: white;text-align: left;padding: 25px; border: 3px solid #d0cdcd;">        
          <form  @submit.prevent="">
            <div class="form-group">
              <label for="exampleInputEmail1">Email адрес</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите e-mail" v-model="email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Пароль</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль" v-model="password">
            </div>
            <button @click="login" class="btn btn-primary">Авторизоваться</button>
            <span class='error'>{{error}}</span>
          </form>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password
      }
      axios.post('/login', user)
        .then(res => {
            if (res.status === 200) {
              localStorage.setItem('token', res.data.token);      
              this.$router.push('/cabinet');
              window.location.reload();
            }
          }
        , err => {
          console.log(err.response);
          this.error = err.response.data.title
        })
    }
  }
}
</script>

