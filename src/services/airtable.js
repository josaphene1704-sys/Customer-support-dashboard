const API_URL = 'https://api.airtable.com/v0'

const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID
const CUSTOMERS_TABLE = import.meta.env.VITE_AIRTABLE_CUSTOMERS_TABLE

export const isAirtableConfigured = Boolean(TOKEN && BASE_ID && CUSTOMERS_TABLE)

/** Fetches every record of a table, following Airtable's pagination offset. */
async function fetchAllRecords(table, signal) {
  const records = []
  let offset

  do {
    const url = new URL(`${API_URL}/${BASE_ID}/${encodeURIComponent(table)}`)
    url.searchParams.set('pageSize', '100')
    if (offset) url.searchParams.set('offset', offset)

    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` }, signal })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.error?.message ?? `Airtable request failed (${res.status})`)
    }

    const data = await res.json()
    records.push(...data.records)
    offset = data.offset
  } while (offset)

  return records
}

// Maps the Hebrew field names of the "לקוחות" table to plain JS objects
const toCustomer = ({ id, fields: f }) => ({
  id,
  businessName: f['שם העסק'] ?? '',
  contact: f['איש קשר'] ?? '',
  phone: f['טלפון'] ?? '',
  email: f['אימייל'] ?? '',
  city: f['עיר'] ?? '',
  region: f['אזור'] ?? '',
  deliveryDays: f['יום חלוקה'] ?? [],
  type: f['סוג לקוח'] ?? '',
  status: f['סטטוס'] ?? '',
  joinedAt: f['תאריך הצטרפות'] ?? null,
  notes: f['הערות'] ?? '',
  orderCount: f['מס׳ הזמנות'] ?? 0,
  totalPurchases: f['סה״כ רכישות'] ?? 0,
})

export async function fetchCustomers(signal) {
  const records = await fetchAllRecords(CUSTOMERS_TABLE, signal)
  return records.map(toCustomer)
}
