# AI Alpha Dashboard - GitHub Pages 部署版

财报事件驱动的量化信息系统仪表盘 · 一键部署到 GitHub Pages

## 这是什么

一个 React 网页应用，包含两个 Tab：
- **Picks & Shovels** — 美股+A股硬件链 19 只标的，按 capex 传导直接性打分
- **S2 Tracker** — 美股 AI 应用层 8 只标的，按 1→10 阶段判定

部署到 GitHub Pages 后，会得到一个公开网址（手机也能访问）：
`https://你的GitHub用户名.github.io/仓库名/`

## 部署步骤

### 1. 创建 GitHub 仓库
- 登录 https://github.com
- 右上角 **+** → **New repository**
- 名称随便取（推荐 `ai-alpha-dashboard`）
- 必须勾 **Public**
- 不勾选 README/.gitignore/license
- 点 **Create repository**

### 2. 上传代码
打开终端（Mac）或 Git Bash（Windows），cd 到这个项目根目录后执行：

```bash
git init
git branch -M main
git add .
git commit -m "initial commit"

# 把下面的 USERNAME 和 REPO 改成你的
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

### 3. 启用 GitHub Pages
- 打开你的仓库页面
- 上方点 **Settings**
- 左侧菜单点 **Pages**
- **Source** 下拉选 **GitHub Actions**
- 不需要点 Save，自动保存

### 4. 等待部署
- 上方点 **Actions** 标签
- 看到 "Deploy to GitHub Pages" 在跑（黄圈表示进行中）
- 等 1-2 分钟变成绿勾
- 部署成功后，回到 Settings → Pages
- 顶部会显示你的网址：`https://USERNAME.github.io/REPO/`

### 5. 访问
点开那个链接，仪表盘就在线了。任何设备只要能访问 GitHub 都能看。

## 修改数据

打开 `src/IntegratedDashboard.jsx`，搜索 "金盘科技" 或任何股票名，能看到 stocks 数组。
直接编辑数据，然后：

```bash
git add .
git commit -m "update stocks"
git push
```

GitHub Action 会自动重新部署，1-2 分钟后网站更新。

## 本地预览（可选）

如果你想在推送前先在本地看看效果，需要装 Node.js (https://nodejs.org)，然后：

```bash
npm install
npm run dev
```

打开 http://localhost:5173/ 查看。

## 故障排查

| 问题 | 解决 |
|---|---|
| Action 部署失败 | 检查 Settings → Pages 是否选了 "GitHub Actions" 而不是 "Deploy from a branch" |
| 网站显示 404 | 仓库必须是 Public, 私有仓库需要 GitHub Pro |
| 网站打开但页面空白 | 按 F12 看控制台错误, 多半是 base path 问题, 仓库名不要含特殊字符 |
| 推送失败 authentication failed | 用 Personal Access Token, 不能用密码 |
