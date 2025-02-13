import SendIcon from "@mui/icons-material/Send"
import { Box, Button, Divider, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material"
import { formatDistanceToNow } from "date-fns"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import React, { useEffect, useMemo, useState } from "react"
import { Mention, MentionsInput } from "react-mentions"
import data from "../../db.json"
import { users } from "../../db.json"
import { db } from "../../firebaseConfig"
import { Comment } from "./Comment"

export type TaskCommentProps = {
  comments: Comment[]
  taskId: string
  userId: string
}

export const TaskComment = (props: TaskCommentProps) => {
  const { taskId, userId } = props

  const [currentComments, setComments] = useState(props.comments)
  const [newComment, setNewComment] = useState("")
  const theme = useTheme()

  const customStyle = {
    width: "100%",
    control: {
      fontSize: 16,
      border: `1px solid white`,
      borderRadius: "5px",
      backgroundColor: theme.palette.background.paper,
    },
    highlighter: {
      padding: 10,
    },
    input: {
      padding: 10,
      minHeight: "50px",
      borderRadius: "5px",
      backgroundColor: theme.palette.background.paper,
    },
    suggestions: {
      list: {
        backgroundColor: theme.palette.background.default,
        color: "primary",
        borderRadius: "5px",
        padding: "5px",
      },
      item: {
        padding: "8px",
        "&focused": {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
  }

  const findCreatorFullName = (userId: string | undefined) => {
    const user = data.users.find((u) => u.id === userId)
    return user ? `${user.firstName}` : ""
  }

  useEffect(() => {
    if (taskId) {
      const unsubscribe = onSnapshot(collection(db, "tasks", taskId, "comments"), (snapshot) => {
        console.log("snapshot.docs")
        snapshot.docs.map((doc) => console.log(doc.data()))
        setComments(
          snapshot.docs.map(
            (doc) =>
              ({
                id: Number(doc.id),
                content: doc.data()["message"],
                createdAt: doc.data()["timestamp"],
                creatorId: doc.data()["user"],
                taggedPersonId: doc.data()["person"],
              }) as Comment
          )
        )
      })
      return () => unsubscribe()
    }
  }, [props.taskId])

  const extractMentions = (text: string) => {
    return text.replace(/\(\d+\)/g, "").replace(/\[|\]/g, "")
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    const newCommentData = {
      user: userId,
      message: extractMentions(newComment),
      timestamp: new Date().toISOString(),
    }
    setNewComment("")
    await addDoc(collection(db, "tasks", taskId, "comments"), newCommentData)
  }

  const usersToDisplay = useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      display: `${user.firstName}`,
    }))
  }, [users])

  const highlightMentions = (text: string) => {
    return text.split(" ").map((word, index) =>
      word.startsWith("@") ? (
        <span key={index} style={{ fontWeight: "bold", color: theme.palette.primary.main }}>
          {word.replace("@", "")}{" "}
        </span>
      ) : (
        word + " "
      )
    )
  }

  return (
    <>
      <Typography variant="h6">Comments</Typography>
      <List>
        {currentComments.length > 0 ? (
          currentComments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography>
                      <strong style={{ color: theme.palette.primary.main }}>
                        {findCreatorFullName(comment.creatorId)}:
                      </strong>{" "}
                      {highlightMentions(comment.content)}
                    </Typography>
                  }
                  secondary={`${formatDistanceToNow(comment.createdAt, { addSuffix: true })}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body2" color={theme.palette.text.secondary}>
            No comments yet.
          </Typography>
        )}
      </List>
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <MentionsInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Comment"
          style={customStyle}
        >
          <Mention
            trigger="@"
            data={usersToDisplay}
            displayTransform={(id, display) => `@${display}`}
            renderSuggestion={(suggestion) => `@${suggestion.display}`}
          />
        </MentionsInput>

        <Button variant="contained" color="primary" onClick={handleAddComment} endIcon={<SendIcon />}>
          Send
        </Button>
      </Box>
    </>
  )
}
