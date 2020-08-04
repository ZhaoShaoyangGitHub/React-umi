/*
 * @LastEditors: Tiger
 * @Description: In User Settings Edit
 * @Author: Tiger
 * @Date: 2019-08-08 13:52:17
 * @LastEditTime: 2019-08-09 16:31:42
 */
/**
 * RecordItem.state 参数类型
 *
 * @export
 * @interface RecordItemState
 */
export interface RecordItemState {}

/**
 * RecordItem.props 参数类型
 *
 * @export
 * @interface RecordItemProps
 */
export interface RecordItemProps {
    recordInfo: {
        staffName: string
        packageTitle: string
        serviceTitle: string
        startTime: Date
        endTime: any
        staffNumber: string
        weight: number
    }
    index: number
}
