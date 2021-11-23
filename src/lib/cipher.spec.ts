import { CaesarShiftCipher, VigenereCipher } from "./cipher";

describe("Ciphers", () => {
  const pangram = "Sphinx of black quartz, judge my vow!";

  describe("CaesarShiftCipher", () => {
    it("should encipher an all upper-case word", () => {
      expect(new CaesarShiftCipher(5).encipher("CIPHER")).toEqual("HNUMJW");
      expect(new CaesarShiftCipher(25).encipher("AMZ")).toEqual("ZLY");
    });

    it("should encipher an all lower-case word", () => {
      expect(new CaesarShiftCipher(5).encipher("cipher")).toEqual("HNUMJW");
      expect(new CaesarShiftCipher(25).encipher("amz")).toEqual("ZLY");
    });

    it("should encipher strings with non-alphabetic characters", () => {
      expect(new CaesarShiftCipher(13).encipher(pangram)).toEqual(
        "FCUVAK BS OYNPX DHNEGM, WHQTR ZL IBJ!",
      );
    });

    it("should decipher an all upper-case word", () => {
      expect(new CaesarShiftCipher(5).decipher("HNUMJW")).toEqual("CIPHER");
      expect(new CaesarShiftCipher(25).decipher("ZLY")).toEqual("AMZ");
    });

    it("should decipher an all lower-case word", () => {
      expect(new CaesarShiftCipher(5).decipher("hnumjw")).toEqual("CIPHER");
      expect(new CaesarShiftCipher(25).decipher("zly")).toEqual("AMZ");
    });

    it("should decipher strings with non-alphabetic characters", () => {
      expect(
        new CaesarShiftCipher(13).decipher(
          "FCUVAK BS OYNPX DHNEGM, WHQTR ZL IBJ!",
        ),
      ).toEqual(pangram.toUpperCase());
    });

    it("should reject a shift less than 0", () => {
      expect(() => {
        new CaesarShiftCipher(-1);
      }).toThrowError("shift must in the range 0-25 inclusive");
    });

    it("should reject a shift greater than 25", () => {
      expect(() => {
        new CaesarShiftCipher(26);
      }).toThrowError("shift must in the range 0-25 inclusive");
    });
  });

  describe("VigenereCipher", () => {
    it("should encipher an all upper-case word", () => {
      expect(new VigenereCipher("LEMON").encipher("ATTACK")).toEqual("LXFOPV");
    });

    it("should encipher an all lower-case word", () => {
      expect(new VigenereCipher("lemon").encipher("attack")).toEqual("LXFOPV");
    });

    it("should decipher an all upper-case word", () => {
      expect(new VigenereCipher("LEMON").decipher("LXFOPV")).toEqual("ATTACK");
    });

    it("should decipher an all lower-case word", () => {
      expect(new VigenereCipher("lemon").decipher("lxfopv")).toEqual("ATTACK");
    });

    it("should encipher non-alphabetic characters", () => {
      expect(new VigenereCipher("THEKEY").encipher(pangram)).toEqual(
        "LWLSRV VJ FJTJO USTYXJ, CBHQI FF FSU!",
      );
    });

    it("should decipher non-alphabetic characters", () => {
      expect(
        new VigenereCipher("THEKEY").decipher(
          "LWLSRV VJ FJTJO USTYXJ, CBHQI FF FSU!",
        ),
      ).toEqual(pangram.toUpperCase());
    });

    it("should not allow empty keys", () => {
      expect(() => new VigenereCipher("")).toThrowError(
        "Key must contain only letters!",
      );
    });

    it("should not allow non-alphabetic keys", () => {
      expect(() => new VigenereCipher("123!")).toThrowError(
        "Key must contain only letters!",
      );
    });
  });
});
