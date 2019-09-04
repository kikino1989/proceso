import {
    IonItem,
    IonInput,
    IonLabel,
    IonButton,
    IonIcon,
    IonItemGroup,
    IonItemDivider,
    IonCol,
    IonGrid,
    IonRow
} from '@ionic/react';
import React, { Component } from 'react';
import { add, trash } from 'ionicons/icons';
import Budget from '../../models/Budget';
import IncomeSource from '../../models/IncomeSource';
import { BudgetContext } from '../../providers/BudgetProvider';

type PROPS = Readonly<{
    budget: Budget,
    incomeSources: IncomeSource[]
}> | any;

export default class IncomeSourcesManager extends Component<PROPS> {
    static contextType = BudgetContext;

    render() {
        return (
            <IonItemDivider style={{ overflow: 'auto' }}>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonLabel>
                                Income Sources
                            </IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonButton style={{ float: 'right' }} onClick={() => { this.context.addIncomeSource(this.props.budget) }}>
                                <IonIcon icon={add}></IonIcon> Source
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            {this.props.incomeSources.map((incomeSource: IncomeSource, index: number) => (
                                <IonItemDivider key={index}>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="10">
                                                <IonItemGroup>
                                                    <IonItem>
                                                        <IonLabel>Source Name</IonLabel>
                                                        <IonInput type="text" value={incomeSource.name}></IonInput>
                                                    </IonItem>
                                                    <IonItem>
                                                        <IonLabel>Amount</IonLabel>
                                                        <IonInput type="number" value={incomeSource.amount.toString()}></IonInput>
                                                    </IonItem>
                                                </IonItemGroup>
                                            </IonCol>
                                            <IonCol size="2">
                                                <IonButton style={{ float: 'right' }} size="small" color="danger" shape="round"
                                                    onClick={() => this.context.deleteIncomeSource(this.props.budget, incomeSource)}>
                                                    <IonIcon icon={trash}></IonIcon>
                                                </IonButton>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonItemDivider>
                            ))}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonItemDivider>
        );
    }
}
