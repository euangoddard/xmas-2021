<script lang="ts">
  const mapping = new Map<string, string>([
    ["A", "🥶"],
    ["B", "🥵"],
    ["C", "😈"],
    ["D", "🎃"],
    ["E", "☠️"],
    ["F", "🧠"],
    ["G", "🦷"],
    ["H", "🧞️"],
    ["I", "☂️"],
    ["J", "🧶"],
    ["K", "🎩"],
    ["L", "👑"],
    ["M", "🛀🏻"],
    ["N", "🎅🏼"],
    ["O", "🦁"],
    ["P", "🐸"],
    ["Q", "🐛"],
    ["R", "🐳"],
    ["S", "🌵"],
    ["T", "🌻"],
    ["U", "🔥"],
    ["V", "🍎"],
    ["W", "🥝"],
    ["X", "⚽️"],
    ["Y", "🥊️"],
    ["Z", "🚨️"],
  ]);
  const mappingSize = mapping.size;

  let selectedIndex = 0;
  let selectedSymbol: string;
  let selectedValue: string;

  $: {
    const [val, sym] = Array.from(mapping.entries())[selectedIndex];
    selectedSymbol = sym;
    selectedValue = val;
  }

  const incr = () => {
    selectedIndex = (selectedIndex + 1) % mappingSize;
  };

  const decr = () => {
    selectedIndex = (mappingSize + selectedIndex - 1) % mappingSize;
  };

  const message = "yellow horizontally and purple vertically";
  const messageEncoded = message
    .toUpperCase()
    .split("")
    .map((v) => mapping.get(v) ?? v)
    .join("");
</script>

<section>
  <div class="device input">
    <button type="button" class="plain left" on:click={decr}>‹</button>
    {selectedSymbol}
    <button type="button" class="plain right" on:click={incr}>›</button>
  </div>

  <div class="message">{messageEncoded}</div>

  <div class="device output">{selectedValue}</div>
</section>

<style>
  section {
    margin: 6rem -1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .device,
  .message {
    font-size: 32px;
  }

  .device {
    background: rgba(0, 0, 0, 0.65);

    color: white;
    padding: 8px;
    box-shadow: 0 1px 2px 0 rgb(26 115 232 / 30%),
      0 1px 3px 1px rgb(26 115 232 / 15%);
  }

  .message {
    word-spacing: 0.6em;
    text-align: center;
      padding: 0 1rem;
  }

  .input {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    display: flex;
    align-items: center;
  }
  .output {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .plain {
    font-size: 40px;
    line-height: 1;
  }
  .plain.left {
    padding-right: 4px;
  }
  .plain.right {
    padding-left: 4px;
  }
  .plain:hover {
    text-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.14),
      0 0 0 0 rgba(0, 0, 0, 0.12);
  }
</style>
