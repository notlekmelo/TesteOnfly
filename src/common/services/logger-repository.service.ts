import { LoggerErrorService } from './logger-error.service';

/**
 * Log for CRUD repository
 */
export class LoggerRepository extends LoggerErrorService {
  constructor(classObj: any, showLog?: boolean) {
    super(classObj, showLog || process.env.ENABLE_LOGGER === 'true');
  }
  /**
   * Generate log save and show body data
   *
   * @param body
   */
  save(body: any) {
    this.log('save', body);
  }
  /**
   * Generate log findById
   * @param id
   */
  findById(id: string | number) {
    this.log('findById: ' + id);
  }
  /**
   * Generate log update and show body data
   * @param id
   */
  update(id: string | number, body: any) {
    this.log('update: ' + id, body);
  }
  /**
   * Generate log updateMany and show body data
   * @param criteria
   */
  updateMany(criteria: any, body: any) {
    this.log('updateMany: ', criteria);
    this.log('updateMany:body ', body);
  }
  /**
   * Generate log findAll
   */
  findAll() {
    this.log('findAll');
  }
  /**
   * Generate log delete
   * @param id
   */
  deleteById(id: string | number) {
    this.log('deleteById:', id);
  }
  /**
   * Generate log find
   * @param criteria
   */
  find(criteria: any) {
    this.log('find:', criteria);
  }
  /**
   * Generate log findOne and show criteria data
   * @param criteria
   */
  findOne(criteria: any) {
    this.log('findOne:', criteria);
  }
  /**
   * Generate log findWithPagination
   *
   * @param criteria
   * @param pageOptions
   * @param search
   */
  findWithPagination(criteria: any, pageOptions: any, search?: string) {
    if (!search) {
      search = '';
    }
    this.log(`findWithPagination.query: ${JSON.stringify(criteria)}`);
    this.log(`findWithPagination.pageOptions: ${JSON.stringify(pageOptions)}`);
    this.log(`findWithPagination.searchQuery: ${search}`);
  }
  /**
   * Generate log delete
   * @param criteria
   */
  delete(criteria: any) {
    this.log(`delete: ${JSON.stringify(criteria)}`);
  }
}
