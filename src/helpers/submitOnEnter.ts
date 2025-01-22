import { RefObject } from "react"
import { submit } from "./submit"

export const submitOnEnter =
  (formRef: RefObject<HTMLFormElement>): ((this: HTMLInputElement, ev: KeyboardEvent) => void) =>
  (e) => {
    if (e.key === "Enter") {
      submit(formRef)()
    }
  }
