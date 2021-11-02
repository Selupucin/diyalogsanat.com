<div align="center">
	<img src="assets/enigma.gif" alt="Compression" height="250px">
</div>

# enigma-hash

[![Package version](https://img.shields.io/npm/v/enigma-hash.svg?style=flat-square)](https://npmjs.org/package/enigma-hash)
[![Make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![License](https://img.shields.io/npm/l/enigma-hash.svg?style=flat-square)](https://github.com/pedreviljoen/enigma-hash/blob/master/LICENSE)[![CircleCI](https://circleci.com/gh/pedreviljoen/enigma-hash.svg?style=svg)](https://circleci.com/gh/pedreviljoen/enigma-hash)
[![npm downloads](https://img.shields.io/npm/dm/enigma-hash.svg?style=flat-square)](https://npmjs.org/package/enigma-hash)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Greenkeeper badge](https://badges.greenkeeper.io/pedreviljoen/enigma-hash.svg)](https://greenkeeper.io/)
[![CodeFactor](https://www.codefactor.io/repository/github/pedreviljoen/enigma-hash/badge)](https://www.codefactor.io/repository/github/pedreviljoen/enigma-hash)

> Demystifying hashing, made simple and easy

## Contents

- [enigma-hash](#enigma-hash)
  - [Contents](#contents)
  - [Install](#install)
  - [Usage](#usage)
  - [CLI Tool](#cli-tool)
  - [Contribute](#contribute)
  - [License](#license)

## Install

```sh
yarn add enigma-hash
```

OR

```sh
npm install enigma-hash
```

## Usage

Require in the module

```javascript
const { hash } = require('enigma-hash')
```

Hash like below:

```javascript
const hashValue = hash('Hello World', 'sha256', 'hex')

// hash(input, algorithm, code)
```

Hash with a key (Hmac) like below:

```javascript
const hashValue = hash('Hello World', 'sha256', 'hex', 'Some key')

// hash(input, algorithm, code, key)
```

<table width="80%">
    <tr>
        <th>Parameter</th>
        <th>Description</th> 
        <th>Type</th>
        <th>Options</th>
        <th>Default Value</th>
    </tr>
    <tr>
        <td><code>Input</code></td>
        <td>Value you want to Hash</td> 
        <td><code>Any</code></td>
        <td><code>n/a</code></td>
        <td><code>" "</code></td>
    </tr>
    <tr>
        <td><code>Algorithm</code></td>
        <td>Algorithm you want to hash data with</td> 
        <td><code>String</code></td>
        <td><code>sha256 / sha512</code></td>
        <td><code>sha256</code></td>
    </tr>
    <tr>
        <td><code>Code</code></td>
        <td>Encoding you want hash to return with</td> 
        <td><code>String</code></td>
        <td><code>hex / latin1 / base64</code></td>
        <td><code>hex</code></td>
    </tr>
    <tr>
        <td><code>Key</code></td>
        <td>Key used to encrypt data</td> 
        <td><code>String</code></td>
        <td><code>Any</code></td>
        <td><code>No key</code></td>
    </tr>
</table>

## CLI Tool

Install with:

```sh
npm install -g enigma-hash
```

& simply run with the following:

```sh
enigma --alg sha256 --code hex --data <some string to hash>
```

## Contribute

Contributions are welcome!

1. Fork it.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

Or open up [a issue](https://github.com/pedreviljoen/enigma-hash/issues).

## License

MIT