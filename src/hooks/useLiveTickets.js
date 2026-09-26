import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { generateTicket } from '../data/generateTicket'
import { useTickets } from './useTickets'

const MIN_DELAY = 10_000
const MAX_DELAY = 15_000

/** Simulates incoming tickets: adds a new random ticket every 10–15 seconds. */
export function useLiveTickets(enabled) {
  const { addTicket } = useTickets()

  useEffect(() => {
    if (!enabled) return undefined

    let timer
    const schedule = () => {
      timer = setTimeout(() => {
        const ticket = generateTicket(new Date(), 'open')
        addTicket(ticket)
        toast(`New ticket #${ticket.id} from ${ticket.customer.name}`, { icon: '📩', id: 'live-ticket' })
        schedule()
      }, MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY))
    }
    schedule()

    return () => clearTimeout(timer)
  }, [enabled, addTicket])
}
