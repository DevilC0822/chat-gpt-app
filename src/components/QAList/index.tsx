import React, { ReactNode } from 'react'
import { Avatar, Collapse } from '@douyinfe/semi-ui'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import styles from './index.module.scss'
import reactSvg from '../../assets/react.svg'
import openaiSvg from '../../assets/openai.svg'

hljs.configure({
  ignoreUnescapedHTML: false,
  throwUnescapedHTML: false
})

interface Iprops {
  [propsName: string]: any
  question: string
  answer: string
}

function QaList(props: Iprops) {
  const { question, answer, ...otherProps } = props

  React.useEffect(() => {
    document.querySelectorAll('code').forEach(block => {
      try { hljs.highlightBlock(block) }
      catch (e) { console.log(e) }
    })
  })
  return (
    <div className={styles.QA} {...otherProps} >
      <div className={styles.question}>
        <Avatar src={reactSvg} />
        <p style={{ marginLeft: 20, marginTop: 3 }}>{question}</p>
      </div>
      <div className={styles.answer}>
        <Avatar src={openaiSvg} style={{ backgroundColor: '#10a37f' }} />
        <div dangerouslySetInnerHTML={{ __html: answer }} style={{ marginLeft: 20, width: 'calc(100% - 68px)', whiteSpace: 'break-spaces' }}>
        </div>
      </div>
    </div>
  )
}

export default QaList
