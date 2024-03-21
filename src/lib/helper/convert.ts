import { ContentTypes } from "$lib/types"
import type { ParagraphContent, ID } from "$lib/types"

/**
 * Converts the given element to a ParagraphContent object based on its type.
 *
 * @param {ContentTypes} element - the type of content element to be converted
 * @return {ParagraphContent} the corresponding ParagraphContent object
 */
function convertContentToParagrphContent(
  element: ContentTypes,
  id: ID,
): ParagraphContent {
  switch (element) {
    case ContentTypes.Subheading:
      return { id, subheading: "" }
    case ContentTypes.Subtitle:
      return { id, subtitle: "" }
    case ContentTypes.Description:
      return { id, description: "" }
    case ContentTypes.Image:
      return { id, image: "" }
    case ContentTypes.Quote:
      return {
        id,
        quote: {
          author: "",
          content: "",
        },
      }

    default:
      return {id: 0}
  }
}

export { convertContentToParagrphContent }
