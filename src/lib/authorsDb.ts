import { PersonName, type Author } from "$lib/types"

const recordAuthors: Record<PersonName, Author> = {
  [PersonName.DenaliBella]: {
    name: PersonName.DenaliBella,
    description: "The greatest writter of all time in the whole universe!",
  },
}

export { recordAuthors }
