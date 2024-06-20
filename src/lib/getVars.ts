import path from 'path'

import * as core from '@actions/core'

const {GITHUB_REPOSITORY, RUNNER_TOOL_CACHE} = process.env

export type Vars = {
  cacheDir: string
  options: {
    key: string
  }
}

export const getVars = (): Vars => {
  if (!RUNNER_TOOL_CACHE) {
    throw new TypeError('Expected RUNNER_TOOL_CACHE environment variable to be defined.')
  }

  if (!GITHUB_REPOSITORY) {
    throw new TypeError('Expected GITHUB_REPOSITORY environment variable to be defined.')
  }

  const options = {
    key: core.getInput('key') || 'no-key',
    path: core.getInput('path'),
  }

  if (!options.path) {
    throw new TypeError('path is required but was not provided.')
  }

  const cacheDir = path.join(RUNNER_TOOL_CACHE, GITHUB_REPOSITORY, options.key)

  return {
    cacheDir,
    options,
  }
}
