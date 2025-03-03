<script lang="ts">
  /* eslint-disable svelte/no-at-html-tags */
  import iconSet from "../icons/icons.json" assert { type: "json" }

  interface Props {
    icon?: string
  }

  const {
    icon
  }: Props = $props()

  // svelte-ignore non_reactive_update
  let _icon = iconSet[icon]
  if (_icon && _icon.alias) {
    _icon = {
      ...iconSet[_icon.alias]
    }
  }
</script>

{#if _icon}
  <span class="logo">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${_icon.width} ${_icon.height}`}
    >{@html _icon.body}</svg>
  </span>
{/if}

<style>
  .logo {
    display: inline-block;
    width: var(--wt-tab-logo-size);
    height: var(--wt-tab-logo-size);
  }
  :global(.logo > svg) {
    width: 100%;
    height: 100%;
  }
</style>
