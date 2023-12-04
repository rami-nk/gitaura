import {render, screen, fireEvent} from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import * as githubService from '../services/githubService';
import UserSearchInput from "../components/UserSearchInput.tsx";
import {act} from "react-dom/test-utils";

describe('UserSearchInput', () => {

    beforeEach(() => {
        vi.mock('../services/githubService', () => ({
            getUsers: vi.fn()
        }));
    });

    it('renders without crashing', () => {
        render(<UserSearchInput onSearch={() => {
        }}/>);
        expect(screen.getByPlaceholderText('ThePrimeagen')).toBeDefined();
    });

    it('updates input field correctly', async () => {
        render(<UserSearchInput onSearch={() => {
        }}/>);
        const input = screen.getByPlaceholderText('ThePrimeagen');
        await UserEvent.type(input, 'testuser');
        expect(input).toHaveValue('testuser');
    });

    it('handles valid user submission', async () => {
        const mockUser = {
            "login": "octocat",
            "id": 1,
            "node_id": "MDQ6VXNlcjE=",
            "avatar_url": "https://github.com/images/error/octocat_happy.gif",
            "gravatar_id": "",
            "url": "https://api.github.com/users/octocat",
            "html_url": "https://github.com/octocat",
            "followers_url": "https://api.github.com/users/octocat/followers",
            "following_url": "https://api.github.com/users/octocat/following{/other_user}",
            "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
            "organizations_url": "https://api.github.com/users/octocat/orgs",
            "repos_url": "https://api.github.com/users/octocat/repos",
            "events_url": "https://api.github.com/users/octocat/events{/privacy}",
            "received_events_url": "https://api.github.com/users/octocat/received_events",
            "type": "User",
            "site_admin": false,
            "name": "monalisa octocat",
            "company": "GitHub",
            "blog": "https://github.com/blog",
            "location": "San Francisco",
            "email": "octocat@github.com",
            "hireable": false,
            "bio": "There once was...",
            "twitter_username": "monatheoctocat",
            "public_repos": 2,
            "public_gists": 1,
            "followers": 20,
            "following": 0,
            "created_at": "2008-01-14T04:33:35Z",
            "updated_at": "2008-01-14T04:33:35Z"
        };
        // @ts-ignore
        vi.spyOn(githubService, 'getUsers').mockResolvedValue({data: mockUser});

        const mockOnSearch = vi.fn();
        render(<UserSearchInput onSearch={mockOnSearch}/>);

        const input = screen.getByPlaceholderText('ThePrimeagen');
        await UserEvent.type(input, 'testuser');
        await act(() => fireEvent.submit(input));

        await vi.waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith(mockUser));
    });

    it('displays error for invalid user submission', async () => {
        vi.spyOn(githubService, 'getUsers').mockRejectedValue(new Error('User not found'));

        render(<UserSearchInput onSearch={() => {
        }}/>);

        const input = screen.getByPlaceholderText('ThePrimeagen');
        await UserEvent.type(input, 'invaliduser');
        await act(() => fireEvent.submit(input));

        await vi.waitFor(() => expect(screen.getByText(/No github user called/)).toBeDefined());
    });
});