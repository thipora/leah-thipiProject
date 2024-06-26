import React, { useState, useContext } from 'react';
import UpdatePost from './UpdatePost';
import {
  useNavigate
} from "react-router-dom";
import { UserContext } from '../UserProvider';
import "../css/style.css";

function Post(props) {
  const post = props.post;
  const [isExpanded, setIsExpanded] = useState(false);
  const [toUpdate, setToUpdate] = useState(false)
  const navigate = useNavigate()
  const { userID } = useContext(UserContext);
  const token = localStorage.getItem('TOKEN');

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  function deletePost() {
    try{
      fetch(`http://localhost:8080/posts?id=${post.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);  
      }
      return response.json();
    })
    props.deletePost(post.id);
    }
    catch(error){ alert(error.message)}
  }


  return (

    <div style={isExpanded ? { border: '1px solid #000', padding: '10px', marginBottom: '10px', backgroundColor: '#f0f0f0' } : {}}>
    <span>
      <p>{post.id} - {post.title}</p>
      <button onClick={handleExpand}>Expand</button>
    </span>
      { (post.userId==userID)&&
        <>
        <button onClick={deletePost}>Delete</button>
        <button onClick={() => { setToUpdate(!toUpdate) }}>to update</button>
        <div>{toUpdate && <UpdatePost post={post} updateArr={props.updateArr} />}</div>
        </>
      }

      {isExpanded && (
        <div>
          <p>{post.body}</p>
          <button onClick={() => navigate(`/user/${userID}/posts/${post.id}/comments`, { state: { postId: post.id } })}>Comments</button>
        </div>
      )}
      <p>-------------------</p>
    </div>
  );
};

export default Post
