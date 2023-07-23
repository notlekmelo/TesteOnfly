// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AbstractQueryPage, PageOptionsDto, QueryPageOptions } from '@common';

export class PaginationUtil {
  /**
   * Extract page options and query
   *
   * @param query Query filter and page options
   *
   * See {@link AbstractQueryPage}
   */
  static extractPageOptions(
    query: any & PageOptionsDto,
  ): QueryPageOptions<any> {
    const { page, limit, offset, paginate, ...filter } = query;
    const pageOptions = {
      paginate: paginate,
      page: page,
      limit: limit,
      offset: offset,
    };
    return { pageOptions, filter };
  }
}
