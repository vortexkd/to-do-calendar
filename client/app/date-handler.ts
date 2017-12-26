export class DateHandler {
  // static days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  static days = ['日', '月', '火', '水', '木', '金', '土'];
  // static months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  static months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  public static ONE_DAY = 24 * 60 * 60 * 1000;
  public static ONE_HOUR = 60 * 60 * 1000;
  public static getDayString(date: Date): string {
    return DateHandler.days[date.getDay()];
  }
  public static getMonthString(date: Date): string {
    return DateHandler.months[date.getMonth()];
  }
  public static getDateString(date: Date): string {
    return date.getFullYear() + '-' + this.doubleDigitFormat(date.getMonth() + 1) + '-' + this.doubleDigitFormat(date.getDate());
  }
  public static getTimeString(date: Date): string {
    return DateHandler.getHours(date) + ':' + DateHandler.getMinutes(date);
  }
  public static getHours(date: Date) {
    return this.doubleDigitFormat(date.getHours());
  }
  public static getMinutes(date: Date) {
    return this.doubleDigitFormat(date.getMinutes());
  }
  public static getLater(date: Date, hours: boolean): string {
    const later = date;
    later.setHours(later.getHours() + 1);
    if (later.getDate() === date.getDate()) {
      if (hours) {
        return  DateHandler.doubleDigitFormat(later.getHours());
      }
      return DateHandler.doubleDigitFormat(later.getMinutes());
    }
    if (hours) {
      return '24';
    }
    return '00';
  }
  public static addDaysToDate(date: Date, days: number): Date {
    const temp = date;
    temp.setTime(date.getTime() + (days * DateHandler.ONE_DAY));
    return new Date(temp);

  }
  private static doubleDigitFormat(num: number): string {
    return ('00' + num).slice(-2);
  }
}
