<script lang="ts">
  import { onMount, type Component } from "svelte"
  import iconSet from "../icons/icons.json" assert { type: "json" }

  // @todo - put this in a store so it only gets processed once
  interface Icons {
    [k:string]: {
      name: string
      file: string
      component: string
    }
  }
  const icons = Object.entries(iconSet).reduce((acc, data) => {
    data[0].split(":").forEach((ext) => {
      acc[ext] = data[1]
    })

    return acc
  }, {} as Icons)

  interface Props {
    icon?: string
  }

  const {
    icon
  }: Props = $props()

  let Svg: Component | undefined = $state(undefined)
  onMount(async () => {
    if (icon) {
      Svg = (await import(`../icons/${icons[icon].component}`)).default
    }
  })
</script>

{#if Svg}
  <span class="logo">
    <Svg />
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
