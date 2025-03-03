<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf"
  // import { fn } from "@storybook/test"
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
      activeTab: "typescript"
    }
  })
</script>

<Story name="Primary" />
