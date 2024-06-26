import React, { useEffect, useState } from 'react';

const TodoItem = ({ item, color, setCards }) => {
    const [dueDate, setDueDate] = useState(item.dueDate || "");
    const [isOverdue, setIsOverdue] = useState(false);
    const [isEditing, setIsEditing] = useState(!item.dueDate);

    const checkOverdue = () => {
        if (item.column === "ongoing" && dueDate && new Date(dueDate) < new Date()) {
            setIsOverdue(true);
        } else {
            setIsOverdue(false);
        }
    };

    useEffect(() => {
        checkOverdue();
        if (item.column === "ongoing" && dueDate) {
            const interval = setInterval(checkOverdue, 60000);
            return () => clearInterval(interval);
        }
    }, [dueDate, item.column]);

    const updateDueDate = (e) => {
        const newDueDate = e.target.value;
        setDueDate(newDueDate);
        setIsEditing(false);
        setCards((prevCards) =>
            prevCards.map((card) =>
                card.id === item.id ? { ...card, dueDate: newDueDate } : card
            )
        );
    };

    return (
        <div className="bg-slate-200 p-[16px] rounded-md flex flex-col gap-[10px] shadow-md relative">
            <div className="flex flex-col items-start justify-between">
                <h3 className="font-semibold text-[22px]">{item.title}</h3>
                <p className={`py-[2px] px-[6px] rounded-[35px] ${color} text-white`}>
                    {item.column}
                </p>
            </div>
            <p className='truncate overflow-hidden whitespace-nowrap'>{item.desc}</p>
            {item.column === "ongoing" && (
                <>
                    {!isOverdue ? (
                        <>
                            {isEditing ? (
                                <input
                                    type="datetime-local"
                                    value={dueDate}
                                    onChange={updateDueDate}
                                    className="w-full"
                                />
                            ) : (
                                <div className="flex flex-col gap-[10px] mt-[10px]">
                                    <div className="bg-yellow-100 text-yellow-600 border-[1px] border-yellow-500 p-[8px] rounded-md">
                                        Due date: {new Date(dueDate).toLocaleString()}
                                    </div>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-indigo-500 text-white w-full rounded-md py-[8px]"
                                    >
                                        Change Due Date
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-red-100 text-red-400 border-[1px] border-red-500 p-[8px] rounded-md mt-[10px]">
                            Due date passed: {new Date(dueDate).toLocaleString()}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TodoItem;
