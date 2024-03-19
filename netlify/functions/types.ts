
enum PersonName {
  DenaliBella = "Denali Bella",
}

type Author = {
  name: PersonName
  description: string
}

enum BlogCategory {
  Music = "Music",
  Travel = "Travel",
  Art = "Art",
  Tech = "Tech",
}

type Quote = {
  content: string
  author: string
}

type ParagraphContent = {
  subheading?: string
  subtitle?: string
  description?: string
  image?: string
  quote?: Quote
  ul?: string[]
  ol?: string[]
}

type BlogPost = {
  title: string
  subtitle: string
  content: ParagraphContent[]
  category: BlogCategory
  author: Author
  createdAt?: string
}



export { PersonName, BlogCategory }

export type {  Author, ParagraphContent, BlogPost }
