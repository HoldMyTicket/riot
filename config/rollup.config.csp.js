const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const buble = require('rollup-plugin-buble')
const path = require('path')
const defaults = require('./defaults')

const tmplPath = path.resolve(process.cwd(), 'node_modules', 'riot-tmpl', 'dist', 'csp.tmpl.js')

module.exports = Object.assign(defaults, {
  plugins: [
    // Manual alias resolution instead of using the alias plugin
    {
      name: 'manual-alias',
      resolveId(id) {
        if (id === 'riot-tmpl') {
          return tmplPath
        }
        return null
      }
    },
    nodeResolve({ jsnext: true, main: true }),
    commonjs({
      include: 'node_modules/**'
    }),
    buble()
  ]
})