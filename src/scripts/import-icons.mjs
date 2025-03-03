import path from "node:path"
import fs from "node:fs/promises"
import { downloadNPMPackage, IconSet, exportToDirectory } from "@iconify/tools"
import iconsSrc from "../lib/icons/icons.json" assert { type: "json" }

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
  const file = data.file
  const prefix = path.dirname(file)
  const icon = path.basename(file, path.extname(file))

  acc[prefix] = [...(acc[prefix] ?? []), icon]

  return acc
}, {})

Object.keys(iconsToLoad).forEach(async (prefix) => {
  const data = JSON.parse(
    await fs.readFile(
      path.join(downloaded.contentsDir, `json/${prefix}.json`),
      "utf8"
    )
  )

  const iconSet = new IconSet(data)

  // Filter out icons that we don't want
  iconSet.forEach((name) => {
    if (!iconsToLoad[prefix].includes(name)) {
      iconSet.remove(name)
    }
  })

  const setOutDir = path.join(outDir, prefix)

  // Clear out previous data
  await fs.rm(setOutDir, {
    recursive: true,
    force: true
  })

  // Export
  console.info(`Exporting ${iconSet.info.name}`)
  await exportToDirectory(iconSet, {
    target: setOutDir,
  }).then((files) => {
    files.forEach((file) => {
      const name = path.basename(file, path.extname(file))
      fs.cp(
        path.join(file),
        path.join(setOutDir, `${name}.svelte`)
      )
    })
  })

  console.info(`Done exporting ${iconSet.info.name}`)
})
