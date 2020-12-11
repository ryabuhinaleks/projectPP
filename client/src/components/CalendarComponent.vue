<template>
  <div class="container">
    <div id='calendar'></div>

  </div>
</template>

<script>
  import axios from 'axios'

export default {

        mounted() {
                axios.get('/events', { headers: { token: localStorage.getItem('token')}}).then((res) =>
                {
                  let events=[];
                    res.data.forEach(element => 
                    {
                      let repetitive_events=element.repetitive_events;
                      let date=element.date;
                      let massiv={
                        title:element.title,
                        color:element.color,
                        id:element.id,
                      }                   
                      if(repetitive_events!="-")
                      {
                        massiv['rrule']="DTSTART:"+element.date+"\nRRULE:FREQ="+element.repetitive_events;
                      }
                      else
                      {
                        massiv['rrule']="DTSTART:"+element.date;
                      }         
                      events.push(massiv);       
                    });


                    let calendarEl = document.getElementById('calendar');
                    let calendar = new FullCalendar.Calendar(calendarEl, {
                          eventClick: function(info) {
                                document.location.href = "/#/update/"+info.event.id;
                          },
                          headerToolbar: {
                              left: 'prevYear,prev,next,nextYear today',
                              center: 'title',
                              right: 'dayGridMonth,dayGridWeek,dayGridDay'
                          },
                          locale: 'ru',
                          navLinks: true,
                          editable: false,
                          dayMaxEvents: false,

                          events: events,
                          validRange: {
                            start: new Date()
                          },
                          firstDay: 1,
                          buttonText: {
                          today: "Сегодня",
                          month: "Месяц",
                          week: "Неделя",
                          day: "День"
                          }

                  }); 
                       
                      calendar.render();

                }); 
        },
        methods:{

        }
    }
</script>

