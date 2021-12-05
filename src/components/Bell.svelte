<script lang="ts">
  import { container } from "$lib/container";
  import { NotesService } from "$lib/notes/notes.service";
  import { createEventDispatcher, onMount } from "svelte";
  import type { NoteDef } from "./bell.model";

  let notesService: NotesService;
  onMount(() => {
    notesService = container.resolve<NotesService>(NotesService);
  });

  export let note: NoteDef;

  let isRinging = false;
  let bellTimeout: NodeJS.Timeout | undefined;

  const dispatch = createEventDispatcher();

  const ringBell = () => {
    if (bellTimeout) {
      clearTimeout(bellTimeout);
    }
    notesService.playNote(note.key);
    isRinging = true;
    dispatch("play", { note });
    bellTimeout = setTimeout(() => (isRinging = false), 500);
  };
</script>

<button
  type="button"
  on:click={ringBell}
  class={isRinging ? "ringing plain" : "plain"}
>
  <img src="/icons/bell.svg" alt="Bell" />
</button>

<style>
  @keyframes ring {
    0%,
    50%,
    100% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(10deg);
    }
    75% {
      transform: rotate(-10deg);
    }
  }

  .ringing {
    transform-origin: top center;
    animation: ring 250ms ease-in-out;
  }

  img {
    width: 48px;
    height: 48px;
  }
</style>
