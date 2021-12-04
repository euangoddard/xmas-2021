import { mock } from "../__tests__/mock";
import type { NotesService } from "./notes.service";
import { Duration } from "./notes.service";

import { Sequencer } from "./sequencer";

describe("Sequencer", () => {
  const sequencer = new Sequencer();
  sequencer
    .addNote("C4", Duration.Crotchet, 100)
    .addNote("G8", Duration.Quaver, 0);

  const notesService = mock<NotesService>({
    playNote: jest.fn(),
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should add notes", () => {
    expect((sequencer as any)["notes"]).toEqual([
      {
        duration: Duration.Crotchet,
        noteName: "C4",
        pause: 100,
      },
      {
        duration: Duration.Quaver,
        noteName: "G8",
        pause: 0,
      },
    ]);
  });

  it("should play the notes in order with pauses", (done) => {
    jest.useFakeTimers();
    sequencer.play(notesService).then(() => done());

    expect(notesService.playNote).toHaveBeenCalledWith("C4", Duration.Crotchet);

    jest.advanceTimersByTime(100);
    expect(notesService.playNote).toHaveBeenLastCalledWith(
      "G8",
      Duration.Quaver,
    );
  });
});
