import theme from '@nuxt/content-theme-docs'

export default theme({
  loading: { color: '#00CD81' },
  i18n: {
    locales: () => [{
      code: 'zh',
      iso: 'zh-CN',
      file: 'zh-CN.js',
      name: '中文'
    }],
    defaultLocale: 'zh'
  }
})
