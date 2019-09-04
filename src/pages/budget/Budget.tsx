import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar
    } from '@ionic/react';
import React from 'react';
import BudgetManager from '../../components/budget/BudgetManager';
import BudgetProvider from '../../providers/BudgetProvider';

const BudgetPage: React.FunctionComponent = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Budget</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <BudgetProvider>
                    <BudgetManager></BudgetManager>
                </BudgetProvider>
            </IonContent>
        </>
    );
};
  
export default BudgetPage;