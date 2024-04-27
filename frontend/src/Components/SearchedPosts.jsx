import { Fragment } from 'react'
import React from 'react'
import "./Styles/Posts.css";
import "./Styles/Sidebar.css";
import { PostComment } from './PostComment';

export const SearchedPosts = (props) => {

    return (
        <Fragment>
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "top", paddingLeft: "5%", paddingRight: "5%" }}>
                <div className="container text-center">
                    <div className="row" style={{ height: "100%" }}>
                        <div className="col-md-12">
                            <div id="content" className="content content-full-width" style={{ height: "100%" }}>
                                <div className="profile-content" style={{ padding: "0%", height: "100%" }}>
                                    <div className="tab-content p-0" style={{ padding: "0%", height: "100%" }}>
                                        <div className="tab-pane fade active show" id="profile-post" style={{ padding: "0%", height: "100%" }}>
                                            <ul className="timeline">

                                                {
                                                    props.lista.map((item, index) =>
                                                        <PostComment
                                                            key={index}
                                                            id_publi={item.id_publi}
                                                            id_user={item.id_user}
                                                            user_name={item.user_name}
                                                            user_photo={item.user_photo}
                                                            photo={item.photo}
                                                            description={item.description}
                                                            date={item.date}
                                                            id_usuario={props.id_usuario} 
                                                            user_token={props.user_token}
                                                            current_user_name={props.user_name}
                                                        />
                                                    )
                                                }

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}
// export default Posts