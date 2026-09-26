import { Mail, MessageCircle, MessageSquare, Phone } from 'lucide-react'
import { CHANNEL_MAP } from '../../utils/constants'

const ICONS = { email: Mail, phone: Phone, chat: MessageSquare, whatsapp: MessageCircle }

export default function ChannelIcon({ channel, showLabel = true }) {
  const Icon = ICONS[channel]
  const { label } = CHANNEL_MAP[channel]
  return (
    <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300" title={label}>
      <Icon className="size-4 text-slate-400" aria-hidden="true" />
      {showLabel ? <span>{label}</span> : <span className="sr-only">{label}</span>}
    </span>
  )
}
