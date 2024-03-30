import { PersonName, type Author } from "$lib/types"

const recordAuthors: Record<PersonName, Author> = {
  [PersonName.DenaliBella]: {
    img: "https://c.wallhere.com/photos/07/dc/artwork_digital_art_women_black_background_simple_background_white_hair_long_hair_one_bare_shoulder-2190707.jpg!d",
    name: PersonName.DenaliBella,
    description: "The greatest writer of all time in the whole universe!",
  },
  [PersonName.JohnSmith]: {
    img: "https://c.wallhere.com/photos/fe/cc/Alexander_Drobkov_women_model_redhead_long_hair_simple_background_black_background_makeup-1548247.jpg!d",
    name: PersonName.JohnSmith,
    description: "Renowned novelist with a penchant for mystery thrillers.",
  },
  [PersonName.MaryJohnson]: {
    img: "https://c.wallhere.com/photos/1e/b3/science_fiction_digital_art_concept_art_artwork_fantasy_art_fan_art_CGI_fantasy_girl-1693405.jpg!d",
    name: PersonName.MaryJohnson,
    description: "Award-winning poet celebrated for her evocative verses.",
  },
  [PersonName.DavidBrown]: {
    img: "https://c.wallhere.com/images/58/74/c4e1970cd67b4a95cffd56ff9d2f-2282668.jpg!d",
    name: PersonName.DavidBrown,
    description:
      "Prolific science fiction author known for his imaginative worlds.",
  },
  [PersonName.SarahWilson]: {
    img: "https://c.wallhere.com/photos/37/3c/artwork_women_multi_colored_hair_long_hair_dress_boobs_big_boobs_simple_background-2176611.jpg!d",
    name: PersonName.SarahWilson,
    description:
      "Master of historical fiction, captivating readers with her vivid storytelling.",
  },
  [PersonName.MichaelMiller]: {
    img: "https://c.wallhere.com/photos/af/fa/women_portrait_people_face_long_hair_science_fiction_digital_art_concept_art-1709543.jpg!d",
    name: PersonName.MichaelMiller,
    description: "Bestselling author of gripping psychological thrillers.",
  },
}

export { recordAuthors }
