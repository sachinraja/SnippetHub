interface PackParams {
  author: string
  pack: string
}

type AuthorPropFromParam = Exclude<
  UnwrapPromise<
    ReturnType<
      typeof import('@lib/utils/server-url-params')['getAuthorFromParam']
    >
  >,
  null
>

type PackPropFromParam = Exclude<
  UnwrapPromise<
    ReturnType<
      typeof import('@lib/utils/server-url-params')['getPackFromParam']
    >
  >,
  null
>

interface AuthorPackProps {
  author: AuthorPropFromParam
  pack: PackPropFromParam
}
