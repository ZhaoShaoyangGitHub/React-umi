/**
 * myPointsScores.state 参数类型
 *
 * @export
 * @interface MyPointsScoresState
 */
export interface MyPointsScoresState {
    integral: number
    integralRecordResponses: Array<any>
    signDays: number
    signIntegral: number
    isPopupStatus: boolean
}

/**
 * myPointsScores.props 参数类型
 *
 * @export
 * @interface MyPointsScoresProps
 */
export interface MyPointsScoresProps {
    dispatch?: any
}
