/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import path = require('path')
import { Request, Response, NextFunction } from 'express'

module.exports = function serveKeyFiles () {
  return ({ params }: Request, res: Response, next: NextFunction) => {
    const file = params.file
    const safeBasePath = path.resolve('encryptionkeys/')

    if (!file.includes('/') && !file.includes('..')) {
      const safeFilePath = path.join(safeBasePath, file)
      if (safeFilePath.startsWith(safeBasePath)) {
        res.sendFile(safeFilePath)
      } else {
        res.status(403)
        next(new Error('Invalid file path!'))
      }
    } else {
      res.status(403)
      next(new Error('File names cannot contain forward slashes or dot-dot sequences!'))
    }
  }
}
