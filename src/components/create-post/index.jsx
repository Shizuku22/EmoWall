import React from 'react'
import './create-post.css'
import * as Ai from "react-icons/ai";

function CreatePost() {
  return (
    <div>
      <div className="Content">
        <h6>EVER lOVED SOMEONE YOU COULDN'T TELL?</h6>
          <div className='button1'>
            <div className='btn'><Ai.AiFillHeart /> LOVE</div>
            <div className='btn'><Ai.AiOutlinePlus /> CREATE POST</div>
          </div>
      </div>
    </div>
  )
}

export default CreatePost