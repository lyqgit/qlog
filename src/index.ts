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
    VerBose = 'background-color:#67C23A;padding:10px;border-radius:6px 0 0 6px;color:#ffffff',
    Info = 'background-color:#909399;padding:10px;border-radius:6px 0 0 6px;color:#ffffff',
    Warning = 'background-color:#E6A23C;padding:10px;border-radius:6px 0 0 6px;color:#ffffff',
    Error = 'background-color:#F56C6C;padding:10px;border-radius:6px 0 0 6px;color:#ffffff'
}

const TimeStyle = 'background-color:#409EFF;padding:10px;border-radius:0 6px 6px 0;color:#ffffff'

type ConifgOption = {
    level?:Level,
    plugins?:Array<Function> | []
    locale?:string,
    zIndex?:Number,
    VerBoseStyle?:string
    InfoStyle?:string
    WarningStyle?:string
    ErrorStyle?:string
}

type LogParam = {
    style?:string,
    level?:Level,
    zIndex?:number
}

const space = '  '

export default function qlog(option?:ConifgOption){
    this.level = option?.level??Level.VerBose
    this.locale = option?.locale??'en'
    this.zIndex = option?.zIndex??0
    this.VerBoseStyle = option?.VerBoseStyle??''
    this.InfoStyle = option?.InfoStyle??''
    this.WarningStyle = option?.WarningStyle??''
    this.ErrorStyle = option?.ErrorStyle??''
}

qlog.prototype.console = window.console

qlog.prototype.print = function<T>(message?:T,param?:LogParam){

    let styleStr = param?.style??''
    

    let that = this

    function innerPrint(type:string,messsage:any,styleStr?:string){
        console.log("%c"+locale[that.locale]['type']+space+type+space+message,styleStr)
    }
    switch(getTypeStr(message)){
        case 'Array':
            console.table(message)
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
    console.log(
        "%c"+key+"%c"+locale[this.locale]['date']+space+dayjs().format(format)+space+locale[this.locale]['start'],
        LevelStyle[this.level],
        TimeStyle
    )
}

qlog.prototype.afterLog = function(key:string | number){
    console.log(
        "%c"+key+"%c"+locale[this.locale]['timestamp']+space+dayjs().unix()+space+locale[this.locale]['end'],
        LevelStyle[this.level],
        TimeStyle
    )
}

qlog.prototype.log = function(key?:string | number,message?:any[] | any,param?:LogParam){
    try{

        let zIndex = 1

        if(isObject(param)){
            // 先判断优先级
            zIndex = param?.zIndex??1
        }
        
        if(zIndex < this.zIndex){
            return
        }

        let level = param?.level??Level.VerBose

        if(this.level != level){
            return
        }

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
        const curLocale = locale[this.locale]['log-param-error']
        throw new Error(curLocale+err)
    }

    
    return this
}