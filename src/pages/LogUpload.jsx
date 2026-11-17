import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  FileCheck,
  Download,
  Database,
  ArrowRight
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { uploadService } from '../services/api';

// Initial Upload History
const initialUploadHistory = [
  {
    id: 'UPL-101',
    fileName: 'access_log_nginx_2026-11-10.log',
    size: '3.42 MB',
    uploadedAt: '2026-11-11 20:30:15',
    records: 18490,
    errors: 124,
    status: 'Success',
    engine: 'Nginx Standard'
  },
  {
    id: 'UPL-102',
    fileName: 'spring_boot_prod_application.log',
    size: '8.15 MB',
    uploadedAt: '2026-11-11 18:12:40',
    records: 42100,
    errors: 410,
    status: 'Success',
    engine: 'Spring Boot Logback'
  },
  {
    id: 'UPL-103',
    fileName: 'apache_ssl_request.log',
    size: '1.20 MB',
    uploadedAt: '2026-11-10 14:05:22',
    records: 7540,
    errors: 52,
    status: 'Success',
    engine: 'Apache Combined'
  }
];

export const LogUpload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error' | null
  const [history, setHistory] = useState(initialUploadHistory);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  // File validation
  const handleValidateAndSet = (file) => {
    setUploadStatus(null);
    setErrorMessage('');

    if (!file) return;

    const validExtensions = ['.log', '.txt'];
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      setErrorMessage('Invalid file format. Please upload a .log or .txt server log file.');
      return;
    }

    // Limit to 50MB for simulation
    if (file.size > 50 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 50 MB threshold.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleValidateAndSet(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleValidateAndSet(e.target.files[0]);
    }
  };

  // Trigger Simulated Upload
  const handleStartUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStatus(null);

    try {
      const result = await uploadService.uploadFile(selectedFile, (percent) => {
        setUploadProgress(percent);
      });

      setUploadStatus('success');
      const newEntry = {
        id: `UPL-${Math.floor(Math.random() * 900) + 104}`,
        fileName: result.fileName,
        size: result.fileSize,
        uploadedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
        records: result.recordsCount,
        errors: result.errorsCount,
        status: 'Success',
        engine: 'Auto-Detected Nginx / Spring'
      };
      setHistory([newEntry, ...history]);
    } catch {
      setUploadStatus('error');
      setErrorMessage('Upload failed due to connection interruption.');
    } finally {
      setIsUploading(false);
    }
  };

  // Reset file selection
  const handleCancel = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadStatus(null);
    setErrorMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Delete history item
  const handleDeleteHistory = (id) => {
    setHistory(history.filter(item => item.id !== id));
  };

  // Generate and download a sample log file for test
  const handleDownloadSampleLog = () => {
    const sampleLogLines = [
      '192.168.1.105 - - [11/Nov/2026:22:42:15 +0000] "GET /api/v1/dashboard/stats HTTP/1.1" 200 4210 "https://admin.logmonitor.internal/dashboard" "Mozilla/5.0"',
      '45.33.32.156 - - [11/Nov/2026:22:41:58 +0000] "POST /api/v1/auth/login HTTP/1.1" 401 340 "-" "Python-requests/2.31.0"',
      '10.0.4.12 - - [11/Nov/2026:22:41:40 +0000] "POST /api/v1/orders/checkout HTTP/1.1" 500 1250 "https://store.company.com/checkout" "Mozilla/5.0"',
      '172.56.21.89 - - [11/Nov/2026:22:40:22 +0000] "GET /wp-login.php HTTP/1.1" 404 280 "-" "Nmap Scripting Engine"',
      '192.168.1.112 - - [11/Nov/2026:22:39:15 +0000] "GET /api/v1/products?category=hardware HTTP/1.1" 200 18450 "https://store.company.com/catalog" "Mozilla/5.0"',
      '185.220.101.5 - - [11/Nov/2026:22:36:19 +0000] "GET /admin/database/export.sql HTTP/1.1" 403 430 "-" "curl/7.88.1"',
      '10.0.8.91 - - [11/Nov/2026:22:35:10 +0000] "GET /api/v1/analytics/realtime-stream HTTP/1.1" 503 520 "-" "LogMonitor-Agent/2.4.0"'
    ].join('\n');

    const blob = new Blob([sampleLogLines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_server_access.log';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-title">
          <h1>
            <UploadCloud size={28} style={{ color: 'var(--primary-blue)' }} />
            Server Log File Ingestion
          </h1>
          <p className="page-header-subtitle">
            Upload offline server logs (.log, .txt) to parse and index records into database storage
          </p>
        </div>

        <div className="page-header-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleDownloadSampleLog}
            title="Download sample log file to test upload"
          >
            <Download size={15} />
            <span>Download Sample .LOG File</span>
          </button>
        </div>
      </div>

      {/* Upload Zone Card */}
      <div className="card" style={{ marginBottom: '1.75rem' }}>
        <div className="card-body">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".log,.txt"
            style={{ display: 'none' }}
          />

          {/* Drag & Drop Area */}
          <div
            className={`upload-dropzone ${dragOver ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <div className="upload-icon-circle">
              <UploadCloud size={32} />
            </div>

            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Drag & Drop your server log file here
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                Supports Apache, Nginx, and Spring Boot formatted <code>.log</code> or <code>.txt</code> files (Max 50MB)
              </div>
            </div>

            <button
              type="button"
              className="btn-primary"
              style={{ marginTop: '0.5rem' }}
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current && fileInputRef.current.click();
              }}
            >
              <FileText size={16} />
              <span>Browse Files on Computer</span>
            </button>
          </div>

          {/* Validation Error Message */}
          {errorMessage && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--error-bg)',
              color: 'var(--error-red-dark)',
              borderRadius: 'var(--radius-md)',
              marginTop: '1.25rem',
              fontSize: '0.875rem'
            }}>
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Selected File Details Box */}
          {selectedFile && (
            <div className="upload-file-preview">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-blue)',
                  border: '1px solid var(--border-color)'
                }}>
                  <FileText size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    {selectedFile.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    File Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; Type: {selectedFile.type || 'Plain Text Log'}
                  </div>
                </div>
              </div>

              {!isUploading && !uploadStatus && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleStartUpload}
                  >
                    <UploadCloud size={16} />
                    <span>Start Ingestion</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="upload-progress-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600 }}>
                <span style={{ color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Database size={15} /> Parsing log stream and validating checksums...
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="upload-progress-track">
                <div
                  className="upload-progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Success Banner */}
          {uploadStatus === 'success' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--success-bg)',
              color: 'var(--success-green-dark)',
              borderRadius: 'var(--radius-md)',
              marginTop: '1.25rem',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <CheckCircle size={20} />
                <div>
                  <div style={{ fontWeight: 700 }}>Log File Ingestion Completed Successfully!</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                    Log lines parsed, indexed, and synchronized into analytical metrics tables.
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn-success"
                onClick={handleCancel}
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
              >
                Upload Another File
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload History Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <FileCheck size={18} style={{ color: 'var(--primary-blue)' }} />
              Uploaded Log Archives History
            </div>
            <div className="card-subtitle">Audited record of ingested log files and ingestion summaries</div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>File Name</th>
                <th>File Size</th>
                <th>Ingested Timestamp</th>
                <th>Lines Processed</th>
                <th>Detected Errors</th>
                <th>Parser Engine</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="mono-font" style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>
                      {item.id}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={15} style={{ color: 'var(--text-secondary)' }} />
                      <span style={{ fontWeight: 600 }}>{item.fileName}</span>
                    </div>
                  </td>
                  <td>{item.size}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem' }}>
                      <Clock size={13} style={{ color: 'var(--text-muted)' }} />
                      {item.uploadedAt}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700 }}>{item.records.toLocaleString()}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--error-red)' }}>
                      {item.errors.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{item.engine}</span>
                  </td>
                  <td>
                    <StatusBadge type="status" value={item.status} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn-icon-only"
                      onClick={() => handleDeleteHistory(item.id)}
                      title="Remove from history"
                    >
                      <Trash2 size={15} style={{ color: 'var(--text-muted)' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogUpload;
