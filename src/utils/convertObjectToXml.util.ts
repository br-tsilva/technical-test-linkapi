import xml2js from 'xml2js'

const convertObjectToXml = (object: unknown): string => {
  const parser = new xml2js.Builder()

  return parser.buildObject(object)
}

export { convertObjectToXml }
