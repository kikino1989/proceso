import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';
import { EventEmitter } from '@angular/core';

export class DatabaseService {

    public dbReady = new EventEmitter<SQLiteObject>();
    constructor(private sqlite: SQLite) { }

    openDatabase(): Promise<SQLiteObject> {
        return new Promise((resolve, reject) => {
            this.sqlite.create({
                name: 'proceso.db',
                location: 'default'
            }).then(db => {
                db.transaction(tx => {
                    // create tables
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Book(id INTEGER PRIMARY KEY AUTOINCREMENT, position INTEGER NOT NULL, name TEXT NOT NULL, progress INTEGER NOT NULL, read BOOLEAN NOT NULL)');
                    tx.executeSql('CREATE INDEX IF NOT EXISTS bk_name ON Book(name)');
                    
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Budget(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, _limit NUMERIC NOT NULL, active BOOLEAN NOT NULL, startDate TEXT NOT NULL, snapshot TEXT NOT NULL, parentID INTEGER NOT NULL, FOREIGN KEY(parentID) REFERENCES Budget(id))');
                    tx.executeSql('CREATE INDEX IF NOT EXISTS bgt_name ON Budget(name)');

                    tx.executeSql('CREATE TABLE IF NOT EXISTS Habit(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, timeGoal INTEGER NOT NULL, done BOOLEAN NOT NULL, dueDate TEXT NOT NULL, description TEXT NOT NULL, frequency TEXT NOT NULL)');
                    tx.executeSql('CREATE INDEX IF NOT EXISTS hbt_name ON Habit(name)');

                    tx.executeSql('CREATE TABLE IF NOT EXISTS HabitsRecord(id INTEGER PRIMARY KEY AUTOINCREMENT, habitID INTEGER NOT NULL, date TEXT NOT NULL, FOREIGN KEY(habitID) REFERENCES Habit(id))');
                    
                    tx.executeSql('CREATE TABLE IF NOT EXISTS IncomeSource(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, budgetID INTEGER NOT NULL, value NUMERIC NOT NULL, type TEXT NOT NULL, date TEXT NOT NULL, FOREIGN KEY(budgetID) REFERENCES Budget(id))');
                    tx.executeSql('CREATE INDEX IF NOT EXISTS is_name ON IncomeSource(name)');

                    tx.executeSql('CREATE TABLE IF NOT EXISTS Spence(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, budgetID INTEGER NOT NULL, value NUMERIC NOT NULL, type TEXT NOT NULL, dueDate TEXT NOT NULL, _limit NUMERIC, FOREIGN KEY(budgetID) REFERENCES Budget(id))');
                    tx.executeSql('CREATE INDEX IF NOT EXISTS s_name ON Spence(name)');

                    tx.executeSql('CREATE TABLE IF NOT EXISTS Prospect(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT, image TEXT, step INTEGER NOT NULL DEFAULT 0)');
                    tx.executeSql('CREATE INDEX IF NOT EXISTS p_name ON Prospect(name)');

                    tx.executeSql('CREATE TABLE IF NOT EXISTS ProspectingSteps(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, position INTEGER NOT NULL, description TEXT, pointA TEXT, tools TEXT, pointB TEXT)');
                    tx.executeSql('CREATE INDEX IF NOT EXISTS pt_name ON ProspectingSteps(name)');

                    tx.executeSql('CREATE TABLE IF NOT EXISTS Reminder(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, note TEXT, frequency TEXT NOT NULL, entityID INTEGER NOT NULL, entityClass TEXT NOT NULL)');
                    tx.executeSql('CREATE INDEX IF NOT EXISTS r_name ON Reminder(name)');
                    // finished creating tables
                }).then(() => {
                    this.runMigrations(db).then(() => {
                        (window as any).db = db;
                        resolve(db);
                        this.dbReady.emit(db);
                    })
                    .catch(e => reject(e));
                })
                .catch(e => reject(e));
            })
            .catch(e => reject(e));
        });
    }

    runMigrations(db) {
        return db.transaction(tx => {

        });
    }
}