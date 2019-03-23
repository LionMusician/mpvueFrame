import Lang from '../utils/Lang';
import v from '../utils/Validate';
import tips from '../utils/Tips';
const mixins = {
    // 卸载页面
    // onUnload() {
    //     if(this.input){
    //         this.input = {};
    //     }
    // },
    methods: {
        // 校验
        check(rules) {
            for (let rule of rules) {
                const value = rule.value;
                if (rule.method != 'noDuplicate' && Lang.isArray(value)) {
                    // 数组校验每个值
                    for (let innerValue of value) {
                        const isValid = this.execCheck(rule, innerValue);
                        if (!isValid) {
                            return false;
                        }
                    }
                } else {
                    // 单元素直接校验
                    const isValid = this.execCheck(rule, value);
                    if (!isValid) {
                        return false;
                    }
                }
            }
            return true;
        },
        execCheck(rule, value) {
            const method = v[rule.method].bind(v);
            const isValid = method(value, rule.param);
            if (!isValid) {
                if (rule.message) {
                    tips.toast(rule.message);
                }
                return false;
            }
            return true;
        }
    }
}

export { mixins }