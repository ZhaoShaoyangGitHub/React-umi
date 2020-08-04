/**
 * PackageSelect.state 参数类型
 *
 * @export
 * @interface PackageSelectState
 */
export interface PackageSelectState {
    selectedIndArr: number[]
    time: number[]
    timeString: string
    startTime: string
    projectList: any
    technicianList: any
    currentTechnician: number
    serviceStartTime: string
    serviceEndTime: string
    timeData: any[]
}

/**
 * PackageSelect.props 参数类型
 *
 * @export
 * @interface PackageSelectProps
 */
export interface PackageSelectProps {
    dispatch?: any
}
