<script lang="ts">
  export let value: number;

  let isOpen = false;
</script>

<div class="wrapper" on:click={() => (isOpen = !isOpen)}>
  <div class={"cover" + (isOpen ? " open" : "")} />
  <div class="value">{value}</div>
</div>

<style>
  :global {
    --vertical-colour: black;
    --horizontal-colour: black;
  }

  .wrapper {
    --size: 48px;
    width: var(--size);
    height: var(--size);
    position: relative;
    outline: 1px solid var(--color-black);
    cursor: pointer;
  }

  .cover,
  .value {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .cover {
    transition: transform 0.5s ease-in;
    transform-origin: left center;
    background: linear-gradient(
      45deg,
      var(--vertical-colour),
      var(--vertical-colour) 50%,
      var(--horizontal-colour) 50%,
      var(--horizontal-colour) 100%
    );
    z-index: 2;
  }

  .value {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    z-index: 1;
    background: #eceff1;
  }

  .open {
    transform: rotateY(90deg);
  }
</style>
