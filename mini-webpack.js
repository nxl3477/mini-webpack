import fs from 'fs'
import path from 'path'
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import { transformFromAst } from "@babel/core";
import ejs from 'ejs'

let id = 0


function createAsset (filePath) {
  const source = fs.readFileSync(filePath, {
    encoding: 'utf-8'
  })

  // 要设定 sourcetype 
  const ast = parser.parse(source, {
    sourceType: 'module'
  })

  const deps = []
  traverse.default(ast, {
    ImportDeclaration(path) {
      const node = path.node
      // 检测到的依赖都添加到数组里
      deps.push(node.source.value)
    }
  })

  const { code } = transformFromAst(ast, source, {
    "presets": ["@babel/preset-env"]
  })



  return {
    filePath,
    mapping: {},
    code,
    deps,
    id: id++
  }
}

function createGraph() {
  const mainAsset = createAsset('./example/index.js')
  
  // 执行广度优先遍历
  const queue = [mainAsset]

  for (const asset of queue) {
    // asset是当前资源
    asset.deps.forEach(relativePath => {
      const child = createAsset(path.resolve('./example', relativePath)) 
      asset.mapping[relativePath] = child.id
      queue.push(child)
    })
  }

  return queue
}

// 生成graph
const graph = createGraph()


function build (graph ) {
  const template = fs.readFileSync('./bundle.ejs', { encoding: 'utf-8' })
  
  const ejsData = graph.map(asset => ({
    filePath: asset.filePath,
    code: asset.code,
    id: asset.id,
    mapping: asset.mapping
  }))

  const code = ejs.render(template, { ejsData })

  fs.writeFileSync('./dist/bundle.js', code)
}


build(graph)