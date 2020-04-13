import React from 'react'
import SpinnerIcon from './SpinnerIcon'
import '../css/Spinner.css'
import VirusLoading from './VirusLoading'
import VirusIcon from './VirusIcon'

export const Spinner = () => {

    const styled: React.CSSProperties = {
        background: 'rgb(0,0,0,.7)',
        height:'100vh',
        width:'100vw',
        position: "fixed"
    }

    return(
       <div className="Spinner" style={styled}>
           <VirusLoading></VirusLoading>
       </div>
    )
}