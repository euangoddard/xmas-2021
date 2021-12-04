<script lang="ts">
  interface Section {
    id: number;
    title: string;
    hint: string;
  }
  const sections: readonly Section[] = [
    {
      id: 1,
      title: "Intro blurb",
      hint: "Notice that some words stand out. Try clicking on these and see what happens",
    },
    {
      id: 2,
      title: "Bells",
      hint: "Find the song you need to play in the blurb and play it out to decode the message. If you make a mistake, use the reset button to clear what you've done",
    },
    {
      id: 3,
      title: "Emojis",
      hint: "Notice which parts change when you click the arrows",
    },
    {
      id: 4,
      title: "Coloured boxes",
      hint: "You'll need two clues for this: which colours to set and which numbers to read",
    },
    {
      id: 5,
      title: "Code",
      hint: "The code can be found be deciphering the coloured boxes above",
    },
  ];

  const closeOthers = (evt) => {
    if (evt.target.open) {
      evt.target.parentElement
        .querySelectorAll<HTMLDetailsElement>("details")
        .forEach((el) => {
          if (el !== evt.target) {
            el.open = false;
          }
        });
    }
  };
</script>

<article class="container">
  <h1 class="page-title">
    <a href="/" class="nav-back" sveltekit:prefetch
      ><img src="/icons/arrow-back.svg" alt="Back to home" /></a
    > Hints
  </h1>
  {#each sections as section}
    <details on:toggle={closeOthers}>
      <summary>{section.title}</summary>
      <p>{section.hint}</p>
    </details>
  {/each}
</article>

<style>
  @keyframes invisiblyGrowFontSize {
    0% {
      font-size: 0;
      opacity: 0;
    }
    100% {
      font-size: 1em;
      opacity: 0;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  details {
    margin-bottom: 1rem;
  }
  summary {
    font-size: 32px;
    font-family: var(--font-stack-cursive);
    cursor: pointer;
  }
  p {
    margin: 0.5rem 0 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.45);
    --grow-animation-duration: 200ms;
    animation-name: invisiblyGrowFontSize, fadeIn;
    animation-duration: var(--grow-animation-duration), 200ms;
    animation-delay: 0ms, var(--grow-animation-duration);
  }
</style>
