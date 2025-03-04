import { getContext, setContext } from "svelte"

type TabStateParam = string | undefined

class TabState {
  state: TabStateParam = $state()
  dragState: TabStateParam = $state()

  constructor(v: TabStateParam = undefined) {
    this.state = v
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