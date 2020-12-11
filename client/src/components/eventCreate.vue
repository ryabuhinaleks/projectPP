<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header"><h2>Создание события</h2></div>
                    <div class="card-body">
                        <h3 v-if="this.flag == true" style="color: #38c172;">{{message}}</h3>
                         <h3 v-else style="color: rgb(255 0 0);">{{message}}</h3>

                        <form v-on:submit.prevent="addNewEvent">	  
                            <input v-model="name" class="form-control" placeholder="Наименование"></br>
                            <input v-model="date" class="form-control" id="date" type="date" v-bind:min='my_var' ></br>
                                                
                            <select v-model="color" class="form-control">
                                <option  value="" disabled>Выберите цвет</option>
                                <option  value="#80a35e">Зеленый</option>
                                <option  value="#d3d358">Желтый</option>
                                <option  value="#3a87ad">Синий</option>
                                <option  value="#d04040">Красный</option>
                            </select></br>

                            <select v-model="rad" class="form-control">
                                <option  value="0" disabled>Повторение</option>
                                <option  value="-">Нет</option>
                                <option  value="daily">Каждый день</option>
                                <option  value="weekly">Каждую неделю</option>
                                <option  value="monthly">Каждый месяц</option>
                                <option  value="yearly">Каждый год</option>
                            </select>
                            <button type="submit" style="width: 100%;" class="btn btn-primary btn-block  mt-3">Добавить</button>
                         </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'

    export default {
        data() {
        return {
            my_var: new Date().toISOString().slice(0,10),
            name: '',
            date: '',
            message: '',
            flag: true,
            rad: "0",
            color: '',
        }
        },
        
        mounted() {
        },
        methods:{
                    addNewEvent() 
                    {
                        axios.post('/add',
                        { title: this.name, date: this.date, repetitive_events:this.rad, color:this.color, headers: { token: localStorage.getItem('token')}}
                        ).then((res) => {
                            this.name = ''
                            this.date = ''
                            this.rad = ''
                            this.color = ''

                             this.message=res.data
                            if(res.data=="Событие создано!")
                                 this.flag=true;
                            else
                                 this.flag=false;
                                
                            console.log(res.data)
                        }).catch((err) => {
                        console.log(err)
                        })
                 },
        }
    }
</script>
