import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './post'
import { db, auth }from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input} from '@material-ui/core';
import ImgUp from './imgUp'
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50 + Math.random();
  const left = 50 + Math.random();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App({userName, text, avatar, img_url }) {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles()
  const [post, setPost] = useState([])
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
  const [ user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [openLogin, setOpenLogin] = useState(false)

  useEffect(() => {
   const unsubscribe = auth.onAuthStateChanged((authUser) => {
       if(authUser) {
// log in
  console.log(authUser)
  setCurrentUser(authUser)

  if(authUser.displayName) {
//if he has a name
  }else {
// if he doesnt has a name

return authUser.updateProfile({
  displayName: user,
})
  }

    }else {
// log out
       setCurrentUser(null)
    }
    })

    return () => {
      unsubscribe()
    }
  }, [user, currentUser])

useEffect(() => {
  //
  //.((snapshot) => {
    db.collection('posts').orderBy('timestamp', "desc").onSnapshot(snap => {
      setPost(snap.docs.map(doc => ({
    post: doc.data(),
    id: doc.id
  })))
  
    })
}, [])

// const keyV = Date.now()

const handleClose = () => {
setOpen(false)
}

const signUp = (e) => {
  e.preventDefault()
  setOpen(true)
auth
.createUserWithEmailAndPassword(email, password)
.catch(err => (
  alert(err.message)
)) 



  
}

const logOut = (e) => {
  e.preventDefault()

  auth.signOut()
  setCurrentUser(null)

}

const Login = (e) => {
  e.preventDefault()

  auth
  .signInWithEmailAndPassword(email, password)
  .catch(err => {
    alert(err.message)
  })

 setOpenLogin(false)

}

  return (
    <div className="App">

     {/* {
       //there is diff in here :)
       currentUser?.displayName? <ImgUp username={currentUser.displayName} /> :( <h3>Sorry u need to login to uplead</h3>)
     }  */}
     
     <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
     <div style={modalStyle} className={classes.paper}>
      
     <form > 
     <div className="signUp__form">

     
     <center>
       <img src="https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png" 
       className="modal__headerImg"/>
 <Input 
       type="text" 
       value={user} 
       placeholder="user name" 
       onChange={(e) => setUser(e.target.value)}
       required/>


 <Input 
       type="text" 
       value={email} 
       placeholder="email" 
       onChange={(e) => setEmail(e.target.value)}
       required/>


 <Input 
       type="password" 
       value={password} 
       placeholder="password" 
       onChange={(e) => setPassword(e.target.value)}
       required/>

      <Button onClick={signUp}>Sign up</Button>

     </center>
     </div>
    </form>
  </div>
 </Modal>

 <Modal
  open={openLogin}
  onClose={() => setOpenLogin(false)}
  aria-labelledby="simple-modal-title"
  aria-describedby="simple-modal-description"
>
     <div style={modalStyle} className={classes.paper}>
      
     <form > 
     <div className="signUp__form">

     
     <center>
       <img src="https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png" 
       className="modal__headerImg"/>

 <Input 
       type="text" 
       value={email} 
       placeholder="email" 
       onChange={(e) => setEmail(e.target.value)}
       required/>


 <Input 
       type="password" 
       value={password} 
       placeholder="password" 
       onChange={(e) => setPassword(e.target.value)}
       required/>

      <Button onClick={Login}>Login</Button>

     </center>
     </div>
    </form>
  </div>
 </Modal>

    <div className="app__header">
      <img src="https://e7.pngegg.com/pngimages/712/1009/png-clipart-letter-instagram-font-instagram-text-logo.png" className="app__headerImg"/>
      {currentUser ? <Button onClick={logOut}>Logout</Button> 
    :
      <div>
         <Button onClick={signUp}>Sign up</Button>
         <Button onClick={() => setOpenLogin(true)}>Login</Button>
      </div>
    }
    </div>

    
<div className="app__posts">
 <div className="left">
   {post.map(({post, id}) => (
       <Post key={id} 
       userName={post.userName} 
       text={post.text} 
       avatar={post.avatar} 
       img_url={post.img_url} 
       />
))}
 </div>
     <div className="right">
        <InstagramEmbed
  url='https://instagr.am/p/Zw9o4/'
  clientAccessToken='123|456'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
     </div>
    

    </div>
   {/* <div className="embed">
     <h1>hello</h1>
    
   </div> */}
    

 {
       currentUser?.displayName? <ImgUp username={currentUser.displayName} /> :( <h3>Sorry u need to login to uplead</h3>)
     } 

    </div>
  );
}

export default App;
