import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image as ImageIcon, Link as LinkIcon, Type } from 'lucide-react';
import { motion } from 'framer-motion';

interface DropzoneProps {
  onFilesAccepted: (files: File[]) => void;
  onTextSubmit: (text: string) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFilesAccepted, onTextSubmit }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAccepted(acceptedFiles);
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  return (
    <div className="dropzone-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="premium-card"
        style={{
          textAlign: 'center',
          padding: '60px 40px',
          cursor: 'pointer',
          borderStyle: 'dashed',
          borderWidth: '2px',
          borderColor: isDragActive ? 'var(--accent-primary)' : 'var(--glass-border)',
          background: isDragActive ? 'rgba(139, 92, 246, 0.05)' : 'var(--bg-secondary)'
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          background: 'var(--glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          color: 'var(--accent-primary)'
        }}>
          <Upload size={40} />
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Arraste seus materiais aqui</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Suporta PDF, DOCX, Imagens, Slides e Texto. Nossa IA irá processar tudo instantaneamente.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {[
            { icon: FileText, label: 'Documentos' },
            { icon: ImageIcon, label: 'Imagens' },
            { icon: Type, label: 'Texto' },
            { icon: LinkIcon, label: 'Links' }
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <item.icon size={16} />
              {item.label}
            </div>
          ))}
        </div>
      </motion.div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Ou cole seu texto manualmente</p>
        <textarea
          placeholder="Cole aqui o conteúdo que deseja estudar..."
          style={{
            width: '100%',
            height: '150px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            padding: '16px',
            color: 'white',
            fontFamily: 'inherit',
            fontSize: '1rem',
            resize: 'none',
            outline: 'none',
            transition: 'var(--transition-smooth)'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
        />
        <button className="btn-secondary" style={{ marginTop: '16px', width: '100%' }}>
          Processar Texto
        </button>
      </div>
    </div>
  );
};

export default Dropzone;
