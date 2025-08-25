/** @type {import('semantic-release').GlobalConfig} */
const config = {
  branches: ['master', { name: 'dev', prerelease: true }],
  tagFormat: 'v${version}',
  repositoryUrl: 'https://github.com/mc-es/devdocs-tr.git',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/github',
      {
        successComment: false,
        failTitle: false,
      },
    ],
  ],
};

export default config;
