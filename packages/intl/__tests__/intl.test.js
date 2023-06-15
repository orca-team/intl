'use strict';

const I18n = require('../src').default;

describe('@orca-fe/demo-comp', () => {
  it('Basic', () => {
    expect(I18n).toBeTruthy();
    const i18n = new I18n(
      {
        'zh-CN': {
          hello: '你好',
        },
        'en-US': {
          hello: 'hello',
        },
      },
      'zh-CN',
    );

    expect(`${i18n.t('hello')}`).toBe('你好');
    expect(i18n.getLocale()).toBe('zh-CN');
    i18n.setLocale('en-US');
    expect(`${i18n.t('hello')}`).toBe('hello');
    expect(i18n.getLocale()).toBe('en-US');
  });
  it('Nest', () => {
    expect(I18n).toBeTruthy();
    const i18n = new I18n(
      {
        'zh-CN': {
          user: {
            info: '用户信息',
            name: '姓名: {name}',
          },
        },
        'en-US': {
          user: {
            info: 'user info',
            name: 'name: {name}',
          },
        },
      },
      'en-US',
    );
    expect(`${i18n.t('user.info')}`).toBe('user info');
    expect(`${i18n.t('user.name', { name: 'orca' })}`).toBe('name: orca');
    i18n.setLocale('zh-CN');
    expect(`${i18n.t('user.info')}`).toBe('用户信息');
    expect(`${i18n.t('user.name', { name: 'orca' })}`).toBe('姓名: orca');
  });
});
