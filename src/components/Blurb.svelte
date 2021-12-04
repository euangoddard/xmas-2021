<script lang="ts">
  import { container } from "$lib/container";
  import { Duration, NotesService } from "$lib/notes/notes.service";
  import { Sequencer } from "$lib/notes/sequencer";
  import { onMount } from "svelte";

  enum PartType {
    Text,
    IncorrectClue,
    CorrectClue,
  }

  interface Part {
    id: number;
    type: PartType;
    text: string;
  }

  const parts: readonly Part[] = [
    {
      id: 1,
      type: PartType.Text,
      text: "When one thinks of Christmas, images of the ",
    },
    {
      id: 2,
      type: PartType.IncorrectClue,
      text: "holly and the ivy",
    },
    {
      id: 3,
      type: PartType.Text,
      text: " are conjured up, as well as that ",
    },
    {
      id: 4,
      type: PartType.IncorrectClue,
      text: "deep and crisp and even",
    },
    {
      id: 5,
      type: PartType.Text,
      text: " snow, and indeed ",
    },
    {
      id: 6,
      type: PartType.IncorrectClue,
      text: "chestnuts roasting on an open fire",
    },
    {
      id: 7,
      type: PartType.Text,
      text: ". Some talk of ",
    },
    {
      id: 8,
      type: PartType.IncorrectClue,
      text: "Santa Claus coming to town",
    },
    {
      id: 9,
      type: PartType.Text,
      text: ", while others ponder the ",
    },
    {
      id: 10,
      type: PartType.IncorrectClue,
      text: "silent night",
    },
    {
      id: 11,
      type: PartType.Text,
      text: " that happened all those years ago. So whether you're hoping to hear those ",
    },
    {
      id: 12,
      type: PartType.CorrectClue,
      text: "jingle bells",
    },
    {
      id: 13,
      type: PartType.Text,
      text: ", holding out for a ",
    },
    {
      id: 14,
      type: PartType.IncorrectClue,
      text: "white Christmas",
    },
    {
      id: 15,
      type: PartType.Text,
      text: " or have a soft spot in your heart for the ",
    },
    {
      id: 16,
      type: PartType.IncorrectClue,
      text: "little drummer boy",
    },
    {
      id: 17,
      type: PartType.Text,
      text: ", let the ",
    },
    {
      id: 18,
      type: PartType.IncorrectClue,
      text: "bells ring out for Christmas",
    },
    {
      id: 19,
      type: PartType.Text,
      text: "!",
    },
  ];

  let activeIncorrectId: number | null = null;
  let incorrectTimeout: NodeJS.Timeout | null = null;

  let isCorrectShown = false;

  const showIncorrect = (id: number): void => {
    if (incorrectTimeout) {
      clearTimeout(incorrectTimeout);
    }
    activeIncorrectId = id;
    incorrectTimeout = setTimeout(() => (activeIncorrectId = null), 3000);
  };

  // B6, B6, B6, B6, B6, B6, B6, D7, G6, A6, B6
  const sequencer = new Sequencer()
    .addNote("B6", Duration.Crotchet, 500)
    .addNote("B6", Duration.Crotchet, 500)
    .addNote("B6", Duration.Crotchet, 1000)
    .addNote("B6", Duration.Crotchet, 500)
    .addNote("B6", Duration.Crotchet, 500)
    .addNote("B6", Duration.Crotchet, 1000)
    .addNote("B6", Duration.Crotchet, 500)
    .addNote("D7", Duration.Crotchet, 500)
    .addNote("G6", Duration.Crotchet, 500)
    .addNote("A6", Duration.Crotchet, 500)
    .addNote("B6", Duration.Crotchet, 500);

  let notesService: NotesService;
  onMount(() => {
    notesService = container.resolve(NotesService);
  });

  const showCorrect = () => {
    isCorrectShown = true;
    sequencer.play(notesService);
  };
</script>

<p class="song">
  {#each parts as part}
    {#if part.type === PartType.Text}
      {part.text}
    {:else if part.type === PartType.IncorrectClue}
      <span
        class={activeIncorrectId === part.id ? "clue incorrect" : "clue"}
        on:click={() => showIncorrect(part.id)}>{part.text}</span
      >
    {:else}
      <span
        class={isCorrectShown ? "clue correct" : "clue"}
        on:click={showCorrect}>{part.text}</span
      >
    {/if}
  {/each}
</p>

<style>
  .clue {
    text-decoration: underline dotted rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: color 0.25s ease-in;
  }

  .incorrect {
    color: var(--color-red);
  }

  .correct {
    color: var(--color-green);
  }

  .song {
    font-family: var(--font-stack-cursive);
    font-size: 1.75rem;
    margin: 1rem 0;
    padding: 1rem;
    border: 1px dashed var(--color-red);
  }
</style>
