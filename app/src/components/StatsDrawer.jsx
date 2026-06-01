function StatsDrawer({
  isOpen,
  statsStatus,
  statsData,
  onClose,
  smallHeadingStyle,
}) {
  if (!isOpen) {
    return null
  }

  return (
    <aside className="stats-overlay">
      <section className="stats-drawer">
        <div className="preview-heading">
          <div>
            <p className="soft-label">
              Stats
            </p>
            <h1 style={smallHeadingStyle}>Sales snapshot</h1>
          </div>

          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="empty-photo-space">
          <strong>{statsStatus}</strong>
        </div>

        {statsData && (
          <>
            <div className="stats-grid">
              <div className="stats-card">
                <span>Total revenue</span>
                <strong>NZ${((statsData.totals?.revenue_cents || 0) / 100).toFixed(2)}</strong>
              </div>

              <div className="stats-card">
                <span>Orders</span>
                <strong>{statsData.totals?.order_count || 0}</strong>
              </div>

              <div className="stats-card">
                <span>Images sold</span>
                <strong>{statsData.totals?.image_count || 0}</strong>
              </div>
            </div>

            <div className="stats-section">
              <h2>By collection</h2>

              {(statsData.byCollection || []).length === 0 && (
                <p>No collection sales yet.</p>
              )}

              {(statsData.byCollection || []).map((item) => (
                <div className="stats-row" key={item.collection_id}>
                  <span>{item.collection_id || 'Collection'}</span>
                  <strong>
                    NZ${((item.revenue_cents || 0) / 100).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="stats-section">
              <h2>Recent orders</h2>

              {(statsData.recentOrders || []).length === 0 && (
                <p>No paid orders yet.</p>
              )}

              {(statsData.recentOrders || []).map((order) => (
                <div className="stats-row" key={order.id}>
                  <span>{order.buyer_email || 'Buyer'} · {order.collection_id} / {order.event_id}</span>
                  <strong>
                    NZ${((order.amount_total || 0) / 100).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </aside>
  )
}

export default StatsDrawer
