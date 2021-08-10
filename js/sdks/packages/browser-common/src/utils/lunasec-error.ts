export interface LunaSecErrorProperties {
  name: string;
  message: string;
  code: number;
}

export class LunaSecError extends Error implements LunaSecErrorProperties {
  name: string;
  message: string;
  code: number;

  constructor(e: LunaSecErrorProperties) {
    super(e.name);
    this.name = e.name;
    this.message = e.message;
    this.code = e.code;
  }

  toJSON(): LunaSecErrorProperties {
    return { name: this.name, message: this.message, code: this.code };
  }

  toString() {
    return this.message;
  }
}
