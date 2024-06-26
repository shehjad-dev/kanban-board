import React, { useState, useEffect, useRef } from 'react';
import TodoItem from './TodoItem';

const Column = ({ title, column, cards, setCards, color, columns, setShowNewModal }) => {
    const cardsToShow = cards
        .filter((it) => it.column === column)
        .sort((a, b) => {
            if (column === "done") {
                return new Date(a.completedAt) - new Date(b.completedAt);
            }
            return new Date(a.movedAt) - new Date(b.movedAt);
        });

    const getValidMoveOptions = (currentColumn) => {
        switch (currentColumn) {
            case "new":
                return ["ongoing"];
            case "ongoing":
                return ["done"];
            case "done":
                return [];
            default:
                return [];
        }
    };

    const subMenuOptionsToShow = getValidMoveOptions(column);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [subMenuId, setSubMenuId] = useState(null);
    const subMenuRef = useRef(null);

    const handleSetCards = (item, subIt) => {
        let newCards = cards.map((card) => {
            if (card.id === subMenuId) {
                return {
                    ...card,
                    column: subIt,
                    movedAt: subIt === "ongoing" ? new Date() : card.movedAt,
                    completedAt: subIt === "done" ? new Date() : card.completedAt,
                    dueDate: subIt === "ongoing" ? null : card.dueDate
                };
            } else {
                return { ...card };
            }
        });

        setCards([...newCards]);
        setShowSubMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
                setShowSubMenu(false);
                setSubMenuId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleContextMenuClick = (item) => {
        console.log(showSubMenu, subMenuId, item.id)
        if (showSubMenu && subMenuId && subMenuId === item.id) {
            setShowSubMenu(false);
            setSubMenuId(null);
        } else {
            setShowSubMenu(true);
            setSubMenuId(item.id);
        }
    }

    return (
        <div className='bg-white rounded-lg p-[20px] w-[350px] h-full relative'>
            <div className='flex flex-wrap items-center justify-between mb-[16px] md:w-full w-[200px]'>
                <h1 className='font-semibold text-[20px] mb-[8px]'>{title}</h1>
                <div className='flex gap-[10px] items-center'>
                    {column === "new" &&
                        <button onClick={() => setShowNewModal(true)} className='bg-violet-500 text-white w-full rounded-md py-[10px] px-[12px]'>Add New +</button>
                    }
                    <p>{cardsToShow.length}</p>
                </div>
            </div>

            <div className={`flex flex-col w-full gap-[20px] ${column === "new" ? "h-[90%]" : "h-[95%]"} overflow-y-scroll`}>
                {cardsToShow.map((item, idx) => (
                    <div key={item.id} className='relative w-full'>
                        <TodoItem item={item} color={color} setCards={setCards} />
                        <div className='absolute w-full top-[6px] right-[6px] flex flex-col items-end gap-[5px]'>
                            {column !== "done" && (
                                <button onClick={() => handleContextMenuClick(item)} className='w-[30px] h-[30px] bg-slate-100 text-slate-900 hover:bg-indigo-500 hover:text-white rounded-md flex items-center justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                    </svg>
                                </button>
                            )}

                            {showSubMenu && subMenuId && subMenuId === item.id &&
                                (
                                    <div ref={subMenuRef} className='bg-slate-100 border-[1px] border-indigo-500 p-[10px] rounded-md z-10 flex flex-col gap-[8px]'>
                                        <h3 className='mb-[8px]'>Move to</h3>
                                        {subMenuOptionsToShow.map((subIt, subIdx) => (
                                            <p key={`${item.id}-${subIt}-${subIdx}`}
                                                onClick={() => {
                                                    handleSetCards(item, subIt);
                                                }}
                                                className='bg-indigo-200 cursor-pointer hover:text-white hover:bg-indigo-500 text-slate-900 p-[8px] rounded-md'>{subIt}</p>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Column;
