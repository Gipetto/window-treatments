<script lang="ts">
  import Controls from "./Controls.svelte"
  import Pane from "./Pane.svelte"
  import { TabState, setActiveTabContext } from "./TabStore.svelte.js"
  import Tab from "./Tab.svelte"
  import { onMount } from "svelte"

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
  }

  const {
    name = "window-tab-group",
    controls = true,
    ariaLabel = "Code",
    sortable = true,
    maximized = false,
    shaded = false,
    closed = false,
    activeTab
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
        <Tab
          icon="php"
          forId="php"
          onclick={() => console.log("php")}
        >
          Cow.php
        </Tab>
        <Tab
          icon="typescript"
          forId="typescript"
          onclick={() => console.log("ts")}
        >
          main.ts
        </Tab>
        <Tab
          icon="html"
          forId="html"
          onclick={() => console.log("html")}
        >
          index.html
        </Tab>
        <div class="space" role="none" tabindex="-1"></div>
      </div>
    </nav>
  </header>
  <div
    class="panes"
    id={`${tabStore.appName}-panels`}
  >
    <Pane id="php" active={tabStore.is("php") || tabStore.is(undefined)}>
{`
<?php
  // Example from: https://gipetto.github.io/CowSay/

  use CowSay\\Cow;

  $bessie = new Cow("Hello, Farm!");

  // store the output in a variable
  $output = $bessie->say();
  echo $output;

  // or just echo the object for direct output
  echo $bessie;
`.trim()}
    </Pane>
    <Pane id="typescript" active={tabStore.is("typescript")}>
{`
const handleDragStart = (e: DragEvent) => {
  if (e.dataTransfer) {
    e.dataTransfer.setData("text/plain", forId as string)
    e.dataTransfer.dropEffect = "move"
    e.dataTransfer.effectAllowed = "move"

    tabEl.classList.add(TAB_DRAGGING_CLASS)
    tabStore.draggingTab = forId
  }

  tabEl.setAttribute("aria-grabbed", "true")
}

const handleDragEnd = (_e: DragEvent) => {
  tabEl.classList.remove(TAB_DRAGGING_CLASS)
  tabEl.setAttribute("aria-grabbed", "true")
  tabStore.activeTab = forId
  tabStore.draggingTab = undefined
}
`.trim()}
    </Pane>
    <Pane id="html" active={tabStore.is("html")}>
{`
<html>
  <head>
    <title>Page Title</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <header>
      <h1>Page Title</h1>
    </header>
    <main>
      <section>
        <h2>Section Title</h2>
        <p>Content</p>
      </section>
    </main>
    <footer>
      <p>@copy; Foo</p>
    </footer>
  </body>
</html>
`.trim()}
    </Pane>
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
