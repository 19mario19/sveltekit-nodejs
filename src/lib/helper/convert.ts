import { ContentTypes } from "$lib/types"
import type { ParagraphContent } from "$lib/types"

function convertContentToParagrphContent(
  element: ContentTypes,
): ParagraphContent {
  switch (element) {
    case ContentTypes.Subheading:
      return { subheading: "" }
    case ContentTypes.Subtitle:
      return { subtitle: "" }
    case ContentTypes.Description:
      return { description: "" }
    case ContentTypes.Image:
      return { image: "" }
    case ContentTypes.Quote:
      return {
        quote: {
          author: "",
          content: "",
        },
      }

    default:
      return {}
  }
}

export { convertContentToParagrphContent }
