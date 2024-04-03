// See https://kit.svelte.dev/docs/types#app

import type { UserRole } from "$lib/types"

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: {
        name: string
        role: UserRole
      }
      users: any[]
      posts: any[]
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {}
