import React, { useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { BsShare } from 'react-icons/bs';
import CommentModal from './CommentModal';

const Card = ({
  url,
  name,
  isPublic,
  dateTime,
  shareableLink,
  comments,
}) => {
  const userIdIndex = name.indexOf('_');
  const displayName = name.substring(userIdIndex + 1);
  let displayUrl = url ? url.slice(0, 20) + '...' : '';
  let shareUrlDisplay = shareableLink
    ? shareableLink.slice(0, 10) + '...'
    : '';

  const [showComments, setShowComments] = useState(false);

  const handleCommentsClick = () => {
    setShowComments(true);
  };

  return (
    <div className="bg-white rounded-lg text-sm shadow p-4 my-4">
      <h2 className="text-xl font-bold mb-2">{displayName}</h2>
      {url && (
        <p className="text-gray-500 mb-2">
          URL:{' '}
          <a className="text-blue-400" href={url}>
            {displayUrl}
          </a>
        </p>
      )}
      <p className="text-gray-500 mb-2">
        Visibility: {isPublic ? 'Public' : 'Private'}
      </p>
      {dateTime && (
        <p className="text-gray-500 mb-4">Date and Time: {dateTime}</p>
      )}
      {shareableLink && (
        <p className="text-gray-500 mb-2">
          Shareable Link:{' '}
          <a className="text-blue-400" href={shareableLink}>
            {shareUrlDisplay}
          </a>
        </p>
      )}
      {true && (
        <>
          <p className="text-gray-500">Comments: {comments?.length}</p>
          <div className="p-4 flex justify-between">
            <AiOutlineComment
              size={32}
              className="cursor-pointer"
              onClick={handleCommentsClick}
            />
            <BsShare size={32} className="cursor-pointer" />
          </div>
        </>
      )}
      {showComments && <CommentModal comments={comments} />}
    </div>
  );
};

export default Card;
