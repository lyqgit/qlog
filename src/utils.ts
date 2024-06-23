
export function getType(input:any):string{
    return Object.prototype.toString.call(input)
}

export function getTypeStr(input:any){
    return getType(input).replace('[object ','').replace(']','')
}

export function isArray(input:any):boolean{
    return getType(input) === '[object Array]'
}

export function isNumber(input:any):boolean{
    return getType(input) === '[object Number]'
}

export function isString(input:any):boolean{
    return getType(input) === '[object String]'
}

export function isNull(input:any):boolean{
    return getType(input) === '[object Null]'
}

export function isUndefined(input:any):boolean{
    return getType(input) === '[object Undefined]'
}

export function isBoolean(input:any):boolean{
    return getType(input) === '[object Boolean]'
}

export function isSymbol(input:any):boolean{
    return getType(input) === '[object Symbol]'
}

export function isObject(input:any):boolean{
    return getType(input) === '[object Object]'
}