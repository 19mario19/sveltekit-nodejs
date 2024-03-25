type ID = string | number

enum PersonName {
  DenaliBella = "Denali Bella",
  JohnSmith = "John Smith",
  MaryJohnson = "Mary Johnson",
  DavidBrown = "David Brown",
  SarahWilson = "Sarah Wilson",
  MichaelMiller = "Michael Miller",
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
  id: ID
  subheading?: string
  subtitle?: string
  description?: string
  image?: string
  quote?: Quote
}

enum ContentTypes {
  Subheading = "subheading",
  Subtitle = "subtitle",
  Description = "description",
  Image = "image",
  Quote = "quote",
}

type BlogPost = {
  mainImage?: string
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

export type { ID,Author, ParagraphContent, BlogPost, Quote }
