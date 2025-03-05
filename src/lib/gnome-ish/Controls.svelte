<script lang="ts">
  const onClick = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.info("This element is for show only")
  }
</script>
<div class="controls header-bg" role="presentation">
  <a class="control" onclick={onClick} href="#close" aria-hidden="true" tabIndex="-1">
    <span class="sr-only">Close</span>
  </a>
  <a class="control" onclick={onClick} href="#window-shade" aria-hidden="true" tabIndex="-1">
    <span class="sr-only">Window Shade</span>
  </a>
  <a class="control" onclick={onClick} href="#maximize" aria-hidden="true" tabIndex="-1">
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
    background-color: transparent;

    &:nth-child(1) {
      background-color: var(--wt-color-control-red);
    }

    &:nth-child(2) {
      background-color: var(--wt-color-control-orange);
    }

    &:nth-child(3) {
      background-color: var(--wt-color-control-green);
    }

    &:hover {
      box-shadow: inset 0 -2px 0.25rem rgb(0 0 0 / 0.25);
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