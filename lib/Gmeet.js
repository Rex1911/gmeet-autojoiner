const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const helper = require('./helper/helper')
const constants = require('./assets/constants')
puppeteer.use(StealthPlugin())

function Gmeet() {
	this.browser = null
}

Gmeet.prototype.join = async function (url, email, password, options = {}) {
	//Check if another browser is already open and close it if it is
	if (this.browser !== null) {
		await this.browser.close()
		this.browser = null;
	}

	let page
	let failed = false
	let attempt = 0
	let headless = options.headless || false
	let verbose = options.verbose || false
	do {
		try {
			this.browser = await puppeteer.launch({
				headless: headless,
				args: ['--use-fake-ui-for-media-stream', '--disable-audio-output']
			});
			page = await this.browser.newPage()
			await page.goto(constants.GOOGLE_LOGIN_LINK)
			if (verbose) console.log("[VERBOSE] Inputting username")
			await page.type("input#identifierId", email, {
				delay: 0
			})
			await page.click("div#identifierNext")
			if (verbose) console.log("[VERBOSE] Clicked the next button")
			await helper.waitForXSec(5);
			if (verbose) console.log("[VERBOSE] Inputting password")
			await page.type("input.whsOnd.zHQkBf", password, {
				delay: 0
			})
			await page.click("div#passwordNext")
			if (verbose) console.log("[VERBOSE] Clicked the next button")
			await helper.waitForXSec(5)
			await page.goto(url)
			await helper.waitForXSec(10)
			await page.click("span.NPEfkd.RveJvd.snByac")
			console.log("Successfully joined/Sent join request")
			failed = false
		} catch (err) {
			if (attempt < 5) {
				console.log("[ERROR]Something went wrong, trying again... do not close the nodejs process.")
				await page.close()
				await this.browser.close()
				failed = true;
				attempt++
			} else {
				await page.close()
				try {
					await this.browser.close()
				} catch (error) {
					console.log('[ERROR] '+  err);
				}
				console.log("[ERROR] Unable to join the meeting. Check if you entered the correct emailID and password. If running in HEADLESS=true mode, try running in HEADLESS=false mode and manually see where the error occurs.")
				break
			}
		}
	} while (failed === true)
}

module.exports = Gmeet