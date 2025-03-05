import { getContext, setContext } from "svelte"

type TabStateParam = string | undefined
interface Props {
  name: TabStateParam
  activeTab: TabStateParam
}

class TabState {
  name: TabStateParam = $state()
  state: TabStateParam = $state()
  dragState: TabStateParam = $state()

  constructor({
    name = undefined,
    activeTab = undefined
  }:Props) {
    this.name = `wt-${name}`
    this.state = activeTab
  }

  set activeTab(id: TabStateParam) {
    this.state = id
  }

  get activeTab() {
    return this.state
  }

  is(id: TabStateParam) {
    return this.state === id
  }

  set draggingTab(id: TabStateParam) {
    this.dragState = id
  }

  get draggingTab() {
    return this.dragState
  }

  get isDragging() {
    return this.dragState !== undefined
  }

  set appName(name: TabStateParam) {
    this.name = name
  }

  get appName() {
    return this.name
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