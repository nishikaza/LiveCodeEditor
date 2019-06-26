import { transformExample } from './exampleTransform';

export function exampleTransformLoader(source: string): string {
  return `module.exports = ${JSON.stringify(transformExample(source))}`;
}
