<script lang="ts" module>
  import iconSet from "../icons/icons.json" assert { type: "json" }

  type IconKey = keyof typeof iconSet
  type Icon = {
    name: string
    set: string
    icon: string
    aliases: string[]
    width: number
    height: number
    body: string
  }
</script>
<script lang="ts">
  /* eslint-disable svelte/no-at-html-tags */
  interface Props {
    icon?: IconKey | undefined
  }

  const {
    icon
  }: Props = $props()

  // svelte-ignore non_reactive_update
  let _icon: Icon | undefined

  if (icon && iconSet[icon]) {
    if ("alias" in iconSet[icon]) {
      const alias = iconSet[icon].alias as IconKey
      _icon = { ...iconSet[alias] } as Icon
    } else {
      _icon = iconSet[icon]
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
