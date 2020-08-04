/**
 * MemberDetails.state 参数类型
 *
 * @export
 * @interface MemberDetailsState
 */
export interface MemberDetailsState {
    userId: number
    avatar: string
    nickName: string
    phone: number | string
    area: string
    city: string
    province: string
    consumption: number
    personInfo: personInfo
    symptomValues: Array<any>
    weightResponses: Array<any>
}

interface personInfo {
    age: number
    stature: number | string
    weight: number | string
    marriageStatus: 1 | 2 | 3
    bloodType: string
}

/**
 * MemberDetails.props 参数类型
 *
 * @export
 * @interface MemberDetailsProps
 */
export interface MemberDetailsProps {
    dispatch?: any
}
