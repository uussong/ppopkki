import { css } from '@emotion/react'
import reset from 'emotion-reset'

export const globalStyles = css`
  ${reset}
  * {
    box-sizing: inherit;
    color: #222;
    font-family: 'Pretendard', sans-serif;
  }

  html {
    box-sizing: border-box;
  }

  input,
  button {
    all: unset;
  }

  button,
  input[type='submit'] {
    cursor: pointer;

    :disabled {
      cursor: initial;
    }
  }

  input[type='file'] {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`
