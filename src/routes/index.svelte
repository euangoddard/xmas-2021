<svelte:head>
  <title>Merry Christmas and a Happy 2022!</title>
</svelte:head>

<h1>Merry Christmas and a Happy 2022!</h1>
<p>
  Wishing you all the best for the festive season from all in the
  Dallimore-Goddard household.
</p>

<h2>Love from, Euan, Chloe, Eric, Alex and Autumn</h2>

<hr />

<p>
  This year's interactive takes the form of an interactive puzzle. Solve clues
  to reveal the secret message hidden <a sveltekit:prefetch href="/puzzle"
    >here</a
  >.
</p>
<p>
  Look for hidden elements, think laterally and feel free to come back later!
</p>
<p>
  <a class="button" sveltekit:prefetch href="/puzzle">Start puzzle</a>
</p>

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
</style>
