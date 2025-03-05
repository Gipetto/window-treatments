import { getContext, setContext } from "svelte"

type TabStateParam = string | undefined
interface Props {
  name: TabStateParam
  activeTab: TabStateParam
  sortable?: boolean
  maximized?: boolean
  shaded?: boolean
  closed?: boolean
}

class TabState {
  appName: TabStateParam = $state()

  activeTab: TabStateParam = $state()

  #sortable: boolean
  draggingTab: TabStateParam = $state()
  tabFocus = $state(0)

  maximized = $state(false)
  shaded = $state(false)
  closed = $state(false)
  height: string | undefined = $state(undefined)

  constructor({
    name = undefined,
    activeTab = undefined,
    sortable = true,
    maximized = false,
    shaded = false
  }:Props) {
    this.appName = `wt-${name?.replace(" ", "-").toLowerCase()}`
    this.activeTab = activeTab
    this.#sortable = sortable
    this.maximized = maximized
    this.shaded = shaded
  }

  is(id: TabStateParam) {
    return this.activeTab === id
  }

  get isDragging() {
    return this.draggingTab !== undefined
  }

  get sortable() {
    return this.#sortable
  }
}

const activeTabContextKey = Symbol("tabContext")

const setActiveTabContext = (s: TabState) => {
  setContext(activeTabContextKey, s)
}

const getActiveTabContext = (): TabState => {
  return getContext(activeTabContextKey)
}

export {
  TabState,
  type TabStateParam as ActiveTabParam,
  getActiveTabContext,
  setActiveTabContext
}