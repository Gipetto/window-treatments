import { getContext, setContext } from "svelte"

type TabStateParam = string | undefined
interface Props {
  name: TabStateParam
  activeTab: TabStateParam
}

class TabState {
  appName: TabStateParam = $state()
  activeTab: TabStateParam = $state()
  draggingTab: TabStateParam = $state()
  tabFocus: number = $state(0)

  constructor({
    name = undefined,
    activeTab = undefined
  }:Props) {
    this.appName = `wt-${name}`
    this.activeTab = activeTab
  }

  is(id: TabStateParam) {
    return this.activeTab === id
  }

  get isDragging() {
    return this.draggingTab !== undefined
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