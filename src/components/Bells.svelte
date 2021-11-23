<script lang="ts">
  import { VigenereCipher } from "$lib/cipher";
  import type { NoteDef } from "./bell.model";
  import Bell from "./Bell.svelte";

  const notes: readonly NoteDef[] = [
    { key: "B6", code: "Z" },
    { key: "D7", code: "Y" },
    { key: "G6", code: "X" },
    { key: "A6", code: "W" },
  ];

  // Correct sequence = B6, B6, B6, B6, B6, B6, B6, D7, G6, A6, B6
  // Correct cipher key: ZZZZZZZYXWZ
  console.log(
    new VigenereCipher("ZZZZZZZYXWZ").encipher(
      "Top left then down two across five",
    ),
  );
  const encipheredValue = "SNO KDER PGDM CNVM QSN ZBQNRR CEUD";

  const incorrectKey = "THISKYWRONG";

  let decipheredValue = encipheredValue;

  let selectedNotes: NoteDef[] = [];
  const addNote = ({ detail }) => {
    selectedNotes = [...selectedNotes, detail.note];
    updateDecipheredValue();
  };

  const resetNotes = () => {
    selectedNotes = [];
    updateDecipheredValue();
  };

  const updateDecipheredValue = () => {
    if (selectedNotes.length) {
      const bellKey = selectedNotes.map(({ code }) => code).join("");
      let key: string;
      if (bellKey.length < incorrectKey.length) {
        key = `${bellKey}${incorrectKey.slice(bellKey.length)}`;
      } else {
        key = bellKey;
      }
      decipheredValue = new VigenereCipher(key).decipher(encipheredValue);
    } else {
      decipheredValue = encipheredValue;
    }
  };
</script>

<div class="bells">
  {#each notes as note}
    <Bell {note} on:play={addNote} />
  {/each}
  <button class="reset-button" on:click={resetNotes}>
    <img src="/icons/reset.svg" alt="Reset bells" />
  </button>
</div>
<div class="phrase">
  {#each decipheredValue as letter}
    <span class="letter">{letter}</span>
  {/each}
</div>

<style>
  .bells {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .reset-button {
    cursor: pointer;
    display: inline-block;
    margin-left: 32px;
    appearance: none;
    padding: 0;
    border: 0;
    background: none;
    transform: rotate(0);
    transition: transform 0.3s ease-in-out;
  }
  .reset-button:hover {
    transform: rotate(-0.5turn);
  }
  .reset-button img {
    width: 48px;
  }

  .phrase {
    display: flex;
    justify-content: center;
    gap: 4px;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }
  .letter {
    display: inline-block;
    background: rgba(255, 0, 0, 0.1);
    border-radius: 4px;
    padding: 8px;
    line-height: 1;
    font-size: 20px;
  }
</style>
