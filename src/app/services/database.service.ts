import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';

export class DatabaseService {
    constructor(private sqlite: SQLite) { }

    openDatabase(): Promise<SQLiteObject> {
        return new Promise((resolve, reject) => {
            this.sqlite.create({
                name: 'proceso.db',
                location: 'default',
                iosDatabaseLocation: 'Documents'
            }).then(db => {
                (window as any).db = db;
                db.transaction(tx => {
                    // create tables
                    // tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
                    // tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
                    // tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
                }).then(() => {
                    resolve(db);
                }).catch(e => reject(e));
            });
        });
    }
}