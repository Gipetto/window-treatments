<script lang="ts">
  import Controls from "./Controls.svelte"
  import { TabState, setActiveTabContext } from "./TabStore.svelte.js"
  import { onMount, type Snippet } from "svelte"

  let tabsEl: HTMLElement

  interface Props {
    name?: string
    controls?: boolean
    ariaLabel?: string
    activeTab?: string
    sortable?: boolean
    maximized?: boolean
    shaded?: boolean
    closed?: boolean
    tabs?: Snippet
    panes?: Snippet
  }

  const {
    name = "window-tab-group",
    controls = true,
    ariaLabel = "Code",
    sortable = true,
    maximized = false,
    shaded = false,
    closed = false,
    activeTab,
    tabs,
    panes
  }: Props = $props()

  const tabStore = new TabState({
    name,
    activeTab,
    sortable,
    maximized,
    shaded,
    closed
  })
  setActiveTabContext(tabStore)

  const isMaximized = $derived(tabStore.maximized)
  const isShaded = $derived(tabStore.shaded)
  const isClosed = $derived(tabStore.closed)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    tabsEl.classList.add("wt-tabs-drag-over")
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    // @todo - remove if we don't find a use for it
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const tabs = tabsEl.querySelectorAll(":scope > .tabs > [role='tab']") as NodeListOf<HTMLElement>

    if (["ArrowRight", "ArrowLeft"].includes(e.key)) {
      tabs[tabStore.tabFocus].setAttribute("tabindex", "-1")
      if (e.key === "ArrowRight") {
        tabStore.tabFocus++
        if (tabStore.tabFocus >= tabs.length) {
          tabStore.tabFocus = 0
        }
      } else if (e.key === "ArrowLeft") {
        tabStore.tabFocus--
        if (tabStore.tabFocus < 0) {
          tabStore.tabFocus = tabs.length - 1
        }
      }
    }

    tabs[tabStore.tabFocus].setAttribute("tabindex", "0")
    tabs[tabStore.tabFocus].focus()
  }

    onMount(() => {
      const tabs = Array.from(tabsEl.querySelectorAll(":scope > .tabs > [role='tab']"))
      const _activeTabIndex = tabs.findIndex((el) => el.classList.contains("active"))
      tabStore.tabFocus = _activeTabIndex
    })
</script>

<section
  class="window"
  id={tabStore.appName}
  class:maximized={isMaximized}
  class:shaded={isShaded}
  class:closed={isClosed}
  data-name={tabStore.appName}
  aria-label={ariaLabel}
>
  <header>
    <nav
      role="application"
      ondragover={tabStore.sortable ? handleDragOver : undefined}
      ondrop={tabStore.sortable ? handleDrop : undefined}
      bind:this={tabsEl}
    >
      <!-- svelte-ignore a11y_interactive_supports_focus -->
      <div
        class="tabs"
        role="tablist"
        aria-label="Tabs"
        aria-orientation="horizontal"
        aria-multiselectable="false"
        onkeydown={handleKeyDown}
      >
        {#if controls}
          <Controls />
        {/if}
        {@render tabs?.()}
        <div class="space" role="none" tabindex="-1"></div>
      </div>
    </nav>
  </header>
  <div
    class="panes"
    id={`${tabStore.appName}-panels`}
  >
    {@render panes?.()}
  </div>
</section>

<style lang="scss">
  :root {
    --wt-grid-type: auto-fill;
    --wt-border-radius: 0.75rem;
    --wt-border-radius-inner: 0.5rem;

    --wt-text-color: rgb(255, 255, 255);

    --wt-color-header-bg: rgb(90 90 90);

    --wt-color-control-red: rgb(255 95 86); // #ff5f56
    --wt-color-control-orange: rgb(255 189 46); // #FFBD2E
    --wt-color-control-green: rgb(39 201 63); // #27C93F

    --wt-tab-logo-size: 16px;
    --wt-color-tab-active-bg: rgb(0 0 0);
    --wt-color-tab-inactive-bg:var(--wt-color-header-bg);
    --wt-color-tab-hover-bg: rgb(50 50 50);
    --wt-color-border-inner: rgb(100 100 100);
    --wt-color-border-outer: rgb(50 50 50);
    --wt-color-window-shadow: 0.2rem 0.2rem 0.2rem rgb(0 0 0 / 0.25);
    --wt-color-tab-border-focus: rgb(0, 179, 255);
  }

  .window {
    font-family: monospace;
    line-height: 1.1rem;
    white-space: preserve-breaks;
    display: block;
    overflow: hidden;
    background: var(--wt-color-tab-active-bg);
    border-radius: var(--wt-border-radius);
    box-shadow:
      0 0 0 1px var(--wt-color-border-inner),
      0 0 0 2px var(--wt-color-border-outer),
      var(--wt-color-window-shadow);

    resize: both;
    max-height: fit-content;

    &.maximized {
      position: absolute;
      inset: 0;
      border-radius: 0;
      resize: none;
      width: auto !important;
      height: auto !important;
    }

    &.shaded {
      .panes {
        display: none;
      }
    }

    &.closed {
      display: none;
    }

    header {
      display: flex;
      flex-direction: row;

      nav {
        width: 100%;
      }

      .tabs {
        display: flex;
        flex-direction: row;
        background-color: var(--wt-color-header-bg);
        overflow: hidden;

        & > :last-child {
          flex-grow: 2;
        }
      }
    }
  }
</style>
