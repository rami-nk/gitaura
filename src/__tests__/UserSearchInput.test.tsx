import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserSearchInput from '../components/UserSearchInput';

describe('UserSearchInput', () => {
    it('calls onSearch when form is submitted', async () => {
        const onSearchMock = vi.fn();
        render(<UserSearchInput onSearch={onSearchMock} isLoading={false} />);

        const input = screen.getByPlaceholderText('ThePrimeagen');
        const searchValue = 'testuser';

        fireEvent.change(input, { target: { value: searchValue } });
        fireEvent.submit(input);

        expect(onSearchMock).toHaveBeenCalledWith(searchValue);
    });

    it('calls onChange when input changes', async () => {
        const onChangeMock = vi.fn();
        render(<UserSearchInput onSearch={() => {}} onChange={onChangeMock} isLoading={false} />);

        const input = screen.getByPlaceholderText('ThePrimeagen');
        fireEvent.change(input, { target: { value: 'new value' } });

        expect(onChangeMock).toHaveBeenCalled();
    });

    it('displays error message if errorMessage prop is provided', async () => {
        const errorMessage = 'Error message';
        render(<UserSearchInput onSearch={() => {}} isLoading={false} errorMessage={errorMessage} />);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('shows loading spinner when isLoading is true', async () => {
        render(<UserSearchInput onSearch={() => {}} isLoading={true} />);

        const spinner = screen.getByTestId('loading-spinner');
        expect(spinner).toBeInTheDocument();
    });
});
