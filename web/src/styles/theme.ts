// src/styles/theme.ts
export const theme = {
  colors: {
    // 融合原设计的深青色与我们的企业蓝
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // 我们的主蓝
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    // 使用Zendesk范例的深青色作为侧边栏和强调色
    sidebar: {
      DEFAULT: '#03363D', // bg-teal-900
      light: '#0c4a4f',
      accent: '#78a300', // hover:border-green-500
    },
    // ... 保留其他 neutral, secondary 等定义
  },
  // ... shadows, borderRadius 等
}