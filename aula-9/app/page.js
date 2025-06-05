import Link from "next/link";

export default function Home() {
  return (
    <div className="space-x-8">
      <Link href="/livros">livros</Link>
      <Link href="/editora">Editora</Link>
    </div>
  )
}