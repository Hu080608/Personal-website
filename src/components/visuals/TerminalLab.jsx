import { useEffect, useRef, useState } from 'react'
import { profile } from '../../config/profile'

const bootLines = [
  { type: 'system', text: 'HU080608//SHELL — 安全本地会话' },
  { type: 'muted', text: '连接已建立。输入 `help` 查看可用命令。' },
  { type: 'muted', text: '无网络访问。所有数据都打包在你的浏览器中。' },
]

const commandHelp = [
  ['help', '列出所有可用命令'],
  ['whoami', '输出操作者身份'],
  ['skills', '读取当前能力栈'],
  ['projects', '列出传输档案'],
  ['contact', '打开直接联系频道'],
  ['matrix', '请求一段诊断数据雨'],
  ['date', '读取本地系统时间'],
  ['sudo', '尝试提升权限'],
  ['clear', '清空终端缓冲区'],
]

/** A self-contained command console. All commands run locally in React state. */
export function TerminalLab() {
  const [lines, setLines] = useState(bootLines)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  const push = (items) => setLines((current) => [...current, ...items])

  const runCommand = (raw) => {
    const command = raw.trim().toLowerCase()
    if (!command) return

    setHistory((current) => [command, ...current].slice(0, 20))
    setHistoryIndex(-1)

    if (command === 'clear') {
      setLines([])
      return
    }

    const response = []
    const prompt = [{ type: 'command', text: `operator@nexus:~$ ${raw.trim()}` }]

    switch (command) {
      case 'help':
        response.push({ type: 'success', text: '命令索引' })
        commandHelp.forEach(([cmd, description]) => {
          response.push({ type: 'row', command: cmd, text: description })
        })
        break
      case 'whoami':
        response.push({ type: 'success', text: profile.meta.name })
        response.push({ type: 'muted', text: `${profile.meta.role} / ${profile.meta.location}` })
        response.push({ type: 'muted', text: profile.meta.tagline })
        break
      case 'skills':
        response.push({ type: 'success', text: '活跃模块' })
        profile.about.skillGroups.forEach((group) => {
          response.push({ type: 'muted', text: `› ${group.title}: ${group.items.join(' · ')}` })
        })
        break
      case 'projects':
        response.push({ type: 'success', text: '案例档案索引' })
        profile.projects.forEach((project, index) => {
          response.push({ type: 'muted', text: `${String(index + 1).padStart(2, '0')}  ${project.title} — ${project.category} / ${project.year}` })
        })
        break
      case 'contact':
        response.push({ type: 'success', text: '直接频道' })
        response.push({ type: 'muted', text: `GitHub  ${profile.meta.contactUrl}` })
        response.push({ type: 'muted', text: `联系  #/contact` })
        break
      case 'date':
        response.push({ type: 'muted', text: `本地时间  ${new Date().toLocaleString()}` })
        response.push({ type: 'muted', text: `时区      ${profile.meta.timezone}` })
        break
      case 'matrix':
        response.push({ type: 'success', text: '诊断数据雨' })
        for (let i = 0; i < 6; i += 1) {
          response.push({
            type: 'matrix',
            text: Array.from({ length: 36 }, () => (Math.random() > 0.48 ? '1' : '0')).join(' '),
          })
        }
        response.push({ type: 'muted', text: '未检测到异常。现实在名义上保持稳定。' })
        break
      case 'sudo':
        response.push({ type: 'error', text: '权限拒绝：这个控制台本来就在模拟内部。' })
        break
      case 'rm':
      case 'rm -rf /':
        response.push({ type: 'error', text: '大胆的举动。访问被拒绝，并已记入你的永久档案。' })
        break
      default:
        response.push({ type: 'error', text: `未找到命令：${command}` })
        response.push({ type: 'muted', text: '输入 `help` 查看本地命令集。' })
    }

    push([...prompt, ...response])
  }

  const onSubmit = (event) => {
    event.preventDefault()
    runCommand(input)
    setInput('')
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const next = Math.min(historyIndex + 1, history.length - 1)
      if (history[next]) {
        setHistoryIndex(next)
        setInput(history[next])
      }
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const next = historyIndex - 1
      if (next >= 0) {
        setHistoryIndex(next)
        setInput(history[next])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <div className="terminal-lab glass-panel" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-lab__chrome">
        <span className="terminal-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="mono-label">ghost-terminal / 本地</span>
        <span className="terminal-lab__secure"><span className="status-dot" /> 已加密</span>
      </div>
      <div className="terminal-lab__body" ref={bodyRef} aria-live="polite">
        {lines.map((line, index) => {
          if (line.type === 'row') {
            return (
              <div className="terminal-line terminal-line--row" key={`${line.command}-${index}`}>
                <span className="terminal-line__cmd">{line.command}</span>
                <span>{line.text}</span>
              </div>
            )
          }
          return (
            <div className={`terminal-line terminal-line--${line.type}`} key={`${line.text}-${index}`}>
              {line.type === 'command' ? <span className="terminal-line__prompt">›</span> : null}
              {line.text}
            </div>
          )
        })}
      </div>
      <form className="terminal-lab__form" onSubmit={onSubmit}>
        <label htmlFor="terminal-input" className="terminal-lab__prompt">operator@nexus:~$</label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck="false"
          placeholder="输入 help…"
          aria-label="终端命令"
        />
        <span className="terminal-lab__caret" aria-hidden="true" />
      </form>
    </div>
  )
}
