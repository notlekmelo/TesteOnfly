/* eslint-disable */
import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';

export default class CustomNameConstraintStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    primaryKeyName(tableOrName: Table | string, columnNames: string[]) {
        const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
        const columnsSnakeCase = columnNames.join('_');
        return `PK_${table}_${columnsSnakeCase}`;
    }

    defaultConstraintName(tableOrName: Table | string, columnName: string) {
        const table = tableOrName instanceof Table ? tableOrName.name : tableOrName;
        return `DF_${table}_${columnName}`;
    }
}
