// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/__tests__/setup.ts'],
        globals: true,
        coverage: {
            provider: 'istanbul' // or 'v8'
        },
    }
})