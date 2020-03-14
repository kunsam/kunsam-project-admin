export interface GithubItem {
  key: string;
  name: string;
  desc: string;
  website?: string;
  tags?: string[];
  github?: string;
  photos?: string[];
}

export const GITHUBS: GithubItem[] = [
  {
    key: 'vscode-extension-samples',
    name: 'vscode-extension-samples',
    desc: 'vscode插件相关的示例',
    github: 'https://github.com/Microsoft/vscode-extension-samples',
    website: 'https://code.visualstudio.com/api/references/vscode-api',
    tags: ['vscode-extension', 'microsoft'],
  },
];

export const GITHUBS_MAP: Map<string, GithubItem> = GITHUBS.reduce((p, c) => {
  p.set(c.key, c);
  return p;
}, new Map());
