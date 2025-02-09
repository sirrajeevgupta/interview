const AddQuestion = () => {
  return (
    <section>
      <form>
        <label>Question:</label>
        <input placeholder='Type Question' type='text' />
        <label>Answer:</label>
        <textarea name='answer' id='answer'></textarea>
        <label>Code Snippet:</label>
        <textarea
          placeholder='Please type a code snippet if any'
          name='codeSnippet'
          id='codeSnippet'
        ></textarea>
        <div className='formHelpers'>
          <div>
            <label>Domain:</label>
            <input placeholder='Domain' type='text' />
          </div>
          <div>
            <label>Reference URL:</label>
            <input placeholder='URL' type='text' />
          </div>
        </div>
        <button type='submit'>Add Question</button>
      </form>
    </section>
  );
};

export default AddQuestion;
