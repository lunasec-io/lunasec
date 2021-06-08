export class SecureResolverCallError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.name = SecureResolverCallError.name; // stack traces display correctly now
  }
}
