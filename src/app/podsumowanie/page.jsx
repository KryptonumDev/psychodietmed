import { Image } from '@/components/atoms/image'
import Link from 'next/link'
import Error from './404.png'

export default function NotFound() {
  return (
    <main className='not-found'>
      <Image className='image' aspectRatio={true} src={Error} width={494} height={607} alt='404' />
      <div className='content'>
        <h1>404</h1>
        <h2>Wyszukiwana strona nie istnieje</h2>
        <p>Jeśli już tu jesteś, może zainteresuje Cię nawiązanie współpracy?</p>
        <Link className='link' href="/wspolpraca">Chcę wiedzieć więcej</Link>
      </div>
    </main>
  )
}