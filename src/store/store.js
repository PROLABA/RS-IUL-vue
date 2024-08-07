import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        data: null,
        selectedItems: [],
    },
    mutations: {
        setData(state, data) {
            state.data = data;
        },
        addSelectedItem(state, item) {
            const existingItemIndex = state.selectedItems.findIndex(i => i.DOCUMENT_TYPE_ID === item.DOCUMENT_TYPE_ID);
            if (existingItemIndex === -1) {
                state.selectedItems.push(item);
            } else {
                state.selectedItems[existingItemIndex] = { ...state.selectedItems[existingItemIndex], ...item };
            }
            console.log(state.selectedItems);
        },
        removeSelectedItem(state, itemId) {
            state.selectedItems = state.selectedItems.filter(item => item.id !== itemId);
        },
        clearSelectedItems(state) {
            state.selectedItems = [];
        },

    },
    actions: {
        async fetchData({ commit }) {
            try {
                const response = await axios.get('https://devserv.rsexpertiza.ru/api/document-constructor');
                commit('setData', response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async sendDataToServer({ state }) {
            try {
                await axios.post('https://your-api-endpoint.com/save-data', {
                    data: state.data,
                    selectedItems: state.selectedItems
                });
            } catch (error) {
                console.error('Error sending data to server:', error);
            }
        },
        async uploadFile({ commit }, files) {
            try {
                const formData = new FormData();
                files.forEach((file, index) => {
                    formData.append(`files[${index}]`, file);
                });

                const response = await axios.post('https://devserv.rsexpertiza.ru/api/document-constructor/files-info', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('File uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    },
    getters: {
        getData: (state) => state.data,
        getSelectedItems: (state) => state.selectedItems,
    },
});
