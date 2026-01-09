'use client'
import { useRouter } from 'next/navigation'
import { deleteCookie } from '@/app/actions'
import styles from './styles.module.scss'

export default function LogoutButton({ className }) {
  const router = useRouter()

  const handleLogout = async () => {
    // Clear localStorage
    localStorage.removeItem('authToken')
    localStorage.removeItem('woo-next-cart')
    
    // Clear server cookie
    await deleteCookie('authToken')
    
    // Redirect to home
    router.push('/')
    router.refresh()
  }

  return (
    <button 
      onClick={handleLogout} 
      className={`${styles.button} ${className || ''}`}
    >
      Wyloguj się
    </button>
  )
}


