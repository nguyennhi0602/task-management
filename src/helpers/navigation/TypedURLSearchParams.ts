import { NavigateOptions } from "react-router-dom"
import { URLSearchParamsInit } from "react-router-dom/dist/dom"

type TypedURLSearchParamsGetter<T extends Record<string, string>> = {
  get: (name: keyof T) => string
  entries: () => IterableIterator<[keyof T, string]>
}

type TypedURLSearchParamsSetter<T extends Record<string, string>> = (
  names: Record<keyof T, string> | URLSearchParamsInit,
  navigateOpts?: NavigateOptions
) => void

export type TypedUseSearchParams<T extends Record<string, string>> = [
  TypedURLSearchParamsGetter<T>,
  TypedURLSearchParamsSetter<T>,
]
