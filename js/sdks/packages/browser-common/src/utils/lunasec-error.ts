export interface LunaSecErrorProperties {
  name: string;
  message: string;
  code: string;
}

export class LunaSecError extends Error implements LunaSecErrorProperties {
  name: string;
  message: string;
  code: string;

  constructor(e: LunaSecErrorProperties | Error) {
    super(e.name);
    this.name = e.name;
    this.message = e.message;
    if ('code' in e) {
      this.code = e.code;
      return;
    }
    this.code = '500';
  }

  toJSON(): LunaSecErrorProperties {
    return { name: this.name, message: this.message, code: this.code };
  }

  toString() {
    return this.message;
  }
}
