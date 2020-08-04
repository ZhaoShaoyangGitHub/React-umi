export interface HealthRecordsProps {
    [propNames: string]: any
    dispatch?: any
}

export interface HealthRecordsState {
    chartData: any
    weightData: Array<any>
    menstrualRecords: Array<any>
    symptomsList: Array<any>
    selectDayList: any
    [propNames: string]: any
}
