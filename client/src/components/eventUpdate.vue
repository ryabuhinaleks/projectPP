<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header"><div class="ed"><h2>Редактирование события</h2></div><a class="del"><b v-on:click="delet()">Удалить</b></a></div>
                    <div class="card-body">
                        <h3 style="color: #38c172;">{{message}}</h3>
                        <form >	  
                            <input v-model="name" class="form-control"></br>
                            <input v-model="date" class="form-control" type="date"  v-bind:min='my_var'></br>
                            
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
				            <button type="button" v-on:click="update()" style="width: 100%;"class="btn btn-primary btn-block  mt-3" >Обновить</button>
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
            id: '',
            rad:'',
            checkedData: false,
            color: '',
        }
        },     
        mounted() {
            this.getEvents();
        },
        methods:{
            getEvents() {
                axios.get('/update/'+this.$route.params.id).then((res) =>
                {
                    this.color=res.data[0].color;
                    this.name=res.data[0].title;
                    this.date=res.data[0].date;
                    this.rad=res.data[0].repetitive_events;
                }).catch((err) => {
                console.log(err)
                })},

               update() {
                axios.put('/update/'+this.$route.params.id,
                { title: this.name, date: this.date , repetitive_events:this.rad, color:this.color}
                ).then((res) => {
                this.message='Данные обновлены!'
                console.log(res.data)
                }).catch((err) => {
                console.log(err)
                })
            },

            delet() {
                axios.delete('/delete/'+this.$route.params.id,
                ).then((res) => {
                    window.location.href = '#/calendar'
                }).catch((err) => {
                console.log(err)
                })
            },
        }
    }
</script>
