import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  isSidebarOpen: boolean;
  activeWorkspaceId: string | null;
  workspaceName: string;
}

const initialState: DashboardState = {
  isSidebarOpen: true,
  activeWorkspaceId: "default",
  workspaceName: "Workspace",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setActiveWorkspaceId: (state, action: PayloadAction<string>) => {
      state.activeWorkspaceId = action.payload;
    },
    setWorkspaceName: (state, action: PayloadAction<string>) => {
      state.workspaceName = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setActiveWorkspaceId,
  setWorkspaceName,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
