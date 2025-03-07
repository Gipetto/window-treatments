<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf"
  import Window from "$lib/modern/Window.svelte"
  import Tab from "$lib/modern/Tab.svelte"
  import Pane from "$lib/modern/Pane.svelte"

  const { Story } = defineMeta({
    component: Window,
    title: "Modern/Window",
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
              <Window {...args}>
                {#snippet tabs()}
                  <Tab
                    icon="php"
                    forId="php"
                    onclick={() => console.log("php")}
                  >
                    Cow.php
                  </Tab>
                  <Tab
                    icon="typescript"
                    forId="typescript"
                    onclick={() => console.log("ts")}
                  >
                    main.ts
                  </Tab>
                  <Tab
                    icon="html"
                    forId="html"
                    onclick={() => console.log("html")}
                  >
                    index.html
                  </Tab>
                {/snippet}
                {#snippet panes()}
                  <Pane id="php">
                    {`
<?php
  // Example from: https://gipetto.github.io/CowSay/

  use CowSay\\Cow;

  $bessie = new Cow("Hello, Farm!");

  // store the output in a variable
  $output = $bessie->say();
  echo $output;

  // or just echo the object for direct output
  echo $bessie;
                    `.trim()}
                  </Pane>
                  <Pane id="typescript">
                    {`
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
                    `.trim()}
                  </Pane>
                  <Pane id="html">
                    {`
<html>
  <head>
    <title>Page Title</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <header>
      <h1>Page Title</h1>
    </header>
    <main>
      <section>
        <h2>Section Title</h2>
        <p>Content</p>
      </section>
    </main>
    <footer>
      <p>@copy; Foo</p>
    </footer>
  </body>
</html>
                    `.trim()}
                      </Pane>
                {/snippet}
              </Window>
            {/key}
          {/key}
        {/key}
      {/key}
    {/key}
  {/snippet}
</Story>
