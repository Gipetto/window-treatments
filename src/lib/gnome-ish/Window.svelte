<script lang="ts">
  import Controls from "./Controls.svelte"
  import Pane from "./Pane.svelte"
  import { TabState, setActiveTabContext } from "./TabStore.svelte.js"
  import Tab from "./Tab.svelte"

  let tabsEl: HTMLElement

  interface Props {
    activeTab?: string
  }

  const {
    activeTab
  }: Props = $props()

  const tabStore = new TabState(activeTab)
  setActiveTabContext(tabStore)

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    tabsEl.classList.add("wt-tabs-drag-over")
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    // @todo - remove if we don't find a use for it
  }
</script>

<div class="window">
  <header>
    <Controls />
    <div
      class="tabs"
      role="application"
      ondragover={handleDragOver}
      ondrop={handleDrop}
      aria-label="Draggable Tabs"
      bind:this={tabsEl}
    >
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
      <div class="space"></div>
    </div>
  </header>
  <div class="panes">
    <Pane id="php" active={tabStore.is("php") || tabStore.is(undefined)}>
&lt;php
  $foo = "bar";
  echo $foo;
    </Pane>
    <Pane id="typescript" active={tabStore.is("typescript")}>
"use strict"

let foo = "bar"
console.info(foo)
    </Pane>
    <Pane id="html" active={tabStore.is("html")}>
&lt;html>
  &lt;head>&lt;/head>
  &lt;body>
    &lt;foo>bar&lt;/foo>
  &lt;/body>
&lt;/html>
    </Pane>
  </div>
</div>

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
  }

  .window {
    font-family: monospace;
    line-height: 1.1rem;
    white-space: preserve-breaks;
    display: block;
    overflow: clip;
    background: var(--wt-color-tab-active-bg);
    border-radius: var(--wt-border-radius);
    box-shadow:
      0 0 0 1px var(--wt-color-border-inner),
      0 0 0 2px var(--wt-color-border-outer),
      var(--wt-color-window-shadow);

    header {
      display: flex;
      flex-direction: row;

      .tabs {
        display: flex;
        flex-direction: row;
        width: 100%;
        background-color: var(--wt-color-header-bg);
        overflow: clip;

        & > :last-child {
          flex-grow: 2;
          background-color: var(--wt-color-header-bg);
          border-end-start-radius: var(--wt-border-radius-inner);
        }
      }
    }
  }
</style>
