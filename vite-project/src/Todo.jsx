import React, { useEffect, useRef, useState } from 'react'

const Todo = () => {
    const [data, setData] = useState([]);
    const newdata = useRef(null);

    const listData = () => {
        if(!newdata.current.value){
            return
        }

        let task = [...data, newdata.current.value]
        setData(task)
        localStorage.setItem("task", JSON.stringify(task))
        newdata.current.value = ''
    }

    const handleDelete = (index) => {
       let reducedTodo = [...data];
       reducedTodo.splice(index, 1);

       localStorage.setItem("task",JSON.stringify(reducedTodo))
       setData(reducedTodo)
    }

    const editData = (index) => {
        let edit = [...data];
        edit[index] = prompt()
        localStorage.setItem('task',JSON.stringify(edit))
        setData(edit)
    }

    useEffect(() => {
        let storedData = JSON.parse(localStorage.getItem("task"))
        if(storedData){
            setData(storedData)
        }
    }, [])

    const handleInput = (event) => (event.key ==='Enter') && listData()

    const clearData = () =>{
        localStorage.removeItem("task")
        setData([])
    }

    return <div className='text-white  text-left mt-36'>
        <h1 className='text-2xl text-amber-500 mb-4'>TO-DO List</h1>
        <div className='flex gap-2 m-2'>
            <div className='text-black '>
            <input type="text" ref={newdata}
            className='rounded px-2 w-72'
            placeholder='Enter Your Task'
            onKeyPress={handleInput}/>
            </div>
            <button className='bg-blue-800 text-black 
            px-1  rounded hover:bg-blue-500'
            onClick={listData}>Save</button>
            <button className='bg-blue-800 text-black 
            px-1  rounded hover:bg-blue-500'
            onClick={clearData}>Clear</button>
            
        </div>
        <p className='text-gray-400 mx-3 text-sm'>
            Fill the task details
        </p>
        <div className=' text-black my-4 rounded w-60'>
            <ul>
                <h3 className='text-yellow-200'>List Of Task</h3>
                {
                data.map((items,index)=><li
                className='border rounded-lg
                bg-gray-400 text-left
                 px-4 my-2 shadow-sm shadow-white
                 flex justify-between items-center cursor-pointer'>
                    {items}
                    <div>
                        <i class="fa-solid fa-pen-to-square" onClick={() => editData(index)}></i>
                        <i class="fa-solid fa-xmark cursor-pointer pl-4" onClick={() => handleDelete(index) }></i>
                    </div>
                </li>)
                }
            </ul>
        </div>
    </div>
}

export default Todo
