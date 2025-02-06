export function Texto({titulo}) {
    return (
        <p className="text-red-500">{titulo}</p>
    )
}

export function Numero({a, b}) {
    return (
      <p>{a+b}</p>
    )
}