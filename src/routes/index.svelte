<script lang="ts">
  import { slide } from "svelte/transition";

  let showAutumn = false;
</script>

<svelte:head>
  <title>Merry Christmas and a Happy 2022!</title>
  <meta
    name="description"
    content="Solve Christmas-themed puzzles to celebrate Christmas 2021 - by Euan Goddard"
  />
  <meta property="og:title" content="Merry Christmas and a Happy 2022!" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://xmas-2021.netlify.app" />
  <meta
    property="og:image"
    content="https://xmas-2021.netlify.app/android-chrome-512x512.png"
  />
</svelte:head>

<article class="container">
  <h1>Merry Christmas and a Happy 2022!</h1>
  <p>
    Wishing you all the best for the festive season from all in the
    Dallimore-Goddard household.
  </p>

  <h2>
    Love from, Euan, Chloe, Eric, Alex and <a
      href="#autumn"
      on:click={() => (showAutumn = !showAutumn)}>Autumn</a
    >
  </h2>

  {#if showAutumn}
    <p id="autumn" in:slide out:slide>
      <img src="/autumn.jpg" alt="Autumn" loading="lazy" class="autumn" />
    </p>
  {/if}
  <hr />

  <p>
    This year's card takes the form of an interactive puzzle. Solve clues to
    reveal the code that unlocks your prize.
  </p>
  <p>
    Some puzzles can be solved with no other information than that contained in
    the puzzle itself, but others do require information discovered in previous
    puzzles.
  </p>
  <p>
    Play around, think laterally and feel free to come back later! You'll need
    to listen to solve some of the puzzles so make sure you have your volume
    turned up. If you're really stuck take a look at the <a
      sveltekit:prefetch
      href="/hints">hints</a
    >.
  </p>
  <p>
    <a class="button" sveltekit:prefetch href="/puzzle">Start puzzle</a>
  </p>
</article>

<style>
  * {
    text-align: center;
  }

  .button {
    display: inline-block;
    background: #1a73e8;
    color: #fff;
    padding: 0 24px;
    line-height: 36px;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.14),
      0 0 0 0 rgba(0, 0, 0, 0.12);
    font-family: inherit;
    border-radius: 4px;
    font-weight: 500;
    text-decoration: none;
  }

  .button:hover {
    box-shadow: 0 1px 2px 0 rgb(26 115 232 / 30%),
      0 1px 3px 1px rgb(26 115 232 / 15%);
  }

  .autumn {
    width: 250px;
    height: 250px;
    box-shadow: 0 1px 2px 0 rgb(26 115 232 / 30%),
      0 1px 3px 1px rgb(26 115 232 / 15%);
  }
</style>
