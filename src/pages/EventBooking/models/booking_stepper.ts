export interface BookingStepperModel {
    currentStep : number;
    steps : Steps[];

}

export interface Steps {
    id: number;
    title: string;
}