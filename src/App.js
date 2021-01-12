import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ImageItem from "./ImageItem";
import { connect } from "react-redux";
import { fetchProducts,postComment,postLike,searchImage,likeSort,commentSort } from "./action/productAction";

function App(props) {
  const [pics,SetPics] = useState(null);
  const { error, loading, products } = props;
console.log("redux_test_product:",products);
  useEffect(() => {
    {/*fetch("https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("PIcsss:",result.pics);
          SetPics(result.pics);
        },
        (error) => {
        }
      )*/}
      props.dispatch(fetchProducts());
  }, [])
const onSubmit = (comment,commentItem) => {
props.dispatch(postComment(comment,commentItem));
}
const onLike = (like,likeItem) => {
  props.dispatch(postLike(like,likeItem));
  }
  const handleSearch = (event)=>{
    props.dispatch(searchImage(event.target.value));
  }
  const handleLikeSort = ()=>{
    props.dispatch(likeSort());
  }
  const handleCommentSort = ()=>{
    props.dispatch(commentSort());
  }
  return (
    <div className="App">
      <div className="appHeader">Imaginary</div>
      <div className="appFilter">
        <div className="appSorting">
        <div className="sortLike" onClick={handleLikeSort}>Most liked</div>
        <div className="separator"></div>
        <div className="sortLike" onClick={handleCommentSort}>Most commented</div>
        </div>
        <input type="text" placeholder="Search Images ..." onChange={handleSearch} />
        <div className="emptydiv"></div>
      </div>
      <div className="photoApp">
      {products ? products.map((pic)=>
    <ImageItem item={pic} submitPost={onSubmit} submitLike={onLike} key ={pic.id}/>
    ): null}
    </div>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products.items,
  loading: state.products.loading,
  error: state.products.error
});

export default connect(mapStateToProps)(App);
