import React from 'react';
import { CloudUpload, FileText, Trash2 } from 'lucide-react';

interface AttachedFile {
    id: string;
    name: string;
    size?: string;
}

interface FileAttachmentProps {
    files: AttachedFile[];
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: (id: string) => void;
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ files, onUpload, onDelete }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    return (
        <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-container">
            <div className="flex items-center gap-3 mb-6">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                <h2 className="text-lg font-bold tracking-tight text-primary font-headline">Hồ sơ kèm theo</h2>
            </div>
            
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-outline-variant rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-surface-container-low transition-all cursor-pointer group mb-4 group"
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onUpload}
                    className="hidden"
                    multiple
                />
                <CloudUpload className="w-10 h-10 text-outline-variant group-hover:text-primary transition-colors mb-2" />
                <p className="text-sm font-semibold text-on-surface">Kéo thả file vào đây</p>
                <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">Hỗ trợ PDF, DOCX (Tối đa 20MB)</p>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {files.length === 0 ? (
                    <p className="text-xs text-center text-on-surface-variant italic py-2">Chưa có tệp đính kèm nào.</p>
                ) : (
                    files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg text-xs group hover:bg-surface-container transition-colors">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <FileText className="w-4 h-4 text-primary shrink-0" />
                                <span className="truncate font-medium">{file.name}</span>
                                <span className="text-[10px] text-slate-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                            </div>
                            <button 
                                onClick={() => onDelete(file.name)}
                                className="text-error hover:bg-error/10 p-1 rounded transition-colors"
                                title="Xóa tệp"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default FileAttachment;
