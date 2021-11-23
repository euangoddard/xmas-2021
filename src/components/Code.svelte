<script lang="ts">
  let capturedDigits: (number | null)[] = Array.from({ length: 4 }, () => null);

  const handleDigit =
    (index: number) =>
    ({ target }) => {
      const digit = Number(target.value);
      capturedDigits[index] = isNaN(digit) ? null : digit;
      target.parentElement
        .querySelector(`input:nth-child(${index + 2})`)
        ?.focus();
    };
</script>

<section>
  <input type="number" min="0" max="9" on:input={handleDigit(0)} />
  <input type="number" min="0" max="9" on:input={handleDigit(1)} />
  <input type="number" min="0" max="9" on:input={handleDigit(2)} />
  <input type="number" min="0" max="9" on:input={handleDigit(3)} />
</section>

<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
  }

  input {
    background: #37474f;
    color: #fff;
    font-family: var(--font-stack-sans-serif);
    font-size: 32px;
    width: 48px;
      height: 48px;
    text-align: center;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }
</style>
