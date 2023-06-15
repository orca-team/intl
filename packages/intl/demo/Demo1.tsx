import I18n, { createUseI18n } from '@orca-fe/intl';
import { Button } from 'antd';

const i18n = new I18n({
  'zh-CN': {
    hello: '你好',
    world: '世界',
    user: {
      info: '用户信息',
      label: '姓名：{name}',
    },
  },
  'en-US': {
    hello: 'hello',
    world: 'world',
    user: {
      info: 'user info',
      label: 'name: {name}',
    },
  },
});

const hello = i18n.t('hello');

const useI18n = createUseI18n(i18n);

export default () => {
  const [t, , setLocale] = useI18n();

  return (
    <div>
      <div>{hello}</div>
      <div>{i18n.t('world')}</div>
      <div>{i18n.t('hello')}</div>
      <div>{t('hello')}</div>
      <div>{t('user.info')}</div>
      <div>{i18n.t('user.info')}</div>
      <div>{t('user.label', { name: '张三' })}</div>
      <div>{i18n.t('user.label', { name: '李四' })}</div>
      <Button
        onClick={() => {
          setLocale('zh-CN');
        }}
      >
        zh-CN
      </Button>
      <Button
        onClick={() => {
          setLocale('en-US');
        }}
      >
        en-US
      </Button>
    </div>
  );
};
