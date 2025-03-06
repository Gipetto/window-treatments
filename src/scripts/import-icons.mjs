import path from "node:path"
import fs from "node:fs/promises"
import { downloadNPMPackage, IconSet, exportToDirectory } from "@iconify/tools"
import iconsSrc from "./icons.json" assert { type: "json" }

const icons = structuredClone(iconsSrc)

/**
 * Icon Sets: https://icon-sets.iconify.design
 */

// Directories
const cacheDir = "/tmp/cache"
const outDir = path.join(import.meta.dirname, "..", "lib/icons")

// Download all icon sets
console.info("Downloading latest Iconify package")
const downloaded = await downloadNPMPackage({
  package: "@iconify/json",
  target: cacheDir,
})
console.info(`Downloaded Iconify version: ${downloaded.version}`)

console.info("Parsing Icons to Load")
// @todo - the key name doesn't always match the icon name :(
// need a deeper map or routine to process these
// I'm probably just being dumb
const iconsToLoad = Object.entries(iconsSrc).reduce((acc, data) => {
  const key = data[0]
  const prefix = data[1].set
  const icon = data[1].icon

  acc.prefixes[prefix] = [...(acc.prefixes[prefix] ?? []), icon]
  acc.icon2Prefix[icon] = key
  return acc
}, {
  prefixes: {},
  icon2Prefix: {}
})

for (const prefix of Object.keys(iconsToLoad.prefixes)) {
  const data = JSON.parse(
    await fs.readFile(
      path.join(downloaded.contentsDir, `json/${prefix}.json`),
      "utf8"
    )
  )

  const iconSet = new IconSet(data)

  // Filter out icons that we don't want
  console.info(`Processing Icons: ${prefix}`)
  iconSet.forEach((name) => {
    if (!iconsToLoad.prefixes[prefix].includes(name)) {
      iconSet.remove(name)
      return
    }

    const key = iconsToLoad.icon2Prefix[name]

    if (icons[key] && icons[key].set === prefix) {
      const icon = iconSet.resolve(name)

      icons[key] = {
        ...icons[key],
        body: icon.body,
        width: icon.width,
        height: icon.height
      }

      icons[key].aliases.forEach((alias) => {
        icons[alias] = {
          alias: name
        }
      })

      // save that precious 1kb ;)
      delete icons[key].aliases
    }
  })

  const setOutDir = path.join(outDir, prefix)

  // Clear out previous data
  await fs.rm(setOutDir, {
    recursive: true,
    force: true
  })

  // Export
  console.info(`Exporting ${iconSet.info.name} SVGs`)
  await exportToDirectory(iconSet, {
    target: setOutDir,
  })

  console.info(`Done processing ${iconSet.info.name}`)
}

console.info("Writing icons.json file")
const iconsFile = `${outDir}/icons.json`
await fs.rm(iconsFile, { force: true })
await fs.writeFile(iconsFile, JSON.stringify(icons), "utf-8")

const stats = await fs.stat(iconsFile)
console.info(`Wrote ${Math.round(stats.size / 1024)} KB`)
