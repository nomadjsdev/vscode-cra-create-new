const viewIndex = `import {{viewName}} from './{{viewName}}'

export default {{viewName}}`

const viewFile = `import React from 'react'

const {{viewName}} = () => {
  return (
    <>
      <h1>{{viewName}}</h1>
    </>
  )
}

export default {{viewName}}
`

module.exports = {
  viewIndex,
  viewFile
}
