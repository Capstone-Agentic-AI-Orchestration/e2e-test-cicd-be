import { SERVICE_NAME } from '../../src/index';

describe('e2e-test-cicd-be', () => {
  it('exports SERVICE_NAME', () => {
    expect(SERVICE_NAME).toBe('e2e-test-cicd-be');
  });
});
