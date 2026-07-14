import { useState } from 'react'
import './App.css'

function App() {
  const [atual, setAtual] = useState("0")
  const [anterior, setAnterior] = useState("0")
  const [operador, setOperador] = useState<op1>()
  const [digito, setDigito] = useState(false)
  const [resultado, setResultado] = useState(false)
  type op = typeof operadores
  type op1 = keyof op

  const botoes = [
    '1', '4', '7', '0',
    '2', '5', '8', '.',
    '3', '6', '9', '=',
    '÷', 'x', '-', '+'
  ]

  const operadores = {
    "+": (a: number, b: number) => (a + b),
    "-": (a: number, b: number) => (a - b),
    "÷": (a: number, b: number) => (a / b),
    "x": (a: number, b: number) => (a * b),
  }
  
  
  
  
  function click(valor: string) {

    
    
    if (valor === "c") {
      setAtual("0")
      setAnterior("0")
      setOperador(undefined)
      setDigito(false)
      return
    }


    
    if (valor === "+" || valor === "-" || valor === "÷" || valor === "x") {
      if (operador !== undefined) {

        if (digito) {
          const a: number = parseFloat(atual)
          const b: number = parseFloat(anterior)
          const calc: number = operadores[operador](a, b)
          setAnterior(String(calc))
          setAtual(String(calc))
          setOperador(valor)
          setDigito(false)
          setResultado(true)
        } else {
          return
        }
      } else {
        setOperador(valor)
        setAnterior(atual)
        setAtual("0")
        setDigito(false)
      }
      return
    }
    if (valor === "=") {
      
      if (!operador) {
        return
      } else {
        const a: number = parseFloat(atual)
        const b: number = parseFloat(anterior)
        const calc: number = operadores[operador](a, b)
        setAtual(String(calc))
        setDigito(false)
        setResultado(true)
      }
      return
    }
    
    if (resultado) {
      setAtual(valor)
      setResultado(false)
      setDigito(true)
      return
    }

    if (atual.length >= 14) {
      return
    } 
    
    if (valor === "." && atual.includes(".")) {
      return
    }
    
    if (atual === "0") {
      if (valor === ".") {
        setAtual("0.")
        setDigito(true)
      } else {
        setAtual(valor)
        setDigito(true)
        
      }
    } else {
      setAtual(atual + valor)
      setDigito(true)
    }

  }
  
  return (
    <>
    <header className='
    text-center
    mt-5
    mb-8
    '>
      <h1 className='
      relative inline-block
      text-4xl
      after:content-[""]
      after:w-45
      after:h-1
      after:rounded-full
      after:absolute
      after:top-10
      after:left-0
      after:bg-linear-to-r
      after:from-(--soma)
      after:to-transparent
      '>
      Calculadora</h1>
    </header>
    <main className='
    flex
    flex-col
    items-center
    px-2
    '>
      <section className='
      w-full
      max-w-[563px]
      aspect-[563/775]
      p-[18px]
      bg-(--borda)
      rounded-4xl
      '>
        <div className='
        flex
        flex-col
        gap-6
        w-full
        h-full
        py-[30px]
        px-[23px]
        bg-(--retbranco)
        rounded-4xl
        border-2
        border-(--borda2)
        '>
          <div className='tela
          flex
          items-center
          justify-end
          w-full
          h-[87px]
          bg-(--tela)
          rounded-xl
          border
          border-(--borda2)
          '>
            <p className='visor
            text-[60px]
            px-2
            '>{atual}</p>
          </div>
          <button type="button" className='
          font-bold
          text-base xs:text-xl
          bg-(--on)
          py-1 xs:py-[12px]
          px-1 xs:px-[24px]
          self-end
          border
          rounded-lg
          border-(--borda2)
          cursor-pointer
          '
          onClick={() => click("c")} 
          >ON/C</button>
          <div className='
          grid
          grid-rows-4
          grid-cols-4
          grid-flow-col
          gap-[10px] xs:gap-[23px]
          w-full
          flex-1
          '>
            {botoes.map((botao) =>
            <button
            onClick={() => click(botao)} 
            type='button' 
            key={botao}
            className={`num ${`${botao}` === '+' ? 'bg-(--soma)!' : ''}`}>
            {botao}
            </button>
            )}
          </div>

        </div>

      </section>
    </main>
    </>
  )
}

export default App
