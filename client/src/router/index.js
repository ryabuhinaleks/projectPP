import Vue from 'vue'
import Router from 'vue-router'
import eventCreate from '@/components/eventCreate'
import eventUpdate from '@/components/eventUpdate'
import CalendarComponent from '@/components/CalendarComponent'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Cabinet from '@/components/Cabinet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/create',
      name: 'eventCreate',
      component: eventCreate
    },
    {
      path: '/update/:id',
      name: 'eventUpdate',
      component: eventUpdate
    },
    {
      path: '/calendar',
      name: 'CalendarComponent',
      component: CalendarComponent
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cabinet',
      name: 'Cabinet',
      component: Cabinet
    }
  ]
})
