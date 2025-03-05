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
      sortable: true,
      shaded: false,
      maximized: false,
      closed: false
    }
  })
</script>

<Story name="Primary">
  {#snippet children(args)}
    {#key args.activeTab}
      {#key args.sortable}
        {#key args.maximized}
          {#key args.shaded}
            {#key args.closed}
              <Window {...args} />
            {/key}
          {/key}
        {/key}
      {/key}
    {/key}
  {/snippet}
</Story>
