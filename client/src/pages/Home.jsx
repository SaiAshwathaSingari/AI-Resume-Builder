import React from 'react'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Title from '../components/home/Title'
const Home = () => {
  return (
    <div>

      <Hero/>
      <Features/>
      <Title title="AI Resume Builder" description="Create professional resumes effortlessly with our AI-powered resume builder. Choose from a variety of templates, customize your content, and generate a polished resume in minutes."/>
    </div>
    
  )
}

export default Home