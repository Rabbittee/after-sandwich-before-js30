import { useState } from 'react'
import Task from "../components/Task"
import clsx from "clsx"
function QuestionOne(){
  return (
    <>
      <Task.Question
          title="題目一:"
          task={()=>(<>
            找到全台當下最低溫的點，並列出
            <span className="bg-blue-900 text-white">縣市</span>
            <span className="bg-blue-900 text-white">行政區</span>
            <span className="bg-blue-900 text-white">測站名稱</span>
            <span className="bg-blue-900 text-white">溫度</span>
            <span className="bg-blue-900 text-white">座標</span>
            <small className="block">(透過中央氣象局ＡＰＩ取得全台測站即時資料)</small>
            <small className="block">(API: v1/rest/datastore/O-A0001-001)</small>
          </>)}
        />
        <Task.Anwser></Task.Anwser>
    </>
  )
}
function QuestionTwo(){
  return (
    <>
      <Task.Question
        title="題目二:"
        task={()=>(<>
          同上，針對不同海拔高度找出最低溫測站，每<span className="bg-blue-900 text-white">500m</span>
          一組，並回傳object<small className="block">(API: v1/rest/datastore/O-A0001-001)</small>
        </>)}
      />
      <Task.Anwser></Task.Anwser>
    </>
  )
}
function QuestionThree(){
  return (
    <>
      <Task.Question
        title="題目三:格式自己定辣，我懶"
        task={()=>(<>
          近<span className="bg-blue-900 text-white">24小時</span>降雨量
          <span className="bg-blue-900 text-white">前20名</span>是哪些？<br/>
          分別統計整理列在哪些<span className="bg-blue-900 text-white">縣市</span>？
          <small className="block">HOUR_24欄位為近24小時的累積降雨量</small>
          <small className="block">(API: /v1/rest/datastore/O-A0002-001)</small>
        </>)}
      />
      <Task.Anwser></Task.Anwser>
    </>
  )
}
function QuestionFour(){
  return (
    <>
      <Task.Question
        title="題目四:格式自己定辣，我懶"
        task={()=>(<>
          自己所在的縣市-鄉鎮，未來一週的<span className="bg-blue-900 text-white">最低溫</span>與
          <span className="bg-blue-900 text-white">最高溫</span>分別為多少？<br/>
          且<span className="bg-blue-900 text-white">單日溫差</span>最大為多少？
          <small className="block">(API: ​/v1​/rest​/datastore​/F-D0047-00XX系列)</small>
        </>)}
      />
      <Task.Anwser></Task.Anwser>
    </>
  )
}

function App() {
  return (
    <div classNameName="App">
      <main
        className={clsx(
          "flex flex-col",
          "w-screen max-w-3xl",
          "mx-auto my-16 space-y-6"
        )}
      >
        <h4 className="text-2xl font-black">JS讀書會後測啦</h4>
        <QuestionOne/>
        <QuestionTwo/>
        <QuestionThree/>
        <QuestionFour/>
      </main>
    </div>
  )
}

export default App
