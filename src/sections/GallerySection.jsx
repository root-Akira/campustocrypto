import { Link } from 'react-router-dom'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { fetchHomepageGallery } from '../data/gallery'

export default function GallerySection() {
  const { data: photos, loading } = useAutoRefresh(fetchHomepageGallery)

  return (
    <section id="gallery" className="content-page">
      <h1>Gallery</h1>
      <p className="page-subtitle">Moments from our events and journey.</p>

      {loading && (
        <div className="gallery-grid">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="gallery-card card-skeleton" style={{ height: 220 }} />
          ))}
        </div>
      )}

      {!loading && (!photos || photos.length === 0) && (
        <div className="empty-state" style={{ padding: 40 }}>
          <p className="empty-state-icon" style={{ fontSize: '2rem' }}>📸</p>
          <p>No photos yet. Check back soon!</p>
        </div>
      )}

      {!loading && photos && photos.length > 0 && (
        <>
          <div className="gallery-grid">
            {photos.map(photo => (
              <div key={photo.id} className="gallery-card">
                <img
                  src={photo.image_url}
                  alt={photo.caption || 'Gallery photo'}
                  className="gallery-img"
                  loading="lazy"
                />
                {(photo.caption || photo.event_name) && (
                  <div className="gallery-body">
                    {photo.caption && <p className="gallery-caption">{photo.caption}</p>}
                    {photo.event_name && <p className="gallery-event-name">{photo.event_name}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="cta-group cta-centered">
            <Link to="/gallery" className="btn-large btn-primary">See More →</Link>
          </div>
        </>
      )}
    </section>
  )
}
