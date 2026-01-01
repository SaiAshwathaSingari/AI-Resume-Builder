import React from 'react'
import ModernTemplate from '../assets/templates/ModernTemplate'
import MinalTemplate from '../assets/templates/MinimalTemplate'
import MinalImageTemplate from '../assets/templates/MinimalImageTemplate'
import ClassicTemplate from '../assets/templates/ClassicTemplate'

function ResumePreview({data, template, accentColor, classes= ""}) {
  const renderTemplate = () => {
    switch(template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />
      case "minimal":
        return <MinalTemplate data={data} accentColor={accentColor} />
      case "minimal-image":
        return <MinalImageTemplate data={data} accentColor={accentColor} withImage={true} />
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    // 'flex items-stretch' forces the child (the template) to fill the height
    <div className={`w-full h-full flex items-stretch bg-white ${classes}`}>
      <div id="resume-preview" className="w-full h-full">
        {renderTemplate()}
      </div>
    </div>
  )
}

export default ResumePreview