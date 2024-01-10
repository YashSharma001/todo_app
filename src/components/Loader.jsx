import React from 'react'
import loading from './loading.gif'

const Loader = () => {

    return (
        <div className='text-center'>
            <img src={loading} alt="Loading" className='my-5' style={{ width: "10%" }} />
        </div>
    )

}

export default Loader
