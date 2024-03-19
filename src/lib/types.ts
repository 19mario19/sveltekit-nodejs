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

enum ContentTypes {
  Subheading = "subheading",
  Subtitle = "subtitle",
  Description = "description",
  Image = "image",
  Quote = "quote",
  Unordered_List = "ul",
  Ordered_List = "ol",
}

type BlogPost = {
  title?: string
  subtitle?: string
  content?: ParagraphContent[]
  category?: BlogCategory
  author?: Author
  createdAt?: string
}

enum ApiRoutes {
  BlogPosts = "/api/blog-posts/",
}

export { PersonName, BlogCategory, ApiRoutes, ContentTypes }

export type { Author, ParagraphContent, BlogPost, Quote }
