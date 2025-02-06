import { Texto, Numero } from "./texto";

export default function Home() {
  return (
    <>
      <Texto titulo={"Olá mundo"} />
      <Numero a={1} b={1} />
    </>
  );
}