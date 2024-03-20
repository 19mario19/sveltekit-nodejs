import { PersonName, type Author } from "$lib/types"

const recordAuthors: Record<PersonName, Author> = {
  [PersonName.DenaliBella]: {
    name: PersonName.DenaliBella,
    description: "The greatest writer of all time in the whole universe!",
  },
  [PersonName.JohnSmith]: {
    name: PersonName.JohnSmith,
    description: "Renowned novelist with a penchant for mystery thrillers.",
  },
  [PersonName.MaryJohnson]: {
    name: PersonName.MaryJohnson,
    description: "Award-winning poet celebrated for her evocative verses.",
  },
  [PersonName.DavidBrown]: {
    name: PersonName.DavidBrown,
    description:
      "Prolific science fiction author known for his imaginative worlds.",
  },
  [PersonName.SarahWilson]: {
    name: PersonName.SarahWilson,
    description:
      "Master of historical fiction, captivating readers with her vivid storytelling.",
  },
  [PersonName.MichaelMiller]: {
    name: PersonName.MichaelMiller,
    description: "Bestselling author of gripping psychological thrillers.",
  },
}

export { recordAuthors }
