<script lang="ts">
  const onClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.info("This element is for show only")
  }
</script>
<div class="controls header-bg">
  <a class="control" onclick={onClick} href="#close" aria-hidden="true">
    <span class="sr-only">Close</span>
  </a>
  <a class="control" onclick={onClick} href="#window-shade" aria-hidden="true">
    <span class="sr-only">Window Shade</span>
  </a>
  <a class="control" onclick={onClick} href="#maximize" aria-hidden="true">
    <span class="sr-only">Maximize</span>
  </a>
</div>

<style lang="scss">
.controls {
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
  padding: 1rem 1rem 0 1rem;
  background-color: var(--wt-color-header-bg);

  .control {
    content: "\00a0";
    border-radius: 100%;
    width: 0.85rem;
    height: 0.85rem;
    background-color: rgb(255, 255, 255);

    &:nth-child(1) {
      background-color: var(--wt-color-control-red);
    }

    &:nth-child(2) {
      background-color: var(--wt-color-control-orange);
    }

    &:nth-child(3) {
      background-color: var(--wt-color-control-green);
    }
  }

  .sr-only {
    border: 0;
    clip: rect(0,0,0,0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
}
</style>