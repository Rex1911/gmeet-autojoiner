const express = require('express')
const path = require('path');
const Gmeet = require('./lib/Gmeet');
const bodyParser = require('body-parser')
const shortid = require('shortid');
const app = express()
const env = require('dotenv').config().parsed
const gmeet = new Gmeet()

const HEADLESS = false  //Change this to true if you dont want the chrome UI to show up
const VERBOSE = false // Change this to true to get extra messages in the console
const CHECKTIME = 10000 // This variable determines how often will the code check for meeting. Value in miliseconds

let email, password
if(env) {
	email = env.EMAIL_ID
	password = env.PASSWORD
} else {
	email = "Enter your email here",
	password = "Enter your password here"
}

let meetings = {}
let config = {
	email: email,
	password: password
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', {meetings, config})
});

app.post('/submitMeet', (req, res) => {
	let uid = shortid.generate()
	meetings[uid] = {}
	meetings[uid].name = req.body.meetName
	meetings[uid].time = Date.parse(req.body.meetTime)
	meetings[uid].url = req.body.meetUrl
	res.redirect("/")
});

app.post('/delete', (req, res) => {
	let id = req.body.delID
	delete meetings[id]
	res.redirect('/')
});

app.post('/settings', (req, res) => {
	let email = req.body.email
	let password = req.body.password
	config['email'] = email
	config['password'] = password
	res.redirect('/')
});

const checkForMeeting = () => {
	for(meeting in meetings) {
		if(Date.now() > meetings[meeting].time) {
			gmeet.join(meetings[meeting].url, config.email, config.password, {headless: HEADLESS, verbose: VERBOSE})
			delete meetings[meeting]
		}
	}
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	setInterval(() => {
		checkForMeeting()
	}, CHECKTIME)
	console.log('App listening on port 3000!');
});