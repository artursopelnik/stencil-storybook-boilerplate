import { Args } from '@storybook/web-components';

export function argsToTemplate(args: Args): string {
    return Object.entries(args)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
}
