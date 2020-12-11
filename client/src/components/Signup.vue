<template>

 <div class="container">
    <div class="row justify-content-center  mt-5">
        <div class="col-md-5" style="background-color: white;text-align: left;padding: 25px; border: 3px solid #d0cdcd;">        
          <form  @submit.prevent="">
            <div class="form-group">
              <label for="exampleInputnName1">Имя</label>
              <input type="text" class="form-control" placeholder="Введите полное имя" v-model="name">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email адрес</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите e-mail" v-model="email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Пароль</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль" v-model="password">
            </div>
            <button @click="signup" class="btn btn-primary">Зарегистрироваться</button>
            <span class='error'>{{error}}</span>
          </form>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    signup() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      axios.post('/signup', newUser)
        .then(res => {
          console.log(res.data)
          this.error = '';
          this.$router.push('/login');
        }, err => {
          console.log(err.response)
          this.error = err.response.data.title
        })
    }
  }
}
</script>


