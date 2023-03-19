import React from 'react';
import './messages-container.css';

import * as Ai from "react-icons/ai";
import * as Bs from "react-icons/bs";
import * as Md from "react-icons/md";

function MessagesContainer(props) {
  const { title, summary, content, codename, createdAt } = props;
  return (
    <div>
      <div className="mssgeBox">
        <div className="ttle">
          <h6>{codename}</h6>       
          <h6>{title}</h6>
          <span>{createdAt}</span>
        </div>
        
        <p>{summary}</p>

        <div className="btnMssge">
          <div className='btn2'><Ai.AiOutlinePlus /> Add Comment</div>
          <div className='btn2'><Ai.AiOutlineHeart /> Care</div>
          <div className='btn2'><Bs.BsArrow90DegRight /> SHARE</div>
          <div className='btn2'><Md.MdOutlineReportProblem /> Report</div>
        </div>
      </div>
    </div>
  );
}

export default MessagesContainer;