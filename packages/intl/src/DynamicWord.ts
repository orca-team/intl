import type { I18nInterface } from './defs';

/**
 * 多語言單詞
 */
export class DynamicWord extends String {
  protected i18n: I18nInterface;
  protected key: string;
  protected args: Record<string, any>;

  constructor(i18n: I18nInterface, key: string, args: Record<string, any> = {}) {
    super('');
    this.i18n = i18n;
    this.key = key;
    this.args = args;
  }

  toLocaleLowerCase(locales?: string | string[] | undefined): string {
    return this.valueOf().toLocaleLowerCase(locales);
  }

  toLocaleUpperCase(locales?: string | string[] | undefined): string {
    return this.valueOf().toLocaleUpperCase(locales);
  }

  toLowerCase(): string {
    return this.valueOf().toLowerCase();
  }

  toUpperCase(): string {
    return this.valueOf().toUpperCase();
  }

  toString() {
    return this.valueOf();
  }

  valueOf() {
    return this.i18n.staticTranslate(this.key, this.args);
  }
}
