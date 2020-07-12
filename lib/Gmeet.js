const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const helper = require('./helper/helper')
puppeteer.use(StealthPlugin())

class Gmeet {
	constructor() {
		this.browser = null
	}
	
	join = async (url, email, password, options = {}) => {
		//Check if another browser is already open and close it if it is
		if(this.browser !== null) {
			await this.browser.close()
			this.browser = null;
		}

		let page
		let failed = false

		let headless = options.headless !== undefined? options.headless:false
		let verbose = options.verbose !== undefined? options.verbose: false
		do {
			try {
				this.browser = await puppeteer.launch({headless: headless, args: ['--use-fake-ui-for-media-stream','--disable-audio-output']});
				page = await this.browser.newPage()
				await page.goto(url)
				await helper.waitForXSec(10);
				if(verbose) console.log("[VERBOSE] Inputting username")
				await page.type("input#identifierId", email, {delay: 100})
				await page.click("div.ZFr60d.CeoRYc")
				if(verbose) console.log("[VERBOSE] Clicked the next button")
				await helper.waitForXSec(5);
				if(verbose) console.log("[VERBOSE] Inputting password")
				await page.type("input.whsOnd.zHQkBf", password, {delay: 100})
				await page.click("div.ZFr60d.CeoRYc")
				if(verbose) console.log("[VERBOSE] Clicked the next button")
				await helper.waitForXSec(5)
				await page.goto(url)
				await helper.waitForXSec(10)
				await page.click("span.NPEfkd.RveJvd.snByac")
				console.log("Successfully joined/Sent join request")
				failed = false
			} catch(err) {
				console.log(err)
				console.log("[ERROR]Something went wrong, trying again... do not close the nodejs process")
				await page.close()
				await this.browser.close()
				failed = true;
			}
		} while(failed === true)
	}
}

module.exports = Gmeet