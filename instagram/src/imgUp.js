import React, { useState } from 'react'
import { Button, Input} from '@material-ui/core';
import firebase from 'firebase';
import { db, storage }from './firebase'
import'./imgUp.css'

function ImgUp({ username }) {

const [text, setText] = useState('')
const [image, setImage] = useState(null)
const [progress, setProgress] = useState(0)

const fileInput = (e) => {
if(e.target.files[0]) {
    setImage(e.target.files[0])
}
}

const handleUpload = () => {
const uploadTask = storage.ref(`images/${image.name}`).put(image)
uploadTask.on(
    "state_changed",
    (snapshot) => {
        const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
)
 setProgress(progress)
}, (err) => {
    console.log(err)
    alert(err.message)
}, 
() => {
    // complete functoin ...
    storage
    .ref('images')
    .child(image.name)
    .getDownloadURL()
    .then(url => {
      db.collection('posts').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          text: text,
          img_url: url,
          userName: username,
      })
    
    })
     setProgress(0);
     setText("")
     setImage(null)
}
)
}

    return (
        <div className="img_upload">
             <progress className="progress" value={progress} max="100" />
             <Input placeholder="add text" type="text" onChange={(e) => setText(e.target.value)} />
             <Input onChange={fileInput} type="file" />
             <Button onClick={handleUpload}>
            Upload
             </Button>
        </div>
    )
}

export default ImgUp
