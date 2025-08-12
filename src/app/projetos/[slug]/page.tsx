"use client"
import { useState, useMemo } from "react"
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
  Settings,
  Globe,
  ImageIcon,
  X,
  FileCode,
  Terminal,
  Lock,
  BookOpen,
  Package,
  File,
  Code,
  Search,
} from "lucide-react"

// Dados de exemplo
const fileSystemData = {
  _pastaraiz: {
    type: "directory",
    name: "meu-projeto-react",
    children: [
      {
        type: "file",
        name: "package.json",
        content:
          '{\n  "name": "meu-projeto-react",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "react-scripts start",\n    "build": "react-scripts build",\n    "test": "react-scripts test",\n    "eject": "react-scripts eject"\n  },\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "react-scripts": "5.0.1"\n  },\n  "devDependencies": {\n    "@types/react": "^18.0.0",\n    "@types/react-dom": "^18.0.0"\n  }\n}',
      },
      {
        type: "file",
        name: "README.md",
        content:
          "# Meu Projeto React\n\nEste é um projeto criado com Create React App.\n\n## Como executar\n\n```bash\nnpm install\nnpm start\n```\n\n## Scripts disponíveis\n\n- `npm start` - Executa o app em modo de desenvolvimento\n- `npm run build` - Cria uma versão otimizada para produção\n- `npm test` - Executa os testes\n- `npm run eject` - Remove a dependência do react-scripts",
      },
      {
        type: "directory",
        name: "public",
        children: [
          {
            type: "file",
            name: "index.html",
            content:
              '<!DOCTYPE html>\n<html lang="pt-BR">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <meta name="theme-color" content="#000000" />\n    <meta name="description" content="Meu projeto React" />\n    <title>Meu App React</title>\n  </head>\n  <body>\n    <noscript>Você precisa habilitar JavaScript para executar este app.</noscript>\n    <div id="root"></div>\n  </body>\n</html>',
          },
          {
            type: "file",
            name: "favicon.ico",
            content: "// Arquivo binário do favicon",
          },
          {
            type: "file",
            name: "manifest.json",
            content:
              '{\n  "short_name": "React App",\n  "name": "Meu Projeto React",\n  "icons": [\n    {\n      "src": "favicon.ico",\n      "sizes": "64x64 32x32 24x24 16x16",\n      "type": "image/x-icon"\n    }\n  ],\n  "start_url": ".",\n  "display": "standalone",\n  "theme_color": "#000000",\n  "background_color": "#ffffff"\n}',
          },
        ],
      },
      {
        type: "directory",
        name: "src",
        children: [
          {
            type: "file",
            name: "index.js",
            content:
              "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport './index.css';\nimport App from './App';\nimport reportWebVitals from './reportWebVitals';\n\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);\n\n// If you want to start measuring performance in your app, pass a function\n// to log results (for example: reportWebVitals(console.log))\n// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals\nreportWebVitals();",
          },
          {
            type: "file",
            name: "App.js",
            content:
              "import React, { useState, useEffect } from 'react';\nimport './App.css';\nimport Header from './components/Header';\nimport TodoList from './components/TodoList';\n\nfunction App() {\n  const [todos, setTodos] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    // Simula carregamento de dados\n    setTimeout(() => {\n      setTodos([\n        { id: 1, text: 'Aprender React', completed: false },\n        { id: 2, text: 'Criar um projeto', completed: true },\n        { id: 3, text: 'Fazer deploy', completed: false }\n      ]);\n      setLoading(false);\n    }, 1000);\n  }, []);\n\n  const addTodo = (text) => {\n    const newTodo = {\n      id: Date.now(),\n      text,\n      completed: false\n    };\n    setTodos([...todos, newTodo]);\n  };\n\n  const toggleTodo = (id) => {\n    setTodos(todos.map(todo => \n      todo.id === id ? { ...todo, completed: !todo.completed } : todo\n    ));\n  };\n\n  if (loading) {\n    return <div className=\"loading\">Carregando...</div>;\n  }\n\n  return (\n    <div className=\"App\">\n      <Header title=\"Minha Lista de Tarefas\" />\n      <TodoList \n        todos={todos} \n        onAddTodo={addTodo} \n        onToggleTodo={toggleTodo} \n      />\n    </div>\n  );\n}\n\nexport default App;",
          },
          {
            type: "file",
            name: "App.css",
            content:
              ".App {\n  text-align: center;\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.App-header {\n  background-color: #282c34;\n  padding: 20px;\n  color: white;\n  border-radius: 8px;\n  margin-bottom: 20px;\n}\n\n.loading {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n  font-size: 18px;\n  color: #666;\n}\n\nbutton {\n  background-color: #61dafb;\n  border: none;\n  padding: 10px 20px;\n  margin: 10px;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 16px;\n  transition: background-color 0.3s;\n}\n\nbutton:hover {\n  background-color: #21a9c7;\n}\n\nbutton:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}",
          },
          {
            type: "file",
            name: "index.css",
            content:
              "body {\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  background-color: #f5f5f5;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n    monospace;\n}\n\n* {\n  box-sizing: border-box;\n}\n\ninput {\n  padding: 8px 12px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n}\n\ninput:focus {\n  outline: none;\n  border-color: #61dafb;\n}",
          },
          {
            type: "directory",
            name: "components",
            children: [
              {
                type: "file",
                name: "Header.js",
                content:
                  "import React from 'react';\n\nconst Header = ({ title }) => {\n  return (\n    <header className=\"App-header\">\n      <h1>{title}</h1>\n      <p>Gerencie suas tarefas de forma eficiente</p>\n    </header>\n  );\n};\n\nexport default Header;",
              },
              {
                type: "file",
                name: "TodoList.js",
                content:
                  'import React, { useState } from \'react\';\nimport TodoItem from \'./TodoItem\';\n\nconst TodoList = ({ todos, onAddTodo, onToggleTodo }) => {\n  const [inputValue, setInputValue] = useState(\'\');\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    if (inputValue.trim()) {\n      onAddTodo(inputValue.trim());\n      setInputValue(\'\');\n    }\n  };\n\n  return (\n    <div className="todo-list">\n      <form onSubmit={handleSubmit} className="add-todo-form">\n        <input\n          type="text"\n          value={inputValue}\n          onChange={(e) => setInputValue(e.target.value)}\n          placeholder="Adicionar nova tarefa..."\n        />\n        <button type="submit">Adicionar</button>\n      </form>\n      \n      <div className="todos">\n        {todos.map(todo => (\n          <TodoItem\n            key={todo.id}\n            todo={todo}\n            onToggle={() => onToggleTodo(todo.id)}\n          />\n        ))}\n      </div>\n    </div>\n  );\n};\n\nexport default TodoList;',
              },
              {
                type: "file",
                name: "TodoItem.js",
                content:
                  "import React from 'react';\n\nconst TodoItem = ({ todo, onToggle }) => {\n  return (\n    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>\n      <input\n        type=\"checkbox\"\n        checked={todo.completed}\n        onChange={onToggle}\n      />\n      <span className=\"todo-text\">{todo.text}</span>\n    </div>\n  );\n};\n\nexport default TodoItem;",
              },
            ],
          },
        ],
      },
      {
        type: "directory",
        name: "node_modules",
        children: [
          {
            type: "directory",
            name: "react",
            children: [
              {
                type: "file",
                name: "package.json",
                content: '{\n  "name": "react",\n  "version": "18.2.0"\n}',
              },
            ],
          },
        ],
      },
    ],
  },
}

interface FileSystemItem {
  type: "file" | "directory"
  name: string
  content?: string
  children?: FileSystemItem[]
}

interface TreeNodeProps {
  item: FileSystemItem
  level: number
  path: string
  expandedDirs: Set<string>
  selectedFile: string | null
  searchTerm: string
  onToggleDir: (path: string) => void
  onSelectFile: (path: string, content: string, fileName: string) => void
}

interface SearchResult {
  path: string
  name: string
  type: "file" | "directory"
  content?: string
  matchType: "filename" | "content" | "both"
  matches?: ContentMatch[]
}

interface ContentMatch {
  lineNumber: number
  lineContent: string
  matchStart: number
  matchEnd: number
}

type SearchMode = "filename" | "content" | "both"

function getFileIcon(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase()
  const baseName = fileName.toLowerCase()

  // Casos especiais por nome completo
  if (baseName === "readme.md") return <BookOpen className="w-4 h-4 text-blue-400" />
  if (baseName === "package.json") return <Package className="w-4 h-4 text-green-400" />
  if (baseName === ".gitignore") return <File className="w-4 h-4 text-gray-400" />

  // Por extensão
  switch (extension) {
    case "js":
      return <FileCode className="w-4 h-4 text-yellow-400" />
    case "jsx":
      return <FileCode className="w-4 h-4 text-blue-400" />
    case "ts":
      return <FileCode className="w-4 h-4 text-blue-500" />
    case "tsx":
      return <FileCode className="w-4 h-4 text-blue-500" />
    case "json":
      return <Settings className="w-4 h-4 text-yellow-400" />
    case "html":
      return <Globe className="w-4 h-4 text-orange-400" />
    case "css":
    case "scss":
    case "sass":
      return <FileCode className="w-4 h-4 text-blue-300" />
    case "md":
      return <FileText className="w-4 h-4 text-blue-400" />
    case "env":
      return <Settings className="w-4 h-4 text-green-400" />
    case "lock":
    case "log":
      return <Lock className="w-4 h-4 text-gray-400" />
    case "png":
    case "jpg":
    case "jpeg":
    case "svg":
    case "gif":
      return <ImageIcon className="w-4 h-4 text-green-400" />
    case "ico":
      return <ImageIcon className="w-4 h-4 text-gray-400" />
    case "pdf":
      return <FileText className="w-4 h-4 text-red-400" />
    case "txt":
      return <FileText className="w-4 h-4 text-gray-300" />
    case "sh":
    case "bash":
      return <Terminal className="w-4 h-4 text-green-500" />
    case "yml":
    case "yaml":
      return <Settings className="w-4 h-4 text-red-300" />
    case "py":
      return <FileCode className="w-4 h-4 text-green-300" />
    case "java":
      return <FileCode className="w-4 h-4 text-orange-500" />
    case "php":
      return <FileCode className="w-4 h-4 text-purple-300" />
    case "rb":
      return <FileCode className="w-4 h-4 text-red-400" />
    case "go":
      return <FileCode className="w-4 h-4 text-cyan-400" />
    case "rs":
      return <FileCode className="w-4 h-4 text-orange-600" />
    case "c":
    case "cpp":
    case "h":
      return <FileCode className="w-4 h-4 text-blue-500" />
    case "dockerfile":
      return <Settings className="w-4 h-4 text-blue-600" />
    case "xml":
      return <FileCode className="w-4 h-4 text-orange-300" />
    case "zip":
    case "rar":
    case "7z":
      return <Package className="w-4 h-4 text-purple-400" />
    default:
      return <File className="w-4 h-4 text-gray-300" />
  }
}

function searchInContent(content: string, searchTerm: string): ContentMatch[] {
  const matches: ContentMatch[] = []
  const lines = content.split("\n")
  const searchLower = searchTerm.toLowerCase()

  lines.forEach((line, index) => {
    const lineLower = line.toLowerCase()
    let startIndex = 0

    while (true) {
      const matchIndex = lineLower.indexOf(searchLower, startIndex)
      if (matchIndex === -1) break

      matches.push({
        lineNumber: index + 1,
        lineContent: line,
        matchStart: matchIndex,
        matchEnd: matchIndex + searchTerm.length,
      })

      startIndex = matchIndex + 1
    }
  })

  return matches
}

function searchFiles(
  item: FileSystemItem,
  searchTerm: string,
  searchMode: SearchMode,
  currentPath = "",
): SearchResult[] {
  const results: SearchResult[] = []
  const fullPath = currentPath ? `${currentPath}/${item.name}` : item.name

  // Busca por nome de arquivo
  const filenameMatches = item.name.toLowerCase().includes(searchTerm.toLowerCase())

  if (filenameMatches && (searchMode === "filename" || searchMode === "both")) {
    results.push({
      path: fullPath,
      name: item.name,
      type: item.type,
      content: item.content,
      matchType: "filename",
    })
  }

  // Busca por conteúdo (apenas para arquivos)
  if (item.type === "file" && item.content && (searchMode === "content" || searchMode === "both")) {
    const contentMatches = searchInContent(item.content, searchTerm)

    if (contentMatches.length > 0) {
      const existingResult = results.find((r) => r.path === fullPath)
      if (existingResult) {
        existingResult.matchType = "both"
        existingResult.matches = contentMatches
      } else {
        results.push({
          path: fullPath,
          name: item.name,
          type: item.type,
          content: item.content,
          matchType: "content",
          matches: contentMatches,
        })
      }
    }
  }

  // Busca recursiva em diretórios
  if (item.type === "directory" && item.children) {
    for (const child of item.children) {
      results.push(...searchFiles(child, searchTerm, searchMode, fullPath))
    }
  }

  return results
}

function itemMatchesSearch(item: FileSystemItem, searchTerm: string, searchMode: SearchMode): boolean {
  if (!searchTerm) return true

  // Verifica nome do arquivo
  const filenameMatches = item.name.toLowerCase().includes(searchTerm.toLowerCase())
  if (filenameMatches && (searchMode === "filename" || searchMode === "both")) {
    return true
  }

  // Verifica conteúdo do arquivo
  if (item.type === "file" && item.content && (searchMode === "content" || searchMode === "both")) {
    const contentMatches = searchInContent(item.content, searchTerm)
    if (contentMatches.length > 0) {
      return true
    }
  }

  // Verifica filhos recursivamente
  if (item.type === "directory" && item.children) {
    return item.children.some((child) => itemMatchesSearch(child, searchTerm, searchMode))
  }

  return false
}

function TreeNode({
  item,
  level,
  path,
  expandedDirs,
  selectedFile,
  searchTerm,
  onToggleDir,
  onSelectFile,
}: TreeNodeProps) {
  const isExpanded = expandedDirs.has(path)
  const isSelected = selectedFile === path
  const matchesSearch = itemMatchesSearch(item, searchTerm, "both")

  if (!matchesSearch) return null

  if (item.type === "directory") {
    return (
      <div>
        <div
          className={`flex items-center gap-1 py-0.5 px-2 cursor-pointer hover:bg-gray-700 text-gray-200 text-sm ${
            searchTerm && item.name.toLowerCase().includes(searchTerm.toLowerCase()) ? "bg-yellow-900/30" : ""
          }`}
          onClick={() => onToggleDir(path)}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
        >
          {isExpanded ? (
            <ChevronDown className="w-3 h-3 text-gray-400" />
          ) : (
            <ChevronRight className="w-3 h-3 text-gray-400" />
          )}
          {isExpanded ? (
            <FolderOpen className="w-4 h-4 text-blue-400 mr-1" />
          ) : (
            <Folder className="w-4 h-4 text-blue-400 mr-1" />
          )}
          <span className="truncate">{item.name}</span>
        </div>

        {isExpanded && item.children && (
          <div>
            {item.children.map((child, index) => (
              <TreeNode
                key={`${path}/${child.name}`}
                item={child}
                level={level + 1}
                path={`${path}/${child.name}`}
                expandedDirs={expandedDirs}
                selectedFile={selectedFile}
                searchTerm={searchTerm}
                onToggleDir={onToggleDir}
                onSelectFile={onSelectFile}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`flex items-center gap-1 py-0.5 px-2 cursor-pointer hover:bg-gray-700 text-sm ${
        isSelected ? "bg-gray-600 text-white" : "text-gray-200"
      } ${searchTerm && item.name.toLowerCase().includes(searchTerm.toLowerCase()) ? "bg-yellow-900/30" : ""}`}
      onClick={() => onSelectFile(path, item.content || "", item.name)}
      style={{ paddingLeft: `${level * 12 + 20}px` }}
    >
      {getFileIcon(item.name)}
      <span className="truncate ml-1">{item.name}</span>
    </div>
  )
}

interface SearchResultsProps {
  results: SearchResult[]
  selectedFile: string | null
  searchTerm: string
  onSelectFile: (path: string, content: string, fileName: string) => void
}

function SearchResults({ results, selectedFile, searchTerm, onSelectFile }: SearchResultsProps) {
  if (results.length === 0) {
    return <div className="p-4 text-center text-gray-400 text-sm">Nenhum resultado encontrado</div>
  }

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text

    const regex = new RegExp(`(${searchTerm})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-400 text-black px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="py-2">
      <div className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wide">
        {results.length} resultado{results.length !== 1 ? "s" : ""}
      </div>
      {results.map((result, index) => (
        <div key={index} className="mb-2">
          <div
            className={`flex items-center gap-2 py-1 px-3 cursor-pointer hover:bg-gray-700 text-sm ${
              selectedFile === result.path ? "bg-gray-600 text-white" : "text-gray-200"
            }`}
            onClick={() => {
              if (result.type === "file") {
                onSelectFile(result.path, result.content || "", result.name)
              }
            }}
          >
            {result.type === "directory" ? <Folder className="w-4 h-4 text-blue-400" /> : getFileIcon(result.name)}
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate">{highlightText(result.name, searchTerm)}</span>
                <div className="flex gap-1">
                  {result.matchType === "filename" && (
                    <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded">Nome</span>
                  )}
                  {result.matchType === "content" && (
                    <span className="text-xs bg-green-600 text-white px-1.5 py-0.5 rounded">Conteúdo</span>
                  )}
                  {result.matchType === "both" && (
                    <>
                      <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded">Nome</span>
                      <span className="text-xs bg-green-600 text-white px-1.5 py-0.5 rounded">Conteúdo</span>
                    </>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-500 truncate">{result.path}</span>
            </div>
          </div>

          {result.matches && result.matches.length > 0 && (
            <div className="ml-9 mt-1 space-y-1">
              {result.matches.slice(0, 3).map((match, matchIndex) => (
                <div key={matchIndex} className="text-xs text-gray-400 bg-gray-800 p-2 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-blue-400">Linha {match.lineNumber}:</span>
                  </div>
                  <div className="font-mono text-gray-300 overflow-hidden">
                    {highlightText(match.lineContent.trim(), searchTerm)}
                  </div>
                </div>
              ))}
              {result.matches.length > 3 && (
                <div className="text-xs text-gray-500 ml-2">
                  +{result.matches.length - 3} mais ocorrência{result.matches.length - 3 !== 1 ? "s" : ""}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

interface FileViewerProps {
  fileName: string
  content: string
  searchTerm: string
  onClose: () => void
}

function FileViewer({ fileName, content, searchTerm, onClose }: FileViewerProps) {
  const lines = content.split("\n")

  const highlightLine = (line: string, searchTerm: string) => {
    if (!searchTerm) return line

    const regex = new RegExp(`(${searchTerm})`, "gi")
    const parts = line.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-400 text-black px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex items-center bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-r border-gray-700">
          {getFileIcon(fileName)}
          <span className="text-gray-200 text-sm">{fileName}</span>
          <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded p-0.5">
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="bg-gray-900 text-gray-500 text-xs font-mono py-4 px-2 border-r border-gray-700 select-none">
          {lines.map((_, index) => (
            <div key={index} className="text-right leading-6 h-6">
              {index + 1}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-auto">
          <pre className="p-4 text-sm font-mono text-gray-100 leading-6">
            <code>
              {lines.map((line, index) => (
                <div key={index} className="leading-6">
                  {highlightLine(line, searchTerm)}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default function FileExplorer() {
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(["_pastaraiz", "_pastaraiz/src"]))
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [selectedContent, setSelectedContent] = useState<string>("")
  const [selectedFileName, setSelectedFileName] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [searchMode, setSearchMode] = useState<SearchMode>("both")

  const handleToggleDir = (path: string) => {
    const newExpanded = new Set(expandedDirs)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedDirs(newExpanded)
  }

  const handleSelectFile = (path: string, content: string, fileName: string) => {
    setSelectedFile(path)
    setSelectedContent(content)
    setSelectedFileName(fileName)
  }

  const handleCloseFile = () => {
    setSelectedFile(null)
    setSelectedContent("")
    setSelectedFileName("")
  }

  const rootItem = fileSystemData._pastaraiz as FileSystemItem

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return []
    return searchFiles(rootItem, searchTerm, searchMode, "_pastaraiz")
  }, [searchTerm, searchMode, rootItem])

  const effectiveExpandedDirs = useMemo(() => {
    if (!searchTerm.trim()) return expandedDirs

    const autoExpanded = new Set(expandedDirs)
    searchResults.forEach((result) => {
      const pathParts = result.path.split("/")
      let currentPath = ""
      pathParts.forEach((part, index) => {
        if (index === pathParts.length - 1) return
        currentPath = currentPath ? `${currentPath}/${part}` : part
        autoExpanded.add(currentPath)
      })
    })

    return autoExpanded
  }, [expandedDirs, searchTerm, searchResults])

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-3 border-b border-gray-700">
          <h2 className="text-gray-200 text-sm font-medium uppercase tracking-wide mb-3">Explorer</h2>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar arquivos e conteúdo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-600"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-1 text-xs">
            <button
              onClick={() => setSearchMode("both")}
              className={`px-2 py-1 rounded ${
                searchMode === "both" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Ambos
            </button>
            <button
              onClick={() => setSearchMode("filename")}
              className={`px-2 py-1 rounded ${
                searchMode === "filename" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Nome
            </button>
            <button
              onClick={() => setSearchMode("content")}
              className={`px-2 py-1 rounded ${
                searchMode === "content" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Conteúdo
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {searchTerm.trim() ? (
            <SearchResults
              results={searchResults}
              selectedFile={selectedFile}
              searchTerm={searchTerm}
              onSelectFile={handleSelectFile}
            />
          ) : (
            <div className="py-2">
              <TreeNode
                item={rootItem}
                level={0}
                path="_pastaraiz"
                expandedDirs={effectiveExpandedDirs}
                selectedFile={selectedFile}
                searchTerm={searchTerm}
                onToggleDir={handleToggleDir}
                onSelectFile={handleSelectFile}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedFile ? (
          <FileViewer
            fileName={selectedFileName}
            content={selectedContent}
            searchTerm={searchTerm}
            onClose={handleCloseFile}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-gray-400 mb-2">Explorador de Arquivos</h2>
              <p className="text-gray-500">Selecione um arquivo para visualizar seu conteúdo</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}