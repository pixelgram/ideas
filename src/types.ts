export type id = string

export type Idea = {
  id: id
  name: string
  children: id[]
  parentId: id
  themeId: id
  likeCount: number
  createdAt: string
  updatedAt: string
}

export type Theme = {
  id: id
  name: string
  createdAt: string
  updatedAt: string
}
