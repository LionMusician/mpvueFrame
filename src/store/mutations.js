/***
 * 处理方法
 */
import {
    TEST
} from './mutation-type'

export default {
    [TEST] (state,v) {
        state.test = v;
    }
}