import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import { BlogCategory, ContentTypes, PersonName } from "$lib/types"
import type { BlogPost, ParagraphContent, ID } from "$lib/types"
import { convertContentToParagrphContent } from "$lib/helper/convert"
import { recordAuthors } from "$lib/authorsDb"

const formData: Writable<BlogPost> = writable({
  title: "",
  subtitle: "",
  mainImage: "",
  content: [],
})

formData.subscribe((v) => console.log("FormData: ", v))

interface IFormData {
  set: (data: BlogPost) => void
  clear: () => void
  addParagraph: (data: ContentTypes) => void
  removeParagraph: (id: ID) => void
}

class FormData implements IFormData {
  constructor(data: BlogPost) {
    formData.set(data)
  }

  set(data: BlogPost): void {
    formData.set(data)
  }
  clear(): void {
    if (!confirm("Are you sure you want to clear all?")) {
      return
    }
    formData.set({
      title: "",
      subtitle: "",
      mainImage: "",
      content: [],
      category: BlogCategory.Art,
      author: recordAuthors[PersonName.DenaliBella],
    })
  }
  /**
   * Adds a paragraph to the form data.
   *
   * @param {ContentTypes} data - The data to add as a paragraph.
   * @return {void} This function does not return anything.
   */
  addParagraph(data: ContentTypes): void {
    const item: ParagraphContent = {
      ...convertContentToParagrphContent(data),
    }
    formData.update((v) => {
      if (v.content) {
        return {
          ...v,
          content: [...v.content, item],
        }
      }
      return v
    })
  }
  /**
   * Removes a paragraph from the form data based on the provided ID.
   *
   * @param {ID} id - The ID of the paragraph to be removed.
   * @return {void} This function does not return a value.
   */
  removeParagraph(id: ID): void {
    if (!confirm("Are you sure you want to remove item with id: " + id + "?")) {
      return
    }
    formData.update((v) => {
      if (v.content) {
        return {
          ...v,
          content: v.content.filter((p) => p.id !== id),
        }
      }
      return v
    })
  }
}

/**
 * Creates and returns a new instance of the FormData class.
 *
 * @return {FormData} A new instance of the FormData class.
 */
function formDataInstance(data: BlogPost): FormData {
  return new FormData(data)
}

export { formData, formDataInstance }
