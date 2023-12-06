import {useState} from "react";

/**
 * `useFetch` is a custom hook for performing asynchronous data fetching operations.
 * It encapsulates the logic for fetching data, handling loading states, errors, and storing the fetched data.
 *
 * @param {boolean} [initialIsLoading=false] - An initial state for the loading status.
 *   Defaults to `false`, indicating that the fetch operation has not started initially.
 *
 * @returns {UseFetchData<T>} - An object containing various states and a function to perform the fetch operation.
 *   - `isLoading` (boolean): Indicates whether a fetch operation is currently in progress.
 *   - `error` (string): Stores the error message if an error occurs during the fetch operation.
 *   - `setError` (function): A function to manually set the error message.
 *   - `data` (T | undefined): The data fetched by the last successful fetch operation. `undefined` if no data has been fetched or if an error occurred.
 *   - `fetchData` (FetchDataFn<T>): A function to initiate the fetch operation. It takes a function returning a promise (`fn`) and an optional custom error message.
 *     It returns a promise that resolves to the fetched data or `undefined` if an error occurs.
 *
 * @typeparam T - The type of data expected to be returned from the fetch operation.
 *
 * Usage:
 * The `fetchData` function should be called with a function that returns a Promise, which performs the actual data fetching.
 * Optionally, a custom error message can be provided which will be used if an error occurs during fetching.
 *
 * Example:
 * const { isLoading, error, data, fetchData } = useFetch<MyDataType>();
 * fetchData(() => myApiService.getData(), "Custom error message for fetching data");
 */
export const useFetch = <T>(initialIsLoading: boolean = false): UseFetchData<T> => {

    const [isLoading, setIsLoading] = useState<boolean>(initialIsLoading);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<T>();

    const fetchData = async (fn: () => Promise<T>, errorMessage?: string) => {
        setIsLoading(true);
        try {
            const response = await fn();
            setData(response);
            return response;
        } catch (error: any) {
            const defaultErrorMessage = `Error occurred: ${error.message}`;
            setError((error.message === "Not Found" && errorMessage) ?
                errorMessage :
                defaultErrorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading, error, fetchData, data, setError
    }
}

interface UseFetchData<T> {
    isLoading: boolean;
    error: string;
    setError: (errorMessage: string) => void;
    data: T | undefined;
    fetchData: FetchDataFn<T>;
}

interface FetchDataFn<T> {
    (fn: () => Promise<T>, errorMessage?: string): Promise<T | undefined>;
}