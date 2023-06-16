export type DictKey<T extends object, K extends keyof T = keyof T> = K extends string ? (T[K] extends object ? `${K}.${DictKey<T[K]>}` : `${K}`) : '';

export interface I18nInterface {
  getLocale(): string | undefined;

  translate(key: string, args?: Record<string, any>): string;

  staticTranslate(key: string, args?: Record<string, any>): string;
}
