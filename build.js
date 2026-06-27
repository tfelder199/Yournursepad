const fs = require('fs');
const babel = require('@babel/core');

console.log('Building NursePad...');

const raw = fs.readFileSync('./index.html', 'utf8');
const src = raw.split('<script type="text/babel" data-presets="react,env">')[1].split('const root = ReactDOM')[0].trim();

const result = babel.transformSync(src, {
  presets: [
    ['@babel/preset-react', {}],
    ['@babel/preset-env', { targets: { browsers: ['last 2 versions', 'safari >= 14'] } }]
  ],
  filename: 'app.jsx'
});

const html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/><meta name="apple-mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-title" content="NursePad"/><meta name="theme-color" content="#E0638A"/><title>NursePad</title><style>*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}body{margin:0;padding:0;background:#FFF5F8}#root{min-height:100vh}input,textarea,select,button{font-family:inherit}@keyframes pulse{from{opacity:.3;transform:scaleX(.4)}to{opacity:1;transform:scaleX(1)}}</style></head><body><div id="root"><div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;gap:16px;background:#FFF5F8"><div style="font-size:60px">🩺</div><div style="font-size:26px;font-weight:700;color:#E0638A;font-family:Georgia,serif">NursePad</div><div style="width:48px;height:4px;background:#E0638A;border-radius:99px;animation:pulse 1s ease-in-out infinite alternate"></div></div></div><script src="https://unpkg.com/react@18/umd/react.production.min.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script><script>' + result.code + '</script><script>try{const root=ReactDOM.createRoot(document.getElementById("root"));root.render(React.createElement(App));}catch(e){document.getElementById("root").innerHTML="<div style=padding:20px;color:red>"+e.message+"</div>";}</script></body></html>';

fs.writeFileSync('./index.html', html);
console.log('Build complete! Size:', html.length);

