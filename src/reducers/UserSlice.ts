
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../model/User";

export const initialState: User[] = [];

const api = axios.create({
    baseURL: "https://8015b5dbc0724d38882ac90397c27649.weavy.io",
});

export const addUser = createAsyncThunk(
    "User/addUser",
    async (User: User) => {
        try {
            const response = await api.post("/api/users", User);
            alert("User Added Successfully");
            return response.data.message;
        } catch (error) {
            alert("Failed to add User");
            console.log("error", error);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "User/deleteUser",
    async (email: string) => {
        try {
            const response = await api.delete(`/User/delete/${email}`);
            return response.data;
        } catch (error) {
            return console.log("error", error);
        }
    }
);

export const updateUser = createAsyncThunk(
    "User/updateUser",
    async (User: User) => {
        try {
            const response = await api.patch(`/api/users/${User.email}`);
            return response.data;
        } catch (error) {
            return console.log("error", error);
        }
    }
);

export const getUser = createAsyncThunk("User/getUser", async (email: string) => {
    try {
        const response = await api.get(`/api/users/${email}`);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        return console.log("error", error);
    }
});

const Userlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<User>) => {
            state.push(action.payload);
        },
        deleteUser(state, action: PayloadAction<string>) {
            state = state.filter((User) => User.email !== action.payload);
        },
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.findIndex(
                (User) => User.email === action.payload.email
            );
            if (index > -1) {
                state[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {

        // Add User
        builder
            .addCase(addUser.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                console.log("Failed to add User", action.payload);
            })
            .addCase(addUser.pending, (state, action) => {
                console.log("Adding User", action.payload);
            });

        // Delete User
        builder
            .addCase(deleteUser.fulfilled, (state, action) => {
                state = state.filter((User) => User.email !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                console.log("Failed to delete User", action.payload);
            })
            .addCase(deleteUser.pending, (state, action) => {
                console.log("Deleting User", action.payload);
            });

        // Update User
        builder
            .addCase(updateUser.fulfilled, (state, action) => {
                state.map((User) => {
                    if (User.email === action.payload.email) {
                        User.name = action.payload.name;
                        User.address = action.payload.address;
                        User.email = action.payload.email;
                    }
                });
            })
            .addCase(updateUser.rejected, (state, action) => {
                console.log("Failed to update User", action.payload);
            })
            .addCase(updateUser.pending, (state, action) => {
                console.log("Updating User", action.payload);
            });

        // Get User
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                console.log("Failed to get User", action.payload);
            })
            .addCase(getUser.pending, (state, action) => {
                console.log("Getting User", action.payload);
            });
    },
});

export default Userlice.reducer;
