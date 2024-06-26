import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Column from './Column'
import NewCard from './NewCard'


const defaultCards = [
  {
    title: "Outrank 1",
    desc: "Outrank 1 task is not needed",
    id: 1,
    column: "new",
    movedAt: null,
    dueDate: null
  },
  {
    title: "Humanize 1",
    desc: "Humanize 1 task is not needed",
    id: 2,
    column: "ongoing",
    movedAt: new Date(),
    dueDate: null
  },
  {
    title: "Humanize 2",
    desc: "Humanize 2 task is not needed",
    id: 3,
    column: "ongoing",
    movedAt: new Date(),
    dueDate: null
  },
  {
    title: "Article 1",
    desc: "Article 1 task is not needed",
    id: 4,
    column: "done",
    movedAt: new Date(),
    dueDate: null
  },
  {
    title: "Article 2",
    desc: "Article 2 task is not needed",
    id: 5,
    column: "done",
    movedAt: new Date(),
    dueDate: null
  },

];
const columns = ["new", "ongoing", "done"]

function App() {
  const [cards, setCards] = useState([])
  const [showNewModal, setShowNewModal] = useState(false)

  return (
    <div className='h-[100vh] items-center justify-start md:justify-center bg-indigo-200 p-[20px] md:p-[40px] flex gap-[20px] md:gap-[50px] md:overflow-x-hidden overflow-x-scroll'>
      <Column setShowNewModal={setShowNewModal} title="New" column="new" cards={cards} setCards={setCards} color={"bg-blue-500"} columns={columns} />
      <Column title="Ongoing" column="ongoing" cards={cards} setCards={setCards} color={"bg-yellow-500"} columns={columns} />
      <Column title="Done" column="done" cards={cards} setCards={setCards} color={"bg-green-500"} columns={columns} />
      {showNewModal && <NewCard cards={cards} setCards={setCards} setShowNewModal={setShowNewModal} />}

    </div>
  )
}

export default App
