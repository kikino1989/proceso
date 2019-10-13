
import { Observable, of } from 'rxjs';

abstract class Cond {
    operator: "=" | "!=" | ">" | "<" | "<=" | ">=" = "="; 
    joint: "OR" | "AND" | "NOR" = "AND";
}

export type Condition = Cond | any;

export default class BaseModel<T> {
    static all(conditions?: Condition | Condition[]): Observable<any[]> {
        if (window.cordova) {
            // do sqlite
        }
        return null;
    }

    static one(conditions?: number | Condition | Condition[]): Observable<any>  {
        if (window.cordova) {
            // do sqlite
        }
        return null;
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

    static insert(entity: any) {
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