import Z_CONFIG from '@/config'

// 通用方法
export default class utils {

  /**
   * @description 调试用的时间戳
   * @author suwill
   * @param {none} 不需要参数
   * @example mklog()
   */
  static mklog(datemillis) {
    var date = datemillis?new Date(datemillis):new Date(); //新建一个事件对象
    var month = date.getMonth() + 1; //获取月份
    var strDate = date.getDate(); //获取日期
    var sh = date.getHours(); //获取时
    var sm = date.getMinutes(); //获取分
    var ss = date.getSeconds(); //获取秒
    if (month >= 1 && month <= 9) { //判断月份
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (sh >= 0 && sh <= 9) {
      sh = "0" + sh;
    }
    if (sm >= 0 && sm <= 9) {
      sm = "0" + sm;
    }
    if (ss >= 0 && ss <= 9) {
      ss = "0" + ss;
    }
    var ms = date.getMilliseconds();
    if (ms >= 10 && ms <= 100) {
      ms = '0' + ms;
    } else if (ms >= 0 & ms <= 9) {
      ms = '00' + ms;
    }
    var currentdate = `20${date.getYear() - 100}-${month}-${strDate} ${sh}:${sm}:${ss}`;
    return currentdate;
  }

  /**
   * 字典排序
   */
  static dic(value, type = true) {
    let sdic = Object.keys(value).sort();
    let _arr = {};
    for (let i in sdic) {
      if (type) {
        if (value[sdic[i]] != null) {
          _arr[sdic[i]] = value[sdic[i]];
        }
      } else {
        _arr[sdic[i]] = value[sdic[i]];
      }
    }
    return _arr;
  }

  /**
   * 日志输出
   */
  static log(r) {
    if (!Z_CONFIG.debug) {
      return;
    }
    if (typeof (r) == "object") {
      console.log(JSON.stringify(r));
    } else {
      console.log(r);
    }
  }

  /**
   * 错误输出
   */
  static error(r) {
    if (!Z_CONFIG.debug) {
      return;
    }
    if (typeof (r) == "object") {
      console.error(JSON.stringify(r));
    } else {
      console.error(r);
    }
  }

  /**
   * uuid
   */
  static uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    //s[8] = s[13] = s[18] = s[23] = "-";
    var guid = s.join("");
    return guid;
  }

  // 过滤表情符号
  static filterEmoji(string){
    if(typeof string == "string"){
      var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
      // return string.replace(regStr, "");
      return regStr.test(string);
    }
    return false;
  }
}
