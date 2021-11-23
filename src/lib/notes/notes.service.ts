import { container } from "$lib/container";
import type { Note } from "./models";
import { NOTES } from "./notes.definition";

export class NotesService {
  private readonly gainNode: GainNode;
  private sourceAudioNode: OscillatorNode | null = null;

  private isSoundPlaying = false;

  private stopTimeoutID: NodeJS.Timeout | null = null;

  constructor(private readonly context: AudioContext) {
    this.gainNode = this.context.createGain();
    this.gainNode.gain.value = 0.3;
    this.gainNode.connect(this.context.destination);
  }

  playNote(noteName: string, duration = 500): void {
    if (this.isSoundPlaying && this.sourceAudioNode) {
      this.sourceAudioNode.stop();
      if (this.stopTimeoutID) {
        clearTimeout(this.stopTimeoutID);
      }
    }
    const frequency = this.getFrequencyForNote(noteName);
    this.sourceAudioNode = this.context.createOscillator();
    this.sourceAudioNode.frequency.value = frequency;
    this.sourceAudioNode.connect(this.gainNode);
    this.sourceAudioNode.start();
    this.stopTimeoutID = setTimeout(() => {
      this.sourceAudioNode?.stop();
      this.stopTimeoutID = null;
      this.isSoundPlaying = false;
    }, duration);

    this.isSoundPlaying = true;
  }

  private getNoteForName(noteName: string): Note {
    const applicableNote = NOTES.find((note: Note) => {
      return note.name === noteName;
    });
    if (!applicableNote) {
      throw new Error(`Cannot find note "${noteName}"`);
    }
    return applicableNote;
  }

  private getFrequencyForNote(noteName: string): number {
    const note = this.getNoteForName(noteName);
    return note.frequency;
  }
}

const AudioContextToken = Symbol("AudioContextToken");

container.register(AudioContextToken, ()=> {
  return new AudioContext()
})

container.register(
  NotesService,
  (c) => new NotesService(c.resolve<AudioContext>(AudioContextToken)),
);
