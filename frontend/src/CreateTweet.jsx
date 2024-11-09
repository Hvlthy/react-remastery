import React from "react";
import { useDispatch } from 'react-redux'
import { addTweet } from "./store/tweet";

const CreateTweet = () => {
const [content, setContent] = useState('');
const dispatch = useDispatch();

const handleSubmit = (e) => {
 e.preventDefault(); 
 if (content.trim()) {
dispatch(addTweet(content));
setContent('');
}
};
return (
<form onSubmit={handleSubmit}>
<div>
<label htmlFor="tweet-content">Tweet:</label>
<input 
id="tweet-content"
 type="text"
value={content}
 onChange={(e) => setContent(e.target.value)}
  />
</div>
<button type="submit">Post Tweet</button>
</form>
);
};

export default CreateTweet;