import React, { Component } from 'react';
import { connect } from 'react-redux';

let likeFlag=true;

class Posts extends Component {
  constructor(props) {
    super(props);
    this.getPosts = this.getPosts.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.addComments=this.addComments.bind(this);
    this.displayComments=this.displayComments.bind(this);
  }

  addComments(id){
      const input=document.getElementById(id);
      this.props.ADD_COMMENTS(id,input.value);
      console.log(input.value);
  }

  handleClick(name){
     if(likeFlag){
        this.props.LIKES(name);
        likeFlag=false;
        document.getElementById(name).innerHTML="UNLIKE";
     }
     else{
         this.props.DISLIKES(name);
         likeFlag=true;
         document.getElementById(name).innerHTML="LIKE";
     }
  }

  displayComments(name){
    let comments=[];
    this.props.data.map(posts=>{
        if(posts.item_description===name){
            posts.comments.forEach(comment => {
                comments.push(comment.comment);
            });
        }
        return comments;
    });
    return this.renderComments(comments);
  }

  renderComments(comments){
    let comment = comments.map(content=>{
        return(<li key={content}>{content}</li>);
    })
    return comment;
  }

  getPosts() {
      if(this.props.action==='select'){
        let feed = this.props.data.map(posts => {
            feed = (
              <div className='post' key={posts.item_description}>
                <h3 key={posts.item_description}>{posts.item_description}</h3>
                <button type="button"  id={posts.item_description} className="btn btn-default" onClick={this.handleClick.bind(this,posts.item_description)}>
                Like
                </button>
                <p>Number of likes:{posts.likes}</p>
                <h4>Comments</h4>
                <ul>{this.displayComments(posts.item_description)}</ul>
                <input type="text" id={posts.id} placeholder="Reply to a comment..."></input>
                <button type="submit" onClick={this.addComments.bind(this,posts.id)}>Submit</button>
              </div>
            );
            return feed;
          });
          return feed;
      }
      if(this.props.action==='text'){
          let i=0;
        let feed = this.props.textFeed.map(posts => {
            feed = (
              <div className='post' key={posts}>
                <h3 key={posts}>{posts}</h3>
                <button type="button" id={posts} className="btn btn-default" onClick={this.handleClick.bind(this,posts)}>
                LIKE
                </button>
                <p>Number of likes:{this.props.likes[i]}</p>
                <h4>Comments</h4>
                <ul>{this.displayComments(posts)}</ul>
                <input type="text" placeholder="Reply to a comment..."></input>
              </div>
            );
            i++;
            return feed;
          });
          return feed;
      }
      if(this.props.action==='image'){
          let i=0;
        let feed = this.props.image.map(posts => {
            feed = (
              <div className='post' key={posts}>
                <h3 key={posts}>{posts}</h3>
                <img src="../data/download.jpeg" alt="imagefeed"></img>
                <button type="button" id={posts} className="btn btn-default" onClick={this.handleClick.bind(this,posts)}>
                  LIKE
                </button>
                <p>Number of likes:{this.props.likes[i]}</p>
                <h4>Comments</h4>
                <ul>{this.displayComments(posts)}</ul>
                <input type="text" placeholder="Reply to a comment..."></input>
              </div>
            );
            i++;
            return feed;
          });
          return feed;
      }
      if(this.props.action==='textImage'){
          let i=0;
        let feed = this.props.textImage.map(posts => {
            feed = (
              <div className='post' key={posts}>
                <h3 key={posts}>{posts}</h3>
                <img src={require('/home/dell/react-facebook-gurukiran/src/components/download.jpeg')} alt="imagefeed" width="100%"/>
                <button type="button" id={posts} className="btn btn-default" onClick={this.handleClick.bind(this,posts)}>
                  LIKE
                </button>
                <p>Number of likes:{this.props.likes[i]}</p>
                <h4>Comments</h4>
                <ul>{this.displayComments(posts)}</ul>
                <input type="text" placeholder="Reply to a comment..."></input>
              </div>
            );
            i++;
            return feed;
          });
          return feed;
      }
  }
  render() {
    return <div className="posts-container">{this.getPosts()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    textFeed: state.text,
    action:state.action,
    image: state.image,
    textImage: state.textImage,
    likes:state.likes,
    comment:state.comment
  };
};

  const mapDispatchToProps = dispatch => {
    return {
      LIKES: name=> dispatch({ type: 'LIKES', payload:name }),
      DISLIKES: name=> dispatch({type:'DISLIKES',payload:name}),
      ADD_COMMENTS : (id,input)=> dispatch({type:'ADD_COMMENTS',payload:{
        id:id,
        input:input}
      })
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
