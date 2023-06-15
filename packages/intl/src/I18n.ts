import pupa from 'pupa';
import { DynamicWord } from './DynamicWord';
import type { DictKey, I18nInterface } from './defs';

export type DictJsonType = Record<string, string | Record<string, string | Record<string, string | Record<string, string | Record<string, string>>>>>;

// 拍平多層詞典
function flattenDict(dict: DictJsonType, prefix = ''): Record<string, string> {
  return Object.keys(dict).reduce<Record<string, string>>((map, key) => {
    const value = dict[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      return { ...map, [path]: value };
    }
    return { ...map, ...flattenDict(value, path) };
  }, {});
}

export class I18n<K extends string = string, D extends DictJsonType = DictJsonType> implements I18nInterface {
  private readonly dictionaries: Record<K, Record<string, string>>;
  private locale?: K;

  constructor(dict: Record<K, D> = {} as Record<K, D>, locale?: K) {
    // 拍平多層詞典
    this.dictionaries = Object.keys(dict).reduce((map, key) => {
      const value = dict[key];
      return { ...map, [key]: flattenDict(value) };
    }, {}) as Record<K, Record<string, string>>;
    if (locale) {
      this.setLocale(locale);
    } else if (Object.keys(this.dictionaries).length) {
      this.setLocale(Object.keys(this.dictionaries)[0] as K);
    }
  }

  setLocale(locale: K) {
    this.locale = locale;
  }

  getLocale() {
    return this.locale;
  }

  staticTranslate(key: DictKey<D>, args: Record<string, any> = {}) {
    const dict = this.dictionaries[this.locale!];
    if (!dict) return key;
    const v = dict[key];
    if (typeof v === 'string') {
      return pupa(v, args);
    }
    return key;
  }

  translate(key: DictKey<D>, args?: Record<string, any>) {
    const word = new DynamicWord(this, key, args);
    return word;
  }

  t(key: DictKey<D>, args?: Record<string, any>) {
    return this.translate(key, args);
  }
}
