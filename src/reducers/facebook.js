import data from '../data/fb.json';

const initialState={
    data:data,
}

const facebookReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'SELECTOR':
        if(action.payload==='select'){
            return {
                ...state,
                action:action.payload
            };
        }
        if(action.payload==='text'){
            let textFeed=[];
            let likes=[];
            state.data.map(posts=>{
                if(posts.image===" "){
                    textFeed.push(posts.item_description);
                    likes.push(posts.likes);
                }
                return textFeed;
            });
            return{
                ...state,
                text:textFeed,
                action:action.payload,
                likes:likes
            }
        }
        if(action.payload==='image'){
            let imageFeed=[]
            let likes=[];
            state.data.map(posts=>{
                if(posts.image!==" "&&posts.item_description===" "){
                    imageFeed.push(posts.item_description);
                    likes.push(posts.likes);
                }
                return imageFeed;
            });
            return{
                ...state,
                image:imageFeed,
                action:action.payload,
                likes:likes
            }
        }
        if(action.payload==='textImage'){
            let textImageFeed=[];
            let likes=[];
            state.data.map(posts=>{
                if(posts.image!==" "&&posts.item_description!==" "){
                    textImageFeed.push(posts.item_description);
                    likes.push(posts.likes);
                }
                return textImageFeed;
            });
            return{
                ...state,
                textImage:textImageFeed,
                action:action.payload,
                likes:likes
            }
        }
        if(action.payload==='none'){
            return {
                ...state
            };
        }
        break;
        case 'LIKES':
        let likes=[];
        state.data.map(posts=>{
            if(posts.item_description===action.payload){
                likes.push(++posts.likes);
            }
            return likes;
        });
        return{
            ...state,
            likes:likes
        }
        case 'DISLIKES':
        let dislikes=[];
        state.data.map(posts=>{
            if(posts.item_description===action.payload){
                dislikes.push(--posts.likes);
            }
            return likes;
        });
        return{
            ...state,
            likes:dislikes
        }
        case 'ADD_COMMENTS':
        const currentTime=new Date();
        let newComment={
            comment:action.payload.input,
            created_at:currentTime
        }
        console.log(newComment);
        let newData=state.data.map(posts=>{
            if(posts.id===action.payload.id){
                newData=posts.comments.concat(newComment);
            }
            return newData;
        });
        console.log(newData);
        return{
            ...state,
        }
        default:
        return state;
    }
}

export default facebookReducer;