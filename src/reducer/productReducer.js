import {
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    POST_COMMENT_SUCCESS,
    POST_LIKE_SUCCESS,
    SEARCH_IMAGE_SUCCESS,
    LIKE_SORT_SUCCESS,
    COMMENT_SORT_SUCCESS
  } from '../action/productAction';
  
  const initialState = {
    items: [],
    loading: false,
    error: null
  };
  
  export default function productReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_PRODUCTS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_PRODUCTS_SUCCESS:
        console.log("redux_data::",action.payload.products);
        return {
          ...state,
          loading: false,
          items: action.payload.products
        };
  
      case FETCH_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          items: []
        };
      
          case POST_COMMENT_SUCCESS:
            console.log("redux_comment::",action.payload.comment);
            const item = action.payload.commentItem;
            const localData = JSON.parse(localStorage.getItem("picData"));
            console.log("local_dataaa:::",localData);
            localData.find(pic=>{
                if(pic.id ==item.id){
                    pic.comments.push(action.payload.comment);
                }
            }
                );
                localStorage.setItem("picData",JSON.stringify(localData));
            return {
              ...state,
              items: localData
            };

            case POST_LIKE_SUCCESS:
            const itemlike = action.payload.likeItem;
            const likeValue = action.payload.like;
            const localDataLike = JSON.parse(localStorage.getItem("picData"));
            localDataLike.find(pic=>{
                if(pic.id ==itemlike.id){
                    let likeCount = pic.likes;
                    if(likeValue == true){
                        pic.likes = likeCount + 1;
                    }else if(likeValue == false && likeCount > 0){
                        pic.likes = likeCount - 1;
                    }
                }
            }
                );
                localStorage.setItem("picData",JSON.stringify(localDataLike));
            return {
              ...state,
              items: localDataLike
            };

            case SEARCH_IMAGE_SUCCESS:
                const text = action.payload.searchText;
                const localDataSearch = JSON.parse(localStorage.getItem("picData"));
                let newSearchArray = [];
                localDataSearch.forEach(item => {
                   if(item && item.category){
const category = item.category.toLowerCase();
const checkText = category.includes(text);
if(checkText === true){
    newSearchArray.push(item);
}
                   }
               });
                return {
                  ...state,
                  items: newSearchArray
                };

                case LIKE_SORT_SUCCESS:
                //const text = action.payload.searchText;
                const localDataSort = JSON.parse(localStorage.getItem("picData"));
                localDataSort.sort(function(a, b){return b.likes - a.likes});
                return {
                  ...state,
                  items: localDataSort
                };

                case COMMENT_SORT_SUCCESS:
                const localDataSortcomment = JSON.parse(localStorage.getItem("picData"));
                localDataSortcomment.sort(function(a, b){return b.comments.length - a.comments.length});
                console.log("sort_comment:::",localDataSortcomment);
                return {
                  ...state,
                  items: localDataSortcomment
                };


      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }