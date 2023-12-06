import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Repository } from '../models/Repository';
import RepositoryCard from "../components/RepositoryCard.tsx";

// Mock the external modules/functions used in the component
vi.mock('../services/stringUtils', () => ({
    sanitizeClassName: vi.fn((language: string) => `lang-${language}`),
}));

vi.mock('../services/dateUtils', () => ({
    timeAgo: vi.fn(() => 'Updated 1 day ago'),
}));

describe('RepositoryCard', () => {
    it('renders repository information correctly', () => {
        const mockRepository: Repository = {
            id: 123,
            name: 'mock-repo',
            full_name: 'mockuser/mock-repo',
            forks_count: 1,
            stargazers_count: 2,
            watchers_count: 3,
            html_url: 'https://github.com/mockuser/mock-repo',
            description: 'This is a mock repository',
            fork: false,
            language: 'TypeScript',
            updated_at: '2021-01-02T00:00:00Z',
            owner: {
                login: 'mockuser',
                id: 1,
                node_id: 'MDQ6VXNlcjE=',
                avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/mockuser',
                html_url: 'https://github.com/mockuser',
                type: 'User',
                site_admin: false,
                name: null,
                email: null
            },
            license: null
        };

        render(<RepositoryCard repository={mockRepository} />);

        expect(screen.getByText('mock-repo')).toBeInTheDocument();
        expect(screen.getByText('This is a mock repository')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('Updated 1 day ago')).toBeInTheDocument();
    });
});