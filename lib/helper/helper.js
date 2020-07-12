module.exports = {
	waitForXSec: (seconds) => {
		return new Promise((resolve,reject) => {
			setTimeout(() => resolve(true), seconds*1000)
		})
	}
}