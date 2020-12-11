<template>
<div class="row justify-content-center mt-5">
        <div class="col-md-5" style="background-color: white;text-align: left;padding: 25px; border: 3px solid #d0cdcd;">        
          <form @submit.prevent="">
            <h3 style="color: #38c172;">{{message}}</h3>
            <div class="form-group">
              <label for="exampleInputEmail1">Имя</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="name">
            </div>          
            <div class="form-group">
              <label for="exampleInputEmail1">Email адрес</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Пароль</label>
              <input type="password" class="form-control" id="exampleInputPassword1"v-model="password">
            </div>
            <button v-on:click="update()" class="btn btn-primary">Обновить</button>
            <button @click="logout" class="btn btn-primary">Выйти</button>
            <span class='error'>{{error}}</span>
          </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: '',
    }
  },
  mounted() {
    axios.get('/user', { headers: { token: localStorage.getItem('token')}})
      .then(res => {
        this.name = res.data.name;
        this.email = res.data.email;
      })
  },
  methods: {
    update() {                
                axios.put(`/cabinet`,{ name: this.name, email: this.email ,password:this.password, token: localStorage.getItem('token')})
                
                .then((res) => {
                    this.password= ''
                    this.message="Данные обновлены!"
                    this.error = '';
                    }).catch((err) => {
                        this.message=''
                        this.error=err.response.data.title
                    })
              },

    logout() {
      localStorage.clear();
      this.$router.push('/login');
      window.location.reload();
    }
  }
}
</script>

