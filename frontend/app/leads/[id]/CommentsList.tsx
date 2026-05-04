interface CommentsListProps {
  comments: { id: number, text: string; createdAt: string }[];
}

export default function CommentsList({ comments }: CommentsListProps) {
  if (comments.length === 0) {
    return <p className="text-gray-500">No comments yet.</p>;
  }

  return (<div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-100 p-3 rounded">
          <p>{comment.text}</p>
          <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
}