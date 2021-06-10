export declare function parseDec(val: string | number): number;
export declare function firstUpper(text: string): string;
export declare function pad(value: number | string, n: number): string;
export declare function time2string(timestamp: number, type?: string): string;
export declare function hsl2rgb(h: number, s: number, l: number, hex?: boolean): any;
export declare function deepCopy(obj: any): any;
export declare function getDigit(number: number): number;
export declare function ceilMinify(number: number, maxDigit: number): [number, string];
export declare function syncObjects(source: any, target: any): any;
export declare function copy2Clipboard(text?: string): void;
export declare function getPeriod(period?: string): number | undefined;
export declare function avarage(array: Array<any>): number | false;
export declare function parse<T>(str: T): T;
export declare function urlEncode(params: {
    [key: string]: any;
}): string;
export declare function isInt(value: unknown): boolean;
export declare function isOTP(value: string | number | boolean): boolean;
export declare function isEmail(email: unknown): boolean;
export declare function isPassword(password: unknown): boolean;
export declare function getFormData(form: HTMLFormElement): Record<string, any>;
export declare function randomInt(min: number, max: number): number;
export declare function mobileAndTabletCheck(): boolean;
export declare function format(text: string, args: any, remove?: boolean): string;
export declare function getValue(path: string, args: any): any;
export declare function submitValidation(pool: boolean[]): boolean;
export declare function debonce(value: number): (target: any, prop: string, descriptor: PropertyDescriptor) => {
    value: (...args: any[]) => any;
    configurable?: boolean | undefined;
    enumerable?: boolean | undefined;
    writable?: boolean | undefined;
    get?(): any;
    set?(v: any): void;
};
export declare function setCookie(name: string, value: string, options?: any): void;
export declare function getCookie(name: string): string;
export declare function deleteAllCookies(): void;
export declare function stringToHex(str: string): string;
export declare function hexTostring(str: string): string;
export declare function getTopic(str: string): string;
export declare function getScrollbarWidth(): number;
export declare const insertAfter: <T>(array: T[], index: number, item: T) => T[];
export declare const insertBefore: <T>(array: T[], index: number, item: T) => T[];
export declare const getEventDataset: (e: Event, selector: string, dataName: string) => string | undefined;
export declare const minifyString: (str: string | undefined, resultLength?: number, float?: 'center' | 'left' | 'right') => string;
export declare const HSLstringToRGB: (hslColor: string) => string;
