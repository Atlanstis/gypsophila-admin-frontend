import { watch, onMounted } from 'vue';
import type { GlobalThemeOverrides } from 'naive-ui';
import { kebabCase } from 'lodash-es';
import { useThemeStore } from '../modules';

export default function subscribeThemeStore() {
  const theme = useThemeStore();

  /** 监听naiveUI themeOverrides */
  const subscribeThemeOverrides = watch(
    () => theme.naiveThemeOverrides,
    (newValue) => {
      if (newValue.common) {
        addThemeCssVarsToHtml(newValue.common);
      }
    },
    { immediate: true },
  );
  onMounted(() => {
    subscribeThemeOverrides();
  });
}

type ThemeVars = Exclude<GlobalThemeOverrides['common'], undefined>;
type ThemeVarsKeys = keyof ThemeVars;

/** 添加css vars至html */
function addThemeCssVarsToHtml(themeVars: ThemeVars) {
  const keys = Object.keys(themeVars) as ThemeVarsKeys[];
  const style: string[] = [];
  keys.forEach((key) => {
    style.push(`--${kebabCase(key)}: ${themeVars[key]}`);
  });
  const styleStr = style.join(';');
  document.documentElement.style.cssText += styleStr;
}
