import { useState, useEffect } from 'react';
//这个hook用于函数防抖，也就是说只有在input某个时间内不再变化时，才去执行某个函数操作
//也就是说上层input改变时，如果delay事件内没变化时，，就把输入的input返回回去，如果delay事件内改变了，hook
//重新执行，首先会清除之前的delay状态，然后重新渲染
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
export default useDebounce;
