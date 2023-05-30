import React ,{useState, useEffect}from "react";


function CommentSection({recipeId}) {
  
  const [feedback, setFeedback] = useState(()=>{
    const storedFeedback = localStorage.getItem(`feedback-${recipeId}`);
   
      return storedFeedback ? JSON.parse(storedFeedback):[];
  });
 

  useEffect(() => {
    localStorage.setItem(`feedback-${recipeId}`, JSON.stringify(feedback));
  }, [feedback, recipeId]);

  function handleSubmit(newFeedback) {
    setFeedback(prevFeedback => [
      ...prevFeedback,
      { text: newFeedback, recipeId: recipeId }
    ]);
  }

  function handleDelete(index) {
    setFeedback(prevFeedback => {
      const newFeedback = [...prevFeedback];
      newFeedback.splice(index, 1);
      return newFeedback;
    });
  }
  const filteredFeedback = feedback.filter(
    item => item.recipeId === recipeId
  );
  return (
    <div>
     
      <ul>
        {filteredFeedback.map((item, index) => (
          <li key={index}>
            {item.text}&nbsp; &nbsp;
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <FeedbackForm onSubmit={handleSubmit} />
    </div>
  );
}
function FeedbackForm(props) {
  const [feedback, setFeedback] = useState('');

  function handleChange(event) {
    setFeedback(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(feedback);
    setFeedback('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input placeholder="Add Feedback" type="text" value={feedback} onChange={handleChange} />
      </label>
      <br></br>
      &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
      <button style={{margin:"5px"}} type="submit">Submit</button>
    </form>
  );
}

export default CommentSection;