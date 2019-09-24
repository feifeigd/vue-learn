export default class Time{
    public static getUnix(){
        return new Date().getTime();
    }
    public static getTodayUnix(){
        const date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    }

    public static getLastDate(timestamp: number){
        const date = new Date(timestamp);
        const m = date.getMonth() + 1;
        const month = m < 10 ? '0' + m : m;
        const d = date.getDay();
        const day = d < 10 ? '0' + d : d;
        return date.getFullYear() + '-' + month + '-' + day;
    }
    public static getFormatTime(timestamp: number){
        const now = this.getUnix();
        const timer = (now - timestamp) / 1000; // 转为秒时间戳
        const today = this.getTodayUnix();
        let tip = '';
        if (timer <= 0 || Math.floor(timer / 60) <= 0){
            tip = '刚刚';
        } else if (timer < 3600){
            tip = Math.floor(timer / 60) + '分钟前';
        } else if (timestamp - today >= 0){
            tip = Math.floor(timer / 3600) + '小时前';
        } else if (timer / 86400 <= 31){
            tip = Math.ceil(timer / 86400) + '天前';
        } else {
            tip = this.getLastDate(timestamp);
        }
        return tip;
    }
}
