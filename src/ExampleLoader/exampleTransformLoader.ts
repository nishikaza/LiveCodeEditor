import { transformExample } from './exampleTransformCodepen';

export function exampleTransformLoader(source: string): string {
  return `module.exports = ${JSON.stringify(transformExample(source))}`;
}
