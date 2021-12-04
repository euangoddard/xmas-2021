import type { Duration, NotesService } from "$lib/notes/notes.service";

interface SequencedNote {
  noteName: string;
  duration: Duration;
  pause: number;
}

export class Sequencer {
  private readonly notes: SequencedNote[] = [];

  addNote(noteName: string, duration: Duration, pause: number): Sequencer {
    this.notes.push({ noteName, duration, pause });
    return this;
  }

  async play(notesService: NotesService): Promise<void> {
    for (const { noteName, duration, pause } of this.notes) {
      notesService.playNote(noteName, duration);
      if (pause) {
        await delay(pause);
      }
    }
  }
}

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
