
<!--  
riotでデフォルトエスケープされるため、なにもせず{}とすると<br>などのタグがHTMLと認識されずそのまま表示されてしまう。
そのため、HTMLと認識させるためのタグとなります。

使い方は
```
<raw content="{ html }"
```
のようにする。

参考：http://riotjs.com/ja/guide/#テンプレート変数-expressions
-->
<raw>
  <span></span>

  <script>
  if(opts.content &&  opts.content.length > 0) {
    this.root.innerHTML = opts.content
  }
  </script>
</raw>