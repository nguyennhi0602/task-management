import { Comment } from "../comment/Comment"

export type Task = {
  id: string
  name: string
  description: string
  deadlineAt: string
  assignee: string
  category: number
  comments?: Comment[]
}
