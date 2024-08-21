import { createStore, ActionContext } from "vuex";
import axios from "axios";
import { formatDate } from "../helpers/formatedData";

interface State {
  data: any
  selectedItems: any
  htmlPreview: string
  filesInfoHash: Record<string, any>
  faqQuestions: any[]
  headerInfo: any[]
  flagId: string
}

type Context = ActionContext<State, State>;

export default createStore<State>({
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
    setFlagId(state: State, id: string) {
      state.flagId = id;
    },
    setData(state: State, data: any) {
      state.data = data;
    },
    setFAQQuestions(state: State, questions: any[]) {
      state.faqQuestions = questions;
    },
    setHeaderInfo(state: State, info: any[]) {
      state.headerInfo = info;
    },
    removeFile(state: State, fileName: string) {
      if (state.selectedItems.files) {
        state.selectedItems.files = state.selectedItems.files.filter(
          (file: { FILE_NAME: string; }) => file.FILE_NAME !== fileName
        );
      }
    },
    addSelectedItem(state: State, item: Partial<State['selectedItems']>) {
      let updatedItems = { ...state.selectedItems };

      if ('files' in item && Array.isArray(item.files)) {
        const existingFiles = updatedItems.files || [];
        updatedItems.files = existingFiles.map((existingFile: { FILE_HASH: any; }) => {
          const newFile = item.files?.find(
            (f: { FILE_HASH: any; }) => f.FILE_HASH === existingFile.FILE_HASH
          );
          return newFile ? { ...existingFile, ...newFile } : existingFile;
        });

        const newFiles = item.files.filter(
          (newFile) =>
            !existingFiles.some(
              (existingFile: { FILE_HASH: any; }) => existingFile.FILE_HASH === newFile.FILE_HASH
            )
        );
        updatedItems.files = [...(updatedItems.files || []), ...newFiles];
      }

      if ('roles' in item && Array.isArray(item.roles)) {
        updatedItems.roles = item.roles;
      }

      for (const [key, value] of Object.entries(item)) {
        if (key !== 'files' && key !== 'roles') {
          updatedItems[key] = value;
        }
      }

      if ('HASH_TYPE' in item) {
        state.filesInfoHash = {
          ...state.filesInfoHash,
          HASH_TYPE: item.HASH_TYPE,
        };
      }

      state.selectedItems = updatedItems;
    },
    addUploadInfoHash(state: State, item: { FILE_HASH: Record<string, string>[] }) {
      const newHashes = Array.isArray(item.FILE_HASH) ? item.FILE_HASH : [];
      const existingHashes = state.filesInfoHash.FILE_HASH || [];

      state.filesInfoHash = {
        ...state.filesInfoHash,
        FILE_HASH: [...existingHashes, ...newHashes],
      };
    },
    setHTMLPreview(state: State, html: string) {
      state.htmlPreview = html;
    },
    removeSelectedItem(state: State, itemId: string) {
      if (state.selectedItems[itemId]) {
        delete state.selectedItems[itemId];
      }
    },
    clearSelectedItems(state: State) {
      state.selectedItems = {};
    },
    updateFileHashes(state: State, { newHashes, selectedEncoding }: { newHashes: { FILE_HASH: string }[], selectedEncoding: string }) {
      if (state.selectedItems.files) {
        state.selectedItems.files = state.selectedItems.files.map(
          (file: { FILE_HASH: any; }, index: number) => ({
            ...file,
            FILE_HASH: newHashes[index]?.FILE_HASH || file.FILE_HASH,
          })
        );
      }
      state.selectedItems.HASH_TYPE = selectedEncoding;
    },
  },
  actions: {
    removeFileFromStore({ commit }: Context, fileName: string) {
      commit("removeFile", fileName);
    },
    async fetchData({ commit }: Context) {
      try {
        const response = await axios.get<{ data: any }>(
          "https://devserv.rsexpertiza.ru/api/document-constructor"
        );
        commit("setData", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async uploadFile({ commit, state }: Context, files: File[]) {
      try {
        const formData = new FormData();
        files.forEach((file, index) => {
          formData.append(`file${index}`, file);
        });

        const response = await axios.post<{ data: Record<string, any> }>(
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
              FILE_HASH: [fileData.hash],
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
    async getHTMLDOC({ commit, state }: Context) {
      try {
        const response = await axios.post<{ data: string }>(
          "https://devserv.rsexpertiza.ru/api/document-constructor/generate/preview",
          JSON.stringify(state.selectedItems),

        );
        commit("setHTMLPreview", response.data.data);
      } catch (error) {
        console.error("Error generating HTML preview:", error);
      }
    },
    async downloadDocument({ state }: Context) {
      try {
        const response = await axios.post<{ data: string }>(
          "https://devserv.rsexpertiza.ru/api/document-constructor/generate/file",
          JSON.stringify(state.selectedItems)
        );

        if (response.data && response.data.data) {
          const downloadUrl = `https://devserv.rsexpertiza.ru${response.data.data}`;
          window.open(downloadUrl, "_blank");
        } else {
          throw new Error("Download URL not found in the response");
        }
      } catch (error) {
        console.error("Error downloading document:", error);
        throw error;
      }
    },
    async getVersions({ commit }: Context) {
      try {
        const versionId = (window as any).versionid || '20';
        const response = await axios.get<{ data: { [key: string]: { json: string } } }>(
          `https://devserv.rsexpertiza.ru/api/document-constructor/versions?id=${versionId}`
        );
        const newData = JSON.parse(response.data.data["0"].json);
        if (newData) {
          commit("clearSelectedItems");
          commit("addSelectedItem", newData);
        }
      } catch (error) {
        console.error("Error gettingVersionsToEdit:", error);
        throw error;
      }
    },
    async getFAQQuestions({ commit }: Context) {
      try {
        const response = await axios.get<{ data: any[] }>(
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
    async getHeaderInfo({ commit }: Context) {
      try {
        const response = await axios.get<{ data: any[] }>(
          "https://devserv.rsexpertiza.ru/api/document-constructor/header"
        );
        if (response.data) {
          commit("setHeaderInfo", response.data.data);
        } else {
          throw new Error("Header data not found in the response");
        }
      } catch (error) {
        console.error("Error fetching header info:", error);
        throw error;
      }
    },
  },
  getters: {
    getData: (state: State) => state.data,
    getSelectedItems: (state: State) => state.selectedItems,
    getFAQQuestions: (state: State) => state.faqQuestions,
    getHeaderInfo: (state: State) => state.headerInfo,
  },
});