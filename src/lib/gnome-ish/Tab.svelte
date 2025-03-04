<script lang="ts">
  import Icon, { type IconKey } from "./Icon.svelte"
  import { type Snippet } from "svelte"
  import { getActiveTabContext, type ActiveTabParam } from "./TabStore.svelte.js"

  const TAB_DRAGGING_CLASS = "wt-tab-dragging"
  const TAB_DRAGGING_OVER_CLASS = "wt-tab-dragging-over"

  let tabEl: HTMLElement

  const tabStore = getActiveTabContext()

  interface Props {
    forId?: string
    icon?: IconKey | undefined
    onclick?: (id: ActiveTabParam) => void
    children: Snippet
  }

  let {
    forId,
    icon,
    onclick = () => {},
    children
  }: Props = $props()

  const isActive = $derived(tabStore.is(forId))
  let mousePosX = $state(0)

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

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    tabEl.classList.add(TAB_DRAGGING_OVER_CLASS)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    tabEl?.classList.add(TAB_DRAGGING_OVER_CLASS)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    // @todo - remove if we don't find a use for it
  }

  const handleDragOver = (e: MouseEvent) => {
    e.preventDefault()

    requestAnimationFrame(() => {
      const draggedEl = document.getElementById(`wt-tab-${tabStore.draggingTab}`) as HTMLElement
      if (!draggedEl || draggedEl.id === tabEl.id) {
        return
      }

      mousePosX = e.clientX
      const rect = tabEl.getBoundingClientRect()
      const lDist = mousePosX - rect.left
      const rDist = rect.right - mousePosX

      if (lDist < 0 || rDist < 0) {
        return
      }

      const closestEdge = lDist < rDist ? "left" : "right"

      const tabs = tabEl.closest(".tabs")
      if (!tabs) {
        // @todo - complain loudly?
        return
      }

      if (tabEl.nextElementSibling && closestEdge === "right") {
        tabs.insertBefore(draggedEl, tabEl.nextElementSibling)
      } else {
        tabs.insertBefore(draggedEl, tabEl)
      }
    })
  }
</script>

<a
  id={`wt-tab-${forId}`}
  class="tab"
  class:active={isActive}
  class:wt-tab-dragging={false}
  href={`#${forId}`}
  onclick={(e) => {
    e.preventDefault()
    e.stopPropagation()
    tabStore.activeTab = forId
    onclick(forId)
  }}
  role="tab"
  aria-expanded={isActive}
  aria-grabbed={false}
  draggable={true}
  ondragstart={handleDragStart}
  ondragend={handleDragEnd}
  ondragenter={handleDragEnter}
  ondragleave={handleDragLeave}
  ondrop={handleDrop}
  ondragover={handleDragOver}
  bind:this={tabEl}
>
  <span class="inner">
    <Icon icon={icon} />
    <span class="title">{@render children?.()}</span>
  </span>
</a>

<style lang="scss">
  .tab {
    --bg-color: var(--wt-color-tab-active-bg);

    position: relative;
    padding-inline: 0.5rem;
    margin-right: -0.85rem;
    color: var(--wt-text-color);
    background-color: transparent;
    z-index: 100;
    text-decoration: none;
    cursor: default;
    overflow: hidden;
    // enable hardware acceleration
    transform: translate3d(0, 0, 0);
    // transition: transform ease 0.5s;

    &:not(.active) {
      --bg-color: var(--wt-color-tab-inactive-bg);
      z-index: 0;

      &:hover {
        --bg-color: var(--wt-color-tab-hover-bg);
        cursor: pointer;
        text-decoration: underline;
        z-index: 99;
      }
    }

    &::before,
    &::after {
      content: "\00a0";
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      bottom: 0;
      overflow: hidden;
      background-color: transparent;
      box-shadow:
        1px 0 0 0 var(--bg-color),
        3px 4px 0 0 var(--bg-color);
    }

    &::before {
      left: 0;
      border-bottom-right-radius: var(--wt-border-radius);
    }

    &::after {
      right: 0;
      border-bottom-left-radius: var(--wt-border-radius);
      box-shadow:
        -1px 0 0 0 var(--bg-color),
        -1px 4px 0 0 var(--bg-color);
    }

    .inner {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--bg-color);
      margin-block-start: 0.6rem;
      padding: 0.5rem 1rem 0.5rem 1rem;
      border-start-start-radius: var(--wt-border-radius-inner);
      border-start-end-radius: var(--wt-border-radius-inner);
    }

    * {
      // prevent child elements from getting drag events
      pointer-events: none;
    }

    &.wt-tab-dragging {
      >*,
      &::before,
      &::after {
        opacity: 0.25;
      }
    }
  }
</style>