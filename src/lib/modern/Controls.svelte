<script lang="ts">
  import { getActiveTabContext } from "./TabStore.svelte.js"

  const tabStore = getActiveTabContext()
  let appWindow: HTMLElement

  const handleMaximize = () => {
    tabStore.maximized = !tabStore.maximized
    if (tabStore.maximized) {
      tabStore.shaded = false
    }
  }

  const handleShade = () => {
    if (!appWindow) {
      appWindow = document.querySelector(`#${tabStore.appName}`) as HTMLElement
    }
    tabStore.shaded = !tabStore.shaded

    if (tabStore.shaded) {
      tabStore.height = appWindow.style.height
      appWindow.style.height = "auto"
    } else {
      appWindow.style.height = tabStore.height ?? "auto"
    }
  }

  const handleClose = () => {
    tabStore.closed = true
    tabStore.shaded = false
    tabStore.maximized = false
  }
</script>
<div class="controls header-bg" role="presentation">
  <a class="control" onclick={handleClose} href="#close" aria-hidden="true" tabIndex="-1">
    <span class="sr-only">Close</span>
  </a>
  <a class="control" onclick={handleShade} href="#window-shade" aria-hidden="true" tabIndex="-1">
    <span class="sr-only">Window Shade</span>
  </a>
  <a class="control" onclick={handleMaximize} href="#maximize" aria-hidden="true" tabIndex="-1">
    <span class="sr-only">Maximize</span>
  </a>
</div>

<style lang="scss">
.controls {
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
  padding: 1.1rem 1rem 0 1rem;
  background-color: var(--wt-color-header-bg);

  .control {
    content: "\00a0";
    border-radius: 100%;
    width: 0.8rem;
    height: 0.8rem;
    background-color: transparent;

    &:nth-child(1) {
      background-color: var(--wt-color-control-red);
    }

    &:nth-child(2) {
      background-color: var(--wt-color-control-orange);
    }

    &:nth-child(3) {
      background-color: var(--wt-color-control-green);
    }

    &:hover {
      box-shadow: inset 0 -2px 0.25rem rgb(0 0 0 / 0.25);
    }
  }

  .sr-only {
    border: 0;
    clip: rect(0,0,0,0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
}
</style>