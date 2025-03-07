<script lang="ts">
  import type { Snippet } from "svelte"
  import { getActiveTabContext } from "./TabStore.svelte.js"

  const tabStore = getActiveTabContext()


  interface Props {
    id?: string
    children?: Snippet
  }

  const {
    id,
    children
  }: Props = $props()
  const isActive = $derived(tabStore.is(id))

</script>
<div
  id={`${tabStore.appName}-panels-${id}`}
  class="code"
  class:active={isActive}
  role="tabpanel"
  hidden={!isActive}
  tabIndex={0}
><div>
  <code>
{@render children?.()}
  </code>
</div></div>

<style lang="scss">
  .code {
    color: var(--wt-text-color);
    white-space: pre;

    &:not(.active) {
      &>div {
        display: none;
      }
    }

    &>div {
      padding: 1rem 1rem 0.9rem 1rem;
      display: block;
    }
  }
</style>