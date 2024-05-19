export class NeverError extends Error {
  constructor(x: never) {
    super("Variable fell outside of known typing");
  }
}
