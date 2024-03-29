import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import i18n from 'shared/config/i18n/i18n';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'users/fetchByIdStatus',
    async (authData, thunkApi) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
        } = thunkApi;

        try {
            const response = await extra.api.post<User>('/login', authData);
            if (!response.data) {
                throw new Error('Ошибка на сервере');
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { message } = error;
                const isNetworkError = message.includes('Network Error');

                return rejectWithValue(isNetworkError
                    ? `${message}, (Сервер авторизации не работает)`
                    : i18n.t('Incorrect login or password'));
            }
            return rejectWithValue(i18n.t('An unexpected error occurred'));
        }
    },
);
