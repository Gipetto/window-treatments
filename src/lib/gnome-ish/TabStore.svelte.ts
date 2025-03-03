import { getContext, setContext } from "svelte"

type ActiveTabParam = string | undefined

class ActiveTab {
  state: ActiveTabParam = $state()

  constructor(v: ActiveTabParam = undefined) {
    this.state = v
  }

  set activeTab(id: ActiveTabParam) {
    this.state = id
  }

  get activeTab() {
    return this.state
  }

  is(id: ActiveTabParam) {
    return this.state === id
  }
}

const activeTabContextKey = Symbol("tabContext")

const setActiveTabContext = (s: ActiveTab) => {
  setContext(activeTabContextKey, s)
}

const getActiveTabContext = (): ActiveTab => {
  return getContext(activeTabContextKey)
}

export {
  ActiveTab,
  type ActiveTabParam,
  getActiveTabContext,
  setActiveTabContext
}