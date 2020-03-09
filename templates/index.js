const itemIndex = `import {{itemName}} from './{{itemName}}'

export default {{itemName}}`

const itemFile = `import React from 'react'

const {{itemName}} = () => {
  return (
    <React.Fragment>
      <h1>{{itemName}}</h1>
    </React.Fragment>
  )
}

export default {{itemName}}
`

module.exports = {
  itemIndex,
  itemFile
}
