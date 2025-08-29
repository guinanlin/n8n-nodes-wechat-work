# n8n-nodes-dty-work-wechat

[![npm version](https://badge.fury.io/js/n8n-nodes-dty-work-wechat.svg)](https://badge.fury.io/js/n8n-nodes-dty-work-wechat)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-dty-work-wechat.svg)](https://www.npmjs.com/package/n8n-nodes-dty-work-wechat)

企业微信 (WeChat Work) 节点 for n8n

## 安装

```bash
# 使用 npm
npm install n8n-nodes-dty-work-wechat

# 使用 pnpm (推荐)
pnpm add n8n-nodes-dty-work-wechat

# 使用 yarn
yarn add n8n-nodes-dty-work-wechat
```

## 在n8n中使用

### 1. 安装节点
在你的n8n项目中安装此包：
```bash
npm install n8n-nodes-dty-work-wechat
```

### 2. 重启n8n服务
安装完成后，重启n8n服务以加载新节点。

### 3. 配置企业微信凭证
1. 在n8n中创建新的工作流
2. 添加"企业微信"节点
3. 点击"创建新凭证"
4. 填写以下信息：
   - **Base URL**: `qyapi.weixin.qq.com`
   - **Corpid**: 你的企业ID
   - **Corpsecret**: 应用的凭证密钥

### 4. 使用节点功能
安装后，你可以在n8n节点库中找到"企业微信"节点，支持以下功能：

#### 应用群聊
- 创建群聊会话
- 获取群聊会话信息
- 发送群聊消息
- 修改群聊会话

#### 部门管理
- 创建、删除、更新部门
- 获取子部门列表

#### 用户管理
- 创建、删除、更新用户
- 批量操作用户
- 获取用户信息

#### 消息推送
- 发送应用消息
- 撤回消息
- 更新模板卡片

#### 媒体管理
- 上传图片和文件
- 获取临时素材

### 5. 示例工作流
```
触发节点 → 企业微信节点 → 后续处理
```

### 6. 获取企业微信配置
- 企业ID (Corpid): 在[企业微信管理后台](https://work.weixin.qq.com/wework_admin/)获取
- 应用密钥 (Corpsecret): 在应用管理页面获取

## 功能特性

### 应用群聊
- 创建群聊会话
- 获取群聊会话
- 发送群聊消息
- 修改群聊会话

### 部门管理
- 创建部门
- 删除部门
- 获取子部门ID列表
- 更新部门

### 媒体管理
- 获取临时素材
- 上传图片
- 上传临时素材

### 消息推送
- 撤回消息
- 发送应用消息
- 更新模版卡片消息

### 用户管理
- 批量删除成员
- userid转openid
- 创建成员
- 删除成员
- 获取加入企业二维码
- 读取成员
- 通过邮箱获取用户ID
- 通过手机号获取用户ID
- 邀请成员
- 获取成员ID列表
- 更新成员

## 版本信息

- **当前版本**: 0.2.4
- **发布日期**: 2024年12月
- **包大小**: 59.3 kB
- **支持n8n版本**: 1.48.0+

## 作者

- **主要作者**: goodhawk (guinan.lin@foxmail.com)
- **贡献者**: blowsnow (im.blowsnow@gmail.com)

## 许可证

MIT License

## 开发

### 环境要求
- Node.js >= 18.10
- pnpm >= 9.1

### 安装依赖
```bash
pnpm install
```

### 构建项目
```bash
pnpm run build
```

### 开发模式
```bash
pnpm run dev
```

### 代码检查
```bash
pnpm run lint
```

### 代码格式化
```bash
pnpm run format
```

## 发布

### 发布前准备
1. 确保已登录npm账号
```bash
pnpm login
```

2. 检查包是否可用（预览发布内容）
```bash
pnpm publish --dry-run --no-git-checks
```

### 发布到npm仓库
```bash
# 发布到npm官方registry
pnpm publish --no-git-checks

# 或者发布为公开包
pnpm publish --access public --no-git-checks
```

### 发布检查清单
- ✅ 包名唯一性检查
- ✅ 版本号更新
- ✅ 构建成功 (`pnpm run build`)
- ✅ 代码检查通过 (`pnpm run lint`)
- ✅ 测试通过
- ✅ README.md更新

### 版本管理
```bash
# 更新版本号
pnpm version patch  # 0.2.4 -> 0.2.5
pnpm version minor  # 0.2.4 -> 0.3.0
pnpm version major  # 0.2.4 -> 1.0.0
```

---

## Features
## Apply Group Chat
- Creating a Group Chat Session
- Get Group Chat Session
- Sending Group Chat Messages
- Modifying a Group Chat Session
## Department management
- Creating Departments
- Deleting Departments
- Get list of sub-department IDs
- Updating Departments
## Media Management
- Getting Temporary Material
- Upload Image
- Upload Temporary Clip
## Message Push
- Withdrawing a Message
- Sending an application message
- Updating a template card message
## User Management
- Batch Delete Members
- userid to openid
- Creating Members
- Delete Member
- Get QR code for joining company
- Read members
- Get userid from e-mail
- Get user ID by cell phone number
- Invite members
- Get member ID list
- Update members

# 功能
## 应用群聊
- 创建群聊会话
- 获取群聊会话
- 发送群聊消息
- 修改群聊会话
## 部门管理
- 创建部门
- 删除部门
- 获取子部门ID列表
- 更新部门
## 媒体管理
- 获取临时素材
- 上传图片
- 上传临时素材
## 消息推送
- 撤回消息
- 发送应用消息
- 更新模版卡片消息
## 用户管理
- 批量删除成员
- userid转openid
- 创建成员
- 删除成员
- 获取加入企业二维码
- 读取成员
- 通过邮箱获取用户ID
- 通过手机号获取用户ID
- 邀请成员
- 获取成员ID列表
- 更新成员




