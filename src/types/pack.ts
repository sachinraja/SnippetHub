import type { UnwrapPromise } from 'nexus/dist/typeHelpersInternal'
import type {
  getAuthorFromParam,
  getPackFromParam,
} from '@lib/utils/url-params'

export interface PackParams {
  author: string
  pack: string
}

export interface AuthorPackProps {
  author: Exclude<UnwrapPromise<ReturnType<typeof getAuthorFromParam>>, null>
  pack: Exclude<UnwrapPromise<ReturnType<typeof getPackFromParam>>, null>
}
