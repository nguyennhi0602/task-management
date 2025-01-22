import { RefObject } from "react"

export const submit = (formRef: RefObject<HTMLFormElement>) => () => {
  formRef.current!.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
}
