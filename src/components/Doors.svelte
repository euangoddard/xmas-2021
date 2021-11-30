<script lang="ts">
  import Door from "./Door.svelte";

  const colours = [
    "#F44336",
    "#FF9800",
    "#FFEB3B",
    "#4CAF50",
    "#2196F3",
    "#9C27B0",
  ];

  let horizontalColour: string = colours[0];
  let verticalColour: string = colours[1];

  const cellCount = 6;
  const doors = Array.from({ length: cellCount }, () =>
    Array.from({ length: cellCount }, (i) => i),
  );

  function updateValues() {
    const mix =
      colourToNumber(horizontalColour) * colourToNumber(verticalColour);
    for (let i = 0; i < cellCount; i++) {
      for (let j = 0; j < cellCount; j++) {
        const value = mix % ((i + 1) * cellCount + j + 1) % 10;
        doors[i][j] = value;
      }
    }
  }

  function colourToNumber(colour: string): number {
    return parseInt(colour.replace(/#/g, ""), 16);
  }

  updateValues();

  const enum Direction {
    Vertical,
    Horizontal,
  }

  const setColour = (direction: Direction, value: string): void => {
    if (direction === Direction.Horizontal) {
      horizontalColour = value;
    } else {
      verticalColour = value;
    }
    updateValues();
  };
</script>

<section>
  <div>&nbsp;</div>
  <nav class="colours horizontal">
    {#each colours as colour}
      <button
        type="button"
        class="colour"
        style={`background-color: ${colour}`}
        on:click={setColour(Direction.Horizontal, colour)}
      />
    {/each}
  </nav>
  <nav class="colours vertical">
    {#each colours as colour}
      <button
        type="button"
        class="colour"
        style={`background-color: ${colour}`}
        on:click={setColour(Direction.Vertical, colour)}
      />
    {/each}
  </nav>
  <div class="doors">
    {#each doors as doorRow}
      {#each doorRow as door}
        <Door
          value={door}
          --vertical-colour={verticalColour}
          --horizontal-colour={horizontalColour}
        />
      {/each}
    {/each}
  </div>
</section>

<style>
  section {
    display: grid;
    grid-template-columns: 40px auto;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .doors {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  .colours {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  }

  .horizontal {
    flex-direction: row;
  }

  .vertical {
    flex-direction: column;
  }

  .colour {
    border: 1px solid var(--color-black);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
</style>
