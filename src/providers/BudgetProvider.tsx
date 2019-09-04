import Budget from '../models/Budget';
import IncomeSource from '../models/IncomeSource';
import React, { createContext, Component } from 'react';

export const BudgetContext = createContext({});

type PROPS = Readonly<{children: Component[] | any}> | any;
type STATE = Readonly<{budgets: Budget[]}> | any;

export default class BudgetProvider extends Component<PROPS, STATE> {
    constructor(props: PROPS) {
        super(props);
        this.state = {
            budgets: (Budget.all() as Budget[]),
            addBudget: () => {
                this.setState((state: STATE) => {
                    const budgets = state.budgets.slice();
                    budgets.push(new Budget('New Budget', 1000));
                    return {
                        budgets: budgets
                    };
                });
            },
            deleteBudget: (budget: Budget) => {
                this.setState((state: STATE)  => {
                    const budgets = state.budgets.slice();
                    const index = budgets.indexOf(budget);
                    budgets.splice(index, 1);
                    return { budgets:  budgets};
                });
            },
            addIncomeSource: (budget: Budget) => {
                this.setState((state: STATE)  => {
                    const incomeSources = budget.incomeSources.slice();
                    incomeSources.push(new IncomeSource('New Income Source', 1000));
                    budget.incomeSources = incomeSources
                    return { budgets:  state.budgets.slice()};
                });
            },
            deleteIncomeSource: (budget: Budget, incomeSource: IncomeSource) => {
                this.setState((state: STATE) => {
                    const index = budget.incomeSources.indexOf(incomeSource);
                    budget.incomeSources.splice(index, 1);
                    return { budgets:  state.budgets.slice()};
                });
            }
        };
    }
  
    render() {
        return (
            <BudgetContext.Provider value={this.state}>
                {this.props.children}
            </BudgetContext.Provider>
        );
    }
}