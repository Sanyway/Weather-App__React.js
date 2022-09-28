import React, { useEffect, useState } from 'react'



const Load = () => {

    const [load, setLoad] = useState()
    

    useEffect(() => {
        setLoad("https://c.tenor.com/_rqNDp-2hOYAAAAC/loading-loading-gif.gif")
        
    }, [])






    return (
        <div className='load'>

            <img className='loader_card' src={load} alt="" />

        </div>
    )
}


export default Load