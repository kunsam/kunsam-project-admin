export interface Project {
  key: string;
  name: string;
  desc: string; // 简要描述
  website?: string;
  tags?: string[];
  github?: string;
  npm?: string;
  photos?: string[]; // 照片
  doc?: string; // url 文档链接
  creat_at: string; // YYYY-MM-DD
  localPath?: string; // 本地项目路径
  emphasisDegree?: number; // 1~5重试程度
  estimateTimeConsumption?: string; // Day 预估开发已消耗的天数
  achievements?: string[]; // 成就标签
  authorComment?: string; // 作者评述
  articles?: { name: string; link: string }[]; // 相关文章链接
  prototype?: string; // 原型链接 包括todo 我的就用Notion的形式好了
}

const LE_PROJECT_LIST: Project[] = [
  {
    key: 'le-wechat-web',
    name: 'le-wechat-web',
    creat_at: '2017-XX-XX',
    tags: ['wechat', 'react'],
    desc: '主要功能同le-app，微信/小程序平台公有的前端web项目',
    estimateTimeConsumption: '已参与4个月',
    authorComment: '负责部分业务模块开发，bug修复等工作',
    localPath: '/Users/kunsam/Downloads/le-project/wechat-web',
    achievements: ['第三次wechat-web项目开发', '第二次已成熟项目重构实践', '多工具应用探索试验'],
  },
  {
    key: 'le-app',
    name: 'le-app',
    creat_at: '2018-XX-XX',
    tags: ['react-native', 'ios'],
    estimateTimeConsumption: `已参与4个月`,
    localPath: '/Users/kunsam/Downloads/le-project/app',
    photos: [require('../assets/le-app-1.jpg'), require('../assets/le-app-2.jpg')],
    desc:
      '托特衣箱是美国创先时装共享平台，以优秀的产品和服务品质为核心竞争力，为全球爱美女性提供更环保便捷的时尚穿衣新模式。',
    authorComment: '开发app时非常有趣的一件事，但是不得不说迭代效率比web慢很多',
    achievements: ['首次开发react-native项目', '首次xcode平台开发经验', 'app工具探索实践'],
    articles: [
      {
        name: 'react-native文档',
        link: 'https://reactnative.dev/docs/getting-started',
      },
    ],
  },
  {
    key: 'le-web-admin',
    name: 'le-web-admin',
    creat_at: '2019-10-29',
    tags: ['le-wechat-web', 'le-app', 'le-ts-code-tool', '自驱动项目'],
    emphasisDegree: 2,
    estimateTimeConsumption: `3 ~ 5天`,
    localPath: '/Users/kunsam/Downloads/le-project/le-web-admin',
    website: 'http://${SAM_IP}:4400/assets',
    photos: [
      require('../assets/WX20200313-163507@2x.png'),
      require('../assets/WX20200313-163711@2x.png'),
      require('../assets/WX20200313-163802@2x.png'),
      require('../assets/WX20200313-163830@2x.png'),
    ],
    desc:
      'le wechat/app 项目 管理工具后台，目前主要功能有【ABTest参数查询】【仓库管理】【文件依赖管理】【图片资源管理】',
    authorComment:
      '建立项目出发点是：1. ABTest平台参数查询不方便 2. 为Wechat新使用的仓库机制提供管理/模板服务 3. 为微信渲染优化做了一个文件依赖分析 4. 为减少项目图片使用和方便查找，增加图片管理',
    achievements: ['便捷的项目资源管理', '图数据结构练习', 'le-wechat-web', 'le-app', '自驱动项目'],
    articles: [
      {
        name: '动态仓库与Le项目代码管理',
        link:
          'https://mp.weixin.qq.com/s?__biz=MzUyMDkwOTMwMg==&mid=2247483687&idx=1&sn=05a37e9a8053518a2c60614d0647f49d&chksm=f9e279bece95f0a832791956a3079d5ee8582d5053fd12ac56c6379dc489108811633cfbadf9&token=1345244865&lang=zh_CN#rd',
      },
    ],
  },
  {
    key: 'le-app-vscode-extension',
    name: 'le-app-vscode-extension',
    desc: `le-app开发辅助插件，功能
      1. 查看全部导航路由: 用户可以查看全部routerConfig文件中写入的路由名称，选择后打开对应的容器文件
      2. 搜索导航路由：用户搜索一些标签文字，如“衣箱”、“付款”等，会查找对应的路由列表供选择打开
      3. 查看文件引用路径：查看文件全部引用上游，知道文件被谁使用了以及使用路径
      4. 查看文件路由容器：在某个文件选择该选项后查找它是属于哪个路由的
      5. 查找文件路由来源：查找文件的所在的路由是从哪个路由跳转过来的
      6. 语音服务：“来个组件”，“来个页面”(生成文件)，“注册页面”（自动写入到routerConfig中），“调试文件”（自动插入跳转到该路由的逻辑到首页路由中）“推送”“命令行”“git”等
      7. 打开代码追踪器：App调试过程中点击某个组件可以使vscode定位到具体的文件
      8. 打开辅助编码器：右键打开设计稿html可以插入自动捕捉代码的脚本
      9. worktile支持：在vscode面板中配置、查看自己的worktile任务，并带有辅助定位功能
    `,
    emphasisDegree: 4,
    estimateTimeConsumption: `15 ~ 20天`,
    creat_at: '2019-11-10',
    achievements: ['快速开发', '快速查询', '快速FixBug', 'le-app', '自驱动项目'],
    tags: [
      'vscode-extension',
      'speech recognition',
      'le-react-coder',
      'le-fe-test-tool',
      '自驱动项目',
    ],
    prototype: 'https://www.notion.so/kunsam624/05273709947a409fb25b2f0ef8f031cc',
    localPath: '/Users/kunsam/Downloads/le-project/le-app-vscode-extension',
    website: 'https://marketplace.visualstudio.com/items?itemName=kunsam.le-app-vscode-extension',
    photos: [
      require('../assets/le-app-WX20200314-130609@2x.png'),
      require('../assets/le-app-WX20200314-131803@2x.png'),
      require('../assets/le-app-WX20200314-132138@2x.png'),
    ],
    authorComment: `参与已开发成熟特别是App这样sourcemap不太准确的项目可能会遇到的问题，：不太清楚文件的依赖关系、看到UI以后不知道对应路由或文件在哪、想跳转一些路由却不知道跳转路由名称、不知道某个场景是已怎样的逻辑达到这的等问题
      因此，我使用脚本将项目js代码转成ts后使用自研的k-typescript-compiler-tool工具分析项目文件依赖关系以及读取项目路由和文件的对应关系， 此外，我还在此插件中整合了很多有用的功能包括其它项目的`,
  },
  {
    key: 'le-wechat-web-vscode-extension',
    name: 'le-wechat-web-vscode-extension',
    desc: `le-wechat 辅助开发插件，主要功能有：
      1. 搜索路由：可以查看全部routerConfig文件中写入的路由名称，选择后打开对应的文件
      2. 文件依赖：查看文件的依赖路径
      3. 查找数据字段供应链：输入某个字段名称，追踪使用路径
      4. 自动补全：自动补全已注册的新版仓库action
      5. worktile支持：在vscode面板中配置、查看自己的worktile任务，并带有辅助定位功能
      6. 代码追踪：点击页面元素，追踪代码
    `,
    emphasisDegree: 3,
    estimateTimeConsumption: `15 ~ 20天`,
    creat_at: '2019-10-10',
    achievements: ['快速开发', '快速查询', '快速FixBug', 'le-wechat-web', '自驱动项目'],
    localPath: '/Users/kunsam/Downloads/le-project/le-wechat-web-vscode-extension',
    website:
      'https://marketplace.visualstudio.com/items?itemName=kunsam.le-wechat-web-vscode-extension',
    tags: ['vscode-extension', 'le-react-coder', 'le-fe-test-tool', '自驱动项目'],
    photos: [require('../assets/le-wechat-WX20200314-133932@2x.png')],
  },
  {
    key: 'le-ts-code-tool',
    name: 'le-ts-code-tool',
    creat_at: '2019-11-01',
    emphasisDegree: 2,
    estimateTimeConsumption: `3 ~ 5天`,
    localPath: '/Users/kunsam/Downloads/le-project/le-ts-code-tool',
    npm: 'https://www.npmjs.com/package/le-ts-code-tool',
    tags: ['k-typescript-compiler-tool', '自驱动项目'],
    desc:
      '基于k-ts-compiler具有Le项目上下文的代码特征识别器，识向编辑器插件管理后台命令行工具等服务实例提供数据',
    authorComment:
      '目前用于 le-wechat-web-vscode-extension le-app-web-vscode-extension 插件中进行代码AST识别',
  },
  {
    key: 'le-react-coder',
    name: 'le-react-coder',
    creat_at: '2019-11-01',
    emphasisDegree: 3,
    estimateTimeConsumption: `3 ~ 5天`,
    desc:
      '基于几何分割和包围算法的客户端view层代码生成器，脚本会运算设计稿html中的代码层次结构，并且绑定定义的样式数据，以便view层代码的快速开发，目前有react和react-native两种output模式',
    tags: ['algorithm'],
    achievements: ['快速UI', 'le-wechat-web', 'le-app', '自驱动项目'],
    authorComment: '开发项目的目标是：节省前端开发对照设计稿开发的时间',
  },
  {
    key: 'le-fe-test-tool',
    name: 'le-fe-test-tool',
    creat_at: '2019-02-01',
    emphasisDegree: 2,
    estimateTimeConsumption: `3 ~ 5天`,
    desc:
      '基于实时运行上下文、使用jest作为测试环境的测试用例代码生成器，目前提供基本渲染测试和交互测试两个场景',
    achievements: ['快速测试', 'le-wechat', '测试综合实践'],
    tags: ['jest', 'test'],
    photos: [require('../assets/le-fe-test-640.png'), require('../assets/le-fe-test-6401.jpeg')],
    authorComment:
      '针对Le前端项目测试落地效率低的问题开发， 由于较忙目前还没开发app版本，还需要完善下文档',
    articles: [
      {
        name: 'Le项目前端测试实践',
        link:
          'https://mp.weixin.qq.com/s?__biz=MzUyMDkwOTMwMg==&mid=2247483729&idx=1&sn=184818a637a99067f4e15bfc44f5f8ce&chksm=f9e279c8ce95f0de898b07b4c98be3c598154f186a60137ba91999d99294391ee9cf4de0ed2b&token=266169947&lang=zh_CN#rd',
      },
      {
        name: 'jest文档',
        link: 'https://jestjs.io/docs/en/getting-started',
      },
    ],
  },
];

const MY_PROJECT_LIST: Project[] = [
  {
    key: 'kunsam-react-code-tree',
    name: 'kunsam-react-code-tree',
    tags: ['vscode-extension', 'workflow', 'code-location'],
    creat_at: '2019-02-10',
    emphasisDegree: 3,
    estimateTimeConsumption: `10 ~ 15天`,
    desc: 'vscode流程[管理/定位插件]，更方便直观的[查找/维护]零散的业务流程代码',
    github: 'https://github.com/kunsam/kunsam-react-code-tree',
    localPath: '/Users/kunsam/Downloads/my-project/kunsam-react-code-tree',
    photos: ['http://q7345qrap.bkt.clouddn.com/WX20200313-095622%402x.png'],
    achievements: ['用于"设计云"项目3D碰撞检测流程管理', `用于"Le Wechat项目部分流程管理"`],
    authorComment:
      '建立项目的出发点是：一些前端流程或者复杂逻辑会拆分节点到很多文件中，有时查询起来比较头疼，考虑使用一个工具标记流程上的重要节点，并且以文档的形式记录下来，方便日后查找和维护',
  },
  {
    key: 'kunsam_web_server',
    name: 'kunsam-web-server',
    creat_at: '2019-12-30',
    tags: ['ruby', 'ruby-on-rails'],
    emphasisDegree: 1,
    desc: '学习ruby的练手项目，完成一些基础CRUD接口的开发',
    estimateTimeConsumption: `3 ~ 5天`,
    localPath: '/Users/kunsam/Downloads/my-project/kunsam-web-server',
    website: 'https://guides.rubyonrails.org/getting_started.html',
    prototype: 'https://www.notion.so/kunsam624/Rails-4511ab753be34b619ebeeefc96066a19',
    authorComment:
      '目标是学习成熟的web应用框架是如何设计的，同时自己的项目也有一些拆分到后端的数据储存/使用需求',
  },

  {
    key: 'algothem-implement',
    name: 'algothem-implement',
    creat_at: '2019-02-01',
    tags: ['algothem', 'data-structure', 'three.js'],
    emphasisDegree: 4,
    estimateTimeConsumption: `12 ~ 20天`,
    localPath: '/Users/kunsam/Downloads/my-project/algothem-implement',
    website: 'https://algo-learn.now.sh',
    github: 'https://github.com/kunsam/algothem-implement',
    photos: [require('../assets/algothem-implement/WX20200313-165101@2x.png')],
    achievements: ['收获2wB站播放量', '计算机基础提升'],
    desc:
      '自研3D算法演示网站，项目代码中包括常用数据结构和算法js实现，动画演示目前做了二叉树/红黑树演示过程',
    authorComment:
      '建立项目出发点是：有段时间重新学习计算机基础知识，包括数据结构和算法，学习过后希望能以一种不同的形式展示和总结背后的逻辑过程',
    articles: [
      {
        name: 'B站讲解视频',
        link: 'https://www.bilibili.com/video/av45909616',
      },
    ],
  },
  {
    emphasisDegree: 4,
    creat_at: '2019-11-01',
    key: 'k-typescript-compiler-tool',
    name: 'k-typescript-compiler-tool',
    estimateTimeConsumption: `5 ~ 10天`,
    tags: ['typescript-compiler', 'typescript'],
    github: 'https://github.com/kunsam/k-typescript-compiler.git',
    npm: 'https://www.npmjs.com/package/k-typescript-compiler-tool',
    localPath: '/Users/kunsam/Downloads/my-project/k-typescript-compiler',
    achievements: ['用于自研 vscode extension'],
    authorComment:
      '这个项目是我当时很喜欢的项目，因为可以研究AST相关的知识，设计到很多String算法的思考和实现',
    articles: [
      {
        name: 'typescript-compiler官方文档',
        link: 'https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API',
      },
    ],
    desc:
      'k-typescript-compiler基于typescript-compiler实现，k-typescript-compiler通过tsc获得ts文件抽象语法树(AST)，进一步实现映射函数，从而可以将静态ts文件转换成可运行数据，如识别出文件中所有变量/class包括的所有成员、值及代码物理位置',
  },
  {
    key: 'kunsam-graphql-server',
    name: 'kunsam-graphql-server',
    creat_at: '2019-11-09',
    emphasisDegree: 0.5,
    estimateTimeConsumption: `1 ~ 2天`,
    tags: ['graphql', 'graphql-server', 'nodejs', 'prisma'],
    localPath: '/Users/kunsam/Downloads/my-project/kunsam/kunsam-graphql-server',
    articles: [
      {
        name: 'prisma文档',
        link: 'https://www.prisma.io/',
      },
    ],
    desc:
      '想学习实践一下实现一个nodejs graphql后台，创建项目后一直没有时间实践下去，缺乏应用场景，以后有机会再看看',
  },
  {
    name: '个人诗集博客',
    emphasisDegree: 4,
    key: 'kunsam-poem-web',
    creat_at: '2019-11-09',
    tags: ['poem', 'blog'],
    achievements: ['家人的欣赏点赞'],
    website: 'https://kunsam.com/',
    estimateTimeConsumption: `7 ~ 14天`,
    desc: '诗集博客，收录一些精选诗集和个人诗集，还想做后端储存/评论，暂时还没时间',
    localPath: '/Users/kunsam/Downloads/my-project/kunsam/kunsam-web',
    prototype: 'https://www.notion.so/kunsam624/dc432a2ecadb4a1faa5c60a91d4399ab',
  },
  {
    emphasisDegree: 3,
    creat_at: '2019-10-29',
    key: 'kunsam-web-template',
    name: 'kunsam-web-template',
    estimateTimeConsumption: `1 ~ 3天`,
    desc: 'next.js + material-ui 移动端项目模板',
    tags: ['TO-C', 'mobile-web', 'template', 'next.js', 'SSR', 'react'],
    localPath: '/Users/kunsam/Downloads/my-project/kunsam/kunsam-web-template',
    github: 'https://github.com/kunsam/kunsam-web-template.git',
    authorComment:
      '未来重点是整合成一个"TOC"、"面向移动端"的具有多样解决方案、列举出支持特性和场景，但不包括具体实现的项目',
    articles: [
      {
        name: 'next.js文档',
        link: 'https://nextjs.org/docs/getting-started',
      },
    ],
  },
  {
    emphasisDegree: 3,
    creat_at: '2020-02-29',
    key: 'kunsam-admin-template',
    name: 'kunsam-admin-template',
    estimateTimeConsumption: `1 ~ 3天`,
    desc: 'antd-design-pro admin 后台模板',
    tags: ['TO-B', 'admin', 'template', 'ant-design-pro', 'react'],
    localPath: '/Users/kunsam/Downloads/my-project/kunsam/kunsam-admin-template',
    authorComment: '重点是整合成一个成熟的后台、数据中台解决方案项目',
    github: 'https://github.com/kunsam/kunsam-admin-template.git',
    articles: [
      {
        name: 'ant-design-pro文档',
        link: 'https://pro.ant.design/docs/getting-started-cn',
      },
      {
        name: 'umi-js文档',
        link: 'https://umijs.org/zh-CN/docs/getting-started',
      },
    ],
  },

  {
    emphasisDegree: 3,
    creat_at: '2019-10-29',
    key: 'kunsam-3d-lab',
    name: 'kunsam-3d-lab',
    estimateTimeConsumption: `5 ~ 10天`,
    desc:
      'three.js的3D实验平台，在上面尝试感兴趣的前端3D场景实现，实践Blender建模、动画发布到前端的效果，当前制作两个场景',
    tags: ['three.js', 'webgl', 'blender', 'react'],
    localPath: '/Users/kunsam/Downloads/my-project/kunsam/kunsam-3d-lab',
    website: 'https://letote-3d-wish-gfbhkelud.now.sh/',
    authorComment: '该平台尚未完善，有很多不在项目中零散的资料，前期主要是当一个故事场景',
    articles: [
      {
        name: 'three.js文档',
        link: 'https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene',
      },
    ],
  },

  {
    emphasisDegree: 4,
    key: 'kunsam-show',
    name: 'kunsam-show',
    tags: ['h5', 'blog'],
    creat_at: '2019-03-10',
    estimateTimeConsumption: `0天`,
    desc: '用于发布个人博客、流畅精美的H5案列、作品集等的网站，刚起步，准备开发中...',
    localPath: '/Users/kunsam/Downloads/my-project/kunsam/kunsam-show',
    prototype: 'https://www.notion.so/kunsam624/kunsam-show-7b49ebcf9f8148deb1693ed9db6e1c15',
  },

  {
    key: 'core-script',
    name: 'core-script',
    desc: '⚔一套node.js工作流辅助脚本。后续可用来注册新的模块/文档，以进行快速开发',
    emphasisDegree: 3,
    creat_at: '2018-02-01',
    estimateTimeConsumption: `5 ~ 10天`,
    tags: ['nodejs', 'shell'],
    github: 'https://github.com/kunsam/core-script.git',
    npm: 'https://www.npmjs.com/package/core-script',
    authorComment:
      '开发此项目的出发点是为了快速的完成业务工作流中的重复部分，如创建页面容器，创建redux数据流(注册多个文件)，生成已注册的方法补全，查找并使用(带说明和参数)某个库(如lodash)的函数等功能。',
    achievements: ['用于一起长大APP教师管理后台快速开发工作中'],
    photos: [require('../assets/core-script-WX20200313-222148@2x.png')],
  },
];

const HISTORY_PROJECT_LST: Project[] = [];
// 抽离数据配置文件，让别人也能用
export const PROJECTS: { tab: string; list: Project[]; desc: string }[] = [
  {
    tab: '我的项目',
    list: MY_PROJECT_LIST,
    desc: '自驱动仍还会维护的项目',
  },
  {
    tab: 'Letote项目',
    list: LE_PROJECT_LIST,
    desc: '目前所在letote公司参与的项目',
  },
  {
    tab: '历史项目',
    list: HISTORY_PROJECT_LST,
    desc: '以前公司参与过的项目或者不在维护的老项目',
  },
];

export const PROJECTS_MAP: Map<string, Project> = PROJECTS.reduce((p, c) => {
  c.list.forEach(project => {
    p.set(project.key, project);
  });
  return p;
}, new Map());
