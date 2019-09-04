import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';
import React from 'react';
import Budget from '../../models/Budget';
import { add, trash } from 'ionicons/icons';
import IncomeSourcesManager from './IncomeSourcesManager';
import { BudgetContext } from '../../providers/BudgetProvider';

export default class BudgetManager extends React.Component {
    static contextType = BudgetContext;
    render() {
        return (
            <IonContent style={{ textAlign: 'right' }}>
                <IonButton color="primary" style={{ margin: '10px 0' }}
                    onClick={() => { this.context.addBudget() }}>
                    <IonIcon icon={add}></IonIcon> Budget
                </IonButton>;
                {this.renderBudgets()}
            </IonContent>
        );
    }

    renderBudgets() {
        return this.context.budgets.map((budget: Budget, index: number) => (
            <IonCard key={index} style={{ textAlign: 'left' }}>
                <IonCardHeader>
                    <IonCardSubtitle style={{ overflow: 'auto' }}>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    Budget Manager
                                </IonCol>
                                <IonCol>
                                    <IonButton color="danger" size="small" style={{ float: 'right' }}
                                        shape="round" onClick={() => { this.context.deleteBudget(budget) }}>
                                        <IonIcon icon={trash}></IonIcon>
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <IonLabel>Budget Name</IonLabel>
                        <IonInput type="text" placeholder="Enter budget name." value={(budget as Budget).name} required></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Budget Goal</IonLabel>
                        <IonInput type="number" placeholder="Enter budget goal." value={(budget as Budget).goal.toString()} required></IonInput>
                    </IonItem>
                    <IncomeSourcesManager budget={budget} incomeSources={budget.incomeSources}></IncomeSourcesManager>
                </IonCardContent>
            </IonCard>
        ));
    }
}

