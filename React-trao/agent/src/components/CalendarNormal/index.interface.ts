/**
 * Calendar.state 参数类型
 *
 * @export
 * @interface CalendarState
 */

export interface Objects {
    [propsName: string]: any
}

export interface CalendarState {
    fistMonthDistance?: number // 第一个月份与第二个月份的间隔
    weeksArr?: string[] // ["日", "一", "二", "三", "四", "五", "六"],
    timeRangeArr?: any[] // 时间范围
    emptyGrids: any[] // 空的占位符
    daysArr: any[] // 每月的天数
    realYear?: number
    realMonth?: number
    realDay?: number
    currentYear: number // 当前年
    currentMonth: number // 当前月
    currentDay?: number // 当前日
    clickedYear?: number // 点击年
    clickedMonth?: number // 点击月
    clickedDay?: number // 点击日
    scrollYear?: number // 滑动到 年
    scrollMonth?: number // 滑动到 月
    monthHeight?: number // 每个月份的高度
    MonthDistanceArr?: any[] // 月份间隔距离
    isCheckedDot?: boolean
}
/**
 * Calendar.props 参数类型
 *
 * @export
 * @interface CalendarProps
 */
export interface CalendarProps {
    type: 'normal' | 'scroll'
    titleOpt: TitleObj
    weekOpt: WeekTitleObj
    dayOpt: DayObj
    dotOpt: Dot[]
    isShowCalendarTop?: boolean //是否显示头部
    onSelectDay: Function
    isShowNum?: boolean
    numOpt?: { color: string; num: number; date: string }[]
    monthChange?(year: number, month: number): void
}

// interface DotObj {
//   green: Dot;
//   gray: Dot;
// }

/**
 *  dotOpt={{
        green: { color: 'red', date: '2019-9-25' },
        gray: { color: 'gray', date: '2019-9-27' },
    }}
 */

type Dot = {
    color: string
    date: string
}

type weekArr = string[]

interface WeekTitleObj {
    data: weekArr
    style?: Objects
}

interface DayObj {
    defaultStyle?: Objects
    currentMonthStyle?: Objects
    clickedStyle?: Objects
    todayStyle?: Objects
}

interface TitleObj {
    template: string
    style?: Objects
}
