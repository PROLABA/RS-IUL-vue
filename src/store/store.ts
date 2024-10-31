import { createStore, ActionContext } from "vuex";
import axios from "axios";
import { formatDate } from "../helpers/formatedData";
import { vId } from "../main";
// апи прод сервера
const baseUrl = "https://services.rsexpertiza.ru";
// апи дев сервера
// const baseUrl = "https://devserv.rsexpertiza.ru";
interface State {
  data: any;
  selectedItems: any;
  htmlPreview: string;
  filesInfoHash: Record<string, any>;
  faqQuestions: any[];
  headerInfo: any[];
  flagId: string;
  currentVersionId: string;
}

type Context = ActionContext<State, State>;

export default createStore<State>({
  state: {
    currentVersionId: "",
    data: null,
    selectedItems: {},
    htmlPreview: "",
    filesInfoHash: {},
    faqQuestions: [],
    headerInfo: [],
    flagId: "",
  },
  mutations: {
    setCurrentVersionId(state, id) {
      state.currentVersionId = id;
    },
    clearCureentVersion(state: State) {
      state.currentVersionId = "";
    },
    setFlagId(state: State, id: string) {
      state.flagId = id;
    },
    setData(state: State, data: any) {
      state.data = data;
    },
    clearSelectedItems(state: State) {
      state.selectedItems = {};
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
          (file: { FILE_NAME: string }) => file.FILE_NAME !== fileName
        );
      }
    },
    addSelectedItem(state: State, item: Partial<State["selectedItems"]>) {
      let updatedItems = { ...state.selectedItems };
      if ("files" in item && Array.isArray(item.files)) {
        const existingFiles = updatedItems.files || [];
        updatedItems.files = existingFiles.map(
          (existingFile: { FILE_HASH: any }) => {
            const newFile = item.files?.find(
              (f: { FILE_HASH: any }) => f.FILE_HASH === existingFile.FILE_HASH
            );
            return newFile ? { ...existingFile, ...newFile } : existingFile;
          }
        );

        const newFiles = item.files.filter(
          (newFile) =>
            !existingFiles.some(
              (existingFile: { FILE_HASH: any }) =>
                existingFile.FILE_HASH === newFile.FILE_HASH
            )
        );
        updatedItems.files = [...(updatedItems.files || []), ...newFiles];
      }

      if ("roles" in item && Array.isArray(item.roles)) {
        updatedItems.roles = item.roles;
      }

      for (const [key, value] of Object.entries(item)) {
        if (key !== "files" && key !== "roles") {
          updatedItems[key] = value;
        }
      }

      if ("HASH_TYPE" in item) {
        state.filesInfoHash = {
          ...state.filesInfoHash,
          HASH_TYPE: item.HASH_TYPE,
        };
      }

      state.selectedItems = updatedItems;
    },
    addUploadInfoHash(
      state: State,
      item: { FILE_HASH: Record<string, string>[] }
    ) {
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

    updateFileHashes(
      state: State,
      {
        newHashes,
        selectedEncoding,
      }: { newHashes: { FILE_HASH: string }[]; selectedEncoding: string }
    ) {
      if (state.selectedItems.files) {
        state.selectedItems.files = state.selectedItems.files.map(
          (file: { FILE_HASH: any }, index: number) => ({
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
          "https://services.rsexpertiza.ru/api/document-constructor"
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
          `${baseUrl}/api/document-constructor/files-info`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const filesData = response.data.data;
        if (filesData && typeof filesData === "object") {
          Object.keys(filesData).forEach((key) => {
            const fileData = filesData[key];
            const selectedEncoding = state.selectedItems.HASH_TYPE || "CRC32";

            commit("addSelectedItem", {
              HASH_TYPE: selectedEncoding,
              files: [
                {
                  FILE_NAME: fileData.name,
                  FILE_SIZE: fileData.size,
                  DOCUMENT_DATE: formatDate(fileData.last_update_date),
                  FILE_HASH: fileData.hash,
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
          "https://services.rsexpertiza.ru/api/document-constructor/generate/preview",
          JSON.stringify(state.selectedItems)
        );
        commit("setHTMLPreview", response.data.data);
      } catch (error) {
        console.error("Error generating HTML preview:", error);
      }
    },
    async downloadDocument({ commit, state }: Context) {
      try {
        const response = await axios.post<{
          file_path: any;
          data: string;
          id: any;
        }>(
          state.currentVersionId !== ""
            ? `${baseUrl}/api/document-constructor/generate/file?update=${state.currentVersionId}`
            : `${baseUrl}/api/document-constructor/generate/file`,
          JSON.stringify(state.selectedItems)
        );
        //@ts-ignore

        if (response.data.data.id) {
          //@ts-ignore
          const currentVersionId = response.data.data.id;
          commit("setCurrentVersionId", currentVersionId);
        }

        //@ts-ignore
        if (response.data.data.file_path) {
          //@ts-ignore
          const downloadUrl = `${baseUrl}${response.data.data.file_path}`;
          window.open(downloadUrl, "_blank");
        } else {
          // throw new Error("Download URL not found in the response");
        }
      } catch (error) {
        console.error("Error downloading document:", error);
        throw error;
      }
    },
    async getVersions({ commit, state }: Context) {
      try {
        // @ts-ignore
        const versionId = vId || state.currentVersionId;
        if (versionId !== undefined && versionId !== null && versionId !== "") {
          const response = await axios.get<{
            data: { [key: string]: { json: string } };
          }>(`${baseUrl}/api/document-constructor/versions?id=${versionId}`);
          const newData = JSON.parse(response.data.data["0"].json);
          if (response.data.data) {
            commit("clearSelectedItems");
            commit("addSelectedItem", newData);
          }
        } else {
          commit("clearSelectedItems");
        }
      } catch (error) {
        console.error("Error gettingVersionsToEdit:", error);
        throw error;
      }
    },
    async getFAQQuestions({ commit }: Context) {
      try {
        const response = await axios.get<{ data: any[] }>(
          `${baseUrl}/api/document-constructor/questions`
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
          `${baseUrl}/api/document-constructor/header`
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
