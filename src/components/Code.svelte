<script lang="ts">
  import { container } from "$lib/container";
  import { ConfettiMaker } from "$lib/confetti";

  const expectedCode = [3, 4, 8, 4];
  let capturedDigits: (number | null)[] = Array.from({ length: 4 }, () => null);
  let isComplete = false;

  const handleDigit =
    (index: number) =>
    ({ target }) => {
      const digit = Number(target.value);
      capturedDigits[index] = isNaN(digit) ? null : digit;
      target.parentElement
        .querySelector(`input:nth-child(${index + 2})`)
        ?.focus();
      isComplete = capturedDigits.every((d) => d !== null);
    };

  const clearInput = ({ target }) => (target.value = "");

  const checkCode = async () => {
    if (!isComplete) {
      return;
    }
    const isCorrect = capturedDigits.every(
      (d, index) => d === expectedCode[index],
    );
    if (isCorrect) {
      answerState = AnswerState.Correct;
      const confettiMaker = container.resolve<ConfettiMaker>(ConfettiMaker);
      await confettiMaker.start();
      answerState = AnswerState.Answering;
    } else {
      answerState = AnswerState.Incorrect;
      setTimeout(() => {
        capturedDigits.splice(0, capturedDigits.length, null, null, null, null);
        answerState = AnswerState.Answering;
        document
          .querySelectorAll<HTMLInputElement>(".inputs input")
          .forEach((inputEl, index) => {
            inputEl.value = "";
            if (index === 0) {
              setTimeout(() => inputEl.focus(), 200);
            }
          });
      }, 3000);
    }
  };

  const positions = Array.from({ length: expectedCode.length }, (_, i) => i);

  enum AnswerState {
    Answering,
    Incorrect,
    Correct,
  }
  let answerState = AnswerState.Answering;
</script>

<section>
  <div class="inputs">
    {#each positions as position}
      <input
        class={answerState === AnswerState.Incorrect ? "wrong" : ""}
        type="number"
        min="0"
        max="9"
        maxlength="1"
        on:input={handleDigit(position)}
        on:focus={clearInput}
        disabled={answerState !== AnswerState.Answering}
      />
    {/each}
  </div>
  <button
    class="plain check"
    type="button"
    disabled={!isComplete || answerState !== AnswerState.Answering}
    on:click={checkCode}>OK</button
  >
</section>


<style>
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
    gap: 16px;
  }

  .inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  }

  .check,
  input {
    width: 48px;
    height: 48px;
    text-align: center;
    font-family: var(--font-stack-sans-serif);
  }

  input {
    --color-dark: #37474f;
    --color-light: #eceff1;
    font-size: 32px;
    background: var(--color-dark);
    color: var(--color-light);
    border: 2px solid var(--color-light);
    box-shadow: 0 0 0 2px var(--color-dark);
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
  }

  .wrong {
    border-color: #ff8a80;
  }

  .check {
    font-size: 20px;
    display: inline-block;
    background: #4caf50;
    color: #fff;
    padding: 0;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.14),
      0 0 0 0 rgba(0, 0, 0, 0.12);
    font-family: inherit;
    border-radius: 4px;
    font-weight: 500;
    text-decoration: none;
  }

  .check:disabled {
    opacity: 0.5;
  }

  .check:hover {
    box-shadow: 0 1px 2px 0 rgb(26 115 232 / 30%),
      0 1px 3px 1px rgb(26 115 232 / 15%);
  }
</style>