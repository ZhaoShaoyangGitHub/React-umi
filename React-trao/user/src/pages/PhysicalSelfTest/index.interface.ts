/**
 * PhysicalSelfTest.state 参数类型
 *
 * @export
 * @interface PhysicalSelfTestState
 */
export interface PhysicalSelfTestState {
    startStatus: boolean
    resultStatus: boolean
    chartStatus: boolean
    currentIndex: number
    questionTitle: string
    questionList: Array<any>
    answerList: Array<any>
    markList: Array<any>
    personalInfo: any
    constitutionResult: any
    isNext: boolean
}

/**
 * PhysicalSelfTest.props 参数类型
 *
 * @export
 * @interface PhysicalSelfTestProps
 */
export interface PhysicalSelfTestProps {
    dispatch?: any
}
