export function parseDec(val) {
    if (typeof val === 'number') {
        return val;
    }
    val = val.replace(',', '.');
    return parseFloat(val);
}
export function firstUpper(text) {
    return text[0].toUpperCase() + text.slice(1);
}
export function pad(value, n) {
    let string = String(value);
    if (string.length < n) {
        return "0".repeat(n - string.length) + string;
    }
    else {
        return string;
    }
}
export function time2string(timestamp, type = "smart") {
    if (timestamp === 0) {
        return '-';
    }
    let time = new Date(timestamp * 1000);
    let now = Date.now();
    if (timestamp === 0) {
        return "-";
    }
    let d = pad(time.getDate(), 2);
    let m = pad(time.getMonth() + 1, 2);
    let y = time.getFullYear();
    let h = pad(time.getHours(), 2);
    let i = pad(time.getMinutes(), 2);
    if (type === "without-year") {
        return `${d}/${m} ${h}:${i}`;
    }
    else if (type === "smart") {
        if (now - timestamp * 1000 < 84600000) {
            return `${h}:${i}`;
        }
        else {
            return `${d}/${m}`;
        }
    }
    else if (type === "short") {
        return `${d}/${m}/${y}`;
    }
    else {
        return `${d}/${m}/${y} ${h}:${i}`;
    }
}
export function hsl2rgb(h, s, l, hex = true) {
    let rgb = [];
    try {
        if (typeof h !== "number") {
            h = parseInt(h);
        }
        if (typeof s !== "number") {
            s = parseInt(s);
        }
        if (typeof l !== "number") {
            l = parseInt(l);
        }
        if (s > 100) {
            s = 100;
        }
        if (l > 100) {
            l = 100;
        }
        h = h % 360;
        s = s / 100;
        l = l / 100;
        let c, x, m;
        c = (1 - Math.abs(2 * l - 1)) * s;
        x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        m = l - c / 2;
        if (h >= 0 && h < 60)
            rgb = [c, x, 0];
        if (h >= 60 && h < 120)
            rgb = [x, c, 0];
        if (h >= 120 && h < 180)
            rgb = [0, c, x];
        if (h >= 180 && h < 240)
            rgb = [0, x, c];
        if (h >= 240 && h < 300)
            rgb = [x, 0, c];
        if (h >= 300 && h < 360)
            rgb = [c, 0, x];
        rgb[0] = Math.floor(255 * (rgb[0] + m));
        rgb[1] = Math.floor(255 * (rgb[1] + m));
        rgb[2] = Math.floor(255 * (rgb[2] + m));
        if (hex) {
            return "#" +
                pad(rgb[0].toString(16), 2) +
                pad(rgb[1].toString(16), 2) +
                pad(rgb[2].toString(16), 2);
        }
        else {
            return rgb;
        }
    }
    catch (e) {
        if (!rgb) {
            if (hex) {
                return "#000000";
            }
            else {
                return [0, 0, 0];
            }
        }
    }
}
export function deepCopy(obj) {
    if (Array.isArray(obj)) {
        let newArray = [];
        for (let i = 0; i < obj.length; i++) {
            let item = obj[i];
            if (typeof item === "object" && item !== null) {
                newArray.push(deepCopy(item));
            }
            else {
                newArray.push(item);
            }
        }
        return newArray;
    }
    else if (typeof obj === "object") {
        let data = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let item = obj[key];
                if (item !== null && typeof item === "object") {
                    data[key] = deepCopy(item);
                }
                else {
                    data[key] = item;
                }
            }
        }
        return data;
    }
    else {
        return obj;
    }
}
export function getDigit(number) {
    return Math.log(number) * Math.LOG10E | 0;
}
export function ceilMinify(number, maxDigit) {
    let digit = getDigit(number);
    if (digit > maxDigit) {
        let res = 0;
        let addition = "";
        if (digit > 18) {
            res = number / 1000000000000000000000;
            addition = " qi";
        }
        else if (digit > 15) {
            res = number / 1000000000000000000;
            addition = " qa";
        }
        else if (digit > 12) {
            res = number / 1000000000000000;
            addition = " tr";
        }
        else if (digit > 9) {
            res = number / 1000000000;
            addition = " bn";
        }
        else if (digit > 6) {
            res = number / 1000000;
            addition = " m";
        }
        else if (digit > 3) {
            res = number / 1000;
            addition = " k";
        }
        else {
            res = number;
        }
        return [res, addition];
    }
    else {
        return [number, ""];
    }
}
export function syncObjects(source, target) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            if (!target[key]) {
                target[key] = source[key];
            }
            else if (typeof source[key] === "object" && typeof target[key] === "object") {
                syncObjects(source[key], target[key]);
            }
        }
    }
    return target;
}
export function copy2Clipboard(text = "_") {
    let $input = document.createElement("input");
    $input.setAttribute("type", "text");
    $input.setAttribute("style", "position: absolute; z-index:-1");
    $input.value = text;
    document.body.appendChild($input);
    $input.select();
    document.execCommand("copy");
    $input.remove();
}
export function getPeriod(period = "D") {
    if (period === "M1") {
        return 60;
    }
    else if (period === "M5") {
        return 60 * 5;
    }
    else if (period === "M15") {
        return 60 * 15;
    }
    else if (period === "M30") {
        return 60 * 30;
    }
    else if (period === "H1") {
        return 60 * 60;
    }
    else if (period === "H2") {
        return 60 * 120;
    }
    else if (period === "H4") {
        return 60 * 240;
    }
    else if (period === "D") {
        return 60 * 1440;
    }
    else if (period === "W") {
        return 60 * 10080;
    }
}
export function avarage(array) {
    if (!Array.isArray(array)) {
        return false;
    }
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum / array.length;
}
export function parse(str) {
    if (typeof str === 'string') {
        try {
            str = JSON.parse(str);
        }
        catch (e) {
            return str;
        }
    }
    return str;
}
export function urlEncode(params) {
    let resString = [];
    for (let k in params) {
        if (params.hasOwnProperty(k)) {
            let val = typeof params[k] === "object" ? JSON.stringify(params[k]) : params[k];
            resString.push(k + '=' + encodeURIComponent(val));
        }
    }
    return resString.join('&');
}
export function isInt(value) {
    return typeof value === "number" && Math.floor(value) === value;
}
export function isOTP(value) {
    return typeof value === "number" && value.toString().length === 6;
}
export function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return typeof email === "string" && re.test(email);
}
export function isPassword(password) {
    return typeof password === "string" && password.length > 6;
}
export function getFormData(form) {
    let params = {};
    if (form instanceof HTMLFormElement) {
        for (let i = 0; i < form.elements.length; i++) {
            const el = form.elements[i];
            if (!(el instanceof HTMLInputElement) &&
                !(el instanceof HTMLSelectElement) &&
                !(el instanceof HTMLTextAreaElement)) {
                continue;
            }
            if (!el.name || el.disabled)
                continue;
            if (el instanceof HTMLInputElement && el.type === "radio" && el.checked) {
                params[el.name] = el.value;
            }
            else if (el instanceof HTMLInputElement && el.type === "file") {
                params[el.name] = el.files;
            }
            else if (el instanceof HTMLInputElement) {
                if (el.type === "checkbox" || el.dataset.type === "checkbox") {
                    params[el.name] = el.checked;
                }
                else if (el.type === "number" ||
                    ['decimal', 'numeric'].includes(el.getAttribute('inputmode'))
                    || el.dataset.type === "number") {
                    params[el.name] = Number(el.value);
                }
                else {
                    params[el.name] = el.value.trim();
                }
            }
            else if (el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
                params[el.name] = el.value.trim();
            }
        }
    }
    return params;
}
export function randomInt(min, max) {
    return Math.round(min + Math.random() * (max - min));
}
export function mobileAndTabletCheck() {
    let check = false;
    //@ts-ignore
    const a = navigator.userAgent || navigator.vendor || window['opera'];
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
}
export function format(text, args, remove = false) {
    if (typeof args !== "object" || !args || !text)
        return text;
    return text.replace(/\{([a-zA-Z0-9_.,=)( ]+)\}/g, function (m, n) {
        let value = getValue(n, args);
        return value !== undefined
            ? value
            : remove ? "" : m;
    });
}
export function getValue(path, args) {
    let arr = path.split(".");
    let current = args;
    for (let i = 0; i < arr.length; i++) {
        if (current !== undefined) {
            current = current[arr[i]];
        }
        else {
            return undefined;
        }
    }
    return current;
}
export function submitValidation(pool) {
    return !pool.reduce((a, v) => a + +(!v), 0);
}
export function debonce(value) {
    return function (target, prop, descriptor) {
        let lastCall = 0;
        return Object.assign(Object.assign({}, descriptor), { value: function (...args) {
                if (Date.now() - lastCall < value) {
                    return;
                }
                lastCall = Date.now();
                return descriptor.value.call(this, ...args);
            } });
    };
}
export function setCookie(name, value, options = {}) {
    options = Object.assign({ path: '/', "max-age": 84600 * 365, secure: true }, options);
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
export function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : "";
}
export function deleteAllCookies() {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
export function stringToHex(str) {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16);
    }
    return "0x" + result;
}
export function hexTostring(str) {
    let hexes = str.match(/.{1,4}/g) || [];
    let back = "";
    for (let j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
}
export function getTopic(str) {
    const string = stringToHex(str);
    return string + "0".repeat(66 - string.length);
}
export function getScrollbarWidth() {
    return window.innerWidth - document.body.clientWidth;
}
export const insertAfter = (array, index, item) => {
    const res = [];
    for (let i = 0; i < array.length; i++) {
        res.push(array[i]);
        if (index === i) {
            res.push(item);
        }
    }
    return res;
};
export const insertBefore = (array, index, item) => {
    const res = [];
    for (let i = 0; i < array.length; i++) {
        if (index === i) {
            res.push(item);
        }
        res.push(array[i]);
    }
    return res;
};
export const getEventDataset = (e, selector, dataName) => {
    const el = e.target.closest(selector);
    if (el instanceof HTMLElement)
        return el.dataset[dataName];
};
export const minifyString = (str, resultLength = 12) => {
    if (str.length <= resultLength) {
        return str;
    }
    return str.substring(0, resultLength / 2)
        + ".."
        + str.substring(str.length - resultLength / 2, str.length);
};
const calcSum = (str) => {
    if (str.includes('+')) {
        const [num1, num2] = str.split('+');
        return parseFloat(num1) + parseFloat(num2);
    }
    return parseFloat(str);
};
const calcValue = (str) => {
    if (str.includes('calc(')) {
        const v = str.substr(0, str.length - 1).replace('calc(', '');
        const [num1, num2] = v.split('*');
        if (!num2) {
            return calcSum(num1);
        }
        return calcSum(num1) * calcSum(num2);
    }
    return parseFloat(str);
};
const HSLstringToRGB = (hslColor) => {
    const str = hslColor.substr(0, hslColor.length - 1).replace('hsl(', '');
    const values = str.split(',');
    return hsl2rgb(calcValue(values[0]), calcValue(values[1]), calcValue(values[2]));
};
