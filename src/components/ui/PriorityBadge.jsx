import { PRIORITY_MAP } from '../../utils/constants'
import Badge from './Badge'

export default function PriorityBadge({ priority }) {
  const { label, badge } = PRIORITY_MAP[priority]
  return (
    <Badge className={badge}>
      {priority === 'urgent' && <span className="size-1.5 rounded-full bg-red-500" aria-hidden="true" />}
      {label}
    </Badge>
  )
}
