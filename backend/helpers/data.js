'use strict';

class Files {
    static read(path, encoding = 'utf8') {
      return new Promise((resolve, reject) => {
        let readStream = fs.createReadStream(ABSPATH + path, encoding);
        let data = '';

        readStream.on('data', chunk => {
            data += chunk;
        }).on('end', () => {
            resolve(data);
        }).on('error', err => {
            reject(err);
        });
      });
    }


}

module.exports = Files;
