# 她她静态项目集合

## 项目说明
> 她她静态项目集合

## 项目的技术栈

## 安装

## 版本管理
#### Git
> 下载地址： [https://git-scm.com/downloads](https://git-scm.com/downloads)

> 如果你不会命令行操作，可以使用相关软件：

> Mac 下使用 [Sourcetree](https://www.sourcetreeapp.com/download-archives)
> Windows 下使用 [TortoiseGIT](https://tortoisegit.org/download/)

#### 版本仓库地址
> `git@github.com:monkey01127/sheshe.git`

命令行操作示例：

```bash
git clone -b develop-2.0 git@github.com:monkey01127/sheshe.git
cd sheshe
```

#### 版本管理忽略文件列表
```
logs/
.vscode/
.cache/
.git/
.svn/
npm-debug.log
Thumbs.db
```

#### 版本管理目录结构
```
.
|——

├── develop-x.x               开发分支（固定）
├── test-x.x                  测试分支（固定）
├── fixbug-x.x                问题修复（若干)
├── feature-x.x               功能开发（若干)
└── master                    主干
```

#### 版本管理开发流程
> 根据不同版本提交到相关开发分支，例如 2.0 版本提交到 develop-2.0

## 项目开发事项
> 开发接口信息在 `package.json`->`config` 中修改
> 线上接口信息在 `config.*.json` 中修改
> 应用配置信息在 `nuxt.config.js` 中修改

## 项目代码风格

#### 变量和方法命名规则

- 使用小驼峰式命名法（camelCase），允许字母和数字，第一个字符不能是数字，首字母小写，动词在前。
- 命名要遵循编程语言规范
- 命名只能是字母(a-z A-Z)，数字(0-9)，下划线(_)的组合，并且之间不能包含空格，数字不能放在变量名首位。
- 命名不能使用编程语言的保留字
- 命名要使用英文，不要使用中文或者拼音形式的变量名
- 命名要使用有意义的名称，通过变量名能大概反映出其具体的用途
- 命名不要使用太长的名称，例如50个字符，影响阅读
- 方法名要以动词开始，例如addUser、deleteUser
- 在相关业务代码中保持命名规则的一致性

规范的动词：

```text
can    是否可执行
has    是否含有
is     是否为
get    获取
set    设置
del    删除
post   提交
load   加载
```

## 项目结构
```
.
├── README.md                   帮助文件
├── css                         样式文件
├── img                         图片文件
└── page                        页面
```

> *h5活动页*
  * 投稿： appoint_article
  * 元旦、圣诞新年活动： christmas_new_year_activity
  * 栏目-民宿支付页：column_details
  * 栏目-活动分享：column_details_share
  * 双12活动：double12_activity
  * 520活动：five20_activity
  * 214活动：lover_activity
  * 树洞心情：mood_edit
  * 举报页：report_complain
  * 申请主播：sheshe_applyhost
  * app下载页：sheshe_download_page
  * 华尔街英语测评：speech_test


> *微信公众号*
  * 华尔街英语测评：speech_test
  * 她豆微信充值：weinxin_pay


> *echarts图表*
  * echart_sample_html

## 项目注意事项
- 不要上传不相关的文件和文件夹，请使用 svn ignore 进行设置
- 不要直接上传配置文件，采用替换
- 工作目录要及时更新，不要和SVN服务器有太大的差别
- 提交代码时，如果出现冲突，必须仔细分析解决，==不可以强行提交==
- 提交代码之前先在本地进行测试，确保项目能编译通过，==且能够正常运行，不可盲目提交==
- 必须保证SVN上的版本是正确的，==项目有错误时，不要进行提交==
- ==提交之前先更新==
- 提交时注意不要提交本地自动生成的文件
- ==提交必须写注释==
- 对提交的信息采用明晰的标注（写注释）
  - 使用前缀注释标示，标示后面保留一个空格
  - A 新增
  - M 修改
  - D 删除

注释示例：

```text
[A] 增加 xxx
[M] 更新 xxx
[M] 修改 xxx
[D] 删除 xxx
```

## 项目学习文档
- [ECharts教程](https://echarts.baidu.com/tutorial.html)
