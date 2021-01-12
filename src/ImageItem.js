import React,{useEffect,useState} from 'react';
import './imageItem.css';

function ImageItem(props) {
    const [message,SetMessage] = useState(null);
    const [like,SetLike] = useState(true);
    const handleOnchange = (event)=>{
        SetMessage(event.target.value);
    }
    const handlePost=()=>{
        //alert(message);
        props.submitPost(message,props.item);
        SetMessage(null);
    }
    const handleLike=()=>{
        SetLike(!like);
        props.submitLike(like,props.item);
    }
  return (
    <div className="root">
     <div className="image">
         <img src={props.item.url} className="imagesize" />
     </div>
     <div className="likeCat">
         <div className="likeUnlike"><div className="likes">{props.item.likes}</div><div className="likeBtn" onClick={handleLike}>{like? "Like" : "Unlike"}</div></div>
         <div className="category">{props.item.category}</div>
     </div>
     <div className="commentBox">
         <input type="text" placeholder="Type Your Comment Here ..." className="textInput" onChange={handleOnchange} />
         <button className="postbtn" onClick={handlePost}>Post</button>
     </div>
     <div className="commentText">
         {props.item && props.item.comments.map((comment)=>
         <div className="comment">{comment}</div>
         )}
     </div>
    </div>
  );
}

export default ImageItem;
