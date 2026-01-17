import React, { useState, useRef } from 'react';
import { uploadService } from '../services/uploadService';
import type { UploadedFile } from '../types';

export const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        try {
            const uploadedFile = await uploadService.uploadFile(selectedFile);
            setUploadedFiles([uploadedFile, ...uploadedFiles]);
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Upload failed', error);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="file-upload">
            <h2>File Upload</h2>

            <div
                className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="upload-icon">📤</div>
                <p className="upload-text">Drag and drop a file here, or click to select</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="file-input"
                    id="file-input"
                />
                <label htmlFor="file-input" className="file-input-label">
                    Choose File
                </label>
            </div>

            {selectedFile && (
                <div className="selected-file">
                    <div className="file-info">
                        <span className="file-name">📄 {selectedFile.name}</span>
                        <span className="file-size">{formatFileSize(selectedFile.size)}</span>
                    </div>
                    <button
                        className="upload-button"
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload File'}
                    </button>
                </div>
            )}

            {uploadedFiles.length > 0 && (
                <div className="uploaded-files">
                    <h3>Uploaded Files</h3>
                    <div className="files-list">
                        {uploadedFiles.map((file) => (
                            <div key={file.id} className="uploaded-file-item">
                                <div className="file-details">
                                    <div className="file-name">📄 {file.originalName}</div>
                                    <div className="file-meta">
                                        <span>{formatFileSize(file.size)}</span>
                                        <span>•</span>
                                        <span>{file.mimetype}</span>
                                        <span>•</span>
                                        <span>{new Date(file.uploadedAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
