'use client'

import { useState } from 'react';

const page = () => {
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [mainTask, setmainTask] = useState([])
  const [editing, setEditing] = useState(null)

  const submitHandler = (e) =>{
    e.preventDefault()
    setmainTask([...mainTask, {title, desc}])
    settitle("")
    setdesc("")
  }

  const deleteHandler = (i) => {
    let copytask = [...mainTask]
    copytask.splice(i,1)
    setmainTask(copytask)
  }

  const editHandler = (i) => {
    setEditing(i)
  }

  const saveHandler = (i) => {
    let copytask = [...mainTask]
    copytask[i].title = title
    copytask[i].desc = desc
    setmainTask(copytask)
    setEditing(null)
    settitle("")
    setdesc("")
  }

  let renderTask = <h2>No Task Available</h2>

  if(mainTask.length>0){
    renderTask = mainTask.map((t,i) => {
      return (
      <li key={i} className='flex items-center justify-between mb-8'>
        <div className='flex items-center justify-between m-5 w-2/3'>
          {editing === i ? (
            <>
              <input 
                className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' 
                placeholder='Enter task here' 
                value={title}
                onChange={(e) => {
                  settitle(e.target.value)
                }}
              />
              <input 
                className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' 
                placeholder='Enter description here' 
                value={desc}
                onChange={(e) => {
                  setdesc(e.target.value)
                }}
              />
            </>
          ) : (
            <>
              <h5 className='text-2xl font-semibold'>{t.title}</h5>
              <p className='text-lg font-medium'>{t.desc}</p>
            </>
          )}
        </div>
        {editing === i ? (
          <button 
            onClick={() => {
              saveHandler(i)
            }}
            className='bg-black text-white px-4 py-2 rounded font-bold'>Save</button>
        ) : (
          <>
            <button 
              onClick={() => {
                editHandler(i)
              }}
              className='bg-blue-400 text-white px-4 py-2 rounded font-bold'>Edit</button>
            <button 
              onClick={() => {
                deleteHandler(i)
              }}
              className='bg-red-400 text-white px-4 py-2 rounded font-bold'>Delete</button>
          </>
        )}
      </li>
      );
    })
  }

  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>My Todo List</h1>
      <form onSubmit={submitHandler}>
        <input className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' 
          placeholder='Enter task here' 
          value={title}
          onChange={(e) => {
            settitle(e.target.value)
          }}
        />
        <input className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' 
          placeholder='Enter description here' 
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value)
          }}
        />
        <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5'>Add Task</button>
      </form>
      <hr/>
      <div className='p-8 bg-slate-200'>
          <ul>
            {renderTask}
          </ul>
      </div>
    </>
  )
}

export default page;