var express = require('express')
var router = express.Router()
const Calendars = require('../models/Calendars')
const User = require('../models/User');

const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res, next) => {
  if (!(req.body.email && req.body.name && req.body.password)) {
    return res.status(401).json({
      title: 'Введите данные',
      error: 'invalid credentials'
    })
  }

  User.findOne({ where: { email: req.body.email} })
  .then(user =>
  {
    if (user) {
      return res.status(400).json({
        title: 'E-mail зарегистрирован',
        error: 'invalid credentials'
      })
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    })
    newUser.save();

    return res.status(200).json({
      title: 'Пользователь зарегистрирован'
    })
  })
})

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email} })
  .then(user => 
    {
      if (!user) {
        return res.status(401).json({
          title: 'Пользователь не найден',
          error: 'invalid credentials'
        })
      }
      
      var result = bcrypt.compareSync(req.body.password, user.password);
      if(!result)
      {
        return res.status(401).json({
          title: 'Вход в систему не удался',
          error: 'invalid credentials'
        })
      }

      let token = jwt.sign({ userId: user.id}, 'secretkey');
      return res.status(200).json({
        title: 'Успешный вход в систему',
        token: token
      })   

    })
})

router.post('/add', (req, res, next) => 
{ 
  if (req.body.title!=""&& req.body.date!="" && req.body.repetitive_events!="0" && req.body.color!="")
  {  
    let token = req.body.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {  
      let event={
        title: req.body.title,
        repetitive_events: req.body.repetitive_events,
        color: req.body.color,
        date: req.body.date,
        user_id: decoded.userId
      }
      Calendars.create(event)
      res.send("Событие создано!")
  })
  } 
  else {
    res.send("Проверьте данные!")
  }
})

//Получить шаблон формы
router.get('/update/:id', (req, res, next) => {
  Calendars.findAll({ where: { id: req.params.id } })
    .then(events => 
    {
      res.json(events)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

// Update 
router.put('/update/:id', (req, res, next) => 
{
  res.send("Данные обновлены");
  Calendars.update(
    { title: req.body.title, date: req.body.date, color: req.body.color, repetitive_events: req.body.repetitive_events  },
    { where: { id: req.params.id } }
  )
})

// Update 
router.put('/cabinet', (req, res, next) => 
{
  if (!(req.body.email && req.body.name && req.body.password)) {
    return res.status(401).json({
      title: 'Введите данные',
      error: 'invalid credentials'
    })
  }
  let token = req.body.token; //token
  jwt.verify(token, 'secretkey', (err, decoded) => {
    User.update(
    { name: req.body.name, email: req.body.email , password: bcrypt.hashSync(req.body.password, 10)},
    { where: { id: decoded.userId } })
    
    return res.status(200).json({
      title: 'Данные обновлены!',
    })  
  })
})


router.delete('/delete/:id', (req, res, next) => {
  Calendars.destroy({
    where: {
      id: req.params.id
    }
  })
  res.send("Событие удалено");

})

router.get('/user', (req, res, next) => {
  let token = req.headers.token; //token
  jwt.verify(token, 'secretkey', (err, decoded) => {
    
    User.findOne({ where: { id: decoded.userId } })
    .then(user => 
    {
      res.send(user)
    })
    .catch(err => {
      res.send('error: ' + err)
    })

  })
})

//Получить шаблон формы
router.get('/events', (req, res, next) => {
  let token = req.headers.token; //token
  jwt.verify(token, 'secretkey', (err, decoded) => {
    
    Calendars.findAll({ where: { user_id: decoded.userId } })
    .then(user => 
    {
      res.send(user)
    })
    .catch(err => {
      res.send('error: ' + err)
    })

  })
})


module.exports = router
