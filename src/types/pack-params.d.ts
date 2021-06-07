interface PackParams {
  author: string
  pack: string
}

type AuthorPropFromParam = Exclude<
  UnwrapPromise<
    ReturnType<typeof import('@lib/utils/url-params')['getAuthorFromParam']>
  >,
  null
>

type PackPropFromParam = Exclude<
  UnwrapPromise<
    ReturnType<typeof import('@lib/utils/url-params')['getPackFromParam']>
  >,
  null
>

interface AuthorPackProps {
  author: AuthorParam
  pack: PackPropFromParam
}
