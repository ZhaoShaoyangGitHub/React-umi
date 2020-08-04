/**
 * StorePhotoAlbum.state 参数类型
 *
 * @export
 * @interface StorePhotoAlbumState
 */
export interface StorePhotoAlbumState {
    shopId: number
    photoAlbum: Array<any>
    editStatus: boolean
    uploadImages: Array<any>
    uploadImagesLength: number
}

/**
 * StorePhotoAlbum.props 参数类型
 *
 * @export
 * @interface StorePhotoAlbumProps
 */
export interface StorePhotoAlbumProps {
    dispatch?: any
}
