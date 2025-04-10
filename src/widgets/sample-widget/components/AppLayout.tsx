import React from 'react'
import { Heading } from '../../../shared/ring-ui-components'

export const AppLayout = ({ 
    children 
  }: { 
    children: React.ReactNode 
  }) => (
    <div className="widget">
      <div className="heading-container">
        <Heading>YouTrack Projects</Heading>
      </div>
      {children}
    </div>
  );