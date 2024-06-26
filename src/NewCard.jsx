import React, { useState, useId } from 'react'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte



const NewCard = ({ setCards, cards, setShowNewModal }) => {
    const notyf = new Notyf();

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [status, setStatus] = useState("new")

    const handleAdd = () => {
        if (!title || !desc) {
            notyf.error('Title and description are required!');
            return;
        }
        const newTask = {
            title: title,
            desc: desc,
            column: status,
            id: cards.length === 0 ? 1 : cards.length + 1,
            // id: cards.length === 0 ? 1 : cards[cards.length - 1].id + 1,
            movedAt: null,
            dueDate: null
        };
        setCards([newTask, ...cards]); // Add new task at the beginning
        setTitle("");
        setDesc("");
        setShowNewModal(false)
        notyf.success('Todo Added!');

    };
    return (
        <div className='bg-indigo-500/20 backdrop-blur-[3px] absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
            <div className='bg-white relative w-[95vw] md:w-[450px] border-[1px] border-indigo-500 p-[10px] rounded-[20px] flex flex-col gap-[10px]'>
                <label className='text-sm font-medium mb-[10px]'>New Todo</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-indigo-100 w-full p-[8px] rounded-sm focus:outline-indigo-500 text-slate-900" placeholder='title' />
                <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="bg-indigo-100 w-full p-[8px] rounded-sm focus:outline-indigo-500 text-slate-900" placeholder='description' />
                <button onClick={handleAdd} className='bg-violet-500 text-white w-full rounded-md py-[10px]'>Add +</button>
                <button onClick={
                    () => setShowNewModal(false)
                } className='absolute top-1 right-1 bg-white text-slate-900 hvoer:bg-slate-100 p-2 rounded-full hover:text-indigo-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>


                </button>
            </div>
        </div>

    )
}

export default NewCard