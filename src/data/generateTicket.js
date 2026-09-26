import { AGENTS } from '../utils/constants'

const FIRST_NAMES = ['Sarah', 'David', 'Rachel', 'Michael', 'Leah', 'Adam', 'Shira', 'Eitan', 'Yael', 'Ariel', 'Hila', 'Ron', 'Dana', 'Guy', 'Maya', 'Tom', 'Noam', 'Lior', 'Emma', 'Ben']
const LAST_NAMES = ['Katz', 'Levy', 'Ben-David', 'Azulay', 'Klein', 'Goldberg', 'Amar', 'Weiss', 'Rosen', 'Biton', 'Shalom', 'Avraham', 'Dahan', 'Ohana']
const DOMAINS = ['gmail.com', 'outlook.com', 'yahoo.com', 'company.co.il', 'mail.com']

const SUBJECTS = [
  ['Order has not arrived yet', 'I placed an order last week and it still has not been delivered.'],
  ['Wrong item received', 'The package contained a different product than the one I ordered.'],
  ['Request for refund', 'I would like to return my purchase and get a full refund.'],
  ['Cannot log in to my account', 'The password reset email never arrives.'],
  ['Payment was charged twice', 'My credit card shows two identical charges for one order.'],
  ['Question about product ingredients', 'Does this product contain sulfates or parabens?'],
  ['Change delivery address', 'I need to update the shipping address for my open order.'],
  ['Damaged package', 'The box arrived crushed and one bottle was leaking.'],
  ['Invoice request', 'Please send me a tax invoice for my last order.'],
  ['Discount code not working', 'The promo code from the newsletter is rejected at checkout.'],
  ['Bulk order for salon', 'I would like a price quote for a wholesale order.'],
  ['Cancel my subscription', 'Please cancel my monthly subscription starting next month.'],
  ['Website error at checkout', 'I get an error message when I click "Pay now".'],
  ['Product out of stock', 'When will this item be available again?'],
  ['Feedback on customer service', 'I wanted to share my experience with your team.'],
]

const CHANNEL_WEIGHTS = [['email', 40], ['chat', 25], ['whatsapp', 20], ['phone', 15]]
const PRIORITY_WEIGHTS = [['low', 30], ['medium', 40], ['high', 20], ['urgent', 10]]

const MINUTE = 60 * 1000
const HOUR = 60 * MINUTE

const pick = (list) => list[Math.floor(Math.random() * list.length)]
const randomBetween = (min, max) => min + Math.random() * (max - min)

function weightedPick(weights) {
  const total = weights.reduce((sum, [, w]) => sum + w, 0)
  let roll = Math.random() * total
  for (const [value, weight] of weights) {
    roll -= weight
    if (roll <= 0) return value
  }
  return weights[0][0]
}

let sequence = 1000
export const nextTicketId = () => `TCK-${++sequence}`
export const setTicketSequence = (value) => { sequence = Math.max(sequence, value) }

// Older tickets are more likely to be resolved/closed than fresh ones
function statusForAge(ageHours) {
  if (ageHours < 2) return weightedPick([['open', 70], ['in_progress', 30]])
  if (ageHours < 24) return weightedPick([['open', 25], ['in_progress', 35], ['pending', 15], ['resolved', 25]])
  if (ageHours < 72) return weightedPick([['open', 8], ['in_progress', 15], ['pending', 15], ['resolved', 45], ['closed', 17]])
  return weightedPick([['in_progress', 4], ['pending', 6], ['resolved', 35], ['closed', 55]])
}

/**
 * Creates one realistic random ticket.
 * @param {Date} createdAt - creation time (defaults to now)
 * @param {string} [forcedStatus] - override the age-based status
 */
export function generateTicket(createdAt = new Date(), forcedStatus) {
  const now = Date.now()
  const created = createdAt.getTime()
  const ageHours = (now - created) / HOUR
  const status = forcedStatus ?? statusForAge(ageHours)

  const first = pick(FIRST_NAMES)
  const last = pick(LAST_NAMES)
  const [subject, description] = pick(SUBJECTS)

  const isNew = status === 'open' && ageHours < 1
  const firstResponseAt = isNew
    ? null
    : new Date(Math.min(now, created + randomBetween(5 * MINUTE, 6 * HOUR)))
  const isDone = status === 'resolved' || status === 'closed'
  const resolvedAt = isDone
    ? new Date(Math.min(now, created + randomBetween(2 * HOUR, 48 * HOUR)))
    : null

  return {
    id: nextTicketId(),
    subject,
    description,
    customer: {
      id: `CUS-${Math.floor(randomBetween(100, 999))}`,
      name: `${first} ${last}`,
      email: `${first}.${last}`.toLowerCase().replace(/[^a-z.]/g, '') + `@${pick(DOMAINS)}`,
    },
    channel: weightedPick(CHANNEL_WEIGHTS),
    priority: weightedPick(PRIORITY_WEIGHTS),
    status,
    assignee: status === 'open' && Math.random() < 0.6 ? null : pick(AGENTS),
    createdAt: createdAt.toISOString(),
    updatedAt: (resolvedAt ?? firstResponseAt ?? createdAt).toISOString(),
    firstResponseAt: firstResponseAt?.toISOString() ?? null,
    resolvedAt: resolvedAt?.toISOString() ?? null,
    satisfaction: isDone && Math.random() < 0.8 ? weightedPick([[5, 45], [4, 30], [3, 13], [2, 7], [1, 5]]) : null,
  }
}
