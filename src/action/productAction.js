export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';

export const POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS';

export const SEARCH_IMAGE_SUCCESS = 'SEARCH_IMAGE_SUCCESS';

export const LIKE_SORT_SUCCESS = 'LIKE_SORT_SUCCESS';

export const COMMENT_SORT_SUCCESS = 'COMMENT_SORT_SUCCESS';


export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});
  
  export const postCommentSuccess = (comment,commentItem) => ({
    type: POST_COMMENT_SUCCESS,
    payload: { comment,commentItem }
  });

  export const postLikeSuccess = (like,likeItem) => ({
    type: POST_LIKE_SUCCESS,
    payload: { like,likeItem }
  });

  export const searchImageSuccess = (searchText) => ({
    type: SEARCH_IMAGE_SUCCESS,
    payload: { searchText }
  });

  export const likeSortSuccess = () => ({
    type: LIKE_SORT_SUCCESS
  });
  export const commentSortSuccess = () => ({
    type: COMMENT_SORT_SUCCESS
  });

export function fetchProducts() {
    return dispatch => {
      dispatch(fetchProductsBegin());
      const localData = JSON.parse(localStorage.getItem("picData"));
      if (localData && localData.length > 0) {
        dispatch(fetchProductsSuccess(localData));
      }else{
      return fetch("https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json")
        .then(handleErrors)
        .then(res => res.json())
        .then(result => {
          dispatch(fetchProductsSuccess(result.pics));
          localStorage.setItem("picData",JSON.stringify(result.pics));
          return result.pics;
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    }
    };
  }
  

  export function postComment(message,commentItem) {
    return dispatch => {
          dispatch(postCommentSuccess(message,commentItem));
         
    };
  }

  export function postLike(like,likeItem) {
  return dispatch => {
        dispatch(postLikeSuccess(like,likeItem));
       
  };
}

export function searchImage(searchText) {
    return dispatch => {
          dispatch(searchImageSuccess(searchText));
         
    };
  }

  export function likeSort() {
    return dispatch => {
          dispatch(likeSortSuccess());
         
    };
  }

  export function commentSort() {
    return dispatch => {
          dispatch(commentSortSuccess());
         
    };
  }


  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }