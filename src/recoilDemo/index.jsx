import React from 'react'
import MyRecoilRoot, {useMyRecoilState, useMyRecoilValue} from './my-recoil'

const countAtom = {
  key: 'count_atom',
  defaultValue: 0
}

const countAtom2 = {
    key: 'count_atom2',
    defaultValue: 0
  }
  

const style = {border: 'solid 1px #456', width: '200px', margin: '20px'}
//Com1.whyDidYouRender = true
function Com1() {
  const [count, setCount] = useMyRecoilState(countAtom)

  function handleChange(){
    setCount(count => count + 1)
  }

  return (
    <div style={style}>
      <h2>组件1</h2>
      <div>count: {count}</div>
      <button onClick={handleChange}>点击更新 count ，看组件2、3会否更新</button>
    </div>
  )
}

Com2.whyDidYouRender = true
function Com2() {
const [count2, setCount2] = useMyRecoilState(countAtom2)
  const count = useMyRecoilValue(countAtom)
  return (
    <div style={style}>
      <h2>组件2</h2>
      <div>count: {count}</div>
      <div onClick={()=>setCount2(count2+2)}>点击我增加组件2的值{count2}</div>
    </div>
  )
}

//Com3.whyDidYouRender = true
function Com3() {
  const count = useMyRecoilValue(countAtom)
  return (
    <div style={style}>
      <h2>组件3</h2>
      <div>count: {count}</div>
    </div>
  )
}

RecoilDemo.whyDidYouRender = true
export default function RecoilDemo() {
  
  return <MyRecoilRoot>
    <Com1/>
    <Com2/>
    <Com3/>
  </MyRecoilRoot>
}


