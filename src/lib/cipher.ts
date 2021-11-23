const A_CODE_POINT = "A".charCodeAt(0);

abstract class BaseCipher {
  protected readonly knownChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  encipher(value: string): string {
    const charsEnciphered = value
      .toUpperCase()
      .split("")
      .map((char, pos) => {
        if (this.knownChars.includes(char)) {
          return this.encipherChar(char, pos);
        } else {
          return char;
        }
      });
    return charsEnciphered.join("");
  }

  decipher(value: string): string {
    const charsDeciphered = value
      .toUpperCase()
      .split("")
      .map((char, pos) => {
        if (this.knownChars.includes(char)) {
          return this.decipherChar(char, pos);
        } else {
          return char;
        }
      });
    return charsDeciphered.join("");
  }

  abstract encipherChar(char: string, pos: number): string;
  abstract decipherChar(char: string, pos: number): string;
}

export class CaesarShiftCipher extends BaseCipher {
  constructor(private readonly shift: number) {
    super();
    if (shift < 0 || 25 < shift) {
      throw new Error("shift must in the range 0-25 inclusive");
    }
  }

  encipherChar(char: string, pos: number): string {
    return String.fromCharCode(
      A_CODE_POINT +
        ((char.charCodeAt(0) + this.shift - A_CODE_POINT) %
          this.knownChars.length),
    );
  }

  decipherChar(char: string, pos: number): string {
    return String.fromCharCode(
      A_CODE_POINT +
        ((char.charCodeAt(0) - this.shift + A_CODE_POINT) %
          this.knownChars.length),
    );
  }
}

export class VigenereCipher extends BaseCipher {
  private readonly key: string;

  constructor(key: string) {
    super();
    if (!/^[a-zA-Z]+$/.test(key)) {
      throw new Error("Key must contain only letters!");
    }
    this.key = key.toUpperCase();
  }

  encipherChar(char: string, pos: number): string {
    const shift = this.getShiftForPosition(pos);
    if (!shift) {
      return char;
    } else {
      const caesarShiftCipher = new CaesarShiftCipher(shift);
      return caesarShiftCipher.encipherChar(char, pos);
    }
  }

  decipherChar(char: string, pos: number): string {
    const shift = this.getShiftForPosition(pos);
    if (!shift) {
      return char;
    } else {
      const caesarShiftCipher = new CaesarShiftCipher(shift);
      return caesarShiftCipher.decipherChar(char, pos);
    }
  }

  private getShiftForPosition(pos: number): number {
    const index = pos % this.key.length;
    const char = this.key.slice(index, index + 1);
    return char.charCodeAt(0) - A_CODE_POINT;
  }
}
