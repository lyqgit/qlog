
import localforage from 'localforage'
import { isObject,getTypeStr, isArray } from './utils'
import locale from './locale'

export enum Level {
    VerBose = 'VerBose',
    Info = 'Info',
    Warning = 'Warning',
    Error = 'Error'
}
export type ConifgOption = {
    root:HTMLElement,
    level?:Level,
    plugins?:Array<Function> | []
    locale?:String,
    zIndex?:Number,
    VerBoseStyle?:String
    InfoStyle?:String
    WarningStyle?:String
    ErrorStyle?:String
}

export type LogParam = {
    key:String,
    message?:any[] | any,
    style?:String,
    zIndex:Number
}

export default function qlog(option:ConifgOption){
    this.level = option.level??Level.VerBose
    this.locale = option.locale??'en'
    this.zIndex = option.zIndex??0
    this.VerBoseStyle = option.VerBoseStyle??''
    this.InfoStyle = option.InfoStyle??''
    this.WarningStyle = option.WarningStyle??''
    this.ErrorStyle = option.ErrorStyle??''
    
    this.localforage = localforage.createInstance({
        driver      : localforage.INDEXEDDB,
        name        : 'qlog',
        version     : 1.0,
        size        : 314572800,
        storeName   : 'qlog',
        description : 'websql'
    });
}

qlog.prototype.console = window.console

qlog.prototype.print = function<T>(key:String,message?:T){
    
    this.localforage.setItem(key,message).catch(err=>console.error(err))
    switch(getTypeStr(message)){
        case 'Array':
            console.table(message)
        case 'Boolean':
            console.log(locale[this.locale]['type'],'Boolean',message)
        case 'String':
            console.log(locale[this.locale]['type'],'String',message)
    }
}

qlog.prototype.log = function(param:LogParam){

    if(isObject(param)){
        console.log()
        if(isArray(param.message)){
            for(let i=9;i<param.message.length;i++){
                const arg = param.message[i]
                this.print(param.key,arg)
            }
        }else{
            this.print(param.key,param.message)
        }
    }else{
        throw new Error(locale[this.locale]['log-param-error'])
    }

    
    return this
}