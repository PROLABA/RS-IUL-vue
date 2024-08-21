import { createStore } from "vuex";
import axios from "axios";
import { formatDate } from "../helpers/formatedData";


// windlow.versionid;
export default createStore({
  state: {
    data: null,
    selectedItems: {},
    htmlPreview: "",
    filesInfoHash: {},
    faqQuestions: [],
    headerInfo: [],
    flagId: "",
  },
  mutations: {
    setFlagId(state, id) {
      state.flagId = id;
      console.log(state.flagId);
    },
    setData(state, data) {
      state.data = data;
    },
    setFAQQuestions(state, questions) {
      state.faqQuestions = questions;
    },
    setHeaderInfo(state, info) {
      state.headerInfo = info;
    },
    removeFile(state, fileName) {
      if (state.selectedItems.files) {
        state.selectedItems.files = state.selectedItems.files.filter(
          (file) => file.FILE_NAME !== fileName
        );
      }
    },
    addSelectedItem(state, item) {
      let updatedItems = { ...state.selectedItems };

      if (item.files && Array.isArray(item.files)) {
        const existingFiles = updatedItems.files || [];
        updatedItems.files = existingFiles.map((existingFile) => {
          const newFile = item.files.find(
            (f) => f.FILE_HASH === existingFile.FILE_HASH
          );
          return newFile ? { ...existingFile, ...newFile } : existingFile;
        });

        // Добавляем новые файлы, которых нет в существующем списке
        const newFiles = item.files.filter(
          (newFile) =>
            !existingFiles.some(
              (existingFile) => existingFile.FILE_HASH === newFile.FILE_HASH
            )
        );
        updatedItems.files = [...updatedItems.files, ...newFiles];
      }
      if (item.roles && Array.isArray(item.roles)) {
        updatedItems.roles = item.roles;
      }

      for (const [key, value] of Object.entries(item)) {
        if (key !== "files" && key !== "roles") {
          updatedItems[key] = value;
        }
      }

      if (item.HASH_TYPE) {
        state.filesInfoHash = {
          ...state.filesInfoHash,
          HASH_TYPE: item.HASH_TYPE,
        };
      }

      state.selectedItems = updatedItems;
      console.log(state.selectedItems);
    },
    addUploadInfoHash(state, item) {
      const newHashes = Array.isArray(item.FILE_HASH) ? item.FILE_HASH : [];
      const existingHashes = state.filesInfoHash.FILE_HASH || [];

      state.filesInfoHash = {
        FILE_HASH: [...existingHashes, ...newHashes],
      };
      console.log(state.filesInfoHash);
    },
    setHTMLPreview(state, html) {
      state.htmlPreview = html;
    },
    removeSelectedItem(state, itemId) {
      delete state.selectedItems[itemId];
    },
    clearSelectedItems(state) {
      state.selectedItems = {};
    },
    updateFileHashes(state, { newHashes, selectedEncoding }) {
      if (state.selectedItems.files) {
        state.selectedItems.files = state.selectedItems.files.map(
          (file, index) => ({
            ...file,
            FILE_HASH: newHashes[index]?.FILE_HASH || file.FILE_HASH,
          })
        );
      }
      state.selectedItems.HASH_TYPE = selectedEncoding;
    },
  },
  actions: {
    removeFileFromStore({ commit }, fileName) {
      commit("removeFile", fileName);
    },
    async fetchData({ commit }) {
      try {
        const response = await axios.get(
          "https://devserv.rsexpertiza.ru/api/document-constructor"
        );
        commit("setData", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async uploadFile({ commit, state }, files) {
      try {
        const formData = new FormData();
        files.forEach((file, index) => {
          formData.append(`file${index}`, file);
        });

        const response = await axios.post(
          "https://devserv.rsexpertiza.ru/api/document-constructor/files-info",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const filesData = response.data.data;

        if (filesData && typeof filesData === "object") {
          Object.keys(filesData).forEach((key) => {
            const fileData = filesData[key];
            const selectedEncoding = state.selectedItems.HASH_TYPE || "MD5";
            const fileHashValue = fileData.hash[selectedEncoding];

            commit("addSelectedItem", {
              HASH_TYPE: selectedEncoding,
              files: [
                {
                  FILE_NAME: fileData.name,
                  FILE_SIZE: fileData.size,
                  DOCUMENT_DATE: formatDate(fileData.last_update_date),
                  FILE_HASH: fileHashValue,
                },
              ],
            });
            commit("addUploadInfoHash", {
              FILE_HASH: [
                {
                  ...fileData.hash,
                },
              ],
            });
          });
          commit("addSelectedItem", { roles: [] });
        } else {
          console.error("File data is not an object or is undefined.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },

    async getHTMLDOC({ commit, state }) {
      try {
        const response = await axios.post(
          "https://devserv.rsexpertiza.ru/api/document-constructor/generate/preview",
          JSON.stringify(state.selectedItems),
          {
            headers: {
              // 'Content-Type': 'application/json',
              // "Access-Control-Allow-Origin": "*",
              // "Data-Type": "json",
            },
          }
        );
        commit("setHTMLPreview", response.data.data);
      } catch (error) {
        console.error("Error generating HTML preview:", error);
      }
    },
    async downloadDocument({ state }) {
      try {
        const response = await axios.post(
          "https://devserv.rsexpertiza.ru/api/document-constructor/generate/file",
          JSON.stringify(state.selectedItems)
        );

        if (response.data && response.data.data) {
          const downloadUrl = `https://devserv.rsexpertiza.ru${response.data.data}`;

          // Open the URL in a new window
          window.open(downloadUrl, "_blank");
        } else {
          throw new Error("Download URL not found in the response");
        }
      } catch (error) {
        console.error("Error downloading document:", error);
        throw error;
      }
    },
    async getVersions({ commit, state }) {
      try {
        const versionId = window.versionid || '20';
        const response = await axios.get(
          `https://devserv.rsexpertiza.ru/api/document-constructor/versions?id=${versionId}`
        )
        const newData = JSON.parse(response.data.data["0"].json);
        console.log(newData);
        if (newData) {
          commit("clearSelectedItems");
          commit("addSelectedItem", newData);
        }
      } catch (error) {
        console.error("Error gettingVersionsToEdit:", error);
        throw error;
      }
    },
    async getFAQQuestions({ commit }) {
      try {
        const response = await axios.get(
          "https://devserv.rsexpertiza.ru/api/document-constructor/questions"
        );
        if (response.data && response.data.data) {
          commit("setFAQQuestions", response.data.data);
        } else {
          throw new Error("FAQ data not found in the response");
        }
      } catch (error) {
        console.error("Error fetching FAQ questions:", error);
        throw error;
      }
    },
    async getHeaderInfo({ commit }) {
      try {
        const response = await axios.get(
          "https://devserv.rsexpertiza.ru/api/document-constructor/header"
        );
        if (response.data) {
          commit("setHeaderInfo", response.data.data);
        } else {
          throw new Error("FAQ data not found in the response");
        }
      } catch (error) {
        console.error("Error fetching FAQ questions:", error);
        throw error;
      }
    },
  },

  getters: {
    getData: (state) => state.data,
    getSelectedItems: (state) => state.selectedItems,
    getFAQQuestions: (state) => state.faqQuestions,
    getHeaderInfo: (state) => state.headerInfo,
  },
});
