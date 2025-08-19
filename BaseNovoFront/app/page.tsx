import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ZKComplyLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-4 sm:py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <svg width="28" height="28" viewBox="0 0 32 32" className="text-white sm:w-8 sm:h-8">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <path d="M16 2L6 8v8c0 6.2 4.2 12 10 13.4C21.8 28 26 22.2 26 16V8L16 2z" fill="url(#logoGradient)" />
                <path
                  d="M12 16l3 3 6-6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-semibold">
              ZK-<span className="text-green-400">Comply</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#" className="text-white hover:text-green-400 transition-colors text-sm">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
              Funcionalidades
            </a>
            <a href="#" className="text-gray-300 hover:text-green-400 transition-colors text-sm">
              Sobre Nós
            </a>
          </nav>

          {/* Login Button */}
          <Link href="/login">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent text-xs sm:text-sm px-3 sm:px-4 py-2"
            >
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Logo/Icon */}
          <div className="mb-8 sm:mb-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 relative">
              <svg width="80" height="80" viewBox="0 0 96 96" className="mx-auto sm:w-24 sm:h-24">
                <defs>
                  <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer ring */}
                <circle cx="48" cy="48" r="44" fill="none" stroke="url(#heroGradient)" strokeWidth="2" opacity="0.3" />

                {/* Inner shield shape */}
                <path
                  d="M48 8L20 20v20c0 17.6 12.6 34 28 38C63.4 74 76 57.6 76 40V20L48 8z"
                  fill="url(#heroGradient)"
                  filter="url(#glow)"
                />

                {/* Checkmark */}
                <path
                  d="M36 44l8 8 16-16"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />

                {/* Additional decorative elements */}
                <circle cx="48" cy="48" r="6" fill="white" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight px-2">Da amostra ao laudo.</h1>

          {/* Subheading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-gray-200 px-2">
            Provas ZK para estabilidade e pureza
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            Use Zero-Knowledge Proofs para comprovar qualidade química sem revelar informações sensíveis.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-black font-semibold px-6 sm:px-8 py-3 text-base sm:text-lg rounded-lg">
              Teste agora
            </Button>
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-gray-300 hover:text-white hover:bg-gray-800 px-6 sm:px-8 py-3 text-base sm:text-lg"
            >
              Falar com especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white px-2">
                Sigilo & Propriedade
                <br />
                Intelectual
              </h3>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-medium px-4 sm:px-6 py-4 text-sm rounded-lg min-h-[80px] whitespace-normal leading-tight">
                Prove ZK que valida sua
                <br />
                fórmula sem expor a
                <br />
                estrutura.
              </Button>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white px-2">
                Verificação Rápida
                <br />& Escalável
              </h3>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-medium px-4 sm:px-6 py-4 text-sm rounded-lg min-h-[80px] whitespace-normal leading-tight">
                Validação em minutos
                <br />
                para qualquer amostra
              </Button>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white px-2">
                Redução de Custos
                <br />& Eficiência
              </h3>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-medium px-4 sm:px-6 py-4 text-sm rounded-lg min-h-[80px] whitespace-normal leading-tight">
                {"> 50 % de economia"}
                <br />a ciclos de P&D
                <br />
                40x mais rápidos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white px-2">
            Seus Dados Seguros. Suas
            <br />
            Provas Válidas
          </h2>
        </div>
      </section>

      {/* Motivational Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8">TEXTO MOTIVACIONAL LDL</p>
          </div>
        </div>
      </section>

      {/* What is ZK-Comply Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16 text-white px-2">
            O que é o ZK-<span className="text-green-400">Comply</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* SMILES Integration */}
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 border border-gray-700">
              <div className="mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg width="48" height="48" viewBox="0 0 64 64" className="text-white sm:w-16 sm:h-16">
                    <circle cx="20" cy="20" r="4" fill="currentColor" />
                    <circle cx="44" cy="20" r="4" fill="currentColor" />
                    <circle cx="32" cy="44" r="4" fill="currentColor" />
                    <line x1="20" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="2" />
                    <line x1="20" y1="20" x2="32" y2="44" stroke="currentColor" strokeWidth="2" />
                    <line x1="44" y1="20" x2="32" y2="44" stroke="currentColor" strokeWidth="2" />
                    <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.6" />
                    <circle cx="56" cy="8" r="2" fill="currentColor" opacity="0.6" />
                    <circle cx="56" cy="56" r="2" fill="currentColor" opacity="0.6" />
                    <line x1="8" y1="8" x2="20" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                    <line x1="56" y1="8" x2="44" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-center text-white">Integração de SMILES</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Faça upload da sua notação SMILES em sua molécula em algoritmos, O sistema valida automaticamente a
                  estrutura molecular, log P, pontos de fusão e contagem de átomos associados, incluindo a análise de
                  grupos funcionais e impurezas. Em paralelo, ancorado modelos de aprendizado de máquina são treinados
                  para gerar insights sobre reações e propriedades moleculares, permitindo que o sistema automático
                  produza resultados precisos que eliminam a necessidade de testes de bancada físicos e caros.
                </p>
              </div>
            </div>

            {/* Computational Chemistry */}
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 border border-gray-700">
              <div className="mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg width="48" height="48" viewBox="0 0 64 64" className="text-white sm:w-16 sm:h-16">
                    <rect
                      x="8"
                      y="20"
                      width="48"
                      height="24"
                      rx="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect x="12" y="24" width="8" height="4" fill="currentColor" />
                    <rect x="24" y="24" width="8" height="4" fill="currentColor" />
                    <rect x="36" y="24" width="8" height="4" fill="currentColor" />
                    <rect x="48" y="24" width="4" height="4" fill="currentColor" />
                    <rect x="12" y="32" width="4" height="4" fill="currentColor" />
                    <rect x="20" y="32" width="12" height="4" fill="currentColor" />
                    <rect x="36" y="32" width="8" height="4" fill="currentColor" />
                    <rect x="48" y="32" width="4" height="4" fill="currentColor" />
                    <circle cx="32" cy="12" r="3" fill="currentColor" />
                    <circle cx="32" cy="52" r="3" fill="currentColor" />
                    <line x1="32" y1="15" x2="32" y2="20" stroke="currentColor" strokeWidth="2" />
                    <line x1="32" y1="44" x2="32" y2="49" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-center text-white">Química Computacional</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Nossa engine de química computacional, baseada em RDKit e algoritmos DGAs, realiza um desenvolvimento
                  profundo de análise molecular, incluindo modelagem, log P, pontos de fusão e contagem de átomos
                  associados, incluindo a análise de grupos funcionais e impurezas. Em paralelo, ancorado modelos de
                  aprendizado de máquina são treinados para gerar insights sobre reações e propriedades moleculares,
                  permitindo que o sistema automático produza resultados precisos que eliminam a necessidade de testes
                  de bancada físicos e caros.
                </p>
              </div>
            </div>

            {/* Zero-Knowledge Proofs */}
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 border border-gray-700">
              <div className="mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <svg width="48" height="48" viewBox="0 0 64 64" className="text-white sm:w-16 sm:h-16">
                    <rect
                      x="16"
                      y="20"
                      width="32"
                      height="24"
                      rx="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="32" cy="28" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                    <rect x="28" y="32" width="8" height="8" rx="1" fill="currentColor" />
                    <path
                      d="M24 16 L32 8 L40 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 48 L32 56 L44 48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="32" r="2" fill="currentColor" opacity="0.6" />
                    <circle cx="52" cy="32" r="2" fill="currentColor" opacity="0.6" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-center text-white">Provas Zero-knowledge</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Compilamos automaticamente seu protocolo baseado em sistemas provas ZKP não-interativas em máquinas
                  virtuais que hash de propriedades moleculares (Ethereum, Polygon etc.), garantindo neutralidade e
                  transparência. Em nosso dashboard, acompanhe registros das provas, histórico de validações e métricas
                  de desempenho em tempo real, simplificando auditorias e certificações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Revolution CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white px-2">
            Faça parte da revolução <span className="text-green-400">ZK</span> na química
          </h2>

          <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Junte-se a pesquisadores e empresas visionárias que estão redescobrindo o poder do{" "}
            <span className="text-green-400">P&D</span>.
          </p>

          <div className="text-left max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            <p className="text-lg sm:text-xl text-white mb-6 sm:mb-8">
              Com o ZK-<span className="text-green-400">Comply</span>, você:
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  <span className="text-white font-semibold">Valida</span> estruturas moleculares em minutos,{" "}
                  <span className="text-green-400">sem expor</span> uma única ligação química
                </p>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  <span className="text-green-400">Acelera</span> seus ciclos de desenvolvimento em até{" "}
                  <span className="text-green-400 font-bold">40%</span>, liberando tempo para inovação
                </p>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  <span className="text-green-400">Reduz</span> custos em mais de{" "}
                  <span className="text-green-400 font-bold">50%</span>, eliminando testes de bancada desnecessários
                </p>
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Garante auditabilidade <span className="text-green-400">on-chain</span>, com{" "}
                  <span className="text-green-400">hash imutável</span> e relatórios prontos para compliance
                </p>
              </div>
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
            Transforme sua <span className="text-green-400">próxima descoberta</span> em prova digital confiável e
            conquiste <span className="text-green-400">vantagem competitiva</span>.
          </p>

          <div className="px-4">
            <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-black font-semibold px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-xl rounded-lg">
              Experimente grátis e seja pioneiro
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <svg width="28" height="28" viewBox="0 0 32 32" className="text-white sm:w-8 sm:h-8">
                    <defs>
                      <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M16 2L6 8v8c0 6.2 4.2 12 10 13.4C21.8 28 26 22.2 26 16V8L16 2z"
                      fill="url(#footerGradient)"
                    />
                    <path
                      d="M12 16l3 3 6-6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <span className="text-lg sm:text-xl font-semibold">
                  ZK-<span className="text-green-400">Comply</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm">Tecnologia Zero-Knowledge para laboratórios e indústria química.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Produto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Preços
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Documentação
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Empresa</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Suporte</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Segurança
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 ZK-Comply. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
