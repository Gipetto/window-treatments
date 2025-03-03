<script lang="ts">
  import type { Snippet } from "svelte"

  interface Props {
    id?: string
    active?: boolean
    children?: Snippet
  }

  const {
    id,
    active = false,
    children
  }: Props = $props()
</script>
<div
  id={id}
  class="code"
  class:active={active}
  role="tabpanel"
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