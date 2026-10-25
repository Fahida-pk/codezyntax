/* Captures real homepage screenshots of the Selected Work projects into public/projects/.
   Run once on your own computer (it needs internet access):
     npm i -D playwright && npx playwright install chromium
     node scripts/capture-screenshots.mjs
   Re-run it whenever a site changes. File names must match the `image` fields in src/data/site.js. */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const SITES = [
  ['1card', 'https://1card.co.in/'],
  ['hairship', 'https://hairship.in/'],
  ['1card-demo', 'https://demo.1card.co.in/'],
  ['zynta-erp', 'https://zyntaerp.com/'],
  ['skilllab', 'https://skilllab.zyntaweb.com/login'],
  ['zyntaweb', 'https://zyntaweb.com/'],
]

mkdirSync('public/projects', { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } }) // 16:10, matches the cards
for (const [name, url] of SITES) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
    await page.waitForTimeout(1500) // let hero animations settle
    await page.screenshot({ path: `public/projects/${name}.jpg`, type: 'jpeg', quality: 82 })
    console.log('saved', name)
  } catch (e) {
    console.log('FAILED', name, e.message)
  }
}
await browser.close()
