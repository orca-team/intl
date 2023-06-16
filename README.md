# I18n 国际化解决方案

轻量化的应用级国际化解决方案

## 使用方式

```ts
import I18n, { createUseI18n } from '@orca-fe/intl';
import zhCN from './zh-CN';
import enUS from './en-US';

// 初始化
const i18n = new I18n(
  {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
  'zh-MO',
);

// 获取国际化文案
i18n.t('hello');

// 获取国际化文案并替换变量
i18n.t('hello', { name: 'world' });

// 获取当前语言
i18n.getLocale();

// 设置当前语言
i18n.setLocale('en-US');

// 获取可用语言
i18n.getAvailableLocales();
```

### 在 React 中使用

```tsx
import React from 'react';
import I18n, { createUseI18n } from '@orca-fe/intl';
import zhCN from './zh-CN';
import enUS from './en-US';

// 初始化
const i18n = new I18n(
  {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
  'zh-MO',
);

// 创建 useI18n hook
const useI18n = createUseI18n(i18n);

// 使用
const App = () => {
  const [t, locale, setLocale] = useI18n();

  return (
    <div>
      <div>{t('hello')}</div>
      <div>{t('hello', { name: 'world' })}</div>
      <div>{locale}</div>
      <button onClick={() => setLocale('en-US')}>切换语言</button>
    </div>
  );
};
```
