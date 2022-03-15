import * as React from "react"

export type ButtonProps = {
  children ?: React.ReactNode
}

export function Button({children} : ButtonProps) : JSX.Element {
  return <button type="button">
    {children}
    <style jsx>{`
      button {
        color: red;
      } 
    `}</style>
  </button>
}
