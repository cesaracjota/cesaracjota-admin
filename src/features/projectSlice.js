import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "../services/projecto.service";

const initialState = {
    projects: [],
    project: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const getAllProjects = createAsyncThunk(
    "projects/getAllProjects",
    async (_, thunkAPI) => {
        try {
            return await projectService.getAll();
        } catch (error){
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createProject = createAsyncThunk(
    "projects/create",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await projectService.create(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data && 
                    error.response.data.msg) ||
                    error.message ||
                    error.toString();
                return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updateProject = createAsyncThunk(
    "project/update",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await projectService.update(data, token);
        } catch (error) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteProject = createAsyncThunk(
    "projects/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await projectService.deleteProject(id, token);
        } catch (error) {
            const message = 
            (error.response && 
                error.response.data && 
                error.response.data.msg) || 
                error.message || 
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProjects.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllProjects.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.projects = action.payload;
        });
        builder.addCase(getAllProjects.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(createProject.pending, (state) => {
            state.isLoading = false;
        })
        builder.addCase(createProject.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.projects.push(action.payload);
        })
        builder.addCase(createProject.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        builder.addCase(updateProject.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateProject.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.projects = state.projects.map((data) => 
                data._id === action.payload._id ? action.payload : data);
        })
        builder.addCase(updateProject.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        builder.addCase(deleteProject.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteProject.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.projects = state.projects.filter((data) => 
                data._id !== action.payload._id);
        })
        builder.addCase(deleteProject.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const { reset } = projectSlice.actions;

export default projectSlice.reducer;
