const express = require('express')
const state = require('./state')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4000

const jsonParser = bodyParser.json()

// Routes
app.get('/', (req, res) => res.send('Hello World!'))

// GET All Users
app.get('/users', (req, res) => res.json(state.users))

// GET First User
// app.get('/users/1', (req, res) => res.json(state.users[0]))

// POST User Hard Coded
// app.post('/users', (req, res) => {
//   state.users.push({
//     _id: 6,
//     name: 'Hard Coded',
//     occupation: 'Some Job',
//     avatar:
//       'https://pbs.twimg.com/profile_images/718881904834056192/WnMTb__R.jpg'
//   })
//   res.json(state.users[state.users.length - 1])
// })

// PUT to change any key value of first user
app.put('/users/1', (req, res) => {
  state.users[0].occupation = 'FBI Agent 007'
  res.json(state.users[0])
})

// DELETE one user
app.delete('/users/1', (req, res) => {
  state.users.shift()
  res.send('deleted')
})

// POST User from client
app.post('/users', jsonParser, (req, res) => {
  let newUser = req.body
  let lastUserId = state.users[state.users.length - 1]._id

  newUser._id = lastUserId + 1

  state.users.push(newUser)

  res.json(newUser)
})

// GET user by id
app.get('/users/:id', (req, res) => {
  let user = state.users.find(user => user._id === parseInt(req.params.id))

  if (user) res.json(user)
  else res.send('User not found')
})

// PUT new name to user by id
app.put('/users/:id', jsonParser, (req, res) => {
  let user = state.users.find(user => user._id === parseInt(req.params.id))

  if (user) {
    user.name = req.body.name
    res.json(user)
  } else res.send('User does not exist')
})

// DELETE user to deactivate user
app.delete('/users/:id', (req, res) => {
  let user = state.users.find(user => user._id === parseInt(req.params.id))

  if (user) {
    user.isActive = false
    res.send('deleted')
  } else res.send('User does not exist')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
