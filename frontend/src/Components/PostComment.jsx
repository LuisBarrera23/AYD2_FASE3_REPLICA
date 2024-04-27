import { useState, Fragment } from 'react'
import React from 'react'
import "./Styles/Posts.css";
import "./Styles/Sidebar.css";

export const PostComment = (props) => {
    const [comment, setComment] = useState("");
    const apiIp = process.env.REACT_APP_API_IP;

    return (
        <Fragment>
            <li style={{ width: "100%" }}>
                <div className="timeline-icon">
                    <a href="javascript:;">&nbsp;</a>
                </div>
                <div className="timeline-body" style={{ padding: "2rem" }}>
                    <div style={{ overflow: "auto" }}>
                        <div className="timeline-header" style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                            <div className="centered-container-posts" style={{ width: "5rem", height: "5rem", borderRadius: "50%", overflow: "hidden" }}>
                                <img src={props.user_photo} alt="Selected" style={{ objectFit: 'cover', borderRadius: "50%", width: '100%', height: '100%' }} />
                            </div>
                            <div style={{ marginLeft: "1rem" }} className='user-info'>
                                <h4 style={{ color: "darkblue" }} className='user-name'>{props.user_name}</h4>
                                <span className="time user-name" style={{ color: "gray", fontSize: "1.3rem" }}>{props.date}</span>
                            </div>
                        </div>
                        <div className="timeline-content">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", width: "100%", maxHeight: "30rem" }} >
                                <p className="mensaje" style={{ textAlign: 'justify' }}>
                                    {props.description}
                                </p>
                            </div>
                        </div>
                        <div className="timeline-footer" style={{ marginTop: '15px' }}>
                        </div>
                    </div>
                </div>
            </li>
        </Fragment>
    )
}