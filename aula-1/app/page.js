import { Pessoa } from "./pessoa";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen gap-10">
      <Pessoa 
        nome={'Daniel'} 
        dataNascimento={'01/10/2004'} 
        endereco={'Rua João Luiz da Silva'} 
        cidade={'Barretos'}
        estado={'SP'} 
        cep={114781260} 
      />
      <Pessoa 
        nome={'Lucas'} 
        dataNascimento={'01/10/2004'} 
        endereco={'Rua João Luiz da Silva'} 
        cidade={'Barretos'} 
        estado={'SP'} 
        cep={114781260} 
      />
      <Pessoa 
        nome={'João'} 
        dataNascimento={'01/10/2004'} 
        endereco={'Rua João Luiz da Silva'} 
        cidade={'Barretos'} 
        estado={'SP'} 
        cep={114781260} 
      />
      <Pessoa 
        nome={'Silva'} 
        dataNascimento={'01/10/2004'} 
        endereco={'Rua João Luiz da Silva'} 
        cidade={'Barretos'} 
        estado={'SP'} 
        cep={114781260} 
      />
    </div>
  );
}