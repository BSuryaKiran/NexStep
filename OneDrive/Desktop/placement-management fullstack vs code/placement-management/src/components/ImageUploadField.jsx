import React, { useState } from 'react';
import { Upload, X, Eye, Link as LinkIcon, ChevronDown } from 'lucide-react';

// Reusable Image Upload Component
const ImageUploadField = ({ 
    image, 
    onImageChange, 
    label = "Upload Photo",
    size = '150px',
    shape = 'rounded' // 'rounded' or 'circle'
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [urlError, setUrlError] = useState('');
    const [isLoadingUrl, setIsLoadingUrl] = useState(false);
    const inputId = `image-input-${Math.random()}`;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.match(/^image\//)) {
                alert('Please select a valid image file');
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageChange(reader.result);
                setShowUrlInput(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlInput = async () => {
        if (!urlInput.trim()) {
            setUrlError('Please enter an image URL');
            return;
        }

        // Validate URL format
        try {
            new URL(urlInput);
        } catch (err) {
            setUrlError('Please enter a valid URL');
            return;
        }

        setIsLoadingUrl(true);
        setUrlError('');

        try {
            // Fetch the image and convert to base64
            const response = await fetch(urlInput);
            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('image')) {
                setUrlError('URL does not point to a valid image');
                setIsLoadingUrl(false);
                return;
            }

            const blob = await response.blob();
            
            // Check file size
            if (blob.size > 5 * 1024 * 1024) {
                setUrlError('Image size should be less than 5MB');
                setIsLoadingUrl(false);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                onImageChange(reader.result);
                setUrlInput('');
                setUrlError('');
                setShowUrlInput(false);
                setIsLoadingUrl(false);
            };
            reader.onerror = () => {
                setUrlError('Failed to process image');
                setIsLoadingUrl(false);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            setUrlError('Failed to load image from URL. Make sure the URL is valid and publicly accessible.');
            setIsLoadingUrl(false);
        }
    };

    const borderRadius = shape === 'circle' ? '50%' : '16px';

    return (
        <div style={{ position: 'relative' }}>
            {/* Upload Options Dropdown */}
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button
                    type="button"
                    onClick={() => setShowUrlInput(false)}
                    style={{
                        padding: '0.6rem 1.2rem',
                        background: !showUrlInput ? '#FF6B35' : 'rgba(255, 107, 53, 0.2)',
                        color: !showUrlInput ? 'white' : '#FF6B35',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Upload size={16} /> Gallery
                </button>
                <button
                    type="button"
                    onClick={() => setShowUrlInput(true)}
                    style={{
                        padding: '0.6rem 1.2rem',
                        background: showUrlInput ? '#FF6B35' : 'rgba(255, 107, 53, 0.2)',
                        color: showUrlInput ? 'white' : '#FF6B35',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        transition: 'all 0.3s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <LinkIcon size={16} /> From URL
                </button>
            </div>

            {/* Gallery Upload Mode */}
            {!showUrlInput && (
                <>
                    <div 
                        style={{
                            width: size,
                            height: size,
                            borderRadius: borderRadius,
                            background: image ? `url(${image})` : 'rgba(255, 107, 53, 0.1)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '3px solid rgba(255, 107, 53, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            margin: '0 auto'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.borderColor = '#FF6B35';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)';
                        }}
                        onClick={() => document.getElementById(inputId).click()}
                        title={image ? "Click to change photo" : "Click to select from gallery"}
                    >
                        {!image && (
                            <div style={{ textAlign: 'center', color: 'var(--text-gray)', position: 'relative', zIndex: 1 }}>
                                <Upload size={parseInt(size) * 0.3} style={{ margin: '0 auto', marginBottom: '0.5rem' }} />
                                <p style={{ fontSize: '0.95rem', fontWeight: 600 }}>{label}</p>
                            </div>
                        )}
                        {image && (
                            <div style={{
                                position: 'absolute',
                                background: 'rgba(0,0,0,0.7)',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: 0,
                                transition: 'opacity 0.3s',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }} className="hover-upload">
                                <Upload size={parseInt(size) * 0.2} style={{ color: 'white' }} />
                                <p style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>Edit Photo</p>
                            </div>
                        )}
                    </div>
                    <input 
                        type="file" 
                        id={inputId}
                        onChange={handleImageUpload} 
                        style={{ display: 'none' }} 
                        accept="image/*"
                        capture="environment"
                    />
                </>
            )}

            {/* URL Input Mode */}
            {showUrlInput && (
                <div style={{
                    background: 'rgba(255, 107, 53, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 107, 53, 0.2)'
                }}>
                    <label style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-gray)', fontSize: '0.9rem', fontWeight: 600 }}>
                        🌐 Image URL
                    </label>
                    <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem' }}>
                        <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={urlInput}
                            onChange={(e) => {
                                setUrlInput(e.target.value);
                                setUrlError('');
                            }}
                            style={{
                                flex: 1,
                                padding: '0.8rem 1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 107, 53, 0.3)',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '0.9rem',
                                outline: 'none',
                                transition: 'all 0.3s'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#FF6B35';
                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 107, 53, 0.3)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleUrlInput}
                            disabled={isLoadingUrl}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: isLoadingUrl ? 'rgba(255, 107, 53, 0.5)' : '#FF6B35',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: isLoadingUrl ? 'not-allowed' : 'pointer',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                transition: 'all 0.3s',
                                opacity: isLoadingUrl ? 0.7 : 1
                            }}
                        >
                            {isLoadingUrl ? 'Loading...' : 'Load'}
                        </button>
                    </div>

                    {urlError && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#ef4444',
                            padding: '0.8rem',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            marginBottom: '1rem'
                        }}>
                            ⚠️ {urlError}
                        </div>
                    )}

                    <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                        💡 Try URLs from:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {[
                            { name: 'Google Images', url: 'https://images.google.com' },
                            { name: 'Unsplash', url: 'https://unsplash.com' },
                            { name: 'Pexels', url: 'https://pexels.com' },
                            { name: 'Pixabay', url: 'https://pixabay.com' }
                        ].map((suggestion, i) => (
                            <a 
                                key={i}
                                href={suggestion.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                    padding: '0.5rem 0.8rem',
                                    background: 'rgba(255, 107, 53, 0.15)',
                                    color: '#FF6B35',
                                    borderRadius: '6px',
                                    textDecoration: 'none',
                                    fontSize: '0.8rem',
                                    fontWeight: 500,
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 107, 53, 0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 107, 53, 0.15)';
                                }}
                            >
                                {suggestion.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {image && !showUrlInput && (
                <button 
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        position: 'absolute',
                        bottom: '-10px',
                        right: '50%',
                        transform: 'translateX(50%)',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#FF6B35',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s',
                        boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4)'
                    }}
                    title="View photo"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(50%) scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(50%) scale(1)';
                    }}
                >
                    <Eye size={20} />
                </button>
            )}

            {/* Image Preview Modal */}
            {isModalOpen && image && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    animation: 'fadeIn 0.3s ease'
                }} onClick={() => setIsModalOpen(false)}>
                    <div style={{
                        position: 'relative',
                        maxWidth: '90vw',
                        maxHeight: '90vh'
                    }} onClick={(e) => e.stopPropagation()}>
                        <img 
                            src={image} 
                            alt="Preview" 
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderRadius: '12px',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                            }}
                        />
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '-10px',
                                background: '#FF6B35',
                                border: 'none',
                                color: 'white',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4)',
                                transition: 'transform 0.2s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .hover-upload:hover {
                    opacity: 1 !important;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default ImageUploadField;
