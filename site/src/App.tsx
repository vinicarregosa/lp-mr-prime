import { AntesDepois } from './components/AntesDepois';
import { Bar } from './components/Bar';
import { Capitulo } from './components/Capitulo';
import { Clientes } from './components/Clientes';
import { Contato } from './components/Contato';
import { Filtros } from './components/Filtros';
import { Sprites } from './components/Icon';

export default function App() {
  return (
    <>
      <Sprites />
      <Bar />
      <main>
        <Capitulo />
        <AntesDepois />
        <Filtros />
        <Clientes />
        <Contato />
      </main>
    </>
  );
}
