import { AntesDepois } from './components/AntesDepois';
import { Bar } from './components/Bar';
import { Contato } from './components/Contato';
import { Diagnostico } from './components/Diagnostico';
import { Demonstracao } from './components/Demonstracao';
import { Duvidas } from './components/Duvidas';
import { Filtros } from './components/Filtros';
import { Hero } from './components/Hero';
import { Sobre } from './components/Sobre';
import { Sprites } from './components/Icon';

export default function App() {
  return (
    <>
      <Sprites />
      <Bar />
      <main>
        <Hero />
        <Sobre />
        <AntesDepois />
        <Filtros />
        <Demonstracao />
        <Duvidas />
        <Diagnostico />
        <Contato />
      </main>
    </>
  );
}
