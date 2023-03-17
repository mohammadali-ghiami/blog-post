import { useDispatch } from "react-redux";
import { useReactionBLogMutation } from "../../api/apiSlice";
import { reactionAdded } from "../../reducers/blogSlice";

const reactionEmoji = {
    thumbsUp: "👍",
    hooray: "🎉",
    heart: "❤️",
    rocket: "🚀",
    eyes: "👀",
};

const ReactionButton = ({ blog }) => {
    const dispatch = useDispatch();
    const [reactionBlog] = useReactionBLogMutation();

    const reactionButtons = Object.entries(reactionEmoji).map(
        ([name, emoji]) => {
            return (
                <button
                    key={name}
                    type="button"
                    onClick={async () => {
                        await reactionBlog({ blogId: blog.id, reactions: blog.reactions})
                    }}
                    className="muted-button reaction-button"
                >
                    {emoji} {blog.reactions[name]}
                </button>
            );
        }
    );
    return <div>{reactionButtons}</div>
}

export default ReactionButton;