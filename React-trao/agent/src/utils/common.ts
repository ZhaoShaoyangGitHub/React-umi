export const repeat = (str = '0', times) => {
    return new Array(times + 1).join(str);
};

export const pad = (num, maxLength = 2) => {
    return repeat('0', maxLength - num.toString().length) + num;
};

/** 时间格式的转换 */
export const formatTime = (time) => {
    `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}.${pad(time.getMilliseconds(), 3)}`;
};
