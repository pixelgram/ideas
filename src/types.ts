export type id = string

export type Node = {
  id: id
  name: string
  children: id[]
  parentId: id
  pageId: id
}

export type Page = {
  id: id
  name: string
}
