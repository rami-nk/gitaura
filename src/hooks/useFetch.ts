import {useState} from "react";

export const useFetch = <T>(): UseFetchData<T> => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
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