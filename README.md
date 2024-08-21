<p style="font-weight: bold;font-size:60px;text-align:center">qlog</p> 

<p align="center">
    <a href="https://github.com/lyqgit/qlog/tree/main/README.md">English</a>&nbsp;&nbsp;
    <a href="https://github.com/lyqgit/qlog/tree/main/README.zh-hans.md">简体中文</a>&nbsp;&nbsp;
</p>

## introduction

simple integration of console printing, displaying the type, content, time, etc. of printed content, distinguishing packaging and development environments

## install

```nodejs

npm i qlog -S

```

## use

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

## initialize parameters

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

## method

### log、info、warn、error

<table>
    <tr>
        <td>parameter</td>
        <td>type</td>
        <td>whether</td>
    <tr>
    <tr>
        <td>key</td>
        <td>string | number</td>
        <td>false（Suggest filling in different key values each time to facilitate subsequent filtering）</td>
    <tr>
    <tr>
        <td>message</td>
        <td>any</td>
        <td>false</td>
    <tr>
    <tr>
        <td>param</td>
        <td>LogParam = {
                style?:string,
                zIndex?:number
            }
        </td>
        <td>false</td>
    <tr>
</table>

### filter

<table>
    <tr>
        <td>parameter</td>
        <td>type</td>
        <td>whether</td>
    <tr>
    <tr>
        <td>key</td>
        <td>string | number</td>
        <td>true</td>
    <tr>
</table>