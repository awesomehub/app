/**
 * App Configurations
 */
export class AppConfig {
  /** General **/
  static NAME           = 'AwesomeHub';

  /** API **/
  static API_BASE_URL   = ENV.API_URL;
  static API_LISTS_URL  = `${AppConfig.API_BASE_URL}/lists`;
  static API_LIST_URL   = `${AppConfig.API_BASE_URL}/list`;
}
