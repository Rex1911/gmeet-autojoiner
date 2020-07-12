const express = require('express')
const path = require('path');
const Gmeet = require('./lib/Gmeet');
const bodyParser = require('body-parser')
const app = express()

const gmeet = new Gmeet()

let meetings = {}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', {meetings})
});

app.post('/submitMeet', (req, res) => {
	meetings[req.body.meetName] = {}
	meetings[req.body.meetName].time = Date.parse(req.body.meetTime)
	meetings[req.body.meetName].url = req.body.meetUrl
	res.redirect("/")
});

const checkForMeeting = () => {
	for(meeting in meetings) {
		if(Date.now() > meetings[meeting].time) {
			gmeet.join(meetings[meeting].url)
			delete meetings[meeting]
		}
	}
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	setInterval(() => {
		checkForMeeting()
	}, 10000)
	console.log('App listening on port 3000!');
});