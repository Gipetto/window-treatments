import path from "node:path"
import fs from "node:fs/promises"
import { downloadNPMPackage, IconSet, exportToDirectory } from "@iconify/tools"
import iconsSrc from "./icons.json" assert { type: "json" }

const icons = structuredClone(iconsSrc)

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
const iconsToLoad = Object.values(iconsSrc).reduce((acc, data) => {
  const prefix = data.set
  const icon = data.icon

  acc[prefix] = [...(acc[prefix] ?? []), icon]

  return acc
}, {})

new Promise((resolve) => {
  Object.keys(iconsToLoad).forEach(async (prefix) => {
    const data = JSON.parse(
      await fs.readFile(
        path.join(downloaded.contentsDir, `json/${prefix}.json`),
        "utf8"
      )
    )

    const iconSet = new IconSet(data)

    // Filter out icons that we don't want
    console.info("Processing Icons")
    iconSet.forEach((name) => {
      if (!iconsToLoad[prefix].includes(name)) {
        iconSet.remove(name)
        return
      }
      if (icons[name] && icons[name].set === prefix) {
        const icon = iconSet.resolve(name)
        icons[name] = {
          ...icons[name],
          body: icon.body,
          width: icon.width,
          height: icon.height
        }
        icons[name].aliases.forEach((alias) => {
          icons[alias] = {
            alias: name
          }
        })
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
    resolve()
  })
}).then(() => {
  console.info("Writing icons.json file")
  const iconsFile = `${outDir}/icons.json`
  fs.rm(iconsFile, { force: true }).then(() => {
    fs.writeFile(iconsFile, JSON.stringify(icons, null, 2), "utf-8")
  })
})
