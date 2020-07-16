import { FC } from 'react';
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export declare type UploadTypes = 'btn' | 'textarea';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSucess?: (data: any, file: File) => void;
    onError?: (data: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    header?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
    uploadType?: UploadTypes;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
