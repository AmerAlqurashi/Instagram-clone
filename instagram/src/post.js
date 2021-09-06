import React from 'react'
import './post.css'
import Avatar from '@material-ui/core/Avatar'


 const Post = ({img_url, userName, text, avatar}) => {

    //if(text.length == 0) {
   //     return
    //}
    return (
        <div className="post">
            {/* header> avatar-username */}<div className="post__header">
            <Avatar 
            alt="Billgits" 
            className="avatar__post" src={avatar} /> 
            <h1>{userName}</h1>
            </div> 
            {/* {post photo or vid} */}<img className="post__img" src={img_url} />
            {/* {buttom > text - icons- comments} */}
            <div className="post__botm">
                <h4 className="post__text">
                <strong>{userName}</strong>:{text} 
                </h4>
        </div>
  
        </div> 
    )                                                                                                 
}

export default Post
