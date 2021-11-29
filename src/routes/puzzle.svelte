<script lang="ts">
  import Bells from "../components/Bells.svelte";
  import Code from "../components/Code.svelte";
  import Doors from "../components/Doors.svelte";
  import Translator from "../components/Translator.svelte";

  let isSongRevealed = false;
</script>

<svelte:head>
  <title>The puzzle!</title>
</svelte:head>

<article class="puzzle">
  <h1>The puzzle</h1>

  <p class="song">
    When one thinks of Christmas, images of the holly and the ivy are conjured
    up, as well as that deep and crisp and even snow, and indeed chestnuts
    roasting on an open fire. Some talk of Santa Claus coming to town, while
    other ponder the silent night that happened all those years ago. So whether
    you're hoping to hear those <span
      class={isSongRevealed ? "song-revealed" : ""}
      on:click={() => (isSongRevealed = true)}>jingle bells</span
    >, holding out for a white Christmas or have a soft spot in your heart for
    the little drummer boy, let the bells ring out for Christmas!
  </p>

  <p>
    <Bells />
  </p>

  <Translator />

  <Doors />

  <Code />
</article>

<style>
  .puzzle {
    max-width: 960px;
    margin: 0 auto;
  }

  .song {
    font-family: var(--font-stack-cursive);
    font-size: 1.75rem;
    margin: 1rem 0;
    padding: 1rem;
    border: 1px dashed var(--color-red);
  }

  .song-revealed {
    color: var(--color-red);
  }
</style>
