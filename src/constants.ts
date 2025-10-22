export { environment } from './environment'

export const config = {
  // Application name
  name: 'AwesomeHub',

  // Core module
  api: {
    endpoints: {
      build: '/build.json',
    },
    timeout: 10000,
  },

  // Lists module
  lists: {
    defaultCollection: 'all',
    listsPageSize: 20,
    listReposPageSize: 24,
    // Recordset reducers constants
    recordsets: {
      summary: 'LIST_SUMMARY_RECORDSET',
      repo: 'LIST_REPO_RECORDSET',
    },
    /**
     * Repo scores color scales
     *
     * @see https://gka.github.io/chroma.js/#scale-colors
     */
    listRepoScoreTheme: ['#eff3ff', '#c0d2eb', '#92b2d7', '#6492c4', '#3772b0', '#08519c'],
    // listRepoScoreTheme: ['#edf8e9', '#c7e9c0', '#a1d99b', '#74c476', '#31a354', '#006d2c'],
    // listRepoScoreTheme: ['#feebe2', '#fcc5c0', '#fa9fb5', '#f768a1', '#c51b8a', '#7a0177'],
    // listRepoScoreTheme: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
    // Repo scores scales
    listRepoScoreScale: {
      p: 1000,
      h: 1000,
      a: 1000,
      m: 1000,
    },
  },
}
