<script lang="ts">
  import Icon, { type IconKey } from "./Icon.svelte"
  import { type Snippet } from "svelte"
  import { getActiveTabContext, type ActiveTabParam } from "./TabStore.svelte.js"

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
</script>

<a
  class="tab"
  class:active={isActive}
  href="#a"
  onclick={(e) => {
    e.preventDefault()
    e.stopPropagation()
    tabStore.activeTab = forId
    onclick(forId)
  }}
  role="tab"
  aria-expanded={isActive}
>
  <span class="inner">
    <Icon icon={icon} />
    <span class="title">{@render children?.()}</span>
  </span>
</a>

<style lang="scss">
  .tab {
    position: relative;
    --bg-color: var(--wt-color-tab-active-bg);

    position: relative;
    padding-inline: 0.5rem;
    margin-right: -0.85rem;
    color: var(--wt-text-color);
    background-color: transparent;
    z-index: 100;
    text-decoration: none;
    cursor: default;

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
  }
</style>