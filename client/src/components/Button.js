import React, { memo } from 'react'

const Button = ({text, textColor, bgColor, IcAfter, onClick, fullWidth}) => {
    return (
        <button
        type = "button"
        className= {`py-2 px-4 ${textColor} ${bgColor} ${fullWidth && 'w-full'} outline-none rounded-md hover:underline flex justify-center items-center gap-1`}
        onClick= {onClick}
        >
            <span> {text} </span>
            <span> {IcAfter && <IcAfter />} </span>
        </button>
    )
}

export default memo(Button)