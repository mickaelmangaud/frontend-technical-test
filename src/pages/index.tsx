import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()
  router.push('/conversations')
  return null
}