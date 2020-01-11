export interface IModel {
    tableName: string;
    id: number;
    primaryKey: string;
    dependencyForeignKey: string;
}