# 排班助手 - Scheduling Assistant

一个现代化的员工排班管理系统，专为医院、诊所、企业等需要排班管理的场景设计。

## 🚀 功能特性

- 📅 **排班管理**：可视化排班表，支持早班、中班、晚班、休息四种班次
- 👥 **员工管理**：员工信息管理，包括姓名、职位、部门、联系方式
- 📊 **数据统计**：实时显示员工总数、今日排班、各时段人数等统计信息
- 🎯 **智能排班**：支持按日期、班次、员工进行排班
- 📱 **响应式设计**：适配桌面和移动设备

## 🛠 技术栈

- **前端**：React 19 + TypeScript + Vite
- **UI框架**：Ant Design 5.x
- **构建工具**：Vite
- **部署**：Vercel / Netlify

## 📦 安装与运行

### 前置要求
- Node.js 18+ 或更高版本
- npm 或 yarn 包管理器

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 开发环境运行
```bash
npm run dev
# 或
yarn dev
```

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 预览生产版本
```bash
npm run preview
# 或
yarn preview
```

## 🏗 项目结构

```
scheduling-assistant/
├── src/
│   ├── App.tsx          # 主应用组件
│   ├── App.css          # 应用样式
│   ├── main.tsx         # 应用入口
│   └── index.css        # 全局样式
├── public/              # 静态资源
├── package.json         # 项目依赖配置
├── vite.config.ts       # Vite配置
├── tsconfig.json        # TypeScript配置
└── README.md            # 项目说明
```

## 🔧 使用说明

1. **员工管理**
   - 在"员工管理"页面查看所有员工信息
   - 可以添加、编辑、删除员工信息

2. **排班管理**
   - 在主页点击"新增排班"按钮创建新排班
   - 选择员工、日期、班次类型
   - 可以编辑已有排班信息

3. **数据统计**
   - 首页顶部显示实时统计数据
   - 包括总员工数、今日排班数、各时段人数等

## 📱 部署

### Vercel 部署（推荐）
1. 将项目推送到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 导入 GitHub 仓库
4. 自动部署完成

### Netlify 部署
1. 将项目推送到 GitHub
2. 访问 [Netlify](https://www.netlify.com)
3. 选择 "New site from Git"
4. 选择 GitHub 仓库并部署

## 🎨 自定义配置

### 修改主题
在 `src/App.css` 中修改 CSS 变量来自定义主题颜色：

```css
:root {
  --primary-color: #1890ff;
  --secondary-color: #40a9ff;
  --background-color: #f5f5f5;
}
```

### 添加新功能
1. 在 `src/App.tsx` 中添加新的组件
2. 在 `src/App.css` 中添加对应的样式
3. 更新路由配置（如需）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👥 作者

- **fengyiwei992-cyber** - 项目创建者

## 🙏 致谢

- [Ant Design](https://ant.design) - 优秀的 React UI 组件库
- [Vite](https://vitejs.dev) - 快速的前端构建工具
- [React](https://reactjs.org) - 用于构建用户界面的 JavaScript 库

---

**💡 提示**：这是一个基础版本，可以根据实际需求扩展更多功能，如排班冲突检测、自动排班算法、导出报表等功能。