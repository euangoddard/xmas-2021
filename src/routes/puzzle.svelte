<script lang="ts">
  import Bells from "../components/Bells.svelte";
  import Blurb from "../components/Blurb.svelte";
  import Code from "../components/Code.svelte";
  import Doors from "../components/Doors.svelte";
  import Translator from "../components/Translator.svelte";
</script>

<svelte:head>
  <title>The puzzle!</title>
  <meta
    name="description"
    content="Solve Christmas-themed puzzles to celebrate Christmas 2021"
  />
  <meta property="og:title" content="Solve the Christmas puzzle!" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://xmas-2021.netlify.app" />
  <meta
    property="og:image"
    content="https://xmas-2021.netlify.app/android-chrome-512x512.png"
  />
</svelte:head>

<article class="container">
  <h1 class="page-title">
    <a href="/" class="nav-back" sveltekit:prefetch
      ><img src="/icons/arrow-back.svg" alt="Back to home" />
    </a> The puzzle
  </h1>

  <Blurb />

  <p>
    <Bells />
  </p>

  <Translator />

  <Doors />

  <Code />

  <aside>
    <strong>Stuck?</strong> Don't forget you can look at the
    <a sveltekit:prefetch href="/hints">hints</a>.
  </aside>
</article>

<style>
  aside {
    padding: 2rem 0 0;
    text-align: center;
  }
</style>
