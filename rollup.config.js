import riot from 'rollup-plugin-riot'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'postcss'
import postcssCssnext from 'postcss-cssnext'
import babel from 'rollup-plugin-babel'

// import buble from 'rollup-plugin-buble'
/**
 
 * bubleだと次のようなエラーがでてしまうので、一旦使用中止。
 * bableよりbubleの方がトランスパイル速度が早いらしいので、bubleで使えるようになったら戻したい
``` 
src/main.js → public/js/bundle.js...
[!] Error: Unexpected token
src/WhatsNew.js (26:10)
26:     async fetchWhatsNew (callback) {
              ^
```
*/

export default {
  input: 'src/main.js',
  output: {
    file: 'public/js/bundle.js',
    format: 'iife'
  },
  plugins: [
    riot({
      style: 'cssnext',
      parsers: {
        css: { cssnext }
      }
    }),
    nodeResolve({ jsnext: true }),
    commonjs(),
    babel()
  ]
}

/**
 * Transforms new CSS specs into more compatible CSS
 */
function cssnext (tagName, css) {
  // A small hack: it passes :scope as :root to PostCSS.
  // This make it easy to use css variables inside tags.
  css = css.replace(/:scope/g, ':root')
  css = postcss([postcssCssnext]).process(css).css
  css = css.replace(/:root/g, ':scope')
  return css
}