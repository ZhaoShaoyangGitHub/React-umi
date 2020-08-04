import * as StorePhotoAlbumApi from './apis';

export default {
    namespace: 'StorePhotoAlbum',
    state: {
        StorePhotoAlbumDataList: []
    },

    reducers: {
        save(state, { payload }) {
            return { ...state, StorePhotoAlbumDataList: [].concat(payload) };
        }
    },
    effects: {
        *effectsDemo(action, { call, put }) {
            const { code, data } = yield call(StorePhotoAlbumApi.demo, {});
            if (code === "OK") {
                yield put({
                    type: "save",
                    payload: data
                });
            }
        }
    }
};