<h1 align="center" style="font-weight: bold;">qlog</h1> 

<p align="center">
    <a href="https://github.com/lyqgit/qlog/tree/main/README.md">English</a>&nbsp;&nbsp;
    <a href="https://github.com/lyqgit/qlog/tree/main/README.zh-hans.md">简体中文</a>&nbsp;&nbsp;
</p>

## 简介

简单整合控制台打印，展示打印内容的类型、内容、时间等，区分打包和开发环境

## 安装

```nodejs

npm i qlog -S

```

## 使用

```javascript

// umd
<script src="qlog.umd.js"></script>

const qlogObj = new qlog({
    level:qlog.level.VerBose,
    locale:'zh-cn',
    zIndex:99
});

```

```javascript

// es
import qlog from 'qlog';

const qlogObj = new qlog({
    level:qlog.level.VerBose,
    locale:'zh-cn',
    zIndex:99,
});

```

```javascript

// qlogObj.filter(3);
qlogObj.log('测试',123,{zIndex:100});
qlogObj.info('测试33',555);
qlogObj.warn('测试33',555);
qlogObj.error('测试33',555);
qlogObj.log('测试3555',[{t:1,b:2,c:3},123,[{t:1,b:2,c:3},{t:1,b:2,c:3}]],{zIndex:100,style:'font-size:20px'});

```

## 初始化参数

<table>
    <tr>
        <td>参数名</td>
        <td>作用</td>
        <td>是否必填</td>
        <td>默认值</td>
    <tr>
    <tr>
        <td>build</td>
        <td>判断是否为打包环境，true为打包环境，false为开发环境</td>
        <td>否</td>
        <td>false</td>
    <tr>
    <tr>
        <td>level</td>
        <td>打印等级</td>
        <td>否</td>
        <td>qlog.Level.VerBose</td>
    <tr>
    <tr>
        <td>locale</td>
        <td>语言</td>
        <td>否</td>
        <td>en</td>
    <tr>
    <tr>
        <td>zIndex</td>
        <td>打印层级，后续打印只显示比初始层级高的打印内容</td>
        <td>否</td>
        <td>1</td>
    <tr>
    <tr>
        <td>VerBoseStyle</td>
        <td>VerBose层级打印样式</td>
        <td>否</td>
        <td>undefined</td>
    <tr>
    <tr>
        <td>InfoStyle</td>
        <td>Info层级打印样式</td>
        <td>否</td>
        <td>undefined</td>
    <tr>
    <tr>
        <td>WarningStyle</td>
        <td>Warning层级打印样式</td>
        <td>否</td>
        <td>undefined</td>
    <tr>
    <tr>
        <td>ErrorStyle</td>
        <td>Error层级打印样式</td>
        <td>否</td>
        <td>undefined</td>
    <tr>
    <tr>
        <td>format</td>
        <td>显示时间格式（可以参考dayjs文档）</td>
        <td>否</td>
        <td>undefined</td>
    <tr>
</table>

## 方法

### log、info、warn、error

<table>
    <tr>
        <td>参数</td>
        <td>类型</td>
        <td>是否必填</td>
    <tr>
    <tr>
        <td>key</td>
        <td>string | number</td>
        <td>否（建议每次填入不同的key值以方便后续筛选）</td>
    <tr>
    <tr>
        <td>message</td>
        <td>any</td>
        <td>否</td>
    <tr>
    <tr>
        <td>param</td>
        <td>LogParam = {
                style?:string,
                zIndex?:number
            }
        </td>
        <td>否</td>
    <tr>
</table>

### filter

<table>
    <tr>
        <td>参数</td>
        <td>类型</td>
        <td>是否必填</td>
    <tr>
    <tr>
        <td>key</td>
        <td>string | number</td>
        <td>是</td>
    <tr>
</table>