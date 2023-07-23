import { PageOptionsDto } from './page-options.dto';

export type QueryPageOptions<T> = PageOptionsDto & T;

export interface IQueryPage<T> {
  filter: T;
  pageOptions: PageOptionsDto;
}

export abstract class AbstractQueryPage<T>
  extends PageOptionsDto
  implements IQueryPage<T>
{
  get filter(): T {
    const query: any = { ...this };
    delete query.paginate;
    delete query.page;
    delete query.limit;
    delete query.offset;
    return query;
  }

  get pageOptions(): PageOptionsDto {
    return {
      paginate: this.paginate,
      page: this.page,
      limit: this.limit,
      offset: this.offset,
    };
  }
}
