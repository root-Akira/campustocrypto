import Layout from '../components/Layout'
import Reveal from '../components/Reveal'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { fetchGallery } from '../data/gallery'

export default function Gallery() {
  const { data: photos, loading } = useAutoRefresh(fetchGallery)

  return (
    <Layout>
      <div className="content-page">
        <h1>Gallery</h1>
        <p className="page-subtitle">Moments from our events and journey.</p>
        <Reveal>
          {loading ? (
            <div className="gallery-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="gallery-card card-skeleton" style={{ height: 220 }} />
              ))}
            </div>
          ) : !photos || photos.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-icon">📸</p>
              <p>No photos yet. Check back soon!</p>
            </div>
          ) : (
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
          )}
        </Reveal>
      </div>
    </Layout>
  )
}
