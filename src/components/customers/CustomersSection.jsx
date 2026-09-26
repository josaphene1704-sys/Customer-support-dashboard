import { RefreshCw } from 'lucide-react'
import EmptyState from '../ui/EmptyState'
import { useAirtableCustomers } from '../../hooks/useAirtableCustomers'
import CustomersTable from './CustomersTable'

export default function CustomersSection() {
  const { customers, loading, error, reload, configured } = useAirtableCustomers()

  return (
    <section aria-labelledby="customers-heading" className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4">
        <div>
          <h2 id="customers-heading" className="font-semibold">Customers</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Live data from Airtable</p>
        </div>
        {configured && (
          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
            Refresh
          </button>
        )}
      </div>

      <div className="mt-4">
        {!configured ? (
          <EmptyState
            title="Airtable is not connected"
            description="Add VITE_AIRTABLE_TOKEN, VITE_AIRTABLE_BASE_ID and VITE_AIRTABLE_CUSTOMERS_TABLE to .env.local."
          />
        ) : error ? (
          <EmptyState
            title="Could not load customers"
            description={error}
            action={
              <button type="button" onClick={reload} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                Try again
              </button>
            }
          />
        ) : !loading && customers.length === 0 ? (
          <EmptyState title="No customers yet" description="Add customers in Airtable and click Refresh." />
        ) : (
          <CustomersTable customers={customers} loading={loading} />
        )}
      </div>
    </section>
  )
}
