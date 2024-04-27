import { Fragment, useEffect, useState, useRef } from 'react';
import React from 'react';
import "./Styles/Posts.css";
import "./Styles/Sidebar.css";
import { PostComment } from './PostComment';

export const Posts = (props) => {
    const [openFilters, setOpenFilters] = useState(false);
    const [postUpdate, setPostUpdate] = useState([]);

    useEffect(() => {
        setPostUpdate(props.lista);
        // console.log(props.lista)
    }, [props.lista]);

    

    return (
        <Fragment>
            <section className="home" style={{ display: 'flex', justifyContent: "center", alignItems: "top", paddingLeft: "5%", paddingRight: "5%" }}>
                <div className="container text-center">
                    <div className="row" style={{ height: "100%" }}>

                        <div className="col-md-12">
                            <div id="content" className="content content-full-width" style={{ height: "100%" }}>
                                <div className="profile-content" style={{ padding: "0%", height: "100%" }}>
                                    <div className="tab-content p-0" style={{ padding: "0%", height: "100%" }}>
                                        <div className="tab-pane fade active show" id="profile-post" style={{ padding: "0%", height: "100%" }}>
                                            <ul className="timeline">
                                                {postUpdate && postUpdate
                                                    .map((item, index) => (
                                                        <PostComment
                                                            key={index}
                                                            user_name={item.nombre}
                                                            user_photo={item.photo}
                                                            description={item.publicacion}
                                                            date={item.fecha}
                                                        />
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
