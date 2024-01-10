import React from 'react'


const TasksItem = ({ title, description, isCompleted ,updateHandler,deleteHandler,id}) => {
    return (
        <div className='col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                    </div>

                    <input  onChange={()=>updateHandler(id)} type='checkbox' className='mx-5' checked={isCompleted} />
                    <button onClick={()=>deleteHandler(id)} className="btn btn-primary">Delete</button>

                </div>
            </div>
        </div>
    )
}

export default TasksItem
