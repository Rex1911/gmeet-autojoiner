# gmeet-autojoiner
Join Google meet meetings automatically while you sleep peacefully

# Prerequisite:

- Node.js  v8 or greater

# Usage Guide:

Clone the repo
`https://github.com/Rex1911/gmeet-autojoiner.git`

Go inside the project directory and do
`npm install`

Then use `npm start` to start the app

Goto `localhost:3000` to access the frontend

First and foremost, enter you Email Address and Password in the "Settings" section and click "Set"

Enter the meeting details in the "Gmeet Autojoiner" section and click "Submit"

Keep the nodejs process **RUNNING** and you will automatically join the meeting at the specified time.

Use the "Delete meeting" section to Delete a meeting.

# Additional Info

- **IMPORTANT**: The the webcam is enabled by default,  so if you plan to run this on your laptop, be sure to cover your webcam. One way to do this is to configure the laptop to not go into "sleep" mode  when the lid is closed. 

- If you host this locally, make sure that you laptop/PC doesn't sleep, or else this is not going to work.

- The email, password, and meeting details are held in a variable. This means that whenever you restart the server, these variables are reset. So make sure to enter everything again if you restart the server. 

- By default, a chrome window is opened when joining a meeting. If you dont want the chrome window to open, go into app.js and change `HEADLESS=false` to `HEADLESS=true`

- The process checks every few seconds to join a valid meeting. This is controlled by the `CHECKTIME` variable which is set to 10 seconds by default. Change that  variabel to change how often the procces checks for meetings to join.

# Disclaimer

Please use this at your own risk. I do not guaranty that this will work 100% of time. If you choose to use this, know that there are chances of you not joining the meeting successfully and loosing your attendance.