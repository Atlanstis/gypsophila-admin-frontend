/** 主题相关类型 */
declare namespace Theme {
  /** 主题配置 */
  interface Setting {
    /** 主题颜色 */
    themeColor: string;
    /** 其他主题颜色 */
    otherColor: OtherColor;
    /** 头部样式 */
    header: Header;
    /** 侧边栏样式 */
    sider: Sider;
    /** 标签页样式 */
    tab: Tab;
  }

  /** 其他主题颜色 */
  interface OtherColor {
    /** 信息 */
    info: string;
    /** 成功 */
    success: string;
    /** 警告 */
    warning: string;
    /** 错误 */
    error: string;
  }

  /** 头部样式 */
  interface Header {
    /** 头部高度 */
    height: number;
  }

  /** 侧边栏样式 */
  interface Sider {
    /** 侧边栏宽度 */
    width: number;
    /** 侧边栏折叠时的宽度 */
    collapsedWidth: number;
    /** 菜单每级的缩进 */
    indent: number;
  }

  /** 标签样式 */
  export interface Tab {
    /** 标签高度 */
    height: number;
  }
}

declare namespace App {
  /** 菜单项配置 */
  type AdminMenuOption = import('naive-ui').MenuOption & {
    key: string;
    label: string;
    routeName: string;
    routePath: string;
    icon?: () => import('vue').VNodeChild;
    children?: AdminMenuOption[];
  };

  /** 面包屑 */
  type AdminBreadcrumb = import('naive-ui').DropdownOption & {
    key: string;
    label: string;
    routeName: string;
    hasChildren: boolean;
    children?: GlobalBreadcrumb[];
  };
}
