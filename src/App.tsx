import { useEffect, useState } from 'react'
import { Cloud } from "laf-client-sdk"
import { Input, Button } from '@douyinfe/semi-ui'
import styles from './App.module.scss'

function App() {
  // 创建 cloud 对象 这里需要将 <appid> 替换成自己的 App ID
  const cloud = new Cloud({
    baseUrl: "https://ddm0si.laf.dev",
    getAccessToken: () => "", // 这里不需要授权，先填空
    timeout: 60000,
  })

  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('hello')
  const [parentMessageId, setParentMessageId] = useState('')
  async function send() {

    // 我们提问的内容
    const message = question

    let res
    // 与云函数逻辑一样，有上下文 id 就传入
    if (!parentMessageId) {
      res = await cloud.invoke("send", { message })
    } else {
      res = await cloud.invoke("send", { message, parentMessageId: parentMessageId })
    }

    // 回复我们的内容在 res.text 
    setAnswer(res.text)
    console.log(res.text)

    // 这个是上下文 id
    setParentMessageId(res.id)
  }

  // useEffect(() => {
  //   send()
  // }, [])

  return (
    <div className={styles.App}>
      <p>
        {answer}
      </p>
      <div className={styles.questionBox}>
        <Input value={question} onChange={(value) => { setQuestion(value) }} style={{ width: 500, marginRight: 20 }}></Input>
        <Button onClick={send}>search</Button>
      </div>
    </div>
  )
}

export default App
