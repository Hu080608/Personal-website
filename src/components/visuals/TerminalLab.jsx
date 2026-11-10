import { useEffect, useRef, useState } from 'react'
import { profile } from '../../config/profile'

const bootLines = [
  { type: 'system', text: 'NEXUS//SHELL v4.2.0 — secure local session' },
  { type: 'muted', text: 'Connection established. Type `help` for available commands.' },
  { type: 'muted', text: 'No network access. All data is packaged in your browser.' },
]

const commandHelp = [
  ['help', 'List every available command'],
  ['whoami', 'Print operator identity'],
  ['skills', 'Read the active capability stack'],
  ['projects', 'List transmitted case files'],
  ['contact', 'Open a direct channel'],
  ['matrix', 'Request a diagnostic rain sample'],
  ['date', 'Read local system time'],
  ['sudo', 'Attempt elevated access'],
  ['clear', 'Clear the terminal buffer'],
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
        response.push({ type: 'success', text: 'COMMAND INDEX' })
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
        response.push({ type: 'success', text: 'ACTIVE MODULES' })
        profile.about.skillGroups.forEach((group) => {
          response.push({ type: 'muted', text: `› ${group.title}: ${group.items.join(' · ')}` })
        })
        break
      case 'projects':
        response.push({ type: 'success', text: 'CASE FILE INDEX' })
        profile.projects.forEach((project, index) => {
          response.push({ type: 'muted', text: `${String(index + 1).padStart(2, '0')}  ${project.title} — ${project.category} / ${project.year}` })
        })
        break
      case 'contact':
        response.push({ type: 'success', text: 'DIRECT CHANNEL' })
        response.push({ type: 'muted', text: `MAIL  ${profile.meta.email}` })
        response.push({ type: 'muted', text: `SITE  #/contact` })
        break
      case 'date':
        response.push({ type: 'muted', text: `LOCAL TIME  ${new Date().toLocaleString()}` })
        response.push({ type: 'muted', text: `TIMEZONE    ${profile.meta.timezone}` })
        break
      case 'matrix':
        response.push({ type: 'success', text: 'DIAGNOSTIC RAIN' })
        for (let i = 0; i < 6; i += 1) {
          response.push({
            type: 'matrix',
            text: Array.from({ length: 36 }, () => (Math.random() > 0.48 ? '1' : '0')).join(' '),
          })
        }
        response.push({ type: 'muted', text: 'No anomalies detected. Reality remains nominally stable.' })
        break
      case 'sudo':
        response.push({ type: 'error', text: 'PERMISSION DENIED: this console is already inside the simulation.' })
        break
      case 'rm':
      case 'rm -rf /':
        response.push({ type: 'error', text: 'A bold move. Access denied, and noted in your permanent record.' })
        break
      default:
        response.push({ type: 'error', text: `Command not found: ${command}` })
        response.push({ type: 'muted', text: 'Type `help` to list the local command set.' })
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
        <span className="mono-label">ghost-terminal / local</span>
        <span className="terminal-lab__secure"><span className="status-dot" /> ENCRYPTED</span>
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
          placeholder="type help…"
          aria-label="Terminal command"
        />
        <span className="terminal-lab__caret" aria-hidden="true" />
      </form>
    </div>
  )
}
