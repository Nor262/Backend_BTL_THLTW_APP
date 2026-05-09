import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
