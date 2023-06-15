import { useEffect, useMemo, useRef, useState } from 'react';
import { EventEmitter } from 'events';
import type { I18n } from './I18n';

type noop = (...args: any[]) => any;

function useMemorizedFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);

  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<T>();
  if (!memoizedFn.current) {
    memoizedFn.current = function (...args) {
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      return fnRef.current.apply(this, args);
    } as T;
  }

  return memoizedFn.current;
}

export function createUseI18n(i18n: I18n) {
  const events = new EventEmitter();

  return function useIntl() {
    const [locale, setLocale] = useState(i18n.getLocale());

    const translate = useMemorizedFn((key: string, args?: Record<string, any>) => i18n.staticTranslate(key, args));

    const changeLocale = useMemorizedFn((locale: string) => {
      i18n.setLocale(locale);
      events.emit('change', locale);
    });

    useEffect(() => {
      events.on('change', setLocale);
      return () => {
        events.off('change', setLocale);
      };
    }, []);

    return [translate, locale, changeLocale] as const;
  };
}
