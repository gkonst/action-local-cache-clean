import {setFailed} from '@actions/core'

import {getVars, Vars} from './lib/getVars'
import {isErrorLike} from './lib/isErrorLike'
import {rmRF} from '@actions/io';

async function clean(vars: Vars) {
  console.log("Cleaning dir: ", vars.cacheDir)
  await rmRF(vars.cacheDir)
}

async function main(): Promise<void> {
  try {
    const vars = getVars();
    clean(vars);
  } catch (error: unknown) {
    console.trace(error)
    setFailed(isErrorLike(error) ? error.message : `unknown error: ${error}`)
  }
}

void main()
