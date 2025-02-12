// import { Button } from "@mui/material"
// import { useState } from "react"
// import { Mention, MentionsInput } from "react-mentions"
// import { users } from "../../db.json"

// const CommentInput = ({onAddComment:() => void}) => {
//   const [currentComment, setCurrentComment] = useState("")

//   const handleAddComment = () => {
//     if (!currentComment.trim()) return
//     onAddComment
//     setCurrentComment("")
//   }

//   return (
//     <div>
//       <MentionsInput
//         value={currentComment}
//         onChange={(e) => setCurrentComment(e.target.value)}
//         placeholder="Type @ to mention someone..."
//         style={{ width: "100%", minHeight: "40px", padding: "8px", border: "1px solid #ddd" }}
//       >
//         <Mention trigger="@" data={users} style={{ backgroundColor: "#e0f7fa" }} />
//       </MentionsInput>

//       <Button variant="contained" onClick={handleAddComment} sx={{ mt: 1 }}>
//         Add Comment
//       </Button>
//     </div>
//   )
// }

// export default CommentInput
