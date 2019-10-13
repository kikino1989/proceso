
import { Observable, of } from 'rxjs';

abstract class Cond {
    operator: "=" | "!=" | ">" | "<" | "<=" | ">=" = "="; 
    joint: "OR" | "AND" | "NOR" = "AND";
}

export type Condition = Cond | any;

export default class BaseService<T> {
    protected _entities: any;

    set entities(value) {
        this._entities = value; 
    }

    get entities() {
        return this._entities;
    }

    all(conditions?: Condition | Condition[]): Observable<T[]> {
        if (window.cordova) {
            // do sqlite
        } else {
            if (Array.isArray(conditions)) {
                // do array
            } else {
                return of(this.entities.filter(budget => {
                    const matches = [];
                    for (const key in conditions) {
                        if (budget.hasOwnProperty(key)) {
                            matches.push(budget[key] === conditions[key] ? 1 : 0);
                        }
                    }
                    return matches.reduce((match, cur) => match + cur) === matches.length;
                }));
            }
            return of(this.entities);
        }
    }

    one(conditions?: number | Condition | Condition[]): Observable<T>  {
        if (window.cordova) {
            // do sqlite
        } else {
            if (Array.isArray(conditions)) {            

            } else if (typeof conditions === 'object') {

            } else 
                return of(this.entities.filter(budget => budget.id == conditions)[0]);
        }
    }

    update(entity: T, conditions?: Condition | Condition[] ) {
        if (window.cordova) {
            // save to the database
        }
    }

    delete(conditions?: number | Condition | Condition[]) {
        if (window.cordova) {

        }

    }

    insert(entity: T) {
        if (window.cordova) {
            // save to the database
        }

    }

    evalConditions(entity: T, conditions: Condition[]): boolean {
        const matches = [];
        for (const condition of conditions) {
            const match = this.evalCondition(entity, condition);
            if (condition.joint === 'OR' && match) {
                return true;
            }
            matches.push(match ? 1 : 0);
        }

        return matches.reduce((value, cur) => value + cur) === matches.length; 
    }

    evalCondition(entity: T, condition: Condition): boolean {
        const matches = [];
        for (const key in condition) {
            if (entity.hasOwnProperty(key)) {
                matches.push(entity[key] === entity[key] ? 1 : 0);
            }
        }
        return matches.reduce((match, cur) => match + cur) === matches.length;
    }
}