const fs = require('fs');
const babel = require('@babel/core');

console.log('Building NursePad...');

const src = fs.readFileSync('./nursepad_source.js', 'utf8');

const result = babel.transformSync(src, {
  presets: [
    ['@babel/preset-react', {}],
    ['@babel/preset-env', { 
      targets: { browsers: ['last 2 versions', 'safari >= 14'] }
    }]
  ],
  filename: 'app.jsx'
});
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-title" content="NursePad"/>
  <meta name="theme-color" content="#E0638A"/>
  <title>NursePad</title>
  <style>
    *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
    body{margin:0;padding:0;background:#FFF5F8}
    #root{min-height:100vh}
    input,textarea,select,button{font-family:inherit}
    @keyframes pulse{from{opacity:.3;transform:scaleX(.4)}to{opacity:1;transform:scaleX(1)}}
  </style>
</head>
<body>
  <div id="root">
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;gap:16px;background:#FFF5F8">
      <div style="font-size:60px">

