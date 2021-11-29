import { container } from "$lib/container";
import type { Options } from "canvas-confetti";
import { create as createConfetti } from "canvas-confetti";

type Confetti = (options?: Options) => Promise<null> | null;

const colors = ["#00bb00", "#bb0000", "#ffffff"];

export class ConfettiMaker {
  private readonly confetti: Confetti;

  constructor() {
    this.confetti = createConfetti(
      null as any,
      { resize: true, useWorker: true } as any,
    );
  }

  start(duration: number = 15 * 1000): Promise<void> {
    const animationEnd = Date.now() + duration;
    const runner = new ConfettiRunner(this.confetti, animationEnd);
    return runner.run();
  }
}

class ConfettiRunner {
  constructor(
    private readonly confetti: Confetti,
    private readonly endTime: number,
  ) {}

  run(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.nextFrame(resolve);
    });
  }

  private nextFrame(resolver: () => void) {
    this.confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    this.confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < this.endTime) {
      requestAnimationFrame(() => this.nextFrame(resolver));
    } else {
      resolver();
    }
  }
}

const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

container.register(ConfettiMaker, () => new ConfettiMaker());
