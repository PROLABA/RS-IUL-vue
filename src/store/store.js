import { createStore } from "vuex";
import axios from "axios";
import { formatDate } from "../helpers/formatedData";

export default createStore({
  state: {
    data: null,
    selectedItems: {},
    htmlPreview: "",
    filesInfoHash: {},
  },
  mutations: {
    setData(state, data) {
      state.data = data;
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
        state.selectedItems.files = state.selectedItems.files.map((file) => ({
          ...file,
          FILE_HASH:
            newHashes.find((hash) => hash.FILE_HASH)?.FILE_HASH ||
            file.FILE_HASH,
        }));
      }
      state.selectedItems.HASH_TYPE = selectedEncoding;
    },
  },
  actions: {
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
        const response = await axios({
          method: "post",
          url: "https://devserv.rsexpertiza.ru/api/document-constructor/file",
          data: JSON.stringify(state.selectedItems),
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Создаем ссылку для скачивания
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        // Получаем имя файла из заголовков ответа, если оно там есть
        const contentDisposition = response.headers["content-disposition"];
        let fileName = "document.pdf"; // Имя файла по умолчанию
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/i);
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1];
          }
        }

        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();

        // Очистка
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading document:", error);
        throw error;
      }
    },
  },
  getters: {
    getData: (state) => state.data,
    getSelectedItems: (state) => state.selectedItems,
  },
});
