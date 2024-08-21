import dayjs from 'dayjs/esm/index.js'
import { isObject,getTypeStr, isArray } from './utils'
import locale from './locale/index.ts'

enum Level {
    VerBose = 'VerBose',
    Info = 'Info',
    Warning = 'Warning',
    Error = 'Error'
}

enum LevelStyle {
    VerBose = 'background-color:#67C23A;color:#ffffff',
    Info = 'background-color:#909399;color:#ffffff',
    Warning = 'background-color:#E6A23C;color:#ffffff',
    Error = 'background-color:#F56C6C;color:#ffffff',
}

enum BorderRadiusStyle {
    ltb = 'border-radius:6px 0 0 6px',
    rtb = 'border-radius:0 6px 6px 0',
}

enum paddingStyle {
    all10 = 'padding:10px'
}

function addStyle(first:string,...more:string[]){
    let res = first
    if(isArray(more)){
        for(let i=0;i<more.length;i++){
            res+=';'
            res+=more[i]
        }
        return res

    }else{
        return res
    }
}

const TimeStyle = 'background-color:#409EFF;padding:10px;color:#ffffff'

type ConifgOption = {
    build?:boolean
    level?:Level,
    plugins?:Array<Function> | []
    locale?:string,
    zIndex?:number,
    VerBoseStyle?:string
    InfoStyle?:string
    WarningStyle?:string
    ErrorStyle?:string,
    format?:string
}

type LogParam = {
    style?:string,
    zIndex?:number
}

const space3 = '  '

export default function qlog(option?:ConifgOption){
    this.build = option?.build??false
    this.level = option?.level??Level.VerBose
    this.locale = option?.locale??'en'
    this.zIndex = option?.zIndex??1
    this.VerBoseStyle = option?.VerBoseStyle??undefined
    this.InfoStyle = option?.InfoStyle??undefined
    this.WarningStyle = option?.WarningStyle??undefined
    this.ErrorStyle = option?.ErrorStyle??undefined
    this.format = option?.format??undefined
}

qlog.level = Level

qlog.prototype.console = window.console

qlog.prototype.filter = function(key:string | number){
    this.filterKey = key
}

qlog.prototype.print = function<T>(message?:T,param?:LogParam){

    let styleStr = param?.style??''

    let that = this

    function innerPrint(type:string,message:any,styleStr?:string){
        console.log("%c"+locale[that.locale]['type']+space3+type+space3,styleStr)
        console.log(message)
    }
    // console.log('rpint-message',message)
    switch(getTypeStr(message)){
        case 'Array':
            console.log("%c"+locale[that.locale]['type']+space3+'Array'+space3,styleStr)
            console.table(message)
            break;
        case 'Boolean':
            innerPrint('Boolean',message,styleStr)
            break;
        case 'String':
            innerPrint('String',message,styleStr)
            break;
        case 'Null':
            innerPrint('Null',message,styleStr)
            break;
        case 'Undefined':
            innerPrint('Undefined',message,styleStr)
            break;
        case 'Number':
            innerPrint('Number',message,styleStr)
            break;
        case 'Symbol':
            innerPrint('Symbol',message,styleStr)
            break;
        case 'Object':
            innerPrint('Object',message,styleStr)
            break;
        case 'Dom':
            innerPrint('Dom',message,styleStr)
            break;
        default:
            innerPrint('any',message,styleStr)
            break;
    }
}

qlog.prototype.beforeLog = function(key:string | number,format:string = 'YYYY-MM-DD HH:mm:ss'){

    let curFormat = this.format??format

    console.log(
        "%c"+key+"%c"+locale[this.locale]['date']+':'+space3+dayjs().format(curFormat)+'%c'+locale[this.locale]['start'],
        addStyle(LevelStyle[this.level],BorderRadiusStyle.ltb,paddingStyle.all10),
        TimeStyle,
        addStyle(LevelStyle[this.level],BorderRadiusStyle.rtb,paddingStyle.all10),
    )
}

qlog.prototype.afterLog = function(key:string | number){
    console.log(
        "%c"+key+"%c"+locale[this.locale]['timestamp']+':'+space3+dayjs().unix()+'%c'+locale[this.locale]['end'],
        addStyle(LevelStyle[this.level],BorderRadiusStyle.ltb,paddingStyle.all10),
        TimeStyle,
        addStyle(LevelStyle[this.level],BorderRadiusStyle.rtb,paddingStyle.all10),
    )
}

qlog.prototype.log = function(key?:string | number,message?:any[] | any,param?:LogParam){
    this.baseLog(key,message,Level.VerBose,param)
}

qlog.prototype.info = function(key?:string | number,message?:any[] | any,param?:LogParam){
    this.baseLog(key,message,Level.Info,param)
}

qlog.prototype.warn = function(key?:string | number,message?:any[] | any,param?:LogParam){
    this.baseLog(key,message,Level.Warning,param)
}

qlog.prototype.error = function(key?:string | number,message?:any[] | any,param?:LogParam){
    this.baseLog(key,message,Level.Error,param)
}

qlog.prototype.baseLog = function(key?:string | number,message?:any[] | any,level?:Level,param?:LogParam){
    if(this.build){
        return
    }
    try{

        let zIndex = 1

        if(isObject(param)){
            // 先判断优先级
            zIndex = param?.zIndex??1
        }
        
        if(zIndex < this.zIndex){
            return
        }

        let curLevel = level??Level.VerBose

        if(this.level != curLevel){
            return
        }

        if(this.filterKey){
            if(!!key){
                if(!(key.toString().includes(this.filterKey))){
                    return
                }
            }else{
                return
            }
        }

        this.beforeLog(key)
        if(isArray(message)){
            for(let i=0;i<message.length;i++){
                const arg = message[i]
                this.print(arg,param)
            }
        }else{
            this.print(message,param)
        }
        this.afterLog(key)
    }catch(err){
        const curLocale = locale[this.locale]['log-param-error']
        throw new Error(curLocale+err)
    }

    
    return this
}