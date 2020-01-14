const itemIndex = `import {{itemName}} from './{{itemName}}'

export default {{itemName}}`

const itemFile = `import React from 'react'

const {{itemName}} = () => {
  return (
    <>
      <h1>{{itemName}}</h1>
    </>
  )
}

export default {{itemName}}
`

module.exports = {
  itemIndex,
  itemFile
}
