import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Gift, Clock, GamepadIcon } from "lucide-react"
import LandmarkSlideshow from './components/LandmarkSlideshow'

export default function Home() {
  const images = [
    '/images/tokyo.png',
    '/images/fuji.png',
    '/images/shibuya.png',
    '/images/kiyomizu.png',
    '/images/asakusa.png'
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white">Find NFT Spots</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <NavLink href="#features">特徴</NavLink>
            <NavLink href="#how-it-works">使い方</NavLink>
            <NavLink href="#about">About</NavLink>
          </nav>
          <Link href="/login">
            <Button variant="outline" className="bg-transparent text-white border-gray-600 hover:bg-gray-800">
              ログイン
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-screen w-full overflow-hidden">
          <LandmarkSlideshow images={images} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-5xl md:text-6xl font-bold mb-4">
                日本の歴史をNFTで体験
              </h2>
              <p className="text-xl md:text-2xl mb-8">
                位置情報ゲームで街を探索し、ユニークなNFTを収集しよう
              </p>
              <Link href="/login">
                <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                  今すぐ始める
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-800">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">アプリの特徴</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<MapPin className="h-8 w-8" />}
                title="位置情報クイズ"
                description="その場所に関連する社会・文化・歴史のクイズに挑戦しよう！"
              />
              <FeatureCard
                icon={<Gift className="h-8 w-8" />}
                title="NFT報酬"
                description="クイズに正解して、ユニークな観光地NFTを獲得しよう！"
              />
              <FeatureCard
                icon={<Clock className="h-8 w-8" />}
                title="時間分散"
                description="混雑していない時間帯に訪れて、限定NFTをゲットしよう！"
              />
              <FeatureCard
                icon={<GamepadIcon className="h-8 w-8" />}
                title="ゲーミフィケーション"
                description="レベルアップやミッションをクリアして、楽しみながら学ぼう！"
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">使い方</h2>
            <div className="max-w-3xl mx-auto">
              <ol className="relative border-l border-gray-700">
                <HowItWorksStep
                  number={1}
                  title="アプリにログイン"
                  description="MetamaskかGoogleアカウントなどを使用したログインが可能です"
                />
                <HowItWorksStep
                  number={2}
                  title="スポットを探す"
                  description="地図上で近くのNFTスポットを見つけ、そこに向かいます。"
                />
                <HowItWorksStep
                  number={3}
                  title="クイズに挑戦"
                  description="スポットに到着したら、その場所に関するクイズに挑戦します。"
                />
                <HowItWorksStep
                  number={4}
                  title="NFTを獲得"
                  description="クイズに正解すると、その場所のユニークなNFTを獲得できます。"
                />
              </ol>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Find NFT Spots. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors">
      {children}
    </Link>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="text-blue-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

function HowItWorksStep({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <li className="mb-10 ml-6">
      <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full -left-4 ring-4 ring-gray-900">
        <span className="text-blue-300 font-bold">{number}</span>
      </span>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </li>
  )
}