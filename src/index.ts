import dayjs from 'dayjs'
import { isObject,getTypeStr, isArray } from './utils'
import locale from './locale'

export enum Level {
    VerBose = 'VerBose',
    Info = 'Info',
    Warning = 'Warning',
    Error = 'Error'
}

export enum LevelStyle {
    VerBose = 'background-color:#67C23A;padding:10px;border-radius:6px',
    Info = 'background-color:#909399;padding:10px;border-radius:6px',
    Warning = 'background-color:#E6A23C;padding:10px;border-radius:6px',
    Error = 'background-color:#F56C6C;padding:10px;border-radius:6px'
}

const TimeStyle = 'background-color:#409EFF;padding:10px;border-radius:6px'

export type ConifgOption = {
    root:HTMLElement,
    level?:Level,
    plugins?:Array<Function> | []
    locale?:string,
    zIndex?:Number,
    VerBoseStyle?:string
    InfoStyle?:string
    WarningStyle?:string
    ErrorStyle?:string
}

export type LogParam = {
    style?:string,
    level?:Level,
    zIndex?:number
}

export type PreLogParam = {
    style?:string
}

export default function qlog(option:ConifgOption){
    this.level = option.level??Level.VerBose
    this.locale = option.locale??'en'
    this.zIndex = option.zIndex??0
    this.VerBoseStyle = option.VerBoseStyle??''
    this.InfoStyle = option.InfoStyle??''
    this.WarningStyle = option.WarningStyle??''
    this.ErrorStyle = option.ErrorStyle??''
}

qlog.prototype.console = window.console

qlog.prototype.print = function<T>(message?:T,param?:LogParam){

    let styleStr = ''
    let level:Level = Level.VerBose
    let zIndex = 1

    if(isObject(param)){
        // 先判断优先级
        zIndex = param?.zIndex??1
        if(zIndex >= this.zIndex){
            styleStr = param?.style??''
            level = param?.level??Level.VerBose
        }else{
            return
        }
    }

    function innerPrint(type:string,messsage:any,styleStr?:string){
        console.log("%c"+locale[this.locale]['type']+'Boolean'+message,styleStr)
    }
    
    switch(getTypeStr(message)){
        case 'Array':
            console.table(message)
        case 'Boolean':
            innerPrint('Boolean'+message,styleStr)
        case 'String':
            innerPrint('String'+message,styleStr)
        case 'Null':
            innerPrint('Null'+message,styleStr)
        case 'Undefined':
            innerPrint('Undefined'+message,styleStr)
        case 'Number':
            innerPrint('Number'+message,styleStr)
        case 'Symbol':
            innerPrint('Symbol'+message,styleStr)
        case 'Object':
            innerPrint('Object'+message,styleStr)
        case 'Dom':
            innerPrint('Dom'+message,styleStr)
        default:
            innerPrint('any'+message,styleStr)
    }
}

qlog.prototype.beforeLog = function(key:string | number,format:string = 'YYYY-MM-DD HH:mm:ss'){
    console.log(
        "%c"+key+"%c"+dayjs().format(format)+locale[this.locale]['start'],
        LevelStyle[this.level],
        TimeStyle
    )
}

qlog.prototype.afterLog = function(key:string | number){
    console.log(
        "%c"+key+"%c"+locale[this.locale]['end'],
        LevelStyle[this.level],
        TimeStyle
    )
}

qlog.prototype.log = function(key?:string | number,message?:any[] | any,param?:LogParam){

    try{
        this.beforeLog(key)
        if(isArray(message)){
            for(let i=9;i<message.length;i++){
                const arg = message[i]
                this.print(arg,param)
            }
        }else{
            this.print(message,param)
        }
        this.afterLog(key)
    }catch(err){
        throw new Error(locale[this.locale]['log-param-error']+err)
    }

    
    return this
}