import { useState } from 'react';
import Head from 'next/head';

export default function SocialAdmin() {
  const [post, setPost] = useState('');
  const [platforms, setPlatforms] = useState({
    instagram: true,
    twitter: true,
    linkedin: true
  });

  const handlePost = async () => {
    // Will integrate APIs later
    alert(`Posting to: ${Object.keys(platforms).filter(k => platforms[k]).join(', ')}\n\n${post}`);
  };

  return (
    <>
      <Head><title>Social Media Manager - WakilChat™</title></Head>
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', padding: '2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#FFD700' }}>Social Media Manager</h1>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1rem' }}>Post Content:</label>
            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="Write your post here..."
              style={{
                width: '100%',
                minHeight: '200px',
                padding: '1rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,215,0,0.2)',
                borderRadius: '0.75rem',
                color: 'white',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>Post to:</p>
            {['instagram', 'twitter', 'linkedin'].map(platform => (
              <label key={platform} style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={platforms[platform]}
                  onChange={(e) => setPlatforms({...platforms, [platform]: e.target.checked})}
                  style={{ marginRight: '0.75rem' }}
                />
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </label>
            ))}
          </div>

          <button
            onClick={handlePost}
            style={{
              background: '#FFD700',
              color: '#000',
              padding: '1rem 2rem',
              borderRadius: '0.75rem',
              border: 'none',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Post to All Selected
          </button>

          <div style={{ marginTop: '3rem', padding: '2rem', background: 'rgba(255,215,0,0.05)', borderRadius: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Quick Templates:</h3>
            <button onClick={() => setPost('Introducing WakilChat - AI platform connecting African suppliers to global buyers. Join early access: wakilchat.com #WakilChat #AfricanBusiness')} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', marginRight: '0.5rem', cursor: 'pointer' }}>Launch</button>
            <button onClick={() => setPost('First 100 suppliers get 0% fees FOREVER. Only 47 spots left. Claim yours: wakilchat.com/founder-supplier')} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Founder</button>
          </div>
        </div>
      </div>
    </>
  );
}