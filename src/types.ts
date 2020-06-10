export type id = string

export type Node = {
  id: id
  name: string
  children: id[]
}

export type Page = {
  id: id
  name: string
  children: id[]
}

export type User = {
  id: string
  name: string
}
