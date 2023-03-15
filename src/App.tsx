import { useEffect, useState } from 'react'
import { Cloud } from "laf-client-sdk"
import { Input, Button, Divider } from '@douyinfe/semi-ui'
import { marked } from 'marked'
import QaList from './components/QAList'
import styles from './App.module.scss'

interface IQaList {
  question: string
  answer: string
}

function App() {
  // 创建 cloud 对象 这里需要将 <appid> 替换成自己的 App ID
  const cloud = new Cloud({
    baseUrl: "https://ddm0si.laf.dev",
    getAccessToken: () => "", // 这里不需要授权，先填空
    timeout: 60000,
  })

  const [question, setQuestion] = useState('')
  const [parentMessageId, setParentMessageId] = useState('')
  const [qaList, setQaList] = useState<IQaList[]>([])

  const search = () => {
    setQaList([...qaList, {
      question,
      answer: marked('loading'),
    }])
    send()
  }
  async function send() {
    // 我们提问的内容
    const message = question
    setQuestion('')
    let res
    // 与云函数逻辑一样，有上下文 id 就传入
    if (!parentMessageId) {
      res = await cloud.invoke("send", { message })
    } else {
      res = await cloud.invoke("send", { message, parentMessageId: parentMessageId })
    }
    // 回复我们的内容在 res.text 
    setQaList([...qaList, {
      question,
      answer: marked(res.text),
    }])
    // 这个是上下文 id
    setParentMessageId(res.id)
  }
  function setScreen() {
    setTimeout(() => {
      const answerEl = document.getElementById('answerBox')!
      answerEl.scrollTop = answerEl.offsetHeight
    }, 0)
  }
  useEffect(() => {
    setScreen()
  }, [qaList])

  return (
    <div className={styles.App}>
      <div id='answerBox' className={styles.answerBox}>
        {
          qaList.map((qa, index) => (
            <div key={index}>
              <QaList question={qa.question} answer={qa.answer} style={{ marginTop: index === 0 ? 0 : 20 }} />
              {
                index !== qaList.length - 1 && <Divider margin='12px' />
              }
            </div>
          ))
        }
      </div>
      <div className={styles.questionBox}>
        <Input placeholder={'输入你的指令'} value={question} onChange={(value) => { setQuestion(value) }} style={{ marginRight: 20 }}></Input>
        <Button onClick={search}>search</Button>
      </div>
    </div>
  )
}

export default App
