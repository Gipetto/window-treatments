<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf"
  import Window from "$lib/gnome-ish/Window.svelte"

  const { Story } = defineMeta({
    component: Window,
    title: "Gnome-Ish/Window",
    argTypes: {
      activeTab: {
        control: "select",
        options: ["php", "typescript", "html"]
      }
    },
    args: {
      activeTab: "typescript",
      controls: true,
      name: "Window Sample",
      ariaLabel: "Window Sample",
      sortable: true
    }
  })
</script>

<Story name="Primary">
  {#snippet children(args)}
    {#key args.activeTab}
      {#key args.sortable}
        <Window {...args} />
      {/key}
    {/key}
  {/snippet}
</Story>
