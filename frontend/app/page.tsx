import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { FlaskRoundIcon as Flask } from "lucide-react" // Import Flask component

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
                Análise de Fórmulas Químicas Simplificada
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Registre, verifique e analise fórmulas químicas com facilidade. Uma plataforma segura para garantir a
                conformidade dos seus compostos.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Começar Agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-80 md:h-96">
                <svg
                  viewBox="0 0 500 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-xl"
                >
                  {/* Fundo circular gradiente */}
                  <circle cx="250" cy="250" r="230" fill="url(#gradientBg)" />

                  {/* Estrutura molecular / Cadeia de ligações químicas */}
                  <g className="molecular-chain">
                    {/* Átomos e ligações à esquerda */}
                    <circle cx="80" cy="180" r="15" fill="#3B82F6" />
                    <circle cx="130" cy="120" r="15" fill="#3B82F6" />
                    <circle cx="130" cy="240" r="15" fill="#3B82F6" />
                    <circle cx="180" cy="180" r="15" fill="#3B82F6" />

                    <line x1="80" y1="180" x2="130" y2="120" stroke="#60A5FA" strokeWidth="4" />
                    <line x1="80" y1="180" x2="130" y2="240" stroke="#60A5FA" strokeWidth="4" />
                    <line x1="130" y1="120" x2="180" y2="180" stroke="#60A5FA" strokeWidth="4" />
                    <line x1="130" y1="240" x2="180" y2="180" stroke="#60A5FA" strokeWidth="4" />

                    {/* Ligação para o balão */}
                    <line x1="180" y1="180" x2="220" y2="180" stroke="#60A5FA" strokeWidth="4" />

                    {/* Átomos e ligações à direita */}
                    <circle cx="420" cy="180" r="15" fill="#3B82F6" />
                    <circle cx="370" cy="120" r="15" fill="#3B82F6" />
                    <circle cx="370" cy="240" r="15" fill="#3B82F6" />
                    <circle cx="320" cy="180" r="15" fill="#3B82F6" />

                    <line x1="420" y1="180" x2="370" y2="120" stroke="#60A5FA" strokeWidth="4" />
                    <line x1="420" y1="180" x2="370" y2="240" stroke="#60A5FA" strokeWidth="4" />
                    <line x1="370" y1="120" x2="320" y2="180" stroke="#60A5FA" strokeWidth="4" />
                    <line x1="370" y1="240" x2="320" y2="180" stroke="#60A5FA" strokeWidth="4" />

                    {/* Ligação para o balão */}
                    <line x1="320" y1="180" x2="280" y2="180" stroke="#60A5FA" strokeWidth="4" />

                    {/* Átomos adicionais para complexidade */}
                    <circle cx="100" cy="300" r="15" fill="#3B82F6" />
                    <circle cx="180" cy="320" r="15" fill="#3B82F6" />
                    <circle cx="320" cy="320" r="15" fill="#3B82F6" />
                    <circle cx="400" cy="300" r="15" fill="#3B82F6" />

                    <line x1="130" y1="240" x2="100" y2="300" stroke="#60A5FA" strokeWidth="4" />
                    <line x1="100" y1="300" x2="180" y2="320" stroke="#60A5FA" strokeWidth="4" />
                    <line x1="370" y1="240" x2="400" y2="300" stroke="#60A5FA" strokeWidth="4" />
                    <line x1="400" y1="300" x2="320" y2="320" stroke="#60A5FA" strokeWidth="4" />

                    {/* Ligações para o balão volumétrico */}
                    <line x1="180" y1="320" x2="230" y2="350" stroke="#60A5FA" strokeWidth="4" />
                    <line x1="320" y1="320" x2="270" y2="350" stroke="#60A5FA" strokeWidth="4" />
                  </g>

                  {/* Balão volumétrico */}
                  <g className="volumetric-flask">
                    {/* Gargalo do balão */}
                    <path
                      d="M245,100 L245,180 C245,180 245,185 250,185 C255,185 255,180 255,180 L255,100"
                      fill="#DBEAFE"
                      stroke="#2563EB"
                      strokeWidth="2"
                    />

                    {/* Corpo do balão */}
                    <path
                      d="M220,180 C220,180 220,170 250,170 C280,170 280,180 280,180 L280,350 C280,380 220,380 220,350 Z"
                      fill="#DBEAFE"
                      fillOpacity="0.7"
                      stroke="#2563EB"
                      strokeWidth="2"
                    />

                    {/* Líquido no balão */}
                    <path d="M220,280 L280,280 L280,350 C280,380 220,380 220,350 Z" fill="#3B82F6" fillOpacity="0.5" />

                    {/* Graduações no balão */}
                    <line x1="220" y1="200" x2="230" y2="200" stroke="#2563EB" strokeWidth="1" />
                    <line x1="220" y1="230" x2="230" y2="230" stroke="#2563EB" strokeWidth="1" />
                    <line x1="220" y1="260" x2="230" y2="260" stroke="#2563EB" strokeWidth="1" />
                    <line x1="220" y1="290" x2="230" y2="290" stroke="#2563EB" strokeWidth="1" />
                    <line x1="220" y1="320" x2="230" y2="320" stroke="#2563EB" strokeWidth="1" />
                    <line x1="220" y1="350" x2="230" y2="350" stroke="#2563EB" strokeWidth="1" />

                    <line x1="270" y1="200" x2="280" y2="200" stroke="#2563EB" strokeWidth="1" />
                    <line x1="270" y1="230" x2="280" y2="230" stroke="#2563EB" strokeWidth="1" />
                    <line x1="270" y1="260" x2="280" y2="260" stroke="#2563EB" strokeWidth="1" />
                    <line x1="270" y1="290" x2="280" y2="290" stroke="#2563EB" strokeWidth="1" />
                    <line x1="270" y1="320" x2="280" y2="320" stroke="#2563EB" strokeWidth="1" />
                    <line x1="270" y1="350" x2="280" y2="350" stroke="#2563EB" strokeWidth="1" />

                    {/* Marca de volume no balão */}
                    <line
                      x1="220"
                      y1="280"
                      x2="280"
                      y2="280"
                      stroke="#2563EB"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                    <text x="285" y="284" fill="#2563EB" fontSize="10">
                      250ml
                    </text>

                    {/* Boca do balão */}
                    <ellipse cx="250" cy="100" rx="10" ry="5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="2" />

                    {/* Bolhas no líquido */}
                    <circle cx="240" cy="310" r="4" fill="#DBEAFE" fillOpacity="0.8" />
                    <circle cx="255" cy="330" r="3" fill="#DBEAFE" fillOpacity="0.8" />
                    <circle cx="235" cy="350" r="5" fill="#DBEAFE" fillOpacity="0.8" />
                    <circle cx="260" cy="300" r="2" fill="#DBEAFE" fillOpacity="0.8" />
                  </g>

                  {/* Definições de gradientes */}
                  <defs>
                    <radialGradient id="gradientBg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#EFF6FF" />
                      <stop offset="100%" stopColor="#DBEAFE" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <span className="text-4xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Como Funciona</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma utiliza tecnologia de ponta para garantir privacidade e conformidade.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 text-blue-600 font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Registro Seguro (Off-Chain)</h3>
              <p className="text-gray-600">
                Substâncias são registradas com dados privados em um ambiente seguro e isolado.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 text-blue-600 font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Lista Pública de Compostos</h3>
              <p className="text-gray-600">
                Lista fixa com 30 compostos usados como referência para verificação de conformidade.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 text-blue-600 font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Geração de Prova ZK</h3>
              <p className="text-gray-600">
                O usuário comprova matematicamente que os limites não foram excedidos, sem revelar dados.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 text-blue-600 font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Verificação On-Chain</h3>
              <p className="text-gray-600">
                A prova é validada em blockchain, garantindo transparência e imutabilidade sem expor a fórmula.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">Tecnologia Avançada</h3>
            <p className="text-gray-600">
              Nossa plataforma utiliza os mais recentes avanços em criptografia de conhecimento zero, incluindo
              circuitos zk-SNARKs e protocolos de verificação distribuída, garantindo segurança e privacidade sem
              comprometer a verificabilidade.
            </p>
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <span className="text-4xl">💡</span>
            </div>
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Benefícios</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa solução oferece vantagens competitivas significativas para sua empresa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Privacidade Total da Fórmula</h3>
              <p className="text-gray-600">
                Proteja seus segredos industriais e propriedade intelectual enquanto demonstra conformidade com
                regulamentações. Nenhum dado sensível é compartilhado ou armazenado em sistemas externos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Conformidade Regulamentar Automatizada</h3>
              <p className="text-gray-600">
                Simplifique processos de auditoria e conformidade com verificações automatizadas. Reduza custos e tempo
                gastos em processos manuais de verificação e documentação.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">⛓️</div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Verificável On-Chain</h3>
              <p className="text-gray-600">
                Provas criptográficas registradas em blockchain garantem transparência e imutabilidade. Crie um
                histórico verificável de conformidade que pode ser auditado a qualquer momento.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Escalável para laboratórios e farmacêuticas</h3>
              <p className="text-gray-600">
                Nossa plataforma é projetada para escalar desde pequenos laboratórios até grandes empresas
                farmacêuticas, com capacidade para processar milhares de verificações simultaneamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Uso Section */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <span className="text-4xl">🎯</span>
            </div>
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Casos de Uso</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Quem se beneficia</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-700">Startups com patentes pendentes</span> - Prove
                    conformidade sem comprometer sua propriedade intelectual em processo de patenteamento.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-700">Auditorias regulatórias</span> - Simplifique processos
                    de auditoria mantendo a confidencialidade de fórmulas proprietárias.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-700">Due diligence no setor químico</span> - Facilite
                    processos de fusão e aquisição sem expor segredos industriais.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold text-blue-700">Validação sem quebra de sigilo industrial</span> -
                    Comprove a segurança de seus produtos sem revelar sua composição exata.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">Aplicações Práticas</h3>
            <p className="text-gray-600 mb-6 text-center">
              A ZK-Comply já está sendo utilizada em projetos piloto com empresas farmacêuticas e laboratórios de
              pesquisa para:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 text-blue-600 font-bold">
                  1
                </div>
                <p className="text-gray-600">Verificação de conformidade com normas FDA e EMA</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 text-blue-600 font-bold">
                  2
                </div>
                <p className="text-gray-600">Certificação de produtos sem revelar fórmulas</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 text-blue-600 font-bold">
                  3
                </div>
                <p className="text-gray-600">Auditorias de segurança em tempo real</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flask className="h-5 w-5 text-blue-600" />
            <span className="text-lg font-bold text-blue-700">ZK-Comply</span>
          </div>
          <p className="text-gray-600">&copy; {new Date().getFullYear()} ZK-Comply. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
