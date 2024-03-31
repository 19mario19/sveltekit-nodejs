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
  img: string
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
  _id?: string
  mainImage?: string
  title?: string
  subtitle?: string
  content?: ParagraphContent[]
  category?: BlogCategory
  author: Author
  createdAt?: string
}

enum ApiRoutes {
  BlogPosts = "/api/posts/",
}

enum RoutePath {
  Home = "/",
  Posts = "/posts",
  Create = "/create",
  Random = "/random",
}

enum ContainerDimension {
  ExtraSmall = "max-width: var(--bp-sm);",
  Small = "max-width: var(--bp-md);",
  Medium = "max-width: var(--bp-lg);",
  Large = "max-width: var(--bp-xl);",
  ExtraLarge = "max-width: var(--bp-2xl);",
}

export {
  PersonName,
  BlogCategory,
  ApiRoutes,
  ContentTypes,
  ContainerDimension,
  RoutePath,
}

export type { ID, Author, ParagraphContent, BlogPost, Quote }
