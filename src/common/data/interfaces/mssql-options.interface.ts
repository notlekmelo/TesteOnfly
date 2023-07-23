export type MssqlOrderBy = 'ASC' | 'DESC';

/**
 * MongoDB order
 */
export interface MssqlQueryOptions {
  /**
   * Field to be sort
   */
  sort?: string;
  /**
   * Sort
   */
  order?: MssqlOrderBy;
  /**
   * Page
   */
  page: number;

  /**
   * Limit rows
   */
  limit: number;

  /**
   * Offset page
   */
  offset: number;
}
