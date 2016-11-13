/**
 * Lists Configurations
 */
export class ListsConfig {
  /** General **/
  static DEFAULT_LIST_COLLECTION  = 'all';
  static LISTS_PER_PAGE           = 10;
  static LIST_REPOS_PER_PAGE      = 10;

  /** Recordset constants **/
  static LIST_SUMMARY_RECORDSET   = 'LIST_SUMMARY_RECORDSET';
  static LIST_REPO_RECORDSET      = 'LIST_REPO_RECORDSET';

  /** Repo scores scales **/
  static LIST_REPO_SCORE_SCALE_P    = 7500;
  static LIST_REPO_SCORE_SCALE_H    = 2500;
  static LIST_REPO_SCORE_SCALE_A    = 2500;
  static LIST_REPO_SCORE_SCALE_M    = 7500;

  /** Repo scores color scales **/
  static LIST_REPO_SCORE_COLOR    = ['eff3ff', 'c6dbef', '9ecae1', '6baed6', '3182bd', '08519c'];
  //static LIST_REPO_SCORE_COLOR    = ['edf8e9', 'c7e9c0', 'a1d99b', '74c476', '31a354', '006d2c'];
  //static LIST_REPO_SCORE_COLOR    = ['feebe2', 'fcc5c0', 'fa9fb5', 'f768a1', 'c51b8a', '7a0177'];
  //static LIST_REPO_SCORE_COLOR    = ['eeeeee', 'FFEE4A', 'FFC501', 'FE9600', '03001C'];
  //static LIST_REPO_SCORE_COLOR    = ['f2f0f7', 'dadaeb', 'bcbddc', '9e9ac8', '756bb1', '54278f'];
}
