import * as core from '@actions/core'
import { setFailed } from '@actions/core'
import { isErrorLike } from './lib/isErrorLike'
import { rmRF } from '@actions/io'
import path from 'path'

const { GITHUB_REPOSITORY, RUNNER_TOOL_CACHE } = process.env

async function clean(dir: string) {
  console.log('Cleaning dir: ', dir)
  await rmRF(dir)
}

async function main(): Promise<void> {
  try {
    if (!RUNNER_TOOL_CACHE) {
      throw new TypeError('Expected RUNNER_TOOL_CACHE environment variable to be defined.')
    }

    if (!GITHUB_REPOSITORY) {
      throw new TypeError('Expected GITHUB_REPOSITORY environment variable to be defined.')
    }
    const keys = core.getMultilineInput('keys')

    if (!keys) {
      throw new TypeError('keys is required but was not provided.')
    }

    console.info('Keys to be cleaned up: ', keys)

    for (let key of keys) {
      clean(path.join(RUNNER_TOOL_CACHE, GITHUB_REPOSITORY, key))
    }
  } catch (error: unknown) {
    console.trace(error)
    setFailed(isErrorLike(error) ? error.message : `unknown error: ${error}`)
  }
}

void main()
