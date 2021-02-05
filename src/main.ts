function parseDec(val:string | number) {
    if(typeof val === 'number'){
        return val;
    }
    val = val.replace(',','.');
    return parseFloat(val);
}
function firstUpper(text: string) {
    return text[0].toUpperCase() + text.slice(1);
}
function pad(value: number | string, n: number) {
    let string = String(value);
    if(string.length < n){
        return "0".repeat(n - string.length) + string;
    }
    else{
        return string;
    }
}
function time2string(timestamp: number, type = "smart") {
    if(timestamp === 0){
        return '-';
    }
    let time = new Date(timestamp * 1000);
    let now = Date.now();

    if(timestamp === 0){
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
        } else {
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
function hsl2rgb(h: number, s: number, l: number, hex = true) {
    let rgb: any = [];
    try{
        if(typeof h !== "number"){
            h = parseInt(h);
        }
        if(typeof s !== "number"){
            s = parseInt(s);
        }
        if(typeof l !== "number"){
            l = parseInt(l);
        }
        if(s > 100){
            s = 100;
        }
        if(l > 100){
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
        if(hex){
            return "#" +
                pad(rgb[0].toString(16), 2) +
                pad(rgb[1].toString(16), 2) +
                pad(rgb[2].toString(16), 2);
        }
        else{
            return rgb;
        }
    }
    catch (e) {
        if(!rgb){
            if(hex){
                return "#000000";
            }
            else{
                return [0, 0, 0];
            }
        }
    }
}
function deepCopy (obj: any): any{
    if(Array.isArray(obj)){
        let newArray = [];
        for(let i = 0; i < obj.length; i++){
            let item = obj[i];
            if(typeof item === "object" && item !== null){
                newArray.push(deepCopy(item));
            }
            else{
                newArray.push(item);
            }
        }
        return newArray;

    }
    else if(typeof obj === "object"){
        let data: any = {};
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                let item = obj[key];
                if(item !== null && typeof item === "object"){
                    data[key] = deepCopy(item);
                }
                else{
                    data[key] = item;
                }
            }
        }
        return data;
    }
    else{
        return obj;
    }
}
function getDigit(number: number) {
    return Math.log(number) * Math.LOG10E | 0;
}
function ceilMinify(number: number, maxDigit:number) : [number, string]{
    let digit = getDigit(number);
    if(digit > maxDigit){
        let res = 0;
        let addition = "";
        if(digit > 18){
            res = number / 1000000000000000000000;
            addition = " qi";
        }
        else if(digit > 15){
            res = number / 1000000000000000000;
            addition = " qa";
        }
        else if(digit > 12){
            res = number / 1000000000000000;
            addition = " tr";
        }
        else if(digit > 9){
            res = number / 1000000000;
            addition = " bn";
        }
        else if(digit > 6){
            res = number / 1000000;
            addition = " m";
        }
        else if(digit > 3){
            res = number / 1000;
            addition = " k";
        }
        else{
            res = number;
        }
        return [res, addition];
    }
    else{
        return [number, ""];
    }
}
function syncObjects(source: any, target: any) {
    for(let key in source){
        if(source.hasOwnProperty(key)){
            if(!target[key]){
                target[key] = source[key];
            }
            else if(typeof source[key] === "object" && typeof target[key] === "object"){
                syncObjects(source[key], target[key])
            }
        }
    }
    return target;
}
function copy2Clipboard(text = "_"){
    let $input = document.createElement("input");
    $input.setAttribute("type", "text");
    $input.setAttribute("style", "position: absolute; z-index:-1");
    $input.value = text;
    document.body.appendChild($input);
    $input.select();
    document.execCommand("copy");
    $input.remove();
}
function getPeriod(period = "D"){
    if(period === "M1"){
        return 60;
    }
    else if(period === "M5"){
        return 60 * 5;
    }
    else if(period === "M15"){
        return 60 * 15;
    }
    else if(period === "M30"){
        return 60 * 30;
    }
    else if(period === "H1"){
        return 60 * 60;
    }
    else if(period === "H2"){
        return 60 * 120;
    }
    else if(period === "H4"){
        return 60 * 240;
    }
    else if(period === "D"){
        return 60 * 1440;
    }
    else if(period === "W"){
        return 60 * 10080;
    }
}
function avarage(array: Array<any>) {
    if(!Array.isArray(array)){
        return false;
    }
    let sum = 0;
    for(let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum/array.length;
}
export function parse<T>(str: T): T{
    if(typeof str === 'string'){
        try{
            str = JSON.parse(str)
        }
        catch (e) {
            return str;
        }
    }
    return str;
}
export function urlEncode(params: {[key:string]: any}): string{
    let resString = [];
    for(let k in params){
        if(params.hasOwnProperty(k)){
            let val = typeof params[k] === "object" ? JSON.stringify(params[k]) : params[k];
            resString.push(k + '=' + encodeURIComponent(val));
        }
    }
    return resString.join('&');
}
export function isInt(value: unknown): boolean{
    return typeof value === "number" && Math.floor(value) === value;
}
export function isOTP(value: unknown): boolean{
    return typeof value === "number" && value.toString().length === 6;
}
export function isEmail(email: unknown) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return typeof email === "string" && re.test(email);
}
export function isPassword(password: unknown) {
    return typeof password === "string" && password.length > 6;
}
export function getFormData(form: HTMLFormElement): {[key:string]: unknown} {
    let params:  {[key:string]: unknown} = {};
    if(form instanceof HTMLFormElement){
        for(let i = 0; i < form.elements.length; i ++) {
            let el = form.elements[i];
            // @ts-ignore
            if(!el.name) continue;
            if(el instanceof HTMLInputElement && el.type === "radio" && el.checked){
                params[el.name] = el.value;
            }
            else if(el instanceof HTMLInputElement && el.type === "file" ){
                params[el.name] = el.files;
            }
            else if(el instanceof HTMLInputElement){
                if(el.type === "checkbox"){
                    params[el.name] = el.checked;
                }
                else if(el.type === "number"){
                    params[el.name] = Number(el.value);
                }
                else{
                    params[el.name] = el.value.trim();
                }
            }
            else if(el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement){
                params[el.name] = el.value.trim();
            }
        }
    }
    return params;
}

export function format(text:string, args: any, remove = false){
    if (typeof args !== "object" || !args || !text) return text;
    return text.replace(/\{([a-zA-Z0-9_.,=)( ]+)\}/g, function (m, n) {
        let value = getValue(n, args);
        return value !== undefined
            ? value
            : remove ? "" : m
    })
}
function getValue(path: string, args: any) {
    let arr = path.split(".");
    let current = args;
    for(let i = 0; i < arr.length; i ++){
        if(current !== undefined){
            current = current[arr[i]];
        }
        else{
            return undefined;
        }
    }
    return current;
}
