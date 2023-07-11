import React, { useState } from 'react';

const CommentModal = ({ comments }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // Implement logic to submit the new comment
    console.log('New comment:', newComment);
    // Reset the new comment input field
    setNewComment('');
  };

  return (
    <div className="fixed z-999 inset-0 flex items-center justify-center">
      <div className="bg-white w-1/2 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments?.length > 0 ? (
          <div className="space-y-4">
            {comments?.map((comment) => (
              <div key={comment?._id} className="border-b border-gray-300 pb-4">
                <p>{comment?.content}</p>
                <p className="text-gray-500 text-sm">{comment?.createdAt}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No comments yet</p>
        )}
        <textarea
          className="w-full h-16 mt-4 p-2 border border-gray-300 rounded"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
          onClick={handleCommentSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommentModal;
